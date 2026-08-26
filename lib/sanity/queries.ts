import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { Artigo, Episodio, Evento, Noticia, Plataforma, Tema } from "../content";
import { client } from "./client";
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
  titulo: string;
  resumo: string;
  data: string;
  tema: Tema;
  href: string | null;
};

type EventoDoc = {
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
    titulo: doc.titulo,
    resumo: doc.resumo,
    data: formatarData(doc.data),
    tema: doc.tema,
    href: doc.href ?? undefined,
    isPlaceholder: false,
  };
}

function mapEvento(doc: EventoDoc): Evento {
  return {
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
  const destaque = await client.fetch<EpisodioDoc | null>(
    groq`*[_type == "episodio" && destaque == true] | order(numero desc)[0] ${EPISODIO_PROJECTION}`,
  );
  if (destaque) return mapEpisodio(destaque);

  const maisRecente = await client.fetch<EpisodioDoc | null>(
    groq`*[_type == "episodio"] | order(numero desc)[0] ${EPISODIO_PROJECTION}`,
  );
  return maisRecente ? mapEpisodio(maisRecente) : null;
}

export async function getEpisodiosRecentes(limite = 3): Promise<Episodio[]> {
  const docs = await client.fetch<EpisodioDoc[]>(
    groq`*[_type == "episodio" && destaque != true] | order(numero desc)[0...$limite] ${EPISODIO_PROJECTION}`,
    { limite },
  );
  return docs.map(mapEpisodio);
}

export async function getEpisodios(): Promise<Episodio[]> {
  const docs = await client.fetch<EpisodioDoc[]>(
    groq`*[_type == "episodio"] | order(numero desc) ${EPISODIO_PROJECTION}`,
  );
  return docs.map(mapEpisodio);
}

const ARTIGO_PROJECTION = groq`{
  "slug": slug.current, titulo, lead, corpo, autor, data, tema
}`;

export async function getArtigos(): Promise<Artigo[]> {
  const docs = await client.fetch<ArtigoDoc[]>(groq`*[_type == "artigo"] | order(data desc) ${ARTIGO_PROJECTION}`);
  return docs.map(mapArtigo);
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | null> {
  const doc = await client.fetch<ArtigoDoc | null>(
    groq`*[_type == "artigo" && slug.current == $slug][0] ${ARTIGO_PROJECTION}`,
    { slug },
  );
  return doc ? mapArtigo(doc) : null;
}

export async function getArtigoSlugs(): Promise<string[]> {
  return client.fetch<string[]>(groq`*[_type == "artigo"].slug.current`);
}

export async function getNoticias(): Promise<Noticia[]> {
  const docs = await client.fetch<NoticiaDoc[]>(
    groq`*[_type == "noticia"] | order(data desc) { titulo, resumo, data, tema, href }`,
  );
  return docs.map(mapNoticia);
}

export async function getEventosProximos(): Promise<Evento[]> {
  const docs = await client.fetch<EventoDoc[]>(
    groq`*[_type == "evento" && dataHora >= now()] | order(dataHora asc) { nome, dataHora, local, href }`,
  );
  return docs.map(mapEvento);
}

export async function getEventosAnteriores(): Promise<Evento[]> {
  const docs = await client.fetch<EventoDoc[]>(
    groq`*[_type == "evento" && dataHora < now()] | order(dataHora desc) { nome, dataHora, local, href }`,
  );
  return docs.map(mapEvento);
}

export async function getPlataformas(): Promise<Plataforma[]> {
  const docs = await client.fetch<PlataformaDoc[]>(
    groq`*[_type == "plataforma"] | order(ordem asc) { nome, href }`,
  );
  return docs.map(mapPlataforma);
}

export async function getContacto(): Promise<{
  email: string;
  emailIsPlaceholder: boolean;
  redes: { nome: string; href: string; isPlaceholder: boolean }[];
}> {
  const doc = await client.fetch<ContactoDoc | null>(
    groq`*[_type == "contacto"][0] { email, redes }`,
  );
  return {
    email: doc?.email || "[EMAIL PARA PARCERIAS]",
    emailIsPlaceholder: !doc?.email,
    redes: (doc?.redes ?? []).map((r) => ({ ...r, isPlaceholder: false })),
  };
}
