export const ESTADOS = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
  CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás",
  MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
  MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
  PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
  SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
  NACIONAL: "Nacional"
}

export const STATUS_STYLE = {
  novos: { label: "Novos", bg: "var(--blue-100)", fg: "var(--blue-700)", dot: "var(--blue-500)" },
  abertas: { label: "Inscrições Abertas", bg: "var(--green-100)", fg: "var(--green-700)", dot: "var(--green-500)" },
  andamento: { label: "Em andamento", bg: "var(--amber-100)", fg: "var(--amber-700)", dot: "var(--amber-500)" },
  encerrados: { label: "Encerrados", bg: "var(--gray-100)", fg: "var(--gray-700)", dot: "var(--gray-500)" }
}

export const STATUS_ORDER = ["novos", "abertas", "andamento", "encerrados"]

export const REM_MIN_GLOBAL = 0
export const REM_MAX_GLOBAL = 35000

export const DATA_FALLBACK = [
  { id: 1, cidade: "Delfinópolis", uf: "MG", banca: "IBGP", carga: ["40h"], vagas: 1, remuneracao: 18831.45, extra: null, status: "novos", data: "2026-07-01", periodoInscricao: "01 de agosto a 05 de setembro de 2026", dataProva: "15 de outubro de 2026", especialidade: ["Médico ESF", "Médico Clínico Geral"], editais: [{ nome: "Edital de Abertura", link: "#" }] },
  { id: 2, cidade: "Ponto Chique", uf: "MG", banca: "Fadenor", carga: ["40h"], vagas: 2, remuneracao: 13000.00, extra: null, status: "novos", data: "2026-06-30", periodoInscricao: "15 de julho a 20 de agosto de 2026", dataProva: "05 de outubro de 2026", especialidade: ["Médico Plantonista"], editais: [{ nome: "Edital Fadenor", link: "#" }, { nome: "Retificação 01", link: "#" }] },
  { id: 3, cidade: "Dores do Indaiá", uf: "MG", banca: "Instituto Evo", carga: ["20h", "40h"], vagas: null, remuneracao: 18702.17, extra: null, status: "abertas", data: "2026-06-25", periodoInscricao: "22 de junho a 22 de julho de 2026", dataProva: "09 de agosto de 2026", especialidade: ["Médico Clínico Geral", "Médico Psiquiatra", "Médico Pediatra"], editais: [{ nome: "Edital Dores do Indaiá", link: "https://oconcursomedico.com/wp-content/uploads/2026/06/Edital-Dores-do-indaia-MG.pdf" }] },
  { id: 4, cidade: "Japurá", uf: "PR", banca: "Fundação FAFIPA", carga: ["10h", "40h"], vagas: 2, remuneracao: 26762.20, extra: null, status: "abertas", data: "2026-06-20", periodoInscricao: "10 de junho a 15 de julho de 2026", dataProva: "30 de agosto de 2026", especialidade: ["Médico da Família"], editais: [{ nome: "Edital Principal", link: "#" }] },
  { id: 5, cidade: "Tucunduva", uf: "RS", banca: "Instituto Legalle", carga: ["40h"], vagas: 1, remuneracao: 20058.20, extra: null, status: "abertas", data: "2026-06-18", periodoInscricao: "18 de junho a 20 de julho de 2026", dataProva: "10 de setembro de 2026", especialidade: ["Médico Clínico"], editais: [{ nome: "Edital Normativo", link: "#" }] },
  { id: 6, cidade: "Campestre da Serra", uf: "RS", banca: "Instituto Legalle", carga: ["12h", "16h", "40h"], vagas: 3, remuneracao: 13179.83, extra: null, status: "abertas", data: "2026-06-15", periodoInscricao: "15 de junho a 18 de julho de 2026", dataProva: "25 de agosto de 2026", especialidade: ["Médico Geral", "Ginecologista"], editais: [{ nome: "Edital Completo", link: "#" }] },
  { id: 7, cidade: "Candelária", uf: "RS", banca: "FUNDATEC", carga: ["20h", "40h"], vagas: null, remuneracao: 26295.00, extra: null, status: "abertas", data: "2026-06-10", periodoInscricao: "A definir", dataProva: "A definir", especialidade: ["Médico PSF"], editais: [] },
  { id: 8, cidade: "Cândido Godói", uf: "RS", banca: "Instituto Legalle", carga: ["40h"], vagas: 1, remuneracao: 14015.75, extra: null, status: "encerrados", data: "2026-05-20", periodoInscricao: "Encerrado", dataProva: "Já realizada", especialidade: ["Médico Clínico Geral"], editais: [{ nome: "Edital de Homologação", link: "#" }] },
  { id: 9, cidade: "Pinheiro Preto", uf: "SC", banca: "FUNDATEC", carga: ["20h"], vagas: 1, remuneracao: 13160.42, extra: null, status: "abertas", data: "2026-06-05", periodoInscricao: "05 de junho a 10 de julho de 2026", dataProva: "02 de setembro de 2026", especialidade: ["Médico do Trabalho"], editais: [{ nome: "Edital de Abertura", link: "#" }] },
  { id: 10, cidade: "Gaspar", uf: "SC", banca: "Instituto Fucap", carga: ["10h", "40h"], vagas: 7, remuneracao: 23198.34, extra: null, status: "abertas", data: "2026-06-27", periodoInscricao: "25 de junho a 30 de julho de 2026", dataProva: "20 de setembro de 2026", especialidade: ["Médico Especialista"], editais: [{ nome: "Edital", link: "#" }] },
  { id: 11, cidade: "Minaçu", uf: "GO", banca: "Instituto Verbena/UFG", carga: ["40h"], vagas: 7, remuneracao: 21783.92, extra: null, status: "novos", data: "2026-06-29", periodoInscricao: "Em breve", dataProva: "A definir", especialidade: ["Diversos especialidade médicos"], editais: [] },
  { id: 12, cidade: "São Félix de Minas", uf: "MG", banca: "Instituto IDEAP", carga: ["40h"], vagas: 3, remuneracao: 12003.20, extra: null, status: "novos", data: "2026-06-28", periodoInscricao: "Em breve", dataProva: "A definir", especialidade: ["Médico"], editais: [] },
  { id: 13, cidade: "Tombos", uf: "MG", banca: "IBGP", carga: ["20h", "40h"], vagas: 5, remuneracao: 10222.24, extra: null, status: "novos", data: "2026-06-22", periodoInscricao: "20 de agosto a 20 de setembro de 2026", dataProva: "Novembro 2026", especialidade: ["Vários"], editais: [{ nome: "Edital IBGP", link: "#" }] },
  { id: 14, cidade: "Rio Azul", uf: "PR", banca: "FAU", carga: ["40h"], vagas: 1, remuneracao: 22979.93, extra: null, status: "abertas", data: "2026-06-12", periodoInscricao: "12 de junho a 15 de julho de 2026", dataProva: "15 de agosto de 2026", especialidade: ["Médico ESF"], editais: [{ nome: "Edital de Abertura", link: "#" }] },
  { id: 15, cidade: "Goioerê", uf: "PR", banca: "Fundação FAFIPA", carga: ["20h", "40h"], vagas: 8, remuneracao: 19542.67, extra: null, status: "abertas", data: "2026-06-08", periodoInscricao: "08 de junho a 20 de julho de 2026", dataProva: "12 de setembro de 2026", especialidade: ["Médico Clínico Geral", "Ginecologista e Obstetra"], editais: [{ nome: "Edital FAFIPA", link: "#" }] },
  { id: 16, cidade: "Bragança Paulista", uf: "SP", banca: "IBAM", carga: ["10h"], vagas: 4, remuneracao: 5152.93, extra: "+ R$ 882,23 de vale-alimentação", status: "abertas", data: "2026-06-02", periodoInscricao: "01 de junho a 05 de julho de 2026", dataProva: "Agosto de 2026", especialidade: ["Médico Pediatra"], editais: [{ nome: "Edital de Abertura", link: "#" }] },
  { id: 17, cidade: "Ipatinga", uf: "MG", banca: "IMAM", carga: ["20h", "40h"], vagas: 330, remuneracao: 13980.00, extra: null, status: "encerrados", data: "2026-04-10", periodoInscricao: "Encerrado", dataProva: "02 de junho de 2026", especialidade: ["Vários Especialistas"], editais: [{ nome: "Resultado Final", link: "#" }] },
  { id: 18, cidade: "Congonhal", uf: "MG", banca: "IMAM", carga: ["40h"], vagas: 4, remuneracao: 13611.14, extra: null, status: "abertas", data: "2026-05-30", periodoInscricao: "30 de maio a 30 de junho de 2026", dataProva: "30 de julho de 2026", especialidade: ["Médico de Família"], editais: [{ nome: "Edital IMAM", link: "#" }] },
  { id: 19, cidade: "Camboriú", uf: "SC", banca: "IDECAN", carga: ["40h"], vagas: 15, remuneracao: 15955.99, extra: null, status: "encerrados", data: "2026-04-22", periodoInscricao: "Encerrado", dataProva: "Maio de 2026", especialidade: ["Vários"], editais: [{ nome: "Homologação", link: "#" }] },
  { id: 20, cidade: "Salvador", uf: "BA", banca: "Vunesp", carga: ["Regime Militar"], vagas: 107, remuneracao: null, extra: "Dedicação exclusiva (Regime Militar)", status: "encerrados", data: "2026-03-15", periodoInscricao: "Encerrado", dataProva: "Abril de 2026", especialidade: ["Oficial Médico"], editais: [{ nome: "Edital VUNESP", link: "#" }] }
]


