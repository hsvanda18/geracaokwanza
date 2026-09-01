import type { PortableTextBlock } from "@portabletext/types";

/**
 * Shared content types and the one remaining pure helper. Actual content
 * now lives in Sanity — see lib/sanity/queries.ts for the fetch functions
 * that return data shaped to these types.
 */

export type Tema = "ECONOMIA" | "POLÍTICA" | "SOCIEDADE";

export const TEMAS: Tema[] = ["ECONOMIA", "POLÍTICA", "SOCIEDADE"];

export type Imagem = {
  url: string;
  largura: number;
  altura: number;
  alt?: string;
};

export type Autor = {
  nome: string;
  foto?: Imagem;
  bio?: string;
};

export type Episodio = {
  numero: string;
  titulo: string;
  convidado: string;
  duracao: string;
  /** Usually one tag; some conversations genuinely span two. */
  temas: Tema[];
  href: string;
  youtubeId?: string;
  isPlaceholder: boolean;
};

export type Artigo = {
  slug: string;
  titulo: string;
  lead: string;
  corpo: PortableTextBlock[];
  imagens?: Imagem[];
  autor: Autor;
  data: string;
  tema: Tema;
  isPlaceholder: boolean;
};

export type Evento = {
  slug: string;
  nome: string;
  data: string;
  local: string;
  href?: string;
  isPlaceholder: boolean;
};

export type Noticia = {
  slug: string;
  titulo: string;
  resumo: string;
  /** Optional longer-form content for the detail page; falls back to `resumo` when absent. */
  corpo?: PortableTextBlock[];
  imagens?: Imagem[];
  data: string;
  tema: Tema;
  href?: string;
  /** Set when this notícia is about a specific evento — links to it on /eventos. */
  eventoRelacionado?: { nome: string; slug: string };
  isPlaceholder: boolean;
};

export type Plataforma = {
  nome: string;
  href: string;
  isPlaceholder: boolean;
};

/** Estimated minutes to read, from the article's real word count (200 wpm). */
export function tempoDeLeitura(artigo: Artigo): number {
  const palavras = artigo.corpo
    .flatMap((bloco) => ("children" in bloco ? bloco.children : []))
    .map((filho) => ("text" in filho ? String(filho.text) : ""))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(palavras / 200));
}
