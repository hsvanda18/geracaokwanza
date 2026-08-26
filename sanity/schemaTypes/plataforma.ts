import { defineField, defineType } from "sanity";

export const plataforma = defineType({
  name: "plataforma",
  title: "Plataforma",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      description: 'Ex.: "YouTube", "Spotify", "Apple Podcasts".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ordem",
      title: "Ordem",
      type: "number",
      description: "Número menor aparece primeiro.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "nome" },
  },
});
