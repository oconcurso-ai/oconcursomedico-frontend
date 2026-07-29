/**
 * Dados das notícias. Cada item representa um artigo completo.
 * Campos de busca: title, cidade, uf, tags, summary, content
 */
export const NEWS_DATA = [
  {
    id: 'delfin-mg-2026',
    title: 'Concurso Médico em Delfinópolis (MG): salário de R$ 18.831,45',
    cidade: 'Delfinópolis',
    uf: 'MG',
    banca: 'IBGP',
    tags: ['concurso médico', 'Minas Gerais', 'ESF', 'clínico geral', 'PSF', 'médico família'],
    date: '2026-07-01',
    dateLabel: '01 julho 2026',
    image: '/assets/news_big_card.webp',
    imageAlt: 'Concurso Médico em Delfinópolis MG com salário de R$ 18.831,45',
    summary: 'O município de Delfinópolis, em Minas Gerais, abre concurso público para médico com salário de R$ 18.831,45. Inscrições abertas até setembro de 2026.',
    content: `
      <p>A Prefeitura Municipal de <strong>Delfinópolis (MG)</strong>, por meio da banca organizadora <strong>IBGP</strong>, abre concurso público para o cargo de <strong>Médico ESF / Clínico Geral</strong>.</p>

      <h2>Remuneração</h2>
      <p>O salário base é de <strong>R$ 18.831,45</strong> para regime de 40 horas semanais, com possibilidade de vantagens adicionais.</p>

      <h2>Vagas e Cargos</h2>
      <ul>
        <li>Médico ESF (Estratégia Saúde da Família) — 1 vaga</li>
        <li>Médico Clínico Geral — vagas de cadastro reserva</li>
      </ul>

      <h2>Período de Inscrição</h2>
      <p>As inscrições acontecem de <strong>01 de agosto a 05 de setembro de 2026</strong>, exclusivamente pelo site do IBGP.</p>

      <h2>Prova</h2>
      <p>Data prevista: <strong>15 de outubro de 2026</strong>. A prova será objetiva, com questões de conhecimentos específicos da área médica e legislação do SUS.</p>

      <h2>Requisitos</h2>
      <ul>
        <li>Diploma de graduação em Medicina</li>
        <li>Registro ativo no CRM</li>
        <li>Residência ou especialização na área (desejável)</li>
      </ul>

      <h2>Como se inscrever</h2>
      <p>Acesse o site oficial do IBGP, localize o edital de Delfinópolis e preencha o formulário de inscrição online. Taxa de inscrição a confirmar no edital.</p>
    `,
    concursoId: 1,
    featured: true,
  },
  {
    id: 'ponto-chique-mg-2026',
    title: 'Concurso Médico em Ponto Chique (MG): Salário de R$ 13.000,00',
    cidade: 'Ponto Chique',
    uf: 'MG',
    banca: 'Fadenor',
    tags: ['concurso médico', 'Minas Gerais', 'plantonista', 'médico plantonista'],
    date: '2026-06-30',
    dateLabel: '30 junho 2026',
    image: '/assets/news_ponto_chique.webp',
    imageAlt: 'Concurso Médico em Ponto Chique MG com salário de R$ 13.000,00',
    summary: 'Ponto Chique (MG) abre concurso para Médico Plantonista com remuneração de R$ 13.000,00 e 2 vagas disponíveis. Banca organizadora: Fadenor.',
    content: `
      <p>A Prefeitura de <strong>Ponto Chique (MG)</strong>, em parceria com a banca <strong>Fadenor</strong>, lança edital de concurso público para o cargo de <strong>Médico Plantonista</strong>.</p>

      <h2>Remuneração</h2>
      <p>Salário de <strong>R$ 13.000,00</strong> mensais para regime de 40 horas semanais, com plantões adicionais remunerados separadamente conforme necessidade do serviço.</p>

      <h2>Vagas</h2>
      <ul>
        <li>Médico Plantonista — 2 vagas efetivas</li>
      </ul>

      <h2>Período de Inscrição</h2>
      <p><strong>15 de julho a 20 de agosto de 2026</strong> pelo portal da Fadenor.</p>

      <h2>Prova</h2>
      <p>Data prevista: <strong>05 de outubro de 2026</strong>.</p>

      <h2>Requisitos</h2>
      <ul>
        <li>Graduação em Medicina</li>
        <li>CRM ativo</li>
        <li>Disponibilidade para plantões noturnos e de final de semana</li>
      </ul>
    `,
    concursoId: 2,
    featured: false,
  },
  {
    id: 'dores-indaia-mg-2026',
    title: 'Concurso Médico em Dores do Indaiá (MG): Salário de R$ 18.702,17',
    cidade: 'Dores do Indaiá',
    uf: 'MG',
    banca: 'Instituto Evo',
    tags: ['concurso médico', 'Minas Gerais', 'clínico geral', 'psiquiatra', 'pediatra', 'especialista'],
    date: '2026-06-25',
    dateLabel: '25 junho 2026',
    image: '/assets/news1.webp',
    imageAlt: 'Concurso Médico em Dores do Indaiá MG com salário de R$ 18.702,17',
    summary: 'Dores do Indaiá abre concurso com múltiplas especialidades — Clínico Geral, Psiquiatra e Pediatra — com salário de até R$ 18.702,17.',
    content: `
      <p>O município de <strong>Dores do Indaiá (MG)</strong>, por meio do <strong>Instituto Evo</strong>, publica edital de concurso público para diversas especialidades médicas.</p>

      <h2>Remuneração</h2>
      <p>Até <strong>R$ 18.702,17</strong> mensais, variando por cargo e carga horária (20h ou 40h semanais).</p>

      <h2>Vagas e Especialidades</h2>
      <ul>
        <li>Médico Clínico Geral — vagas a confirmar</li>
        <li>Médico Psiquiatra — vagas a confirmar</li>
        <li>Médico Pediatra — vagas a confirmar</li>
      </ul>

      <h2>Período de Inscrição</h2>
      <p><strong>22 de junho a 22 de julho de 2026</strong> pelo portal do Instituto Evo.</p>

      <h2>Prova</h2>
      <p>Data prevista: <strong>09 de agosto de 2026</strong>. Provas objetiva e discursiva.</p>

      <h2>Editais</h2>
      <p>O edital completo está disponível no site do Instituto Evo e no portal da Prefeitura de Dores do Indaiá.</p>
    `,
    concursoId: 3,
    featured: false,
  },
  {
    id: 'ponto-chique-mg-jan-2023',
    title: 'Ponto Chique (MG): Salário de R$ 13.000,00 — Edição Janeiro 2023',
    cidade: 'Ponto Chique',
    uf: 'MG',
    banca: 'Fadenor',
    tags: ['concurso médico', 'Minas Gerais', 'plantonista', 'resultado'],
    date: '2023-01-10',
    dateLabel: '10 janeiro 2023',
    image: '/assets/news2.webp',
    imageAlt: 'Concurso Médico Ponto Chique MG janeiro 2023',
    summary: 'Resultado do concurso de Ponto Chique de janeiro de 2023 para Médico Plantonista com salário de R$ 13.000,00.',
    content: `
      <p>O concurso público de <strong>Ponto Chique (MG)</strong> de janeiro de 2023, organizado pela banca <strong>Fadenor</strong>, encerrou seu ciclo com a homologação do resultado final para o cargo de <strong>Médico Plantonista</strong>.</p>

      <h2>Remuneração</h2>
      <p>Salário de <strong>R$ 13.000,00</strong> mensais para regime de 40 horas semanais.</p>

      <h2>Resultado</h2>
      <p>O resultado final foi publicado em janeiro de 2023. Os aprovados foram convocados para apresentação de documentos no prazo de 30 dias.</p>

      <h2>Próximas Edições</h2>
      <p>O município de Ponto Chique realizou nova seleção em 2026. Acesse a notícia da edição mais recente para mais informações.</p>
    `,
    concursoId: 2,
    featured: false,
  },
  {
    id: 'dores-indaia-mg-jan-2023',
    title: 'Dores do Indaiá (MG): Salário de R$ 18.702,17 — Edição Janeiro 2023',
    cidade: 'Dores do Indaiá',
    uf: 'MG',
    banca: 'Instituto Evo',
    tags: ['concurso médico', 'Minas Gerais', 'clínico geral', 'resultado', 'edição anterior'],
    date: '2023-01-29',
    dateLabel: '29 janeiro 2023',
    image: '/assets/news3.webp',
    imageAlt: 'Concurso Médico Dores do Indaiá MG janeiro 2023',
    summary: 'Edição de janeiro de 2023 do concurso médico de Dores do Indaiá com salário de R$ 18.702,17 para múltiplas especialidades.',
    content: `
      <p>A edição de <strong>janeiro de 2023</strong> do concurso público de <strong>Dores do Indaiá (MG)</strong>, organizado pelo <strong>Instituto Evo</strong>, movimentou o mercado de trabalho médico na região centro-oeste de Minas Gerais.</p>

      <h2>Resultado</h2>
      <p>O resultado final desta edição foi publicado em fevereiro de 2023. Os candidatos aprovados foram convocados por ordem de classificação conforme surgimento de vagas.</p>

      <h2>Especialidades Contempladas</h2>
      <ul>
        <li>Médico Clínico Geral</li>
        <li>Médico Psiquiatra</li>
        <li>Médico Pediatra</li>
      </ul>

      <h2>Remuneração</h2>
      <p>Até <strong>R$ 18.702,17</strong> mensais conforme cargo e carga horária selecionada.</p>
    `,
    concursoId: 3,
    featured: false,
  },
]

/** Mapa id → notícia para lookup O(1) */
export const NEWS_BY_ID = Object.fromEntries(NEWS_DATA.map(n => [n.id, n]))
