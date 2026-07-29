/**
 * Motor de busca para notícias e concursos.
 *
 * Estratégia:
 *  1. Tokenização + normalização (lowercase, remove acentos, remove pontuação)
 *  2. Exact/prefix match com scoring por campo (cidade > UF > banca > tags > conteúdo)
 *  3. Fuzzy match via algoritmo Bitap (Shift-Or) para tolerância a 1 erro de digitação
 *     — O(m·n) em operações bitwise, extremamente leve para n < 32 (limite do bitap)
 *  4. OR multi-termo com scoring acumulado + bonus por match de múltiplos termos
 *  5. Retorna resultados ordenados por score decrescente
 */

/** Remove acentos e normaliza para comparação */
function normalize(str) {
  if (!str) return ''
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacríticos
    .replace(/[^a-z0-9\s]/g, ' ')   // remove pontuação
    .replace(/\s+/g, ' ')
    .trim()
}

/** Tokeniza uma string normalizada em palavras com comprimento mínimo */
function tokenize(str, minLen = 2) {
  return normalize(str).split(' ').filter(t => t.length >= minLen)
}

/**
 * Bitap (Shift-Or) — fuzzy single-edit-distance search.
 * Retorna true se `pattern` ocorre em `text` com no máximo `maxErrors` erros.
 * Limitado a padrões de até 31 chars (cabe em um int32).
 */
function bitapMatch(text, pattern, maxErrors = 1) {
  const m = pattern.length
  if (m === 0) return true
  if (m > 31) {
    // fallback: substring simples para padrões longos
    return text.includes(pattern)
  }
  if (text.length < m - maxErrors) return false

  // Pré-computar bitmask por caractere
  const patternMask = {}
  for (let i = 0; i < m; i++) {
    const c = pattern[i]
    patternMask[c] = (patternMask[c] || ~0) & ~(1 << i)
  }

  // Estado para k erros (0..maxErrors)
  const R = new Array(maxErrors + 1).fill(~0)

  for (let j = 0; j < text.length; j++) {
    const c = text[j]
    const mask = patternMask[c] !== undefined ? patternMask[c] : ~0
    let prevR = R[0]
    R[0] = (R[0] | mask) << 1

    for (let k = 1; k <= maxErrors; k++) {
      const temp = R[k]
      // insertion, deletion, substitution
      R[k] = ((R[k] | mask) << 1) & (prevR << 1) & prevR & (R[k - 1] << 1)
      prevR = temp
    }

    if ((R[maxErrors] & (1 << m)) === 0) return true
  }
  return false
}

/**
 * Pontua um documento contra uma lista de termos de busca.
 * @param {object} doc - campos: title, cidade, uf, banca, tags[], summary
 * @param {string[]} terms - termos já normalizados
 * @returns {number} score (0 = sem match)
 */
function scoreDocument(doc, terms) {
  // Peso por campo (maior = mais relevante)
  const fields = [
    { text: doc.cidade,             weight: 10 },
    { text: doc.uf,                 weight: 8  },
    { text: doc.banca,              weight: 6  },
    { text: (doc.tags || []).join(' '), weight: 5 },
    { text: doc.title,              weight: 4  },
    { text: doc.summary || '',      weight: 2  },
  ]

  let totalScore = 0
  let matchedTerms = 0

  for (const term of terms) {
    let termScore = 0
    let termMatched = false

    for (const { text, weight } of fields) {
      const normText = normalize(text)
      const normTokens = tokenize(normText)

      // 1) Exact substring match — máximo score
      if (normText.includes(term)) {
        termScore += weight * 2
        termMatched = true
        continue
      }

      // 2) Prefix match em tokens — bônus médio
      const prefixHit = normTokens.some(t => t.startsWith(term) || term.startsWith(t))
      if (prefixHit) {
        termScore += weight * 1.2
        termMatched = true
        continue
      }

      // 3) Fuzzy match (bitap, 1 erro) — só para termos >= 4 chars para evitar ruído
      if (term.length >= 4) {
        const fuzzyHit = normTokens.some(t => bitapMatch(t, term, 1) || bitapMatch(term, t, 1))
        if (fuzzyHit) {
          termScore += weight * 0.7 // score reduzido: é um "talvez"
          termMatched = true
        }
      }
    }

    if (termMatched) {
      totalScore += termScore
      matchedTerms++
    }
  }

  // Bônus por cobertura: match de múltiplos termos é mais relevante
  if (matchedTerms > 1) {
    totalScore *= 1 + (matchedTerms - 1) * 0.3
  }

  // Bônus de recência (notícias mais recentes têm ligeira prioridade)
  if (doc.date) {
    const daysAgo = (Date.now() - new Date(doc.date).getTime()) / 86400000
    const recencyBonus = Math.max(0, 1 - daysAgo / 730) // até 2 anos
    totalScore *= 1 + recencyBonus * 0.15
  }

  return totalScore
}

/**
 * Busca documentos por query de texto livre.
 * @param {object[]} docs - array de documentos com campos title, cidade, uf, banca, tags, summary, date
 * @param {string} query - string de busca do usuário
 * @param {object} [opts]
 * @param {number} [opts.limit=10] - máximo de resultados
 * @param {number} [opts.minScore=0.5] - score mínimo para aparecer
 * @returns {{ doc: object, score: number }[]} resultados ordenados
 */
export function searchDocs(docs, query, { limit = 10, minScore = 0.5 } = {}) {
  if (!query || !query.trim()) return []

  const terms = tokenize(query)
  if (terms.length === 0) return []

  const results = docs
    .map(doc => ({ doc, score: scoreDocument(doc, terms) }))
    .filter(r => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return results
}

/**
 * Busca unificada em notícias E concursos.
 * Retorna { news: [], concursos: [] } cada um ordenado por score.
 */
export function unifiedSearch(newsData, concursosData, query, opts = {}) {
  const newsResults = searchDocs(newsData, query, { limit: opts.newsLimit || 5, minScore: opts.minScore || 0.5 })
  const concursosResults = searchDocs(concursosData, query, { limit: opts.concursosLimit || 6, minScore: opts.minScore || 0.5 })
  return { news: newsResults, concursos: concursosResults }
}
