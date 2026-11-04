import { defineField, defineType } from "sanity";
import { TEMA_OPTIONS } from "./temas";

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
      name: "temas",
      title: "Tema",
      type: "array",
      of: [{ type: "string" }],
      options: { list: TEMA_OPTIONS },
      description: "Aparece em destaque sobre a miniatura do vídeo no site. Normalmente um; marca dois só se o vídeo tratar mesmo dos dois.",
      validation: (Rule) => Rule.required().min(1),
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
    select: { title: "titulo", data: "data", temas: "temas" },
    prepare({ title, data, temas }) {
      const tema = Array.isArray(temas) && temas.length > 0 ? temas.join(" · ") : "Sem tema";
      return { title, subtitle: `${tema} — ${data ?? ""}` };
    },
  },
});
