import { defineField, defineType } from "sanity";
import { TEMA_OPTIONS } from "./temas";

export const artigo = defineType({
  name: "artigo",
  title: "Artigo",
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
      description: "Usado no endereço do artigo (/artigos/o-slug).",
      options: { source: "titulo", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead",
      type: "text",
      rows: 3,
      description: "Resumo de duas linhas que aparece nas listagens.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "corpo",
      title: "Corpo do artigo",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagens",
      title: "Fotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
        },
      ],
      description: "Opcional — fotos que acompanham o artigo.",
    }),
    defineField({
      name: "autor",
      title: "Autor",
      type: "reference",
      to: [{ type: "autor" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "data",
      title: "Data de publicação",
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
  ],
  preview: {
    select: { title: "titulo", subtitle: "tema", media: "imagens.0" },
  },
});
