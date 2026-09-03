# O Concurso Médico - Frontend

Repositório dedicado ao frontend da plataforma **O Concurso Médico** (extraído com histórico via `git subtree`).

## 🚀 Como Publicar no GitHub Pages com Domínio Próprio

### 1. Criar e Enviar para o GitHub:
```bash
git remote add origin https://github.com/<SEU_USUARIO>/<SEU_REPOSITORIO>.git
git push -u origin main
```

### 2. Ativar GitHub Actions para o Pages:
1. No repositório no GitHub, acesse **Settings** > **Pages**.
2. Em **Build and deployment** > **Source**, selecione **`GitHub Actions`**.
3. O build e deploy serão feitos automaticamente a cada `git push`.

### 3. Configurar Domínio Próprio (Hostinger):
* No painel do GitHub (**Settings** > **Pages** > **Custom domain**), digite o seu domínio (ex: `oconcursomedico.com.br` ou `www.oconcursomedico.com.br`).
* Na Hostinger, aponte os registros de DNS para os servidores do GitHub Pages.
* Marque a opção **Enforce HTTPS** no GitHub Pages assim que o certificado SSL for gerado.

---

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Preview do build local
npm run preview
```
