import { defineField, defineType } from "sanity";

export const contacto = defineType({
  name: "contacto",
  title: "Contacto",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email para parcerias",
      type: "string",
      description: "Deixa vazio até haver um email confirmado — o site mostra um marcador visível enquanto isto não for preenchido.",
    }),
    defineField({
      name: "redes",
      title: "Redes sociais",
      type: "array",
      of: [
        {
          type: "object",
          name: "rede",
          fields: [
            defineField({ name: "nome", title: "Nome", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Link", type: "url", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "nome", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contacto" };
    },
  },
});
