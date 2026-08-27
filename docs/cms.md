# CMS — options and rationale

Before this migration, all content lived hardcoded in `lib/content.ts` —
only someone comfortable with code and Git could update it. This
documents the options considered and why Sanity was chosen.

## Requirements (confirmed with the site owner)

- A second editor with no technical background needs to publish content —
  rules out Git/Markdown-only workflows.
- Free tier only — no recurring cost.
- Hosted on Vercel.

## Options compared

| Option | Non-technical editor? | Free? | Fit with Next.js/Vercel |
|---|---|---|---|
| **Sanity.io** (chosen) | Yes — form-based Studio | Yes, 3 users included | Studio embeds directly in the app at `/studio`, no separate service |
| TinaCMS | Mostly — visual editing, but content is Markdown in Git under the hood | Yes | Good, but a steeper mental model for a non-technical second editor |
| Payload CMS | Yes — auto-generated admin | Self-hosted, needs its own database (Postgres/Mongo) | More moving parts than this site needs |
| Decap CMS (git-based) | Partially — simple form, no live preview | Yes | Generates GitHub commits; less actively developed |
| Airtable/Sheets | Yes | Yes | Doesn't handle long article bodies or images well |

**Why Sanity**: best free tier for this scale (3 users, 5GB assets),
Studio runs inside the same Next.js app/Vercel deployment (no extra
service to pay for or manage), and its editing UI is the most
non-technical-editor-friendly of the free options.

## What changed in the content model

- Every type in `lib/content.ts` maps to a Sanity document type in
  `sanity/schemaTypes/`. See that directory for the exact fields.
- `Evento` no longer has a manually-set "próximo vs. anterior" flag — it's
  computed from `dataHora` at query time (`dataHora >= now()`), so an
  editor can't forget to move a past event out of "Próximos".
- `Artigo.corpo` moved from a plain array of paragraph strings to Sanity's
  Portable Text (rich text) — rendered with `@portabletext/react` on
  `/artigos/[slug]`. This is the standard Sanity pattern and leaves room
  for bold/links/headings later without a further migration.
- `data`/`dataHora` fields are real Sanity `date`/`datetime` fields
  (calendar picker in the Studio), formatted for display via
  `lib/sanity/format.ts` — previously these were free-text Portuguese
  strings the editor had to type correctly by hand.
- The `isPlaceholder` flag and `PlaceholderTag` component (the dashed
  border / "Por preencher" tag) are kept for backward compatibility in the
  presentational components, but every Sanity-sourced item now reports
  `isPlaceholder: false` — with a real CMS, missing content simply isn't
  published yet, so the existing empty-state messages ("Ainda não há
  artigos...", "Sem eventos agendados...") cover that case instead of a
  visible bracket placeholder.
- A `noticia` can optionally reference a specific `evento` ("Evento
  relacionado" in the Studio). Each event row on `/eventos` has a stable
  anchor id from the event's `slug` field, and a linked notícia shows a
  small "Evento: [nome] →" chip pointing at it.

## Caching

`lib/sanity/client.ts` exports `sanityFetch()`, used by every function in
`lib/sanity/queries.ts` instead of calling `client.fetch()` directly. It
applies `next: { revalidate: 60 }` to every query — without this, Next.js's
default fetch caching keeps the *first* result forever, so an edit
published in the Studio would never reach the live site without a server
restart. This was caught and fixed during testing; the build output
confirms it (`Revalidate 1m` next to every route). A change in the Studio
takes up to 60 seconds to show up on the live site — normal ISR behavior,
not a bug. An on-demand revalidation webhook (instant instead of ≤60s) is
a possible future upgrade, not implemented.

## Running it

1. Copy `.env.local.example` to `.env.local` and fill in
   `NEXT_PUBLIC_SANITY_PROJECT_ID` (from sanity.io/manage).
2. `npm run dev`, then open `/studio` to create/edit content.
3. To seed the real content that used to be hardcoded (2 episódios, 1
   evento, YouTube, redes sociais): create an API token with Editor
   permissions at sanity.io/manage → API → Tokens, add it as
   `SANITY_API_WRITE_TOKEN` in `.env.local`, then `npm run seed`
   (`scripts/seed-sanity.mjs`). Safe to re-run.
