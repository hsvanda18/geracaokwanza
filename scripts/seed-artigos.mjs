/**
 * One-off migration: publishes the two real artigos supplied by the site
 * owner (previously only PDFs) as Sanity documents with proper Portable
 * Text, plus an autor document per author (referenced from each artigo —
 * no photo/bio yet, fill those in via the Studio). Safe to re-run — fixed
 * _id per document, createOrReplace.
 *
 * Requires the same env vars as scripts/seed-sanity.mjs.
 * Run with: node scripts/seed-artigos.mjs
 */
import { createClient } from "@sanity/client";
import { existsSync } from "node:fs";

if (existsSync(new URL("../.env.local", import.meta.url))) {
  process.loadEnvFile(new URL("../.env.local", import.meta.url));
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Faltam variáveis de ambiente: NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN são obrigatórias.",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-01-01", token, useCdn: false });

const autorAntonio = { _id: "autor-antonio-eusebio", _type: "autor", nome: "António Eusébio" };
const autorJosemar = { _id: "autor-josemar-djundo", _type: "autor", nome: "Josemar Djundo" };

let contadorChave = 0;
function chave(prefixo = "k") {
  contadorChave += 1;
  return `${prefixo}${contadorChave}`;
}

function span(texto, marks = []) {
  return { _type: "span", _key: chave("s"), text: texto, marks };
}

function bloco(spansOuTexto, opcoes = {}) {
  const spans = typeof spansOuTexto === "string" ? [span(spansOuTexto)] : spansOuTexto;
  return {
    _type: "block",
    _key: chave("b"),
    style: opcoes.style ?? "normal",
    markDefs: [],
    children: spans,
    ...(opcoes.listItem ? { listItem: opcoes.listItem, level: opcoes.level ?? 1 } : {}),
  };
}

const p = (texto) => bloco(texto, { style: "normal" });
const ps = (spans) => bloco(spans, { style: "normal" });
const h2 = (texto) => bloco(texto, { style: "h2" });
const h3 = (texto) => bloco(texto, { style: "h3" });
const citacao = (texto) => bloco(texto, { style: "blockquote" });
const bullet = (spansOuTexto) => bloco(spansOuTexto, { style: "normal", listItem: "bullet", level: 1 });
const termo = (nome, descricao) => bullet([span(nome, ["strong"]), span(` — ${descricao}`)]);

