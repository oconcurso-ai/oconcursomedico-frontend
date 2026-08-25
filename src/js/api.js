export const API_URL = "https://script.google.com/macros/s/AKfycbyOO3_5cmla4VOvW6lvImUPdGKurBnXEGIuUNJO3S1SJfhK-2wYFs_gf-lnStW0MOBL/exec"

export function normalizarImagemUrl(url) {
  if (!url || typeof url !== 'string') return './assets/novo.webp'
  const trimmed = url.trim()
  if (!trimmed) return './assets/novo.webp'
  if (trimmed.startsWith('/assets/')) return '.' + trimmed
  if (trimmed.startsWith('assets/')) return './' + trimmed
  return trimmed
}

/**
 * Transforma um item de notícia vindo da API v3.0 para o formato interno do frontend.
 * Mapeia os campos do backend (titulo, imagemUrl, dataPublicacao, tags[]) para os
 * campos esperados pelos componentes (title, image, date, tags, etc.).
 */
export function transformNoticia(item) {
  // Normaliza data: backend envia dd/MM/yyyy, precisamos de yyyy-MM-dd para <time datetime>
  let dateISO = ''
  let dateLabel = ''
  if (item.dataPublicacao) {
    const raw = String(item.dataPublicacao).trim()
    if (raw.includes('/')) {
      const [d, m, y] = raw.split('/')
      dateISO = `${y}-${m}-${d}`
    } else {
      dateISO = raw.substring(0, 10)
    }
    try {
      const dObj = new Date(dateISO + 'T12:00:00')
      if (!isNaN(dObj.getTime()) && dObj.getFullYear() >= 2000) {
        dateLabel = dObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      } else {
        dateISO = ''
        dateLabel = ''
      }
    } catch(_) { dateISO = ''; dateLabel = '' }
  }

  // tags: backend envia string separada por vírgula, ou array após serialização
  const tagsArr = Array.isArray(item.tags)
    ? item.tags
    : (item.tags ? String(item.tags).split(',').map(t => t.trim()).filter(Boolean) : [])

  // links: backend envia array de objetos [{nome, link}] ou string JSON, ou string simples no linkOriginal
  let links = []
  if (Array.isArray(item.links)) {
    links = item.links
  } else if (typeof item.links === 'string' && item.links.trim().startsWith('[')) {
    try { links = JSON.parse(item.links) } catch (_) { links = [] }
  } else if (typeof item.linkOriginal === 'string' && item.linkOriginal.trim().startsWith('[')) {
    try { links = JSON.parse(item.linkOriginal) } catch (_) { links = [] }
  } else if (item.linkOriginal) {
    links = [{ nome: 'Fonte Original', link: item.linkOriginal }]
  }

  return {
    // Identificação (numérica — diferente do fallback que usa string slug)
    id: item.id,
    // Campos mapeados para o formato usado pelos templates de notícia
    title: item.titulo || '',
    cidade: '',               // notícias não têm cidade própria no backend
    uf: tagsArr.find(t => t.length === 2 && /^[A-Z]+$/.test(t)) || '',
    banca: '',                // notícias não têm banca
    tags: tagsArr,
    date: dateISO,
    dateLabel,
    // Imagem: normaliza caminhos de assets e aplica fallback padrão se vazia
    image: normalizarImagemUrl(item.imagemUrl),
    imageAlt: item.titulo || '',
    summary: item.resumo || '',
    content: item.conteudo || '',
    categoria: item.categoria || 'Concursos',
    linkOriginal: links[0]?.link || item.linkOriginal || null,
    links: links,
    concursoId: item.concursoId || null,
    urlInstagram: item.urlInstagram || null,
    publicada: item.publicada,
    // featured: a notícia mais recente publicada é considerada featured
    featured: false,
  }
}

