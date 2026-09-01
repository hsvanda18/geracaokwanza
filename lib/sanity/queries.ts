import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { Artigo, Episodio, Evento, Noticia, Plataforma, Tema } from "../content";
import { sanityFetch } from "./client";
import { formatarData, formatarDataHora } from "./format";

type EpisodioDoc = {
  numero: string;
  titulo: string;
  convidado: string;
  duracao: string;
  temas: Tema[];
  href: string | null;
  youtubeId: string | null;
};

type ArtigoDoc = {
  slug: string;
  titulo: string;
  lead: string;
  corpo: PortableTextBlock[];
  autor: string;
  data: string;
  tema: Tema;
};

type NoticiaDoc = {
  slug: string;
  titulo: string;
  resumo: string;
  corpo: PortableTextBlock[] | null;
  data: string;
  tema: Tema;
  href: string | null;
  evento: { nome: string; slug: string } | null;
};

type EventoDoc = {
  slug: string;
  nome: string;
  dataHora: string;
  local: string;
  href: string | null;
};

type PlataformaDoc = {
  nome: string;
  href: string;
};

type ContactoDoc = {
  email: string | null;
  redes: { nome: string; href: string }[] | null;
};

function mapEpisodio(doc: EpisodioDoc): Episodio {
  return {
    numero: doc.numero,
    titulo: doc.titulo,
    convidado: doc.convidado,
    duracao: doc.duracao,
    temas: doc.temas ?? [],
    href: doc.href ?? "#",
    youtubeId: doc.youtubeId ?? undefined,
    isPlaceholder: false,
  };
}

function mapArtigo(doc: ArtigoDoc): Artigo {
  return {
    slug: doc.slug,
    titulo: doc.titulo,
    lead: doc.lead,
    corpo: doc.corpo ?? [],
    autor: doc.autor,
    data: formatarData(doc.data),
    tema: doc.tema,
    isPlaceholder: false,
  };
}

function mapNoticia(doc: NoticiaDoc): Noticia {
  return {
    slug: doc.slug,
    titulo: doc.titulo,
    resumo: doc.resumo,
    corpo: doc.corpo ?? undefined,
    data: formatarData(doc.data),
    tema: doc.tema,
    href: doc.href ?? undefined,
    eventoRelacionado: doc.evento ?? undefined,
    isPlaceholder: false,
  };
}

function mapEvento(doc: EventoDoc): Evento {
  return {
    slug: doc.slug,
    nome: doc.nome,
    data: formatarDataHora(doc.dataHora),
    local: doc.local,
    href: doc.href ?? undefined,
    isPlaceholder: false,
  };
}

function mapPlataforma(doc: PlataformaDoc): Plataforma {
  return { nome: doc.nome, href: doc.href, isPlaceholder: false };
}

const EPISODIO_PROJECTION = groq`{
  numero, titulo, convidado, duracao, temas, href, youtubeId
}`;

export async function getUltimoEpisodio(): Promise<Episodio | null> {
  const destaque = await sanityFetch<EpisodioDoc | null>(
    groq`*[_type == "episodio" && destaque == true] | order(numero desc)[0] ${EPISODIO_PROJECTION}`,
  );
  if (destaque) return mapEpisodio(destaque);

  const maisRecente = await sanityFetch<EpisodioDoc | null>(
    groq`*[_type == "episodio"] | order(numero desc)[0] ${EPISODIO_PROJECTION}`,
  );
  return maisRecente ? mapEpisodio(maisRecente) : null;
}

export async function getEpisodiosRecentes(limite = 3): Promise<Episodio[]> {
  const docs = await sanityFetch<EpisodioDoc[]>(
    groq`*[_type == "episodio" && destaque != true] | order(numero desc)[0...$limite] ${EPISODIO_PROJECTION}`,
    { limite },
  );
  return docs.map(mapEpisodio);
}

export async function getEpisodios(): Promise<Episodio[]> {
  const docs = await sanityFetch<EpisodioDoc[]>(
    groq`*[_type == "episodio"] | order(numero desc) ${EPISODIO_PROJECTION}`,
  );
  return docs.map(mapEpisodio);
}

const ARTIGO_PROJECTION = groq`{
  "slug": slug.current, titulo, lead, corpo, autor, data, tema
}`;

export async function getArtigos(): Promise<Artigo[]> {
  const docs = await sanityFetch<ArtigoDoc[]>(groq`*[_type == "artigo"] | order(data desc) ${ARTIGO_PROJECTION}`);
  return docs.map(mapArtigo);
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | null> {
  const doc = await sanityFetch<ArtigoDoc | null>(
    groq`*[_type == "artigo" && slug.current == $slug][0] ${ARTIGO_PROJECTION}`,
    { slug },
  );
  return doc ? mapArtigo(doc) : null;
}

export async function getArtigoSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(groq`*[_type == "artigo"].slug.current`);
}

const NOTICIA_PROJECTION = groq`{
  "slug": slug.current, titulo, resumo, corpo, data, tema, href,
  "evento": evento->{ nome, "slug": slug.current }
}`;

export async function getNoticias(): Promise<Noticia[]> {
  const docs = await sanityFetch<NoticiaDoc[]>(groq`*[_type == "noticia"] | order(data desc) ${NOTICIA_PROJECTION}`);
  return docs.map(mapNoticia);
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const doc = await sanityFetch<NoticiaDoc | null>(
    groq`*[_type == "noticia" && slug.current == $slug][0] ${NOTICIA_PROJECTION}`,
    { slug },
  );
  return doc ? mapNoticia(doc) : null;
}

export async function getNoticiaSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(groq`*[_type == "noticia"].slug.current`);
}

const EVENTO_PROJECTION = groq`{
  "slug": slug.current, nome, dataHora, local, href
}`;

export async function getEventosProximos(): Promise<Evento[]> {
  const docs = await sanityFetch<EventoDoc[]>(
    groq`*[_type == "evento" && dataHora >= now()] | order(dataHora asc) ${EVENTO_PROJECTION}`,
  );
  return docs.map(mapEvento);
}

export async function getEventosAnteriores(): Promise<Evento[]> {
  const docs = await sanityFetch<EventoDoc[]>(
    groq`*[_type == "evento" && dataHora < now()] | order(dataHora desc) ${EVENTO_PROJECTION}`,
  );
  return docs.map(mapEvento);
}

export async function getPlataformas(): Promise<Plataforma[]> {
  const docs = await sanityFetch<PlataformaDoc[]>(
    groq`*[_type == "plataforma"] | order(ordem asc) { nome, href }`,
  );
  return docs.map(mapPlataforma);
}

export async function getContacto(): Promise<{
  email: string;
  emailIsPlaceholder: boolean;
  redes: { nome: string; href: string; isPlaceholder: boolean }[];
}> {
  const doc = await sanityFetch<ContactoDoc | null>(
    groq`*[_type == "contacto"][0] { email, redes }`,
  );
  return {
    email: doc?.email || "[EMAIL PARA PARCERIAS]",
    emailIsPlaceholder: !doc?.email,
    redes: (doc?.redes ?? []).map((r) => ({ ...r, isPlaceholder: false })),
  };
}
