import { carregarDados } from '../js/api.js'
import { DATA_FALLBACK, STATUS_STYLE, STATUS_ORDER, renderCardHTML, SKELETON_CARDS_HTML, currency } from '../js/data.js'
import { NEWS_DATA } from '../js/news-data.js'
import { searchDocs } from '../js/search.js'

export const homePage = {
  _allConcursos: [],

  render() {
    const featuredNews = NEWS_DATA.find(n => n.featured)
    const otherNews = NEWS_DATA.filter(n => !n.featured).slice(0, 4)

    return `
    <div class="page-enter">
    <section class="news-search-container" aria-label="Busca de notícias e concursos">
      <div class="news-search">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone de busca">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input type="text" id="newsSearchInput" name="newsSearch" placeholder="Concurso ou notícia desejada?" aria-label="Digite a cidade, estado ou palavra-chave para buscar concursos e notícias">
        <button class="news-search-btn" id="newsSearchBtn" aria-label="Pesquisar">Pesquisar</button>
      </div>
    </section>

    <section id="homeNewsGrid" class="news-grid" aria-label="Notícias em Destaque sobre Concursos Médicos">
      ${featuredNews ? `
      <a href="#/noticia/${featuredNews.id}" class="news-card-big" style="position: relative; overflow: hidden; text-decoration: none; color: inherit;">
        <img src="${featuredNews.image}" alt="${featuredNews.imageAlt}" width="800" height="400" fetchpriority="high" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,79,73,0.95), rgba(15,79,73,0.15)); z-index: 2; pointer-events: none;"></div>
        <h2 style="position: relative; z-index: 3; text-transform: uppercase;">ATENÇÃO!<br>CONCURSO<br>MÉDICO:<br>${featuredNews.cidade} (${featuredNews.uf}):<br>${featuredNews.title.split(':').pop()}</h2>
      </a>
      ` : ''}

      ${otherNews.map(n => `
      <a href="#/noticia/${n.id}" class="news-card-small" style="text-decoration: none; color: inherit;">
        <div class="news-card-small-img" role="img" style="background: url('${n.image}') center/cover;" aria-label="${n.imageAlt}"></div>
        <div class="news-card-small-content">
          <span class="news-tag">NOTÍCIAS</span>
          <h3>${n.title}</h3>
          <time class="date" datetime="${n.date}">${n.dateLabel}</time>
        </div>
      </a>
      `).join('')}
    </section>

    <div class="news-action" style="text-align: center; margin-bottom: 64px; margin-top: 16px;">
      <button id="loadMoreNews" type="button" class="btn-load-more" aria-label="Ver mais notícias de concursos médicos"
        style="color: var(--teal-700); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; background: none; border: none; font-size: 16px;">
        Ver mais notícias
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Seta para baixo">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>

    <section class="concursos-section" aria-label="Lista de Concursos Médicos Abertos">
      <div class="section-title">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone edital">
          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
        </svg>
        Concursos Abertos
      </div>
      <div class="grid" id="homeConcursosGrid">
        ${SKELETON_CARDS_HTML}
      </div>
      <div class="concursos-action" style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
        <a href="#/concursos" class="btn-primary-link" aria-label="Navegar para a lista completa de concursos médicos"
          style="color: var(--teal-700); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
          Ir para Concursos
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Seta direita">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
    </div>
    `
  },

  mount() {
    const $searchInput = $('#newsSearchInput')
    const $newsGrid = $('#homeNewsGrid')
    
    // Store original grid html to restore if search is empty
    const originalGridHtml = $newsGrid.html()

    function performNewsSearch() {
      const q = $searchInput.val().trim()
      if (!q) {
        $newsGrid.html(originalGridHtml)
        return
      }

      // Search only on NEWS_DATA with our advanced search function
      const results = searchDocs(NEWS_DATA, q, { limit: 6, minScore: 1 })
      
      if (results.length === 0) {
        $newsGrid.html('<p style="grid-column: 1/-1; text-align: center; color: var(--text-gray); font-size: 18px; padding: 40px 0;">Nenhuma notícia encontrada para "' + q + '".</p>')
        return
      }

      const html = results.map(({doc}) => `
      <a href="#/noticia/${doc.id}" class="news-card-small" style="text-decoration: none; color: inherit;">
        <div class="news-card-small-img" role="img" style="background: url('${doc.image}') center/cover;" aria-label="${doc.imageAlt}"></div>
        <div class="news-card-small-content">
          <span class="news-tag">NOTÍCIAS</span>
          <h3>${doc.title}</h3>
          <time class="date" datetime="${doc.date}">${doc.dateLabel}</time>
        </div>
      </a>
      `).join('')

      $newsGrid.html(html)
    }

    // Trigger search directly within news grid when clicking button
    $('#newsSearchBtn').on('click', function () {
      performNewsSearch()
    })

    // Also search when typing Enter
    $searchInput.on('keydown', function (e) {
      if (e.key === 'Enter') {
        performNewsSearch()
      }
    })

    $('#loadMoreNews').on('click', function () {
      const grid = $('#homeNewsGrid')
      const $template = grid.find('.news-card-small').first()
      if (!$template.length) return

      const newsImages = [
        '/assets/news1.webp',
        '/assets/news2.webp',
        '/assets/news3.webp',
        '/assets/news_ponto_chique.webp'
      ]

      const currentNewsDate = new Date()
      const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' }

      for (let i = 0; i < 4; i++) {
        currentNewsDate.setDate(currentNewsDate.getDate() - 1)
        const dateStr = currentNewsDate.toLocaleDateString('pt-BR', dateOptions)
        const $newCard = $template.clone()
        
        $newCard.find('.date').text(dateStr)
        $newCard.find('h3').text('Atualização sobre Concursos Médicos — ' + dateStr)
        
        const randomImg = newsImages[Math.floor(Math.random() * newsImages.length)]
        $newCard.find('.news-card-small-img').css('background', `url('${randomImg}') center/cover`)
        $newCard.attr('href', '#') // Mock data sem navegação real
        $newCard.css({ opacity: 0, display: 'flex' })
        
        grid.append($newCard)
        $newCard.animate({ opacity: 1 }, 300)
      }
    })

    carregarDados()
      .then(data => {
        this._allConcursos = data
        this.renderHomeConcursos(data)
      })
      .catch(err => {
        console.error("[API] Falha ao carregar dados:", err)
        this._allConcursos = DATA_FALLBACK
        this.renderHomeConcursos(DATA_FALLBACK)
      })
  },

  openModal(concurso) {
    const st = STATUS_STYLE[concurso.status] || STATUS_STYLE['novos']
    const salaryValue = concurso.remuneracao != null ? currency(concurso.remuneracao) : "Não informado"
    const periodo = concurso.periodoInscricao || "Em breve"
    const prova = concurso.dataProva || "A definir"
    const vagas = concurso.vagas ?? "A definir"

    let especialidadeHtml = (concurso.especialidade || []).map(c => `<span>${c}</span>`).join("")
    if (!especialidadeHtml) especialidadeHtml = "<span>Especialidades a definir</span>"

    let editaisHtml = (concurso.editais || []).map(e => `
      <a href="${e.link}" target="_blank" class="edital-item">
        <div class="edital-item-left">
          <div class="edital-item-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          ${e.nome}
        </div>
        <div class="edital-item-right">
          Acessar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </a>
    `).join("")

    if (!editaisHtml) editaisHtml = "<p style='color: var(--text-gray); font-size: 14px;'>Nenhum edital disponível no momento.</p>"

    const html = `
      <div class="modal-header-info">
        <span class="status-pill" style="background:${st.bg};color:${st.fg}; align-self: flex-start; margin-bottom: 8px;">
          <span class="dot" style="background:${st.dot}"></span>${st.label}
        </span>
        <h2>${concurso.cidade} - ${concurso.uf}</h2>
        <div class="modal-banca">Banca: ${concurso.banca}</div>
      </div>
      <div class="modal-info-grid">
        <div class="modal-info-item">
          <span>Remuneração</span>
          <strong>${salaryValue}</strong>
        </div>
        <div class="modal-info-item">
          <span>Vagas Totais</span>
          <strong>${vagas}</strong>
        </div>
        <div class="modal-info-item">
          <span>Período de Inscrição</span>
          <strong>${periodo}</strong>
        </div>
        <div class="modal-info-item">
          <span>Data da Prova</span>
          <strong>${prova}</strong>
        </div>
      </div>
      <div class="modal-section">
        <h3>Especialidades Disponíveis</h3>
        <div class="modal-especialidade-list">
          ${especialidadeHtml}
        </div>
      </div>
      <div class="modal-section">
        <h3>Editais e Documentos</h3>
        <div class="modal-editais-list">
          ${editaisHtml}
        </div>
      </div>
    `

    $("#modalContent").html(html)
    $("#concursoModal").removeAttr("hidden")
    $("body").css("overflow", "hidden")
  },

  renderHomeConcursos(DATA) {
    const abertos = DATA
      .filter(i => i.status === 'abertas' || i.status === 'novos')
      .sort((a, b) => {
        const toDate = s => {
          if (!s) return new Date(0)
          if (s.includes('/')) { const [d, m, y] = s.split('/'); return new Date(`${y}-${m}-${d}`) }
          return new Date(s)
        }
        return toDate(b.data) - toDate(a.data)
      })
      .slice(0, 6)

    const $grid = $('#homeConcursosGrid')
    if (abertos.length === 0) {
      $grid.html('<p style="text-align: center; color: var(--text-gray); grid-column: 1/-1;">Nenhum concurso disponível no momento.</p>')
      return
    }

    const cardsHtml = abertos.map((o, idx) => renderCardHTML(o, idx)).join("")

    $grid.html(cardsHtml)

    const self = this
    $grid.off('click', '.open-modal-btn').on('click', '.open-modal-btn', function () {
      const id = $(this).data('id')
      const concurso = DATA.find(c => String(c.id) === String(id))
      if (!concurso) return
      self.openModal(concurso)
    })
  }
}
