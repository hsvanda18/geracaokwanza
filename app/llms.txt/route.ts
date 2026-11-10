import {
  getArtigos,
  getEpisodios,
  getEventosAnteriores,
  getEventosProximos,
  getNoticias,
} from "@/lib/sanity/queries";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * /llms.txt — a plain-Markdown map of the site for AI assistants and LLM
 * crawlers (llmstxt.org format), built from the same Sanity content as the
 * pages, so it stays current without anyone editing it by hand.
 */
export const revalidate = 60;

/** Keeps a summary on one line so it can't break the Markdown list. */
function linha(texto: string | undefined) {
  return (texto ?? "").replace(/\s+/g, " ").trim();
}

function item(titulo: string, url: string, nota?: string) {
  const extra = linha(nota);
  return `- [${linha(titulo)}](${url})${extra ? `: ${extra}` : ""}`;
}

export async function GET() {
  const [episodios, artigos, noticias, proximos, anteriores] = await Promise.all([
    getEpisodios(),
    getArtigos(),
    getNoticias(),
    getEventosProximos(),
    getEventosAnteriores(),
  ]);

  const seccoes: string[] = [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    [
      "A Geração Kwanza é um podcast e plataforma de conteúdo angolana, em português, dedicada ao debate cívico sério sobre economia, política e sociedade em Angola — sem entretenimento nem comédia.",
      "Os temas editoriais são três: ECONOMIA, POLÍTICA e SOCIEDADE. O conteúdo principal são os episódios do podcast (vídeo no YouTube, também reproduzíveis no site); os artigos aprofundam, as notícias informam de forma breve e os eventos documentam a actividade presencial.",
    ].join("\n\n"),
    [
      "## Páginas principais",
      item("Início", SITE_URL, "Último episódio em destaque e resumo das restantes secções."),
      item("Episódios", `${SITE_URL}/episodios`, "Catálogo completo do podcast."),
      item("Artigos", `${SITE_URL}/artigos`, "Análise e opinião, filtrável por tema."),
      item("Notícias", `${SITE_URL}/noticias`, "Actualizações breves e factuais."),
      item("Eventos", `${SITE_URL}/eventos`, "Encontros e debates, próximos e anteriores."),
      item("Sobre nós", `${SITE_URL}/sobre`, "Quem somos, o que cobrimos, equipa e contacto."),
    ].join("\n"),
  ];

  if (episodios.length > 0) {
    seccoes.push(
      [
        "## Episódios",
        ...episodios.map((ep) =>
          item(
            `EP. ${ep.numero} — ${ep.titulo}`,
            `${SITE_URL}/episodios/${ep.numero}`,
            [ep.convidado !== ep.titulo ? `Convidado: ${ep.convidado}` : "", `Temas: ${ep.temas.join(", ")}`, `Duração: ${ep.duracao}`]
              .filter(Boolean)
              .join(". "),
          ),
        ),
      ].join("\n"),
    );
  }

  if (artigos.length > 0) {
    seccoes.push(
      [
        "## Artigos",
        ...artigos.map((a) =>
          item(a.titulo, `${SITE_URL}/artigos/${a.slug}`, `${a.tema}, ${a.data}${a.autor.nome ? `, por ${a.autor.nome}` : ""}. ${a.lead}`),
        ),
      ].join("\n"),
    );
  }

  if (noticias.length > 0) {
    seccoes.push(
      [
        "## Notícias",
        ...noticias.map((n) => item(n.titulo, `${SITE_URL}/noticias/${n.slug}`, `${n.tema}, ${n.data}. ${n.resumo}`)),
      ].join("\n"),
    );
  }

  const eventos = [...proximos, ...anteriores];
  if (eventos.length > 0) {
    seccoes.push(
      ["## Eventos", ...eventos.map((e) => item(e.nome, `${SITE_URL}/eventos/${e.slug}`, `${e.data}, ${e.local}.`))].join(
        "\n",
      ),
    );
  }

  seccoes.push(
    ["## Optional", item("Mapa do site (XML)", `${SITE_URL}/sitemap.xml`, "Lista completa de URLs.")].join("\n"),
  );

  return new Response(`${seccoes.join("\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
