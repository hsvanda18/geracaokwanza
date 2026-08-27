import { defineField, defineType } from "sanity";

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Usado para ligar a este evento a partir de notícias relacionadas.",
      options: { source: "nome", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dataHora",
      title: "Data e hora",
      type: "datetime",
      description: "O site mostra automaticamente o evento em \"Próximos\" ou \"Anteriores\" consoante esta data.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "local",
      title: "Local",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Opcional — página do evento, bilhetes, etc.",
    }),
  ],
  preview: {
    select: { title: "nome", subtitle: "local" },
  },
});
