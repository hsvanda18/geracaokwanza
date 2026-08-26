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
      name: "resumo",
      title: "Resumo",
      type: "text",
      rows: 2,
      description: "Uma a duas frases factuais.",
      validation: (Rule) => Rule.required(),
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
  ],
  preview: {
    select: { title: "titulo", subtitle: "tema" },
  },
});
