/**
 * One-off migration: seeds the real content that used to live hardcoded in
 * lib/content.ts (before the Sanity CMS migration) into a fresh Sanity
 * dataset. Safe to re-run — every document uses a fixed _id, so re-running
 * overwrites (createOrReplace) instead of duplicating.
 *
 * Requires SANITY_API_WRITE_TOKEN (create one with "Editor" permissions at
 * sanity.io/manage → your project → API → Tokens) plus the same
 * NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET used by the app.
 *
 * Run with: node scripts/seed-sanity.mjs
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

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

const documentos = [
  {
    _id: "episodio-003",
    _type: "episodio",
    numero: "003",
    titulo: "Carmen Mateia",
    convidado: "Carmen Mateia",
    duracao: "1:20:30",
    temas: ["SOCIEDADE"],
    href: "https://www.youtube.com/watch?v=EraMCtSh40M&t=24s",
    youtubeId: "EraMCtSh40M",
    destaque: true,
  },
  {
    _id: "episodio-002",
    _type: "episodio",
    numero: "002",
    titulo: "Mateus Maquiadi",
    convidado: "Mateus Maquiadi",
    duracao: "1:13:36",
    temas: ["POLÍTICA", "ECONOMIA"],
    href: "https://www.youtube.com/watch?v=Pde8ulKCR8U",
    youtubeId: "Pde8ulKCR8U",
    destaque: false,
  },
  {
    _id: "episodio-001",
    _type: "episodio",
    numero: "001",
    titulo: "Victor Massiala",
    convidado: "Victor Massiala",
    duracao: "1:00:17",
    temas: ["SOCIEDADE"],
    href: "https://www.youtube.com/watch?v=Ao8qlJ-UJAU",
    youtubeId: "Ao8qlJ-UJAU",
    destaque: false,
  },
  {
    _id: "evento-dinheiro-nao-fala-kimbundo",
    _type: "evento",
    nome: "Dinheiro Não Fala Kimbundo?",
    dataHora: "2026-08-02T16:00:00+01:00",
    local: "Café Lu-Andu, Rua Direita do Patriota",
  },
  {
    _id: "plataforma-youtube",
    _type: "plataforma",
    nome: "YouTube",
    href: "https://www.youtube.com/channel/UCrM_cDrF_GgEYFYUau2xDHQ",
    ordem: 0,
  },
  {
    _id: "contacto",
    _type: "contacto",
    redes: [
      {
        _key: "facebook",
        nome: "Facebook",
        href: "https://www.facebook.com/p/Gera%C3%A7%C3%A3o-Kwanza-61581071739571/",
      },
      { _key: "instagram", nome: "Instagram", href: "https://www.instagram.com/geracaokwanza/" },
      {
        _key: "linkedin",
        nome: "LinkedIn",
        href: "https://www.linkedin.com/company/gera%C3%A7%C3%A3o-kwanza?originalSubdomain=ao",
      },
    ],
    // email: deliberately left unset — not confirmed yet, per the "never
    // fabricate content" rule. The site shows a visible placeholder until
    // it's filled in here.
  },
];

for (const doc of documentos) {
  await client.createOrReplace(doc);
  console.log(`✓ ${doc._type}/${doc._id}`);
}

console.log(`\nFeito — ${documentos.length} documentos criados/atualizados no dataset "${dataset}".`);
