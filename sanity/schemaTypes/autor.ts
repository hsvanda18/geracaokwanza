import { defineField, defineType } from "sanity";

export const autor = defineType({
  name: "autor",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      description: "Opcional — aparece na caixa \"Sobre o autor\" no fim do artigo.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Opcional — uma a três frases sobre a experiência do autor.",
    }),
  ],
  preview: {
    select: { title: "nome", media: "foto" },
  },
});
