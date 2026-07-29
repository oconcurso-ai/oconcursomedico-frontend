export const API_URL = "https://script.google.com/macros/s/AKfycbyogqd9TVeQc1bG4aO1hnOCFh2TCAavRkIJAcWtQEATXfj_iGpjclGrS8MrGvrMZ7as/exec"

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

let cachePromise = null

export function carregarDados() {
  if (cachePromise) return cachePromise
  cachePromise = fetch(API_URL)
    .then(r => {
      if (!r.ok) throw new Error("HTTP " + r.status)
      return r.json()
    })
    .then(data => {
      const lista = Array.isArray(data.concursos) ? data.concursos : []
      return lista.map(item => transformConcurso(item))
    })
    .catch(err => {
      cachePromise = null
      throw err
    })
  return cachePromise
}
