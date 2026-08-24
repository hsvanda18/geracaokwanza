/**
 * Single source of truth for real-world content on the landing page.
 *
 * Nothing below was supplied by Geração Kwanza at build time. Every field
 * is a visible placeholder, never invented copy — per the brief, missing
 * content must never be filled with plausible-sounding fakes. Replace the
 * placeholder strings with real data and the cards render normally; the
 * dashed "placeholder" styling in the components reads off `isPlaceholder`.
 */

export type Tema = "ECONOMIA" | "POLÍTICA" | "SOCIEDADE";

export const TEMAS: Tema[] = ["ECONOMIA", "POLÍTICA", "SOCIEDADE"];

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
  /** Full post body, one paragraph per entry — the blog-post reading page. */
  corpo: string[];
  autor: string;
  data: string;
  tema: Tema;
  isPlaceholder: boolean;
};

export type Evento = {
  nome: string;
  data: string;
  local: string;
  href?: string;
  isPlaceholder: boolean;
};

export type Noticia = {
  titulo: string;
  resumo: string;
  data: string;
  tema: Tema;
  /** Optional link to the original source; unlinked when no source is confirmed. */
  href?: string;
  isPlaceholder: boolean;
};

export type Plataforma = {
  nome: string;
  href: string;
  isPlaceholder: boolean;
};

export const ultimoEpisodio: Episodio = {
  numero: "003",
  titulo: "Carmen Mateia",
  convidado: "Carmen Mateia",
  duracao: "1:20:30",
  temas: ["SOCIEDADE"],
  href: "https://www.youtube.com/watch?v=EraMCtSh40M&t=24s",
  youtubeId: "EraMCtSh40M",
  isPlaceholder: false,
};

export const episodiosRecentes: Episodio[] = [
  {
    numero: "002",
    titulo: "Mateus Maquiadi",
    convidado: "Mateus Maquiadi",
    duracao: "1:13:36",
    temas: ["POLÍTICA", "ECONOMIA"],
    href: "https://www.youtube.com/watch?v=Pde8ulKCR8U",
    youtubeId: "Pde8ulKCR8U",
    isPlaceholder: false,
  },
  {
    numero: "001",
    titulo: "Victor Massiala",
    convidado: "Victor Massiala",
    duracao: "1:00:17",
    temas: ["SOCIEDADE"],
    href: "https://www.youtube.com/watch?v=Ao8qlJ-UJAU",
    youtubeId: "Ao8qlJ-UJAU",
    isPlaceholder: false,
  },
];

/** Full episode catalogue, newest first — the /episodios page's source. */
export const episodios: Episodio[] = [ultimoEpisodio, ...episodiosRecentes];

const CORPO_PLACEHOLDER = [
  "[CORPO DO ARTIGO — texto completo por fornecer. Este parágrafo é um marcador visível, nunca conteúdo inventado.]",
];

export const artigos: Artigo[] = [
  {
    slug: "artigo-economia",
    titulo: "[TÍTULO DO ARTIGO]",
    lead: "[Lead do artigo — duas linhas de resumo que situam o argumento central do texto.]",
    corpo: CORPO_PLACEHOLDER,
    autor: "[NOME DO AUTOR]",
    data: "[DATA]",
    tema: "ECONOMIA",
    isPlaceholder: true,
  },
  {
    slug: "artigo-politica",
    titulo: "[TÍTULO DO ARTIGO]",
    lead: "[Lead do artigo — duas linhas de resumo que situam o argumento central do texto.]",
    corpo: CORPO_PLACEHOLDER,
    autor: "[NOME DO AUTOR]",
    data: "[DATA]",
    tema: "POLÍTICA",
    isPlaceholder: true,
  },
  {
    slug: "artigo-sociedade",
    titulo: "[TÍTULO DO ARTIGO]",
    lead: "[Lead do artigo — duas linhas de resumo que situam o argumento central do texto.]",
    corpo: CORPO_PLACEHOLDER,
    autor: "[NOME DO AUTOR]",
    data: "[DATA]",
    tema: "SOCIEDADE",
    isPlaceholder: true,
  },
];

export const noticias: Noticia[] = [
  {
    titulo: "[TÍTULO DA NOTÍCIA]",
    resumo: "[Resumo da notícia — uma a duas frases, factuais, sem especulação.]",
    data: "[DATA]",
    tema: "ECONOMIA",
    isPlaceholder: true,
  },
  {
    titulo: "[TÍTULO DA NOTÍCIA]",
    resumo: "[Resumo da notícia — uma a duas frases, factuais, sem especulação.]",
    data: "[DATA]",
    tema: "POLÍTICA",
    isPlaceholder: true,
  },
  {
    titulo: "[TÍTULO DA NOTÍCIA]",
    resumo: "[Resumo da notícia — uma a duas frases, factuais, sem especulação.]",
    data: "[DATA]",
    tema: "SOCIEDADE",
    isPlaceholder: true,
  },
];

/** No confirmed future events. Per brief: never invent one. */
export const proximosEventos: Evento[] = [];

export const eventosAnteriores: Evento[] = [
  {
    nome: "Dinheiro Não Fala Kimbundo?",
    data: "2 de agosto de 2026 · 16h00",
    local: "Café Lu-Andu, Rua Direita do Patriota",
    isPlaceholder: false,
  },
];

export const plataformas: Plataforma[] = [
  {
    nome: "YouTube",
    href: "https://www.youtube.com/channel/UCrM_cDrF_GgEYFYUau2xDHQ",
    isPlaceholder: false,
  },
];

/** Estimated minutes to read, from the article's real word count (200 wpm). */
export function tempoDeLeitura(artigo: Artigo): number {
  const palavras = artigo.corpo.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(palavras / 200));
}

export const contacto = {
  email: "[EMAIL PARA PARCERIAS]",
  emailIsPlaceholder: true,
  redes: [
    {
      nome: "Facebook",
      href: "https://www.facebook.com/p/Gera%C3%A7%C3%A3o-Kwanza-61581071739571/",
      isPlaceholder: false,
    },
    {
      nome: "Instagram",
      href: "https://www.instagram.com/geracaokwanza/",
      isPlaceholder: false,
    },
    {
      nome: "LinkedIn",
      href: "https://www.linkedin.com/company/gera%C3%A7%C3%A3o-kwanza?originalSubdomain=ao",
      isPlaceholder: false,
    },
  ],
};
