import { carregarNoticias } from '../js/api.js'
import { navigate } from '../router.js'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export const noticiaPage = {
  _currentId: null,
  _resolvedNoticia: null,

  render(id) {
    this._currentId = id

    // Se já temos a notícia resolvida de uma chamada anterior, usa direto
    if (this._resolvedNoticia && String(this._resolvedNoticia.id) === String(id)) {
      return this._buildPage(this._resolvedNoticia, [])
    }

    // Renderiza skeleton e busca na API no mount()
    return `
    <div class="page-enter">
      <div class="article-wrapper">
        <div style="display:flex;align-items:center;justify-content:center;padding:80px 0;color:var(--muted);font-size:16px;gap:12px;">
          <span style="display:inline-block;width:18px;height:18px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite"></span>
          Carregando notícia...
        </div>
      </div>
    </div>`
  },

  _buildPage(noticia, related) {
    const img        = noticia.image       || './assets/news_big_card.webp'
    const imgAlt     = noticia.imageAlt    || noticia.title
    const dateStr    = noticia.date        || ''
    const dateLabel  = noticia.dateLabel   || formatDate(dateStr)
    const uf         = noticia.uf          || ''
    const cidade     = noticia.cidade      || ''
    const banca      = noticia.banca       || ''
    const categoria  = noticia.categoria   || 'Concursos'
    const tagsArr    = Array.isArray(noticia.tags) ? noticia.tags : (noticia.tags ? String(noticia.tags).split(',').map(t=>t.trim()) : [])
    const rawLinks = Array.isArray(noticia.links) && noticia.links.length
      ? noticia.links
      : (noticia.linkOriginal ? [{ nome: 'Fonte Original', link: noticia.linkOriginal }] : [])

    const validLinks = rawLinks.filter(l =>
      l &&
      typeof l.nome === 'string' && l.nome.trim() !== '' &&
      typeof l.link === 'string' && l.link.trim() !== ''
    )

    const relatedHtml = related.length ? `
      <aside class="article-related">
        <h3 class="article-related-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
          Notícias Relacionadas
        </h3>
        <div class="article-related-grid">
          ${related.map(n => `
            <a class="article-related-card" href="#/noticia/${n.id}" aria-label="${n.title}">
              <div class="article-related-img" style="background: url('${n.image||'./assets/news1.webp'}') center/cover;" role="img" aria-label="${n.imageAlt||n.title}"></div>
              <div class="article-related-body">
                <span class="news-tag">NOTÍCIAS</span>
                <p>${n.title}</p>
                <time class="date" datetime="${n.date}">${n.dateLabel||formatDate(n.date)}</time>
              </div>
            </a>
          `).join('')}
        </div>
      </aside>
    ` : ''

    return `
    <div class="page-enter">
      <div class="article-wrapper">

        <!-- Breadcrumb -->
        <nav class="article-breadcrumb" aria-label="Trilha de navegação">
          <a href="#/home">Início</a>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          <a href="#/home">Notícias</a>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          <span aria-current="page">${cidade ? `${cidade} (${uf})` : noticia.title}</span>
        </nav>

        <!-- Hero da notícia -->
        <div class="article-hero">
          <img
            src="${img}"
            alt="${imgAlt}"
            class="article-hero-img"
            fetchpriority="high"
            width="1200" height="480"
          >
          <div class="article-hero-overlay">
            <div class="article-hero-content">
              <div class="article-meta-top">
                <span class="news-tag">${categoria.toUpperCase()}</span>
                ${uf ? `<span class="article-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${cidade ? `${cidade}, ` : ''}${uf}
                </span>` : ''}
              </div>
              <h1 class="article-title">${noticia.title}</h1>
              <div class="article-byline">
                ${dateStr ? `<time datetime="${dateStr}" class="article-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  ${dateLabel}
                </time>` : ''}
                ${banca ? `<span class="article-banca">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Banca: ${banca}
                </span>` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Layout principal: artigo + sidebar -->
        <div class="article-layout">

          <!-- Conteúdo principal -->
          <article class="article-body" aria-label="Conteúdo da notícia">
            ${noticia.summary ? `<p class="article-summary">${noticia.summary}</p>` : ''}
            <div class="article-content">
              ${noticia.content || ''}
            </div>

            <!-- Tags -->
            ${tagsArr.length ? `<div class="article-tags">${tagsArr.map(t => `<span class="article-tag">${t}</span>`).join('')}</div>` : ''}

            <!-- Área Dedicada: Links Úteis -->
            ${validLinks.length ? `
              <div class="article-useful-links">
                <h3 class="article-useful-links-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Links Úteis
                </h3>
                <div class="article-useful-links-grid">
                  ${validLinks.map(l => `
                    <a href="${l.link}" target="_blank" rel="noopener" class="useful-link-card">
                      <div class="useful-link-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </div>
                      <div class="useful-link-info">
                        <span class="useful-link-title">${l.nome}</span>
                        <span class="useful-link-url">${l.link}</span>
                      </div>
                      <svg class="useful-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Navegação de artigo -->
            <div class="article-nav-footer">
              <a href="#/home" class="article-back-btn" aria-label="Voltar para notícias">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Voltar para Notícias
              </a>
              ${noticia.concursoId ? `
                <a href="#/concursos/${noticia.concursoId}" class="article-cta-btn" aria-label="Ver detalhes do concurso">
                  Ver Concurso Completo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              ` : ''}
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="article-sidebar" aria-label="Informações rápidas">
            <div class="article-sidebar-card">
              <h3>Resumo da Notícia</h3>
              <dl class="article-sidebar-list">
                ${categoria ? `<div><dt>Categoria</dt><dd>${categoria}</dd></div>` : ''}
                ${cidade || uf ? `<div><dt>Local</dt><dd>${cidade ? `${cidade} – ` : ''}${uf}</dd></div>` : ''}
                ${banca ? `<div><dt>Banca</dt><dd>${banca}</dd></div>` : ''}
                ${dateLabel ? `<div><dt>Publicado em</dt><dd>${dateLabel}</dd></div>` : ''}
              </dl>
              ${noticia.concursoId ? `
                <a href="#/concursos/${noticia.concursoId}" class="article-sidebar-cta" aria-label="Ir para detalhes do concurso vinculado">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
                  Ver Concurso
                </a>
              ` : ''}
            </div>

            <div class="article-sidebar-card">
              <h3>Concursos Médicos</h3>
              <p style="font-size: 14px; color: var(--muted); margin: 0 0 16px;">Veja todos os concursos médicos abertos no Brasil.</p>
              <a href="#/concursos" class="article-sidebar-cta article-sidebar-cta--secondary" aria-label="Explorar concursos">
                Explorar Concursos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </aside>

        </div>

        ${relatedHtml}

      </div>
    </div>`
  },

  _notFoundHtml() {
    return `
    <div class="page-enter">
      <div style="max-width:720px;margin:80px auto;padding:0 40px;text-align:center;">
        <div style="font-size:64px;margin-bottom:24px;">📰</div>
        <h1 style="color:var(--teal-900);margin-bottom:16px;">Notícia não encontrada</h1>
        <p style="color:var(--muted);margin-bottom:32px;">A notícia que você procura não existe ou foi removida.</p>
        <a href="#/home" style="display:inline-flex;align-items:center;gap:8px;color:var(--teal-700);font-weight:600;text-decoration:none;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Voltar para a página inicial
        </a>
      </div>
    </div>`
  },

  mount(id) {
    if (!id) {
      document.getElementById('app').innerHTML = this._notFoundHtml()
      return
    }
    carregarNoticias().then(noticias => {
      const noticia = (noticias || []).find(n => String(n.id) === String(id))
      if (!noticia) {
        document.getElementById('app').innerHTML = this._notFoundHtml()
        return
      }
      this._resolvedNoticia = noticia

      // Related: mesma categoria ou mesma UF, excluindo a atual
      const related = noticias
        .filter(n => String(n.id) !== String(id) && n.publicada && (n.categoria === noticia.categoria || n.uf === noticia.uf))
        .slice(0, 3)

      document.getElementById('app').innerHTML = this._buildPage(noticia, related)
    }).catch(() => {
      document.getElementById('app').innerHTML = this._notFoundHtml()
    })
  }
}