const artigoSeguros = {
  _id: "artigo-overview-sector-segurador",
  _type: "artigo",
  titulo: "Overview ao Sector Segurador Angolano: Desafios e Oportunidades num Mercado em Transformação",
  slug: { _type: "slug", current: "overview-sector-segurador-angolano" },
  lead: "O sector segurador angolano cresce em volume de prémios, mas continua com baixa penetração e inclusão financeira. Um retrato do estado do sector, os seus desafios estruturais e as oportunidades de transformação.",
  autor: { _type: "reference", _ref: autorAntonio._id },
  data: "2026-06-01",
  tema: "ECONOMIA",
  corpo: [
    p(
      "O sector segurador desempenha um papel fundamental no desenvolvimento económico e social de qualquer país, funcionando como um mecanismo de proteção contra riscos e de promoção da estabilidade financeira. Em Angola, apesar dos progressos registados nas últimas décadas, o mercado segurador continua a enfrentar desafios significativos relacionados com a baixa taxa de penetração, a limitada cultura de seguros e a necessidade de maior diversificação dos produtos oferecidos. Num contexto de transformação económica e de crescente necessidade de proteção patrimonial e social, torna-se pertinente refletir sobre o estado atual do sector, os seus constrangimentos e as oportunidades que podem contribuir para o seu fortalecimento e para uma maior inclusão financeira da população.",
    ),
    h2("Seguro: conceito e principais elementos"),
    ps([
      span("Segundo George E. Rejda e Michael McNamara, na obra ", ["strong"]),
      span("Principles of Risk Management and Insurance", ["strong", "em"]),
      span(
        ", o seguro é um mecanismo de transferência e partilha de riscos através do qual um conjunto de indivíduos ou entidades expostos a riscos semelhantes contribui para um fundo comum destinado a indemnizar aqueles que venham a sofrer perdas.",
        ["strong"],
      ),
    ]),
    p("De forma simples, o seguro permite transformar uma perda potencialmente elevada e incerta num custo reduzido e previsível o prémio de seguro."),
    p("Juridicamente, o seguro pode ser definido como o contrato pelo qual uma seguradora, mediante o pagamento de um prémio, assume a obrigação de indemnizar ou compensar o segurado ou beneficiário pela ocorrência de um risco previamente previsto na apólice."),
    p("Entre os principais elementos que compõem um contrato de seguro destacam-se:"),
    termo("Risco", "Evento incerto que pode causar prejuízo."),
    termo("Segurado", "Quem está protegido pelo seguro."),
    termo("Segurador", "Empresa que assume o risco."),
    termo("Tomador do Seguro", "Quem contrata e paga o seguro."),
    termo("Beneficiário", "Quem recebe a indemnização."),
    termo("Prémio de Seguro", "Valor pago pelo seguro."),
    termo("Apólice", "Documento do contrato."),
    termo("Cobertura", "Riscos protegidos."),
    termo("Capital Seguro", "Valor máximo garantido."),
    termo("Sinistro", "Ocorrência do risco coberto."),
    termo("Indemnização", "Compensação paga pela seguradora."),
    termo("Franquia", "Parte do prejuízo suportada pelo segurado."),
    termo("Exclusões", "Situações não cobertas."),
    termo("Condições Gerais", "Regras comuns do contrato."),
    termo("Condições Especiais", "Cláusulas complementares."),
    termo("Condições Particulares", "Dados específicos da apólice."),
    h2("Breve enquadramento histórico"),
    p("A actividade seguradora em Angola iniciou-se em 1922, com a instalação de uma filial da Companhia de Seguros Ultramarina. Durante o período colonial, o mercado era composto por cerca de 26 seguradoras, maioritariamente detidas por capitais portugueses, cuja actividade estava essencialmente orientada para a protecção dos interesses da economia colonial."),
    p("Após a independência, em 1975, o sector foi profundamente reorganizado. Em 18 de Fevereiro de 1978 foi criada a ENSA – Empresa Nacional de Seguros e Resseguros de Angola, que assumiu os activos e responsabilidades das seguradoras então existentes e passou a deter o monopólio da actividade seguradora durante mais de duas décadas."),
    p("A abertura do mercado ocorreu com a aprovação da Lei n.º 1/00, de 3 de Fevereiro, que permitiu a entrada de seguradoras privadas e introduziu maior concorrência, contribuindo para a diversificação da oferta de produtos e para o desenvolvimento gradual do mercado."),
    p("Posteriormente, o enquadramento regulatório foi sendo reforçado, destacando-se a regulamentação do Seguro Obrigatório de Responsabilidade Civil Automóvel, e a criação da ARSEG – Agência Angolana de Regulação e Supervisão de Seguros, actualmente responsável pela supervisão dos sectores segurador, ressegurador, da mediação de seguros e dos fundos de pensões."),
    p("Actualmente, o principal diploma que regula o sector é a Lei n.º 18/22, de 7 de Julho (Lei da Actividade Seguradora e Resseguradora), que modernizou o regime jurídico da actividade, reforçou a protecção dos consumidores, introduziu o enquadramento do microsseguro e consolidou mecanismos de supervisão prudencial alinhados com as melhores práticas internacionais."),
    h2("Retrato Actual do Mercado Segurador Angolano"),
    ps([
      span("O estudo "),
      span("Insurance Outlook Angola", ["em"]),
      span(", desenvolvido pela EY Angola em parceria com a ARSEG, demonstra que o mercado segurador angolano continua a crescer em termos nominais. Contudo, esse crescimento ainda não se traduz numa maior profundidade económica nem numa expansão significativa da protecção da população."),
    ]),
    p("Actualmente, Angola conta com 21 seguradoras licenciadas. Apesar deste número, o mercado permanece altamente concentrado, sendo a maior parte dos prémios emitidos dominada por um reduzido grupo de operadores, entre os quais se destacam a ENSA, Nossa Seguros, Fidelidade Angola e Sanlam Angola."),
    p("Este cenário revela um paradoxo: o mercado cresce em volume de prémios, mas não cresce ao mesmo ritmo em inclusão seguradora."),
    p("Grande parte da produção continua concentrada em clientes empresariais, sobretudo ligados aos sectores petrolífero, industrial e corporativo, enquanto a adesão das famílias e das pequenas empresas permanece reduzida."),
    p("Esta realidade explica, em grande medida, a baixa taxa de penetração dos seguros na economia angolana, inferior a 1% do PIB, quando comparada com vários países da SADC, onde os níveis de penetração variam, em muitos casos, entre 3% e 5%."),
    p("Mais do que aumentar o volume de prémios, o verdadeiro desafio do sector consiste em democratizar o acesso aos seguros, tornando-os mais acessíveis, compreendidos e relevantes para a vida quotidiana dos cidadãos."),
    p("O estudo da EY e da ARSEG identifica diversos factores que continuam a limitar o desenvolvimento do mercado segurador angolano."),
    h3("a) Os principais desafios"),
    bullet("baixa literacia financeira ao sector"),
    bullet("reduzida cultura de gestão de riscos"),
    bullet("fraca fiscalização do cumprimento dos seguros obrigatórios"),
    bullet("limitada rede de distribuição"),
    bullet("baixo rendimento disponível das famílias"),
    bullet("necessidade de acelerar a transformação digital"),
    bullet("escassez de profissionais especializados"),
    h3("b) Oportunidades para o futuro"),
    p("Apesar das limitações actuais, existem razões para optimismo."),
    p("A crescente digitalização dos serviços financeiros, o desenvolvimento do microsseguro, a expansão dos pagamentos electrónicos, o crescimento do mercado de capitais e o reforço do quadro regulatório criam condições para uma nova fase de desenvolvimento do sector."),
    p("O microsseguro, em particular, poderá desempenhar um papel decisivo na inclusão financeira, permitindo que famílias de baixos rendimentos tenham acesso a mecanismos de protecção antes considerados inacessíveis."),
    p("Ao mesmo tempo, uma maior integração entre bancos, seguradoras e fintechs poderá facilitar a distribuição de produtos, reduzir custos operacionais e aproximar os seguros do quotidiano dos cidadãos."),
    h2("Reflexões trazidas por César Marcelino no Geração Kwanza"),
    p(
      "César Marcelino, economista, investigador e especialista ligado ao sector segurador, esteve connosco no 4.º episódio do Geração Kwanza, onde ajudou-nos, a nós e aos nossos ouvintes, a compreender melhor o estado atual do sector segurador em Angola, os seus desafios e as oportunidades existentes num mercado em constante transformação.",
    ),
    p("Para o convidado, o seguro pode ser definido numa única palavra:"),
    citacao(
      "Se pudesse definir o seguro numa única palavra, seria proteção. Uma proteção que abrange dois grandes ramos: o ramo Vida, cuja proteção incide exclusivamente sobre a vida humana, e o ramo Não Vida, que engloba todos os riscos relacionados com bens e responsabilidades que não dizem respeito à vida.",
    ),
    p("Num tom mais descontraído, César Marcelino comparou o sector segurador angolano a um paciente e considerou que este se encontra economicamente saudável. Explicou que, essa avaliação resulta, sobretudo, da profunda transformação legislativa que tem tornado o mercado cada vez mais liberal, do crescimento do número de seguradoras e da criação de novos produtos, que têm promovido uma maior inclusão seguradora, como é o caso dos microsseguros."),
    p("Acrescentou ainda que o sector apresenta indicadores financeiros sólidos. Destacou que a cobertura das provisões técnicas é bastante positiva, significando que, por cada kwanza de responsabilidades assumidas pelas seguradoras, existem investimentos de cerca de 1,2 kwanzas para lhes fazer face. Referiu igualmente a margem de solvência do mercado, salientando que, em média, para cada kwanza de responsabilidades assumidas por uma seguradora, existem aproximadamente 2,5 kwanzas de capitais próprios disponíveis para suportá-las."),
    ps([
      span("Não obstante estes indicadores positivos, abordou igualmente os principais desafios do sector segurador, os quais estão alinhados com as conclusões do estudo "),
      span("Insurance Outlook Angola", ["em"]),
      span(", desenvolvido pela EY Angola em parceria com a ARSEG. Entre esses desafios, destacou a baixa literacia financeira e seguradora da população e a escassez de profissionais especializados."),
    ]),
    p("Durante a conversa, lançou ainda uma reflexão a uma pergunta provocadora sobre quem seria para si o principal responsável pela reduzida cultura de seguros em Angola: o Estado, as seguradoras ou os próprios cidadãos. Contudo, fez questão de sublinhar que o mais importante não é encontrar culpados, mas sim criar sinergias para alterar esta realidade."),
    p("Defendeu que o Ministério da Educação, o Ministério do Ensino Superior, a ARSEG, as seguradoras e os demais intervenientes do sector devem trabalhar em conjunto para promover a literacia financeira e seguradora no país."),
    p("Nas suas palavras:"),
    citacao(
      "É importante que as crianças, desde tenra idade, compreendam o que é um seguro e qual a importância de o possuir. É importante que os automobilistas percebam que contratar um seguro vai muito além do cumprimento de uma obrigação legal; significa garantir proteção e dignidade a todos os utentes da via pública. É igualmente importante que as empresas entendam que contratar o seguro de acidentes de trabalho e doenças profissionais não é apenas uma obrigação legal, mas também uma forma de valorizar e proteger o seu maior ativo: os trabalhadores.",
    ),
    h2("Considerações finais"),
    p("A análise do mercado segurador angolano demonstra que o sector se encontra numa fase de crescimento e modernização, sustentada por um enquadramento legal mais robusto, pela supervisão da ARSEG e pelo aumento consistente do volume de prémios emitidos. Contudo, os indicadores estruturais revelam que esse crescimento ainda não se traduz numa efectiva massificação dos seguros junto da população e das empresas."),
    p("A taxa de penetração inferior a 1% do PIB, quando comparada com os níveis observados nos principais mercados da SADC, evidencia que Angola continua a explorar apenas uma pequena parte do potencial económico e social da actividade seguradora. Esta realidade resulta de factores como a reduzida literacia financeira, a baixa cultura de seguros, a limitada inclusão financeira e a concentração da produção em segmentos corporativos de maior dimensão."),
    p("Neste contexto, o principal desafio do sector não é apenas crescer em volume de negócios, mas sobretudo aumentar a sua relevância na economia e na vida dos cidadãos. Para tal, será fundamental reforçar a educação financeira, expandir o microsseguro, desenvolver soluções inovadoras através do bancassurance, acelerar a transformação digital e fortalecer a confiança dos consumidores no sistema segurador."),
    p("O futuro do mercado segurador angolano dependerá da sua capacidade de evoluir de um sector predominantemente orientado para grandes riscos empresariais para um verdadeiro instrumento de protecção financeira, inclusão social e desenvolvimento económico sustentável. Quanto maior for a capacidade de levar os seguros às famílias, às micro, pequenas e médias empresas, maior será o seu contributo para a resiliência económica do país e para a estabilidade do sistema financeiro nacional."),
    p("Dados: Angola, Insurance Outlook, 1º Edição, 2024. Referências: entrevista de César Marcelino ao Geração Kwanza; Site Oficial da ARSEG."),
  ],
};