export function renderCardHTML(o, idx = 0) {
  const st = STATUS_STYLE[o.status] || STATUS_STYLE.novos
  const salaryValue = o.remuneracao != null ? currency(o.remuneracao) : "Não informado"
  const delay = Math.min(idx * 0.05, 0.5)
  return `
  <div class="card" style="animation-delay: ${delay}s">
    <div class="card-top">
      <span class="status-pill" style="background:${st.bg};color:${st.fg}"><span class="dot" style="background:${st.dot}"></span>${st.label}</span>
      <span class="banca-chip">${o.banca}</span>
    </div>
    <h3 class="card-title">${o.cidade} – ${o.uf}</h3>
    <div class="card-stats">
      <div class="stat"><span class="label">Vagas</span><span class="value">${o.vagas ?? "-"}</span></div>
      <div class="stat"><span class="label">Carga horária</span><span class="value">${o.carga && o.carga.length ? o.carga.join(" / ") : "-"}</span></div>
      <div class="stat"><span class="label">Inscrições</span><span class="value">${o.data ? "Até " + o.data.split("-").reverse().join("/") : "Em breve"}</span></div>
    </div>
    <div class="card-footer">
      <div class="card-salary">
        <div class="label">Remuneração</div>
        <div class="value">${salaryValue}</div>
      </div>
      <button class="card-cta open-modal-btn" data-id="${o.id}" type="button">Ver Detalhes</button>
    </div>
  </div>`
}

export function currency(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const SKELETON_CARDS_HTML = `
  <div class="card skeleton" style="min-height: 220px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: skeleton-shine 1.5s infinite; pointer-events: none;"></div>
  <div class="card skeleton" style="min-height: 220px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: skeleton-shine 1.5s infinite; pointer-events: none;"></div>
  <div class="card skeleton" style="min-height: 220px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: skeleton-shine 1.5s infinite; pointer-events: none;"></div>
`

