const routes = {}

export function registerRoute(name, pageOrLoader) {
  routes[name] = pageOrLoader
}

async function resolvePage(route) {
  // Check for parameterized route (e.g., noticia/delfin-mg-2026)
  const parts = route.split('/')
  const baseRoute = parts[0]
  const id = parts[1]

  const entry = routes[baseRoute] || routes[route]
  if (!entry) return null
  
  const page = typeof entry === 'function' ? await entry() : entry
  
  if (id) {
    // If an ID is present, we wrap the page to pass the ID to render and mount
    return {
      ...page,
      render: () => page.render(id),
      mount: () => page.mount && page.mount(id)
    }
  }
  
  return page
}

function updateActiveNav(route) {
  document.querySelectorAll('nav.main a').forEach(a => {
    const r = a.dataset.route
    a.classList.toggle('active', r === route || (!route && r === 'home'))
  })
}

export async function navigate(route) {
  route = route || 'home'
  const page = await resolvePage(route)
  if (!page) {
    window.location.hash = '#/home'
    return
  }

  const app = document.getElementById('app')
  app.innerHTML = page.render()

  updateActiveNav(route)
  if (page.mount) page.mount()
}

export function initRouter() {
  function handleHash() {
    const hash = window.location.hash.replace(/^#\//, '')
    navigate(hash || 'home')
  }

  window.addEventListener('hashchange', handleHash)
  handleHash()
}