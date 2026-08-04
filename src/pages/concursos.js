import { initConcursosPage } from '../js/app-logic.js'
import { carregarDados } from '../js/api.js'
import { DATA_FALLBACK } from '../js/data.js'


export const concursosPage = {
  render() {
    return `
    <div class="layout">
      <div class="filters-overlay" id="filtersOverlay"></div>
      <aside class="filters-panel" role="search" aria-label="Filtros de busca de concursos">
        <div class="filters-head">
          <div class="filters-title-row">
            <h2>Filtros</h2>
            <button id="closeFiltersBtn" class="close-filters-btn" aria-label="Fechar Filtros">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Fechar"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <button class="clear-all" id="clearAllBtn" aria-label="Limpar todos os filtros">Limpar tudo</button>
        </div>

        <div class="applied-summary" id="appliedSummary"></div>

        <div class="filter-section" data-section="status">
          <button class="filter-section-header" data-toggle="status" aria-label="Filtrar por Andamento">
            <span class="left">Andamento <span class="count-badge" id="badge-status" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-status">
            <div class="chip-row" id="statusChips"></div>
          </div>
        </div>

        <div class="filter-section" data-section="estado">
          <button class="filter-section-header" data-toggle="estado" aria-label="Filtrar por Estado">
            <span class="left">Estado <span class="count-badge" id="badge-estado" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-estado">
            <div class="combo">
              <input type="text" id="estadoInput" name="estadoInput" placeholder="Digite um estado..." aria-label="Filtrar por estado">
              <div class="combo-suggestions" id="estadoSuggestions"></div>
            </div>
            <div class="combo-badges" id="estadoBadges"></div>
          </div>
        </div>

        <div class="filter-section" data-section="cidade">
          <button class="filter-section-header" data-toggle="cidade" aria-label="Filtrar por Cidade">
            <span class="left">Cidade <span class="count-badge" id="badge-cidade" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-cidade">
            <div class="combo">
              <input type="text" id="cidadeInput" name="cidadeInput" placeholder="Digite uma cidade..." aria-label="Filtrar por cidade">
              <div class="combo-suggestions" id="cidadeSuggestions"></div>
            </div>
            <div class="combo-badges" id="cidadeBadges"></div>
          </div>
        </div>

        <div class="filter-section" data-section="banca">
          <button class="filter-section-header" data-toggle="banca" aria-label="Filtrar por Banca Organizadora">
            <span class="left">Banca <span class="count-badge" id="badge-banca" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-banca">
            <div class="combo">
              <input type="text" id="bancaInput" name="bancaInput" placeholder="Digite uma banca..." aria-label="Filtrar por banca organizadora">
              <div class="combo-suggestions" id="bancaSuggestions"></div>
            </div>
            <div class="combo-badges" id="bancaBadges"></div>
          </div>
        </div>

        <div class="filter-section" data-section="carga">
          <button class="filter-section-header" data-toggle="carga" aria-label="Filtrar por Carga Horária">
            <span class="left">Carga Horária <span class="count-badge" id="badge-carga" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-carga"></div>
        </div>

        <div class="filter-section" data-section="especialidade">
          <button class="filter-section-header" data-toggle="especialidade" aria-label="Filtrar por Especialidade Médica">
            <span class="left">Especialidade <span class="count-badge" id="badge-especialidade" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-especialidade">
            <div class="combo">
              <input type="text" id="especialidadeInput" name="especialidadeInput" placeholder="Digite uma especialidade..." aria-label="Filtrar por especialidade médica">
              <div class="combo-suggestions" id="especialidadeSuggestions"></div>
            </div>
            <div class="combo-badges" id="especialidadeBadges"></div>
          </div>
        </div>

        <div class="filter-section" data-section="remuneracao">
          <button class="filter-section-header" data-toggle="remuneracao" aria-label="Filtrar por Remuneração">
            <span class="left">Remuneração <span class="count-badge" id="badge-remuneracao" hidden></span></span>
            <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" role="img" aria-label="Expandir"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="filter-section-body" id="body-remuneracao"></div>
        </div>
      </aside>

      <section class="content" aria-label="Resultados de Concursos">
        <h1 class="page-main-title" style="font-size: 26px; color: var(--teal-900); margin: 0 0 20px 0; font-weight: 700;">Concursos Médicos Abertos no Brasil</h1>
        <div class="content-toolbar">
          <div class="search-row">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone busca"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" id="mainSearch" name="mainSearch" placeholder="Busque por cidade, estado ou banca..." aria-label="Busque concursos por cidade, estado ou banca organizadora">
          </div>
          <div class="controls-row">
            <button id="mobileFiltersBtn" class="mobile-filters-btn" aria-label="Abrir menu de filtros">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone filtro"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filtros
            </button>
            <div class="sort-control">
              <label for="sortSelect">Ordenar por</label>
              <select id="sortSelect" name="sortSelect" aria-label="Ordenar lista de concursos">
                <option value="mais-novos">Mais novos</option>
                <option value="remuneracao-desc">Maior remuneração</option>
                <option value="remuneracao-asc">Menor remuneração</option>
                <option value="vagas-desc">Mais vagas</option>
                <option value="cidade-asc">Cidade (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="results-count" id="resultsCount" style="margin-bottom: 16px;"></div>
        <div class="active-pills" id="activePills"></div>
        <div class="grid" id="cards">
          <div class="card skeleton" style="min-height: 220px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: skeleton-shine 1.5s infinite; pointer-events: none;"></div>
          <div class="card skeleton" style="min-height: 220px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: skeleton-shine 1.5s infinite; pointer-events: none;"></div>
          <div class="card skeleton" style="min-height: 220px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: skeleton-shine 1.5s infinite; pointer-events: none;"></div>
        </div>
        <div class="empty-state" id="emptyState" style="display: none;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone busca vazia"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6"/></svg>
          <h3>Nenhuma vaga encontrada</h3>
          <p>Tente remover alguns filtros para ver mais resultados.</p>
          <button id="emptyClearBtn" aria-label="Limpar todos os filtros de busca">Limpar filtros</button>
        </div>
      </section>
    </div>
    `
  },

  mount(targetConcursoId) {
    carregarDados()
      .then(data => initConcursosPage(data, targetConcursoId))
      .catch(err => {
        console.error("[API] Falha ao carregar dados:", err)
        initConcursosPage(DATA_FALLBACK, targetConcursoId)
      })
  }
}