export function transformConcurso(item) {
  const statusRaw = (item.statusInscricao || item.status || "previsto").toLowerCase()
  const STATUS_MAP = {
    abertas: "abertas",
    acaba_hoje: "abertas",
    prorrogadas: "abertas",
    encerradas: "encerrados",
    previsto: "novos"
  }
  const status = STATUS_MAP[statusRaw] || "novos"

  return {
    id: item.id,
    titulo: item.titulo || "",
    cidade: item.cidade || "",
    uf: item.uf || "",
    banca: item.banca || "",
    carga: Array.isArray(item.carga) ? item.carga : (item.carga ? [item.carga] : []),
    vagas: item.vagas != null ? Number(item.vagas) || null : null,
    remuneracao: typeof item.remuneracao === "number"
      ? item.remuneracao
      : item.remuneracao
        ? Number(String(item.remuneracao).replace(/[R$\s.]/g, "").replace(",", ".")) || null
        : null,
    extra: item.extra || null,
    status: status,
    statusOriginal: statusRaw,
    data: item.inscricaoFim || item.data || "",
    periodoInscricao: item.periodoInscricao || "A definir",
    dataProva: item.dataProva || "A definir",
    especialidade: Array.isArray(item.especialidade) ? item.especialidade : (item.especialidade ? [item.especialidade] : []),
    editais: Array.isArray(item.editais) ? item.editais : [],
    urlBanca: item.urlBanca || null,
    urlSite: item.urlSite || null,
    urlImagem: item.urlImagem || null,
  }
}

let _cacheAll = null   // cache da resposta bruta completa (concursos + noticias)
let _cachePromise = null

/**
 * Faz UMA única requisição à API e cacheia a resposta completa.
 * Retorna { concursos: [], noticias: { total, items: [] } }
 */
function fetchAll() {
  if (_cachePromise) return _cachePromise
  _cachePromise = fetch(API_URL)
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status)
      return r.json()
    })
    .then(data => {
      _cacheAll = data
      return data
    })
    .catch(err => {
      _cachePromise = null
      throw err
    })
  return _cachePromise
}

/** Carrega e transforma a lista de concursos */
export function carregarDados() {
  return fetchAll().then(data => {
    const lista = Array.isArray(data.concursos) ? data.concursos : []
    return lista.map(item => transformConcurso(item))
  })
}

/** Carrega e transforma somente as notícias publicadas, ordenadas da mais recente para a mais antiga */
export function carregarNoticias() {
  return fetchAll().then(data => {
    const items = (data.noticias && Array.isArray(data.noticias.items))
      ? data.noticias.items
      : []
    const transformadas = items.map(n => transformNoticia(n))
    
    // Ordena da mais recente para a mais antiga (Data ISO decrescente, ID decrescente como desempate)
    transformadas.sort((a, b) => {
      const dateA = a.date || ''
      const dateB = b.date || ''
      const cmp = dateB.localeCompare(dateA)
      if (cmp !== 0) return cmp
      return (Number(b.id) || 0) - (Number(a.id) || 0)
    })

    // Marca a primeira notícia publicada (mais recente) como featured
    const publicadas = transformadas.filter(n => n.publicada)
    if (publicadas.length > 0) {
      publicadas[0].featured = true
    }
    return transformadas
  })
}

/** Carrega tudo em paralelo e retorna { concursos, noticias } com notícias ordenadas */
export function carregarTudo() {
  return fetchAll().then(data => {
    const transformadas = ((data.noticias && Array.isArray(data.noticias.items))
      ? data.noticias.items : []).map(n => transformNoticia(n))
    
    transformadas.sort((a, b) => {
      const dateA = a.date || ''
      const dateB = b.date || ''
      const cmp = dateB.localeCompare(dateA)
      if (cmp !== 0) return cmp
      return (Number(b.id) || 0) - (Number(a.id) || 0)
    })

    const publicadas = transformadas.filter(n => n.publicada)
    if (publicadas.length > 0) {
      publicadas[0].featured = true
    }

    return {
      concursos: (Array.isArray(data.concursos) ? data.concursos : []).map(transformConcurso),
      noticias: transformadas
    }
  })
}
