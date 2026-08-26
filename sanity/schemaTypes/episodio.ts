import { defineField, defineType } from "sanity";
import { TEMA_OPTIONS } from "./temas";

export const episodio = defineType({
  name: "episodio",
  title: "Episódio",
  type: "document",
  fields: [
    defineField({
      name: "numero",
      title: "Número",
      type: "string",
      description: 'Com zeros à esquerda, ex.: "004" — define a ordem dos episódios.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "convidado",
      title: "Convidado",
      type: "string",
      description: "Se for igual ao título, o nome não é repetido no site.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duracao",
      title: "Duração",
      type: "string",
      description: 'Formato "h:mm:ss", ex.: "1:20:30".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "temas",
      title: "Temas",
      type: "array",
      of: [{ type: "string" }],
      options: { list: TEMA_OPTIONS },
      validation: (Rule) => Rule.required().min(1),
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
      description: 'A parte depois de "watch?v=" no link do YouTube — permite reproduzir o episódio sem sair do site.',
    }),
    defineField({
      name: "destaque",
      title: "Episódio em destaque",
      type: "boolean",
      description: "Aparece como episódio principal no topo da página inicial. Só um episódio deve estar marcado de cada vez.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "numero" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `EP. ${subtitle}` };
    },
  },
});
