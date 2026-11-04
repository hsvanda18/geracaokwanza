import { defineArrayMember, defineField, defineType } from "sanity";

const VAZIO = "Opcional — enquanto vazio, esta secção não aparece na página Sobre nós.";

export const sobre = defineType({
  name: "sobre",
  title: "Sobre nós",
  type: "document",
  groups: [
    { name: "apresentacao", title: "Apresentação", default: true },
    { name: "historia", title: "História" },
    { name: "missao", title: "Missão, visão e valores" },
    { name: "perguntas", title: "Perguntas frequentes" },
  ],
  fields: [
    defineField({
      name: "texto",
      title: "Quem somos",
      type: "array",
      of: [{ type: "block" }],
      group: "apresentacao",
      description:
        "Opcional — texto adicional por baixo da apresentação padrão do site, nas tuas palavras.",
    }),
    defineField({
      name: "marcos",
      title: "A nossa história",
      type: "array",
      group: "historia",
      description: `Os momentos marcantes da Geração Kwanza, por ordem — aparecem como uma linha do tempo. ${VAZIO}`,
      of: [
        defineArrayMember({
          type: "object",
          name: "marco",
          title: "Marco",
          fields: [
            defineField({
              name: "ano",
              title: "Ano",
              type: "string",
              description: 'Ex.: "2024".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "titulo", title: "Título", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "descricao", title: "Descrição", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "titulo", subtitle: "ano" } },
        }),
      ],
    }),
    defineField({
      name: "missao",
      title: "Missão",
      type: "text",
      rows: 4,
      group: "missao",
      description: VAZIO,
    }),
    defineField({
      name: "visao",
      title: "Visão",
      type: "text",
      rows: 4,
      group: "missao",
      description: VAZIO,
    }),
    defineField({
      name: "valores",
      title: "Os nossos valores",
      type: "array",
      group: "missao",
      description: `Idealmente três ou quatro. ${VAZIO}`,
      of: [
        defineArrayMember({
          type: "object",
          name: "valor",
          title: "Valor",
          fields: [
            defineField({ name: "titulo", title: "Valor", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "descricao", title: "Descrição", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "titulo", subtitle: "descricao" } },
        }),
      ],
    }),
    defineField({
      name: "perguntas",
      title: "Perguntas frequentes",
      type: "array",
      group: "perguntas",
      description: VAZIO,
      of: [
        defineArrayMember({
          type: "object",
          name: "pergunta",
          title: "Pergunta",
          fields: [
            defineField({ name: "pergunta", title: "Pergunta", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "resposta", title: "Resposta", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "pergunta", subtitle: "resposta" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Sobre nós" };
    },
  },
});