const artigoJuventude = {
  _id: "artigo-juventude-qualificada-sem-rumo",
  _type: "artigo",
  titulo: "Juventude Qualificada e Sem Rumo: Aonde a Bússola Falhou?",
  slug: { _type: "slug", current: "juventude-qualificada-sem-rumo" },
  lead: "Angola tem hoje os jovens mais qualificados da sua história e, ao mesmo tempo, uma das taxas de desemprego juvenil mais altas do continente. Uma reflexão sobre a distância entre a formação e o mercado, e sobre a crise de propósito de uma geração à espera de ser encontrada.",
  autor: { _type: "reference", _ref: autorJosemar._id },
  data: "2026-05-01",
  tema: "SOCIEDADE",
  corpo: [
    p("Há uma imagem que me persegue. A de um jovem com diploma em mãos, parado à porta de uma instituição que nunca lhe abriu de facto. Não por falta de esforço. Não por falta de inteligência. Mas por uma combinação cruel de circunstâncias que o deixou, simultaneamente, mais preparado e mais perdido do que qualquer geração angolana antes dele."),
    p("Estamos a falar de uma geração que foi à escola, que estudou, que acreditou — às vezes até ao ponto de se endividar ou de ver os pais sacrificarem tudo — e que chegou ao mercado de trabalho para encontrar não um caminho, mas um labirinto sem mapa. Angola tem hoje, paradoxalmente, os jovens mais qualificados da sua história e, ao mesmo tempo, uma das taxas de desemprego juvenil mais altas do continente africano."),
    p("Este artigo não é sobre estatísticas frias. É sobre o peso de acordar todos os dias sem saber para onde caminhar. É sobre a pergunta que Carmen Mateia, Empreendedora e uma das vozes mais lúcidas da sua geração, levantou numa conversa recente no podcast Geração Kwanza: “como é que um país forma jovens e depois não sabe o que fazer com eles?”"),
    h2("O paradoxo da juventude mais formada e menos direcionada"),
    p("Os números do Instituto Nacional de Estatística (INE) são brutais na sua clareza. Em 2025, a taxa de desemprego jovem em Angola atingiu 51,8% — mais de metade dos jovens entre 15 e 24 anos sem emprego formal. E os desempregados têm, em média, 25,9 anos. Não são adolescentes em início de carreira. São adultos que já deveriam estar a construir as suas vidas."),
    p("Mas o paradoxo não está apenas nos números. Está na qualidade do que esses números escondem. A mesma geração que acedeu em massa ao ensino superior — seja através de universidades públicas, privadas ou de bolsas no exterior — é a que mais profundamente sente a distância entre o que aprendeu e o que o mercado lhe pede. Ou, mais exactamente, o que o mercado angolano ainda não consegue oferecer."),
    p("Formaram-se economistas, engenheiros, comunicadores, juristas. E muitos encontraram, do outro lado do diploma, o mesmo mercado informal que existia antes deles. Angola continua com 78,8% dos seus trabalhadores na economia informal. Nas zonas rurais, essa cifra chega a 95%. O diploma não é um passaporte. É, no máximo, uma promessa por cumprir."),
    h2("O mercado angolano e a ausência de oportunidades reais"),
    p("Parte do problema tem raízes estruturais que não se resolvem com boa vontade. A economia angolana continua excessivamente dependente do petróleo — um sector que emprega uma fracção mínima da população activa e que, por natureza, exige perfis altamente especializados e reduzida mão-de-obra. Ao mesmo tempo, os sectores que deveriam absorver os jovens qualificados — a indústria, os serviços, a tecnologia — permanecem subdesenvolvidos e sem capacidade de absorção."),
    p("A isso junta-se um fenómeno silencioso, mas devastador: a fuga de talentos. Cada vez mais jovens angolanos qualificados buscam horizontes em Portugal, no Brasil, na França ou nos países vizinhos. Não por capricho ou deslealdade à terra, mas porque a equação entre sacrifício e recompensa deixou de fechar em casa. Médicos, professores, técnicos financeiros, analistas de dados — Angola investe na sua formação e o mundo beneficia do seu trabalho."),
    citacao("Precisamos de juntar forças e recursos para garantir que cada jovem tem acesso a oportunidades e ao apoio de que necessita para ter sucesso no mercado de trabalho moderno."),
    ps([
      span("Estas palavras de "),
      span("Carmen Mateia", ["strong"]),
      span(", ditas no contexto do seu trabalho com os Agitadores Culturais na Huíla, resumem o que deveria ser uma prioridade nacional. Mas entre o discurso e a política pública existe, em Angola, uma distância que os jovens sentem na pele todos os dias."),
    ]),
    h2("A crise de propósito e identidade da nova geração"),
    p("Há algo que os dados não capturam: o vazio interior de quem não sabe qual é o seu lugar. A chamada crise de identidade profissional é, para muitos jovens angolanos, mais paralisante do que o desemprego em si. Porque o desemprego é uma condição exterior. A desorientação é uma condição interior. E esta geração enfrenta as duas em simultâneo."),
    p("Cresceram a ouvir que a educação era a chave. Estudaram. Sacrificaram. E quando chegaram à porta, descobriram que a chave existe, mas a fechadura mudou de lugar. O mercado pede experiência a quem nunca teve oportunidade de a ganhar. Pede conexões a quem não nasceu com elas. Pede resiliência a quem já está esgotado de resistir."),
    p("A pressão social amplifica tudo. Em Angola, como em muitas sociedades africanas, o jovem que não tem emprego formal não é apenas alguém sem trabalho — é alguém que 'falhou'. A família que se sacrificou para pagar os estudos olha com expectativa. Os amigos comparam trajectórias. As redes sociais mostram uma versão filtrada do sucesso alheio. E o jovem, encurralado entre o que é e o que se espera que seja, vai perdendo a bússola interior."),
    p("A saúde emocional desta geração é uma emergência silenciosa. Ansiedade, depressão e sensação de inutilidade proliferam em silêncio, numa cultura que ainda estigmatiza a vulnerabilidade emocional e onde o acesso a apoio psicológico é, para a maioria, um luxo inacessível."),
    h2("Reflexões trazidas por Carmen Mateia no Geração Kwanza"),
    p("Foi no scout, aos 12 anos, que Carmen Mateia descobriu a sua vocação para o associativismo e para a liderança comunitária. Aos 20, o programa YALI abriu-lhe os olhos para o verdadeiro potencial da acção colectiva. Hoje, à frente de iniciativas como os Agitadores Culturais e a Primeira Fila, ela percorre Angola e além-fronteiras com uma mensagem que é, ao mesmo tempo, simples e profunda: os jovens não precisam de esperar que o sistema os inclua — podem começar a construir os seus próprios sistemas."),
    p("No Geração Kwanza, Carmen trouxe à conversa algo que raramente se discute com esta honestidade: a diferença entre estar formado e estar preparado. A escola angolana, diz ela, ainda forma para um mercado que não existe — ou que existe de uma forma que o currículo académico não contempla. Forma para a teoria quando o mercado pede adaptabilidade. Forma para a especialização quando o empreendedorismo exige transversalidade. Forma para receber ordens quando o momento pede pessoas capazes de criar os seus próprios contextos."),
    p("Mas Carmen também recusa o pessimismo fácil. A sua trajectória — e a de tantos outros jovens angolanos que encontraram o seu caminho através da cultura, do associativismo, da economia criativa ou do empreendedorismo social — mostra que a bússola pode ser recalibrada. Não pelo Estado, não pela família, não pela escola. Mas pelo próprio jovem que decide parar de esperar permissão para começar."),
    h2("O papel da sociedade, família, escola e Estado"),
    p("A tentação é sempre a de apontar o dedo a um único culpado. Ao Estado que não cria empregos. À escola que não prepara. À família que pressiona. Mas a realidade é mais complexa e mais incómoda: todos participam, de alguma forma, na desorientação desta geração."),
    p("A família angolana ainda carrega, em muitos casos, uma concepção linear e rígida do sucesso: estudar, arranjar emprego formal, casar, ter filhos. Qualquer desvio desta trajectória é lido como fracasso. O jovem que escolhe o empreendedorismo enfrenta desconfiança. O que escolhe uma carreira artística ou na economia criativa enfrenta desprezo. O que simplesmente não sabe ainda o que quer — e tem a coragem de o admitir — enfrenta ansiedade partilhada por toda a família."),
    p("A escola, por seu turno, continua a ser um sistema construído para um mundo que já não existe. A educação financeira é praticamente ausente. O desenvolvimento de competências emocionais e de pensamento crítico raramente é prioritário. E a ligação entre o que se aprende e o que o mercado real precisa permanece, na maioria dos casos, uma ponte por construir."),
    p("O Estado tem um papel insubstituível — e aqui não se pode ser condescendente. Políticas públicas de emprego juvenil que não chegam à maioria, programas de capacitação que ficam no papel, falta de incentivos reais ao empreendedorismo e à formalização da economia: são falhas estruturais que nenhuma resiliência individual consegue compensar completamente. A iniciativa de Carmen Mateia e de outros empreendedores e activistas é admirável, mas não pode ser a única resposta."),
    h2("Conclusão: a bússola por dentro"),
    p("No final, a pergunta com que comecei — aonde a bússola falhou? — tem uma resposta desconfortável: falhou em vários lugares ao mesmo tempo. Falhou na escola que não preparou para a vida real. Falhou no mercado que não cresceu à medida dos sonhos. Falhou na família que transmitiu mapas desactualizados. Falhou no Estado que prometeu mais do que entregou. E falhou, às vezes, no próprio jovem que esperou que alguém lhe dissesse para onde ir."),
    p("Mas as bússolas também se recalibram. E é isso que torna esta geração simultaneamente trágica e fascinante: ela tem, como nenhuma outra, os instrumentos para se reinventar. Tem acesso a informação, a redes globais, a modelos de sucesso não-lineares. Tem, em figuras como Carmen Mateia, exemplos de que é possível criar o próprio caminho quando o caminho convencional se fecha."),
    p("O que esta geração precisa não é apenas de emprego. Precisa de propósito. Precisa de espaços — físicos e emocionais — onde possa errar sem ser julgada, explorar sem ser apressada, construir sem ter que pedir desculpa pela escala reduzida dos seus primeiros passos. Precisa que o país decida, de uma vez por todas, que o seu maior activo não é o petróleo nem os diamantes. São os 51,8% de jovens que estão parados, à espera de uma oportunidade que Angola ainda não teve a coragem de criar à sua medida."),
    p("Porque uma geração perdida não é uma geração falhada. É uma geração à espera de ser encontrada. E nesse encontro, a responsabilidade é de todos nós."),
    p("Dados: INE Angola — Inquérito ao Emprego 2025. Referências: entrevista de Carmen Mateia ao Geração Kwanza; Banco Mundial, 2024; UNICEF Angola, 2024."),
    p("Josemar Djundo é economista, e colaborador do Geração Kwanza."),
  ],
};

for (const doc of [autorAntonio, autorJosemar, artigoSeguros, artigoJuventude]) {
  await client.createOrReplace(doc);
  console.log(`✓ ${doc._type}/${doc._id}`);
}

console.log("\nFeito — 2 autores e 2 artigos publicados.");
