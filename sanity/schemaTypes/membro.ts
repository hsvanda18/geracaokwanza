import { defineField, defineType } from "sanity";

export const membro = defineType({
  name: "membro",
  title: "Membro da equipa",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cargo",
      title: "Cargo",
      type: "string",
      description: 'Ex.: "Fundador", "Apresentador", "Produtora".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      description: "Opcional — aparece na página Sobre nós.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "Opcional — uma a duas frases.",
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Opcional — LinkedIn ou outra rede social.",
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
    select: { title: "nome", subtitle: "cargo", media: "foto" },
  },
});
