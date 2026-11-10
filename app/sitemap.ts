import type { MetadataRoute } from "next";
import { getArtigoSlugs, getEpisodios, getEventoSlugs, getNoticiaSlugs } from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [episodios, artigos, noticias, eventos] = await Promise.all([
    getEpisodios(),
    getArtigoSlugs(),
    getNoticiaSlugs(),
    getEventoSlugs(),
  ]);

  const paginas: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/episodios`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/artigos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/noticias`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/eventos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.5 },
  ];

  return [
    ...paginas,
    ...episodios.map((ep) => ({ url: `${SITE_URL}/episodios/${ep.numero}`, priority: 0.8 })),
    ...artigos.map((slug) => ({ url: `${SITE_URL}/artigos/${slug}`, priority: 0.7 })),
    ...noticias.map((slug) => ({ url: `${SITE_URL}/noticias/${slug}`, priority: 0.6 })),
    ...eventos.map((slug) => ({ url: `${SITE_URL}/eventos/${slug}`, priority: 0.5 })),
  ];
}
