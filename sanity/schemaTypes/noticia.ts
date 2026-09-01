import { defineField, defineType } from "sanity";
import { TEMA_OPTIONS } from "./temas";

export const noticia = defineType({
  name: "noticia",
  title: "Notícia",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Usado no endereço da notícia (/noticias/o-slug).",
      options: { source: "titulo", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resumo",
      title: "Resumo",
      type: "text",
      rows: 2,
      description: "Uma a duas frases factuais — aparece nas listagens.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "corpo",
      title: "Conteúdo completo",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Opcional — texto mais desenvolvido para a página de detalhe. Se vazio, a página de detalhe mostra só o resumo.",
    }),
    defineField({
      name: "data",
      title: "Data",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tema",
      title: "Tema",
      type: "string",
      options: { list: TEMA_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link da fonte",
      type: "url",
      description: "Opcional — se preenchido, a notícia liga para a fonte original.",
    }),
    defineField({
      name: "evento",
      title: "Evento relacionado",
      type: "reference",
      to: [{ type: "evento" }],
      description: "Opcional — se esta notícia é sobre um evento específico, liga-a aqui.",
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "tema" },
  },
});
