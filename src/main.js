import './style.css'
import { homePage } from './pages/home.js'
import { registerRoute, initRouter } from './router.js'
import { initModalClose } from './js/modal.js'

registerRoute('home', homePage)
registerRoute('concursos', () => import('./pages/concursos.js').then(m => m.concursosPage))
registerRoute('contato', () => import('./pages/contato.js').then(m => m.contatoPage))
registerRoute('noticia', () => import('./pages/noticia.js').then(m => m.noticiaPage))

document.addEventListener('DOMContentLoaded', () => {
  initModalClose()
  initRouter()
})