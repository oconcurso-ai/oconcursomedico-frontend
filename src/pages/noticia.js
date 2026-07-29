import { NEWS_BY_ID, NEWS_DATA } from '../js/news-data.js'
import { navigate } from '../router.js'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export const noticiaPage = {
  _currentId: null,

  render(id) {
    this._currentId = id
    const noticia = NEWS_BY_ID[id]

    if (!noticia) {
      return `
      <div class="page-enter">
        <div style="max-width: 720px; margin: 80px auto; padding: 0 40px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 24px;">📰</div>
          <h1 style="color: var(--teal-900); margin-bottom: 16px;">Notícia não encontrada</h1>
          <p style="color: var(--muted); margin-bottom: 32px;">A notícia que você procura não existe ou foi removida.</p>
          <a href="#/home" style="display: inline-flex; align-items: center; gap: 8px; color: var(--teal-700); font-weight: 600; text-decoration: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Voltar para a página inicial
          </a>
        </div>
      </div>`
    }

    const related = NEWS_DATA
      .filter(n => n.id !== noticia.id && (n.cidade === noticia.cidade || n.uf === noticia.uf))
      .slice(0, 3)

    const relatedHtml = related.length ? `
      <aside class="article-related">
        <h3 class="article-related-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
          Notícias Relacionadas
        </h3>
        <div class="article-related-grid">
          ${related.map(n => `
            <a class="article-related-card" href="#/noticia/${n.id}" aria-label="${n.title}">
              <div class="article-related-img" style="background: url('${n.image}') center/cover;" role="img" aria-label="${n.imageAlt}"></div>
              <div class="article-related-body">
                <span class="news-tag">NOTÍCIAS</span>
                <p>${n.title}</p>
                <time class="date" datetime="${n.date}">${n.dateLabel}</time>
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
          <span aria-current="page">${noticia.cidade} (${noticia.uf})</span>
        </nav>

        <!-- Hero da notícia -->
        <div class="article-hero">
          <img
            src="${noticia.image}"
            alt="${noticia.imageAlt}"
            class="article-hero-img"
            fetchpriority="high"
            width="1200" height="480"
          >
          <div class="article-hero-overlay">
            <div class="article-hero-content">
              <div class="article-meta-top">
                <span class="news-tag">NOTÍCIAS</span>
                <span class="article-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${noticia.cidade}, ${noticia.uf}
                </span>
              </div>
              <h1 class="article-title">${noticia.title}</h1>
              <div class="article-byline">
                <time datetime="${noticia.date}" class="article-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  ${formatDate(noticia.date)}
                </time>
                <span class="article-banca">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Banca: ${noticia.banca}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Layout principal: artigo + sidebar -->
        <div class="article-layout">

          <!-- Conteúdo principal -->
          <article class="article-body" aria-label="Conteúdo da notícia">
            <p class="article-summary">${noticia.summary}</p>
            <div class="article-content">
              ${noticia.content}
            </div>

            <!-- Tags -->
            <div class="article-tags">
              ${noticia.tags.map(t => `<span class="article-tag">${t}</span>`).join('')}
            </div>

            <!-- Navegação de artigo -->
            <div class="article-nav-footer">
              <a href="#/home" class="article-back-btn" aria-label="Voltar para notícias">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Voltar para Notícias
              </a>
              ${noticia.concursoId ? `
                <a href="#/concursos" class="article-cta-btn" aria-label="Ver detalhes do concurso">
                  Ver Concurso Completo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              ` : ''}
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="article-sidebar" aria-label="Informações rápidas">
            <div class="article-sidebar-card">
              <h3>Resumo do Concurso</h3>
              <dl class="article-sidebar-list">
                <div>
                  <dt>Município</dt>
                  <dd>${noticia.cidade} – ${noticia.uf}</dd>
                </div>
                <div>
                  <dt>Banca Organizadora</dt>
                  <dd>${noticia.banca}</dd>
                </div>
                <div>
                  <dt>Publicado em</dt>
                  <dd>${formatDate(noticia.date)}</dd>
                </div>
              </dl>
              ${noticia.concursoId ? `
                <a href="#/concursos" class="article-sidebar-cta" aria-label="Ir para lista completa de concursos">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
                  Ver Edital
                </a>
              ` : ''}
            </div>

            <div class="article-sidebar-card">
              <h3>Concursos em ${noticia.uf}</h3>
              <p style="font-size: 14px; color: var(--muted); margin: 0 0 16px;">Veja todos os concursos médicos abertos em ${noticia.uf}.</p>
              <a href="#/concursos" class="article-sidebar-cta article-sidebar-cta--secondary" aria-label="Ver concursos em ${noticia.uf}">
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

  mount() {
    // Sem lógica especial necessária; links são âncoras normais
  }
}
