import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Outro vídeo",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 2,
      description: "Opcional — uma a duas frases sobre o vídeo.",
    }),
    defineField({
      name: "href",
      title: "Link do YouTube",
      type: "url",
    }),
    defineField({
      name: "youtubeId",
      title: "ID do vídeo do YouTube",
      type: "string",
      description: 'A parte depois de "watch?v=" no link — permite reproduzir sem sair do site.',
    }),
    defineField({
      name: "data",
      title: "Data de publicação",
      type: "date",
      description: "Usada para ordenar os vídeos, mais recente primeiro.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "data" },
  },
});
