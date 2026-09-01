/**
 * One-off migration: publishes the real notícia supplied by the site owner
 * about the "À Sombra da Mulemba" edition (2 de agosto de 2026), linked to
 * the existing evento "Dinheiro Não Fala Kimbundo?". Safe to re-run — fixed
 * _id, createOrReplace.
 *
 * Requires the same env vars as scripts/seed-sanity.mjs.
 * Run with: node scripts/seed-noticia-mulemba.mjs
 */
import { createClient } from "@sanity/client";
import { existsSync } from "node:fs";

if (existsSync(new URL("../.env.local", import.meta.url))) {
  process.loadEnvFile(new URL("../.env.local", import.meta.url));
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Faltam variáveis de ambiente: NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN são obrigatórias.",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-01-01", token, useCdn: false });

let contadorChave = 0;
function chave(prefixo = "k") {
  contadorChave += 1;
  return `${prefixo}${contadorChave}`;
}

function span(texto, marks = []) {
  return { _type: "span", _key: chave("s"), text: texto, marks };
}

function bloco(texto, opcoes = {}) {
  return {
    _type: "block",
    _key: chave("b"),
    style: opcoes.style ?? "normal",
    markDefs: [],
    children: [span(texto)],
  };
}

const p = (texto) => bloco(texto, { style: "normal" });
const citacao = (texto) => bloco(texto, { style: "blockquote" });

const corpo = [
  p(
    "No dia 2 de agosto, a Geração Kwanza levou o debate para fora do estúdio pela primeira vez. Em \"À Sombra da Mulemba\", reunimos economia, cultura e identidade numa só conversa: porque é que a literacia financeira chega quase sempre em língua estrangeira à cultura angolana?",
  ),
  citacao("O dinheiro fala a nossa língua? Ou aprendemos a falar a língua do dinheiro?"),
  p(
    "Num país onde a cultura molda a forma como vivemos, consumimos e tomamos decisões, esta edição promoveu uma conversa aberta, intergeracional e transformadora sobre como as nossas referências culturais influenciam a forma como lidamos com o dinheiro, a poupança, o investimento e o futuro — porque construir riqueza também passa por compreender quem somos.",
  ),
  p(
    "Com Roberto do Amaral (economista e analista no Ministério das Finanças) e Artur Filipe Vidal como prelectores, o encontro juntou uma roda de diálogo a um momento cultural — música, poesia e artes visuais — no Café Lu-Andu.",
  ),
  p(
    "Obrigado à CMC, ARSEG, Legal Talks Angola, Universitários Talk Show, Emainvest e Café Lu-Andu pelo apoio.",
  ),
];

const doc = {
  _id: "noticia-a-sombra-da-mulemba",
  _type: "noticia",
  slug: { _type: "slug", current: "a-sombra-da-mulemba" },
  titulo: "À Sombra da Mulemba: Geração Kwanza leva debate para fora do estúdio",
  resumo:
    "Em \"À Sombra da Mulemba\", a Geração Kwanza juntou economia, cultura e identidade num debate sobre literacia financeira, com Roberto do Amaral e Artur Filipe Vidal, no Café Lu-Andu.",
  corpo,
  data: "2026-08-26",
  tema: "ECONOMIA",
  href: "https://youtu.be/5z77LnaQPiA?si=Hot7ceiEar6LoFPx",
  evento: { _type: "reference", _ref: "evento-dinheiro-nao-fala-kimbundo" },
};

await client.createOrReplace(doc);
console.log(`✓ ${doc._type}/${doc._id}`);
