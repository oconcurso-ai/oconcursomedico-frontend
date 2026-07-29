

export const contatoPage = {
  render() {
    return `
    <div class="page-enter">
      <div style="max-width: 1200px; margin: 64px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">

        <div class="contact-visuals" style="border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); position: relative;">
          <img src="/assets/contact.webp" alt="Atendimento ao cliente O Concurso Médico" width="480" height="600" loading="lazy" style="width: 100%; height: auto; display: block; aspect-ratio: 4/5; object-fit: cover;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(15,79,73,0.95), transparent); padding: 40px; color: #fff;">
            <h2 style="margin: 0 0 8px 0; font-size: 28px;">Como podemos ajudar?</h2>
            <p style="margin: 0 0 24px 0; opacity: 0.9; font-size: 15px;">Nossa equipe está pronta para te atender. Mande uma mensagem e responderemos o mais rápido possível.</p>

            <div style="display: flex; gap: 24px;">
              <a href="https://api.whatsapp.com/send?phone=5521967137756" target="_blank" rel="noopener noreferrer" aria-label="Falar via WhatsApp" style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #fff;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Ícone WhatsApp"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.1-.2.2-.4a.4.4 0 0 0 0-.4c-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.8 2.7 4.3 3.8a5.6 5.6 0 0 0 3.5.7 3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4c-.1-.1-.3-.2-.5-.3z"/></svg>
                WhatsApp
              </a>
              <a href="mailto:contato@oconcursomedico.com" aria-label="Enviar e-mail de contato" style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #fff;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone E-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                E-mail
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h1 style="color: var(--teal-900); margin-top: 0; margin-bottom: 32px;">Contato - O Concurso Médico</h1>
          <form id="contactForm" aria-label="Formulário de contato">
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="nome" style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--ink);">Nome Completo</label>
              <input type="text" id="nome" name="nome" autocomplete="name" placeholder="Seu nome" required style="width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 15px; outline: none;">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="email" style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--ink);">E-mail</label>
              <input type="email" id="email" name="email" autocomplete="email" placeholder="seu@email.com" required style="width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 15px; outline: none;">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="assunto" style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--ink);">Assunto</label>
              <input type="text" id="assunto" name="assunto" autocomplete="on" placeholder="Dúvida, sugestão, parceria..." required style="width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 15px; outline: none;">
            </div>
            <div class="form-group" style="margin-bottom: 32px;">
              <label for="mensagem" style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--ink);">Mensagem</label>
              <textarea id="mensagem" name="mensagem" placeholder="Escreva sua mensagem aqui..." required style="width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 15px; outline: none; min-height: 120px; font-family: inherit;"></textarea>
            </div>
            <button type="submit" class="submit-btn" aria-label="Enviar mensagem de contato" style="width: 100%; padding: 16px; border: none; border-radius: var(--radius-sm); background: var(--teal-700); color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; transition: background .15s;">Enviar</button>
          </form>
        </div>
      </div>
    </div>
    `
  },

  mount() {
    $('#contactForm').on('submit', function (e) {
      e.preventDefault()
      const nome = document.getElementById('nome').value
      const email = document.getElementById('email').value
      const assunto = document.getElementById('assunto').value
      const mensagem = document.getElementById('mensagem').value
      const body = `Nome: ${nome}%0D%0AEmail: ${email}%0D%0A%0D%0A${mensagem.replace(/\n/g, '%0D%0A')}`
      window.location.href = `mailto:contato@oconcursomedico.com?subject=${encodeURIComponent(assunto)}&body=${body}`
    })
  }
}
