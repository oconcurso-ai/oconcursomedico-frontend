# O Concurso Médico - Frontend

Interface estática (SPA) da plataforma O Concurso Médico, desenvolvida com Vanilla JavaScript (ES Modules), Vite e LightningCSS.

## Requisitos

- Node.js 20+
- npm 10+

## Instalação e Execução Local

Instalar dependências:
```bash
npm install
```

Iniciar servidor local de desenvolvimento:
```bash
npm run dev
```

Compilar para produção (gera os arquivos em `dist/`):
```bash
npm run build
```

Visualizar localmente o build de produção:
```bash
npm run preview
```

## Arquitetura e Decisões Técnicas

- **Roteamento**: Hash router (`#/home`, `#/concursos`, `#/noticia/:id`, `#/contato`) definido em `src/router.js`. O roteamento por hash garante suporte imediato em hospedagens estáticas (como GitHub Pages) sem depender de reescritas de URL no servidor (regra de fallback 404).
- **Camada de Dados**: Comunicação com a API do Google Apps Script em `src/js/api.js`. Inclui normalização de campos, ordenação de notícias e cache de requisições em memória para evitar chamadas duplicadas.
- **Estilização e Build**: CSS modular otimizado via LightningCSS com rollupOptions em `vite.config.js`, gerando bundles estáticos leves e versionados por hash.

## Estrutura de Diretórios

```text
├── .github/
│   └── workflows/
│       └── deploy.yml    # Pipeline de CI/CD para GitHub Pages
├── public/               # Assets estáticos copiados na raiz do build (imagens, robots, sitemap)
├── src/
│   ├── js/
│   │   ├── api.js        # Endpoints, parse e normalização de dados
│   │   ├── app-logic.js  # Renderização de listagens e filtros
│   │   ├── modal.js      # Controle de modais de concurso
│   │   └── search.js     # Lógica de busca e filtros de concursos
│   ├── pages/            # Módulos de página (home, concursos, noticia, contato)
│   ├── main.js           # Ponto de entrada da aplicação
│   ├── router.js         # Roteador client-side baseado em hash
│   └── style.css         # Folhas de estilo da aplicação
├── index.html            # Template HTML principal
├── package.json          # Dependências e scripts
└── vite.config.js        # Configuração do Vite e LightningCSS
```

## Deploy no GitHub Pages

O deploy de produção é automatizado via GitHub Actions a cada push na branch `main`.

### Configuração no Repositório

1. No repositório do GitHub, acesse **Settings** > **Pages**.
2. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
3. O workflow `.github/workflows/deploy.yml` executará a instalação, build e publicação do diretório `dist/`.

### Configuração de Domínio Personalizado (DNS)

Para vincular um domínio próprio:

1. No painel do GitHub (**Settings** > **Pages** > **Custom domain**), insira o domínio.
2. Na zona de DNS do provedor de domínio (Hostinger), configure os seguintes registros:

**Domínio raiz (@):**
- 4 registros do tipo `A` apontando para os IPs do GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

**Subdomínio www:**
- 1 registro do tipo `CNAME`:
  - Host: `www`
  - Valor: `GabrielUzeda.github.io`

3. Após a propagação do DNS, marque a opção **Enforce HTTPS** na seção de Pages do GitHub.
