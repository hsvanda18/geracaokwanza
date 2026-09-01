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

const doc = {
  _id: "noticia-a-sombra-da-mulemba",
  _type: "noticia",
  slug: { _type: "slug", current: "a-sombra-da-mulemba" },
  titulo: "À Sombra da Mulemba: Geração Kwanza leva debate para fora do estúdio",
  resumo:
    "Em \"À Sombra da Mulemba\", a Geração Kwanza juntou economia, cultura e identidade num debate sobre literacia financeira, com Roberto do Amaral e Artur Filipe Vidal, no Café Lu-Andu.",
  data: "2026-08-26",
  tema: "ECONOMIA",
  href: "https://youtu.be/5z77LnaQPiA?si=Hot7ceiEar6LoFPx",
  evento: { _type: "reference", _ref: "evento-dinheiro-nao-fala-kimbundo" },
};

await client.createOrReplace(doc);
console.log(`✓ ${doc._type}/${doc._id}`);
