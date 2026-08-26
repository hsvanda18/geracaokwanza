# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript, Tailwind CSS). User-confirmed choice via structured question (options offered: static HTML/CSS, React+Tailwind/Vite, Next.js).

Content management: Sanity (headless CMS, free tier), chosen so a second, non-technical editor can publish without touching code — see `docs/cms.md` for the full options comparison and rationale. The Studio (the editing UI) is embedded in the app itself at `/studio`, no separate service to host. All content (episódios, artigos, notícias, eventos, plataformas, contacto) is fetched server-side from Sanity via `lib/sanity/queries.ts`; nothing is hardcoded in the app anymore.

## Users

General audience ("público geral / todos os públicos") — user-confirmed. Not narrowed to youth or academics specifically. Copy register: serious but accessible, no assumption of academic background or niche slang. People interested in Angolan economy, politics, and society who want civic debate content, not entertainment.

## Product Purpose

Geração Kwanza is a podcast and content platform covering economy, politics, and society in Angola. It exists to host serious civic debate in a bold, distinctive form — "an opinion newspaper with podcast energy." Success is the visitor engaging with the primary content type (episodes) and, secondarily, discovering articles and events.

## Positioning

Not comedy, not entertainment — civic debate with strong editorial identity. Positioned as "The Economist meets a Luanda street poster": serious substance, graphically bold delivery. This combination (rigorous Angola-specific political/economic analysis + poster-grade visual identity) is the differentiator from both dry policy podcasts and generic entertainment podcast templates.

## Operating Context

Four content types, in this fixed priority order:
1. **Episódios** (recorded video/audio) — primary, protagonist content type.
2. **Artigos** — written analysis, editorial register.
3. **Notícias** — short, dated factual updates (title, one/two-line summary, date, theme tag); no full body, no dedicated per-item page — a quick-update register, distinct from Artigos' long-form analysis.
4. **Eventos** — past (archive) and future (agenda), shown as two unequal columns (upcoming vs. past), not merged.

Episódios, Artigos, and Notícias each get a homepage preview (recent items + "Ver todos/todas" link) plus a dedicated full-listing page (`/episodios`, `/artigos`, `/noticias`). Eventos follows the same preview-plus-dedicated-page pattern (`/eventos`) rather than showing its full archive inline on the homepage.

Primary single call-to-action across the page: listen to / watch the latest episode (user-confirmed). Everything else is secondary and must not compete visually with this action.

## Capabilities and Constraints

- Content categorization: episodes/articles are tagged by theme — ECONOMIA / POLÍTICA / SOCIEDADE — as consistent thematic labels.
- All content (episódios, artigos, notícias, eventos, plataformas, contacto) now lives in Sanity, not hardcoded — see `docs/cms.md`. Per the original build instruction, nothing was ever fabricated; that principle now takes the form of Sanity documents simply not existing until real content is published, which the site's existing empty-state messages already handle, rather than requiring visible `[BRACKETED]` markers. The one exception still rendering visibly is the "Por preencher" tag on the partnership email in the footer, since that's a single always-present field rather than a collection.
- Podcast distribution platforms (YouTube, Spotify, Apple Podcasts, etc.): only platforms where the podcast genuinely exists should be shown — now an editorial decision made by adding/removing `plataforma` documents in the Studio, not a build-time constraint.
- Contact/partnership email is unconfirmed — undecided; editable at `/studio` → Contacto once confirmed.
- Copy must be 100% European/Angolan Portuguese (português de Angola).

## Brand Commitments

Existing logo assets were supplied (icon mark + full lockup "GERAÇÃO KWANZA"): a navy-and-yellow geometric badge with concentric rounded-corner frames (echoing coffee-bean/kwanza-seed motifs at the frame midpoints) and a small Pensador (The Thinker) silhouette at the center.

The user's briefing fixes the visual direction as binding, not a starting point for reinterpretation:
- Palette locked to exactly three colors: deep navy `#14243E` (dominant background), vivid yellow `#FFC20E` (equal structural second color — used in full-bleed sections, not just accents), off-white `#F7F5F0` (body text on navy only). No fourth color, no gradients.
- Two mandatory signature graphic elements, rebuilt as original SVG rather than pasted logo rasters, used everywhere except the Header/Footer brand mark (see below): (1) the logo's concentric rounded-corner frame pattern, deconstructed and reused as a highlight frame / section watermark / subtle background pattern; (2) the Pensador silhouette, used discreetly as a section divider / bullet / favicon element.
- User-confirmed exception: the Header and Footer brand mark uses the actual supplied logo file (`public/brand/geracao-kwanza-logo.png`) directly, full lockup (icon + wordmark) as one image — not the deconstructed SVG reconstruction. Every other use of the two signature marks (hero/section watermarks, dividers, bullets, favicon) still follows the SVG-only rule above.
- One consistent corner-radius system (either strongly rounded, echoing the logo, or fully rectangular) — no mixing arbitrary radii.
- Typography: heavy geometric rounded display face for section titles (uppercase), a legible grotesque/humanist sans for long-form article reading, and large "editorial numeral" treatment for episode numbers (e.g. `EP. 042`).
- Accessibility-driven contrast rule that is also a brand rule: white text is never placed on the yellow background (fails contrast); navy-on-yellow and yellow-on-navy are the only allowed high-contrast pairings.

## Evidence on Hand

- Logo asset: full lockup with wordmark, confirmed and supplied as a transparent PNG (saved to `public/brand/geracao-kwanza-logo.png`; 1600×901). No separate icon-only file was supplied.
- Real data exists for 3 episódios, 1 evento, the YouTube platform link, and social links (Facebook/Instagram/LinkedIn) — migrated into Sanity via `npm run seed`. No real artigos, notícias, or partnership email have been supplied yet; these stay empty in Sanity until confirmed. No testimonials or metrics were ever supplied and none should be fabricated.
- A competitor/reference site screenshot ("PotShow" podcast template) was supplied explicitly as an anti-reference: its energetic/comedic tone and general layout ideas may inform structure, but its color palette (purple/neon), centered-hero-with-two-buttons pattern, cropped laughing-photo style, invented metrics, and fake testimonial section are explicitly excluded.

## Product Principles

1. Episodes lead, articles inform, notícias give quick factual updates, events are supporting evidence of activity — this hierarchy governs page order and visual weight, never a single undifferentiated content grid.
2. Never invent content, metrics, or quotes. Missing real data becomes a visible placeholder, not plausible filler.
3. The page's graphic identity must be irreplaceable — built from the deconstructed logo pattern and the Pensador mark, not swappable with a generic podcast template if the logo were removed.
4. One primary action (listen/watch latest episode) dominates; everything else is deliberately secondary.
5. Serious civic register throughout — no comedic tone, no entertainment-podcast visual clichés, no hollow marketing copy.

## Accessibility & Inclusion

AA contrast required. Yellow `#FFC20E` on navy passes; navy text on yellow passes; white text on yellow is prohibited project-wide. Visible focus states and full keyboard navigability are required. Video/audio embeds must lazy-load via a facade pattern (thumbnail + button, iframe only after click).
