import { STATUS_STYLE, currency } from './data.js'

let closeBound = false

export function initModalClose() {
  if (closeBound) return
  closeBound = true
  $("#closeModalBtn").on("click", fecharModal)
  $("#concursoModal").on("click", function (e) {
    if (e.target === this) fecharModal()
  })
}

function fecharModal() {
  $("#concursoModal").attr("hidden", true)
  $("body").css("overflow", "")
}

function abrirModalConcurso(concurso, noticias) {
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
  let cursosHtml = (concurso.cursosRecomendados || []).filter(c => c && c.link).map(c => `
    <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="edital-item">
      <div class="edital-item-left">
        <div class="edital-item-icon" style="background: rgba(15, 118, 110, 0.1); color: var(--teal-700);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>
        </div>
        ${c.nome}
      </div>
      <div class="edital-item-right">
        Acessar
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </a>
  `).join("")

  if (!cursosHtml) cursosHtml = ""


  const noticiasRelacionadas = (noticias || [])
    .filter(n => n.publicada && String(n.concursoId) === String(concurso.id))
  let noticiasHtml = ""
  if (noticiasRelacionadas.length) {
    noticiasHtml = `
    <div class="modal-section">
      <h3>Notícias Relacionadas</h3>
      <div class="modal-editais-list">
        ${noticiasRelacionadas.map(n => `
        <a href="#/noticia/${n.id}" class="edital-item">
          <div class="edital-item-left">
            <div class="edital-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            ${n.title}
          </div>
          <div class="edital-item-right">
            Ler
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </a>
        `).join("")}
      </div>
    </div>`
  }

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

    ${cursosHtml ? `
    <div class="modal-section">
      <h3>Cursos Recomendados</h3>
      <div class="modal-editais-list">
        ${cursosHtml}
      </div>
    </div>` : ''}
    ${noticiasHtml}
  `

  $("#modalContent").html(html)
  $("#concursoModal").removeAttr("hidden")
  $("body").css("overflow", "hidden")
}

export { abrirModalConcurso, fecharModal }
