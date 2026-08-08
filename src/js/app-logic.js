
import { ESTADOS, STATUS_STYLE, STATUS_ORDER, REM_MIN_GLOBAL, REM_MAX_GLOBAL, renderCardHTML } from './data.js'
import { abrirModalConcurso } from './modal.js'

export function initConcursosPage(DATA, targetConcursoId, noticias) {
  $(document).off('.concursos')

  const filters = { query: "", status: new Set(), estado: new Set(), cidade: new Set(), banca: new Set(), carga: new Set(), especialidade: new Set(), remMin: REM_MIN_GLOBAL, remMax: REM_MAX_GLOBAL }

  function remRangeActive() { return filters.remMin > REM_MIN_GLOBAL || filters.remMax < REM_MAX_GLOBAL }

  function matches(item, exclude) {
    if (exclude !== "query" && filters.query) {
      const q = filters.query.toLowerCase()
      const text = [item.cidade, item.uf, item.banca].join(" ").toLowerCase()
      if (!text.includes(q)) return false
    }
    if (exclude !== "status" && filters.status.size && !filters.status.has(item.status)) return false
    if (exclude !== "estado" && filters.estado.size && !filters.estado.has(item.uf)) return false
    if (exclude !== "cidade" && filters.cidade.size && !filters.cidade.has(item.cidade)) return false
    if (exclude !== "banca" && filters.banca.size && !filters.banca.has(item.banca)) return false
    if (exclude !== "carga" && filters.carga.size && !item.carga.some(c => filters.carga.has(c))) return false
    if (exclude !== "especialidade" && filters.especialidade.size && !(item.especialidade || []).some(c => filters.especialidade.has(c))) return false
    if (exclude !== "remuneracao" && remRangeActive()) {
      if (item.remuneracao == null || item.remuneracao < filters.remMin || item.remuneracao > filters.remMax) return false
    }
    return true
  }

  function getFiltered() { return DATA.filter(i => matches(i, null)) }

  function countFor(dim, value) {
    return DATA.filter(i => {
      if (dim === "estado") return i.uf === value && matches(i, "estado")
      if (dim === "cidade") return i.cidade === value && matches(i, "cidade")
      if (dim === "banca") return i.banca === value && matches(i, "banca")
      if (dim === "carga") return i.carga.includes(value) && matches(i, "carga")
      if (dim === "especialidade") return (i.especialidade || []).includes(value) && matches(i, "especialidade")
      if (dim === "status") return i.status === value && matches(i, "status")
    }).length
  }

  function setupCombobox({ dim, inputId, suggestionsId, badgesId, labelOf, getOptions }) {
    const $input = $('#' + inputId)
    const $suggestions = $('#' + suggestionsId)
    const $badges = $('#' + badgesId)

    function renderBadges() {
      $badges.empty()
      filters[dim].forEach(v => {
        const $pill = $('<span class="pill"></span>').html(`${labelOf(v)} <button aria-label="Remover">\u00d7</button>`)
        $pill.find("button").on("click", () => { filters[dim].delete(v); renderAll() })
        $badges.append($pill)
      })
    }

    function renderSuggestions() {
      const q = $input.val().trim().toLowerCase()
      let opts = getOptions().filter(v => !filters[dim].has(v))
      if (q) opts = opts.filter(v => labelOf(v).toLowerCase().includes(q))
      opts = opts.slice(0, 8)

      $suggestions.empty()
      if (opts.length === 0) {
        $suggestions.html(`<div class="combo-suggestion empty">Nenhum resultado</div>`)
      } else {
        opts.forEach(v => {
          const $row = $('<div class="combo-suggestion"></div>').html(`<span>${labelOf(v)}</span><span class="cnt">${countFor(dim, v)}</span>`)
          $row.on("click", () => {
            filters[dim].add(v)
            $input.val("")
            $suggestions.removeClass("open")
            renderAll()
          })
          $suggestions.append($row)
        })
      }
      $suggestions.addClass("open")
    }

    $input.on("focus input", renderSuggestions)
    $input.on("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        $suggestions.find(".combo-suggestion:not(.empty)").first().trigger("click")
      } else if (e.key === "Escape") {
        $suggestions.removeClass("open")
        $input.trigger("blur")
      }
    })

    $(document).on("click.concursos", (e) => {
      if (!$(e.target).closest($input).length && !$(e.target).closest($suggestions).length) {
        $suggestions.removeClass("open")
      }
    })

    return { renderBadges, refreshSuggestions: () => { if ($suggestions.hasClass("open")) renderSuggestions() } }
  }

  const estadoCombo = setupCombobox({
    dim: "estado", inputId: "estadoInput", suggestionsId: "estadoSuggestions", badgesId: "estadoBadges",
    labelOf: (v) => ESTADOS[v],
    getOptions: () => Object.keys(ESTADOS).filter(uf => DATA.some(i => i.uf === uf)).sort((a, b) => ESTADOS[a].localeCompare(ESTADOS[b]))
  })

  const cidadeCombo = setupCombobox({
    dim: "cidade", inputId: "cidadeInput", suggestionsId: "cidadeSuggestions", badgesId: "cidadeBadges",
    labelOf: (v) => v,
    getOptions: () => {
      const scope = filters.estado.size ? DATA.filter(i => filters.estado.has(i.uf)) : DATA
      return [...new Set(scope.map(i => i.cidade))].sort((a, b) => a.localeCompare(b))
    }
  })

  const bancaCombo = setupCombobox({
    dim: "banca", inputId: "bancaInput", suggestionsId: "bancaSuggestions", badgesId: "bancaBadges",
    labelOf: (v) => v,
    getOptions: () => [...new Set(DATA.map(i => i.banca))].sort((a, b) => a.localeCompare(b))
  })

  const especialidadeCombo = setupCombobox({
    dim: "especialidade", inputId: "especialidadeInput", suggestionsId: "especialidadeSuggestions", badgesId: "especialidadeBadges",
    labelOf: (v) => v,
    getOptions: () => [...new Set(DATA.flatMap(i => i.especialidade || []))].sort((a, b) => a.localeCompare(b))
  })

  const $statusChips = $('#statusChips')
  STATUS_ORDER.filter(s => DATA.some(i => i.status === s)).forEach(s => {
    const $btn = $('<button type="button" class="chip-btn"></button>').text(STATUS_STYLE[s].label).data("value", s)
    $btn.on("click", () => {
      filters.status.has(s) ? filters.status.delete(s) : filters.status.add(s)
      renderAll()
    })
    $statusChips.append($btn)
  })

  const cargaAll = [...new Set(DATA.flatMap(i => i.carga))]
  const cargaValues = cargaAll.sort((a, b) => {
    const na = parseInt(a), nb = parseInt(b)
    const aNum = !isNaN(na), bNum = !isNaN(nb)
    if (aNum && bNum) return na - nb
    if (aNum) return -1
    if (bNum) return 1
    return a.localeCompare(b)
  })

  $('#body-carga').html('<div class="chip-row" id="cargaChips"></div>')
  const $cargaChips = $('#cargaChips')
  cargaValues.forEach(v => {
    const $btn = $('<button type="button" class="chip-btn"></button>').text(v).data("value", v)
    $btn.on("click", () => {
      filters.carga.has(v) ? filters.carga.delete(v) : filters.carga.add(v)
      renderAll()
    })
    $cargaChips.append($btn)
  })

  $('#body-remuneracao').html(`
    <div class="range-wrap">
      <div class="range-labels">
        <span id="remLabelMin">R$ 0</span>
        <span id="remLabelMax">R$ 35.000</span>
      </div>
      <div class="range-track-wrap" id="remTrackWrap">
        <div class="range-track-bg"></div>
        <div class="range-track-fill" id="remFill"></div>
        <input type="range" id="remRangeMin" min="${REM_MIN_GLOBAL}" max="${REM_MAX_GLOBAL}" step="500" value="${REM_MIN_GLOBAL}" aria-label="Valor mínimo da remuneração">
        <input type="range" id="remRangeMax" min="${REM_MIN_GLOBAL}" max="${REM_MAX_GLOBAL}" step="500" value="${REM_MAX_GLOBAL}" aria-label="Valor máximo da remuneração">
        <div class="range-thumb" id="remThumbMin"></div>
        <div class="range-thumb" id="remThumbMax"></div>
      </div>
      <div class="range-hint">Arraste para definir o intervalo</div>
    </div>`)

  const $remRangeMin = $('#remRangeMin'), $remRangeMax = $('#remRangeMax')
  const $remFill = $('#remFill'), $remThumbMin = $('#remThumbMin'), $remThumbMax = $('#remThumbMax')
  const $remLabelMin = $('#remLabelMin'), $remLabelMax = $('#remLabelMax')

  function currencyShort(v) {
    if (v >= 1000) return "R$ " + (v / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + "k"
    return "R$ " + v.toLocaleString("pt-BR")
  }

  function updateRangeUI() {
    const span = REM_MAX_GLOBAL - REM_MIN_GLOBAL
    const pMin = (filters.remMin - REM_MIN_GLOBAL) / span * 100
    const pMax = (filters.remMax - REM_MIN_GLOBAL) / span * 100

    $remFill.css({ left: pMin + "%", right: (100 - pMax) + "%" })
    $remThumbMin.css("left", pMin + "%")
    $remThumbMax.css("left", pMax + "%")

    $remLabelMin.text(currencyShort(filters.remMin))
    $remLabelMax.text(filters.remMax >= REM_MAX_GLOBAL ? "R$ 35k+" : currencyShort(filters.remMax))

    const zBoost = filters.remMin >= REM_MAX_GLOBAL - 500
    $remRangeMin.css("z-index", zBoost ? 2 : 1)
    $remRangeMax.css("z-index", zBoost ? 1 : 2)
  }

  $remRangeMin.on("input", () => {
    filters.remMin = Math.min(Number($remRangeMin.val()), filters.remMax - 500)
    $remRangeMin.val(filters.remMin)
    updateRangeUI(); renderAll()
  })

  $remRangeMax.on("input", () => {
    filters.remMax = Math.max(Number($remRangeMax.val()), filters.remMin + 500)
    $remRangeMax.val(filters.remMax)
    updateRangeUI(); renderAll()
  })

  updateRangeUI()

  $(".filter-section-header").on("click", function () {
    $(this).closest(".filter-section").toggleClass("collapsed")
  })

  function clearAll() {
    filters.query = ""; $("#mainSearch").val("")
    filters.status.clear(); filters.estado.clear(); filters.cidade.clear(); filters.banca.clear(); filters.carga.clear(); filters.especialidade.clear()
    filters.remMin = REM_MIN_GLOBAL; filters.remMax = REM_MAX_GLOBAL
    $remRangeMin.val(REM_MIN_GLOBAL); $remRangeMax.val(REM_MAX_GLOBAL)
    updateRangeUI(); renderAll()
  }

  $("#clearAllBtn, #emptyClearBtn").on("click", clearAll)

  function hasActiveFilters() {
    return !!(filters.query || filters.status.size || filters.estado.size || filters.cidade.size || filters.banca.size || filters.carga.size || filters.especialidade.size || remRangeActive())
  }

  const dimTitle = { status: "Status", estado: "Estado", cidade: "Cidade", banca: "Banca", carga: "Carga", especialidade: "Especialidade" }

  function labelFor(dim, value) {
    if (dim === "status") return STATUS_STYLE[value].label
    if (dim === "estado") return ESTADOS[value]
    return value
  }

  function buildPills($container) {
    const desired = []

    if (filters.query) {
      desired.push({ id: "q", label: `Busca: ${filters.query}`, action: () => { filters.query = ""; $("#mainSearch").val(""); renderAll() } })
    }

    ["status", "estado", "cidade", "banca", "carga", "especialidade"].forEach(dim => {
      filters[dim].forEach(v => {
        desired.push({ id: `${dim}-${v}`, label: `${dimTitle[dim]}: ${labelFor(dim, v)}`, action: () => { filters[dim].delete(v); renderAll() } })
      })
    })

    if (remRangeActive()) {
      const maxLbl = filters.remMax >= REM_MAX_GLOBAL ? "R$ 35k+" : currencyShort(filters.remMax)
      desired.push({
        id: "rem", label: `Remuneração: ${currencyShort(filters.remMin)} – ${maxLbl}`, action: () => {
          filters.remMin = REM_MIN_GLOBAL; filters.remMax = REM_MAX_GLOBAL
          $remRangeMin.val(REM_MIN_GLOBAL); $remRangeMax.val(REM_MAX_GLOBAL)
          updateRangeUI(); renderAll()
        }
      })
    }

    const nextIds = new Set(desired.map(d => d.id))

    $container.find(".pill").each(function () {
      if (!nextIds.has($(this).data("id"))) {
        $(this).remove()
      }
    })

    desired.forEach(d => {
      let $pill = $container.find(`.pill[data-id="${d.id}"]`)
      if ($pill.length === 0) {
        $pill = $(`<span class="pill" data-id="${d.id}"></span>`)
        $container.append($pill)
      }
      $pill.html(`${d.label} <button aria-label="Remover">\u00d7</button>`)
      $pill.find("button").on("click", d.action)
    })
  }

  function renderCounts() {
    $statusChips.find(".chip-btn").each(function () {
      const v = $(this).data("value")
      const n = countFor("status", v)
      $(this).toggleClass("active", filters.status.has(v))
      $(this).toggleClass("zero", n === 0 && !filters.status.has(v))
    })

    $cargaChips.find(".chip-btn").each(function () {
      const v = $(this).data("value")
      const n = countFor("carga", v)
      $(this).toggleClass("active", filters.carga.has(v))
      $(this).toggleClass("zero", n === 0 && !filters.carga.has(v))
    })

    const setBadge = (id, size) => {
      const $el = $('#' + id)
      size ? $el.text(size).removeAttr('hidden') : $el.text('').attr('hidden', true)
    }

    setBadge("badge-status", filters.status.size)
    setBadge("badge-estado", filters.estado.size)
    setBadge("badge-cidade", filters.cidade.size)
    setBadge("badge-banca", filters.banca.size)
    setBadge("badge-carga", filters.carga.size)
    setBadge("badge-especialidade", filters.especialidade.size)

    const $remBadge = $("#badge-remuneracao")
    remRangeActive() ? $remBadge.text("1").removeAttr('hidden') : $remBadge.text("").attr('hidden', true)
  }

  function sortItems(list) {
    const mode = $("#sortSelect").val()
    const arr = [...list]
    if (mode === "remuneracao-desc") arr.sort((a, b) => (b.remuneracao ?? -1) - (a.remuneracao ?? -1))
    else if (mode === "remuneracao-asc") arr.sort((a, b) => (a.remuneracao ?? Infinity) - (b.remuneracao ?? Infinity))
    else if (mode === "vagas-desc") arr.sort((a, b) => (b.vagas ?? 0) - (a.vagas ?? 0))
    else if (mode === "cidade-asc") arr.sort((a, b) => a.cidade.localeCompare(b.cidade))
    else arr.sort((a, b) => {
      const toDate = s => {
        if (!s) return new Date(0)
        if (s.includes("/")) { const [d, m, y] = s.split("/"); return new Date(`${y}-${m}-${d}`) }
        return new Date(s)
      }
      return toDate(b.data) - toDate(a.data)
    })
    return arr
  }

  function renderCards() {
    const filtered = sortItems(getFiltered())
    const $grid = $("#cards")
    const $empty = $("#emptyState")

    $("#resultsCount").html(`<strong>${filtered.length}</strong> ${filtered.length === 1 ? "oportunidade encontrada" : "oportunidades encontradas"}`)

    if (filtered.length === 0) {
      $grid.css("display", "none")
      $empty.css("display", "flex")
      return
    }

    $grid.css("display", "grid")
    $empty.css("display", "none")

    const cardsHtml = filtered.map((o, idx) => renderCardHTML(o, idx)).join("")
    $grid.html(cardsHtml)
  }

  function renderAll() {
    estadoCombo.renderBadges()
    cidadeCombo.renderBadges()
    bancaCombo.renderBadges()
    especialidadeCombo.renderBadges()
    estadoCombo.refreshSuggestions()
    cidadeCombo.refreshSuggestions()
    bancaCombo.refreshSuggestions()
    especialidadeCombo.refreshSuggestions()

    buildPills($("#appliedSummary"))
    buildPills($("#activePills"))
    if (hasActiveFilters()) {
      $("#clearAllBtn").show()
    } else {
      $("#clearAllBtn").hide()
    }

    renderCounts()
    renderCards()
  }

  $("#sortSelect").on("change", renderCards)

  $("#mainSearch").on("input", function () {
    filters.query = $(this).val().trim()
    renderAll()
  })

  $("#mobileFiltersBtn").on("click", function () {
    $(".filters-panel").addClass("open")
    $("#filtersOverlay").addClass("open")
    $("body").css("overflow", "hidden")
  })

  $("#closeFiltersBtn, #filtersOverlay").on("click", function () {
    $(".filters-panel").removeClass("open")
    $("#filtersOverlay").removeClass("open")
    $("body").css("overflow", "")
  })

  $("#cards").on("click", ".open-modal-btn", function () {
    const id = $(this).data("id")
    const concurso = DATA.find(c => String(c.id) === String(id))
    if (concurso) abrirModalConcurso(concurso, noticias)
  })

  renderAll()

  if (targetConcursoId) {
    const target = DATA.find(c => String(c.id) === String(targetConcursoId))
    if (target) {
      abrirModalConcurso(target, noticias)
    }
  }
}
