import { defineField, defineType } from "sanity";

export const sobre = defineType({
  name: "sobre",
  title: "Sobre nós",
  type: "document",
  fields: [
    defineField({
      name: "texto",
      title: "A nossa história",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Opcional — a história da Geração Kwanza, nas tuas palavras. Enquanto vazio, a página Sobre nós mostra só a apresentação padrão do site.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Sobre nós" };
    },
  },
});
