# Design

<!-- impeccable:design-schema 1 -->

## World

"An opinion newspaper with podcast energy" — brief-pinned, not rolled. The
Economist's editorial authority fused with Luanda street-poster graphic
force. Serious civic debate, never entertainment; bold in form, never
comedic. First surface: `app/page.tsx`.

## Palette

Exactly three colors, no fourth, no gradients — brief-pinned:

- `--color-navy` `#14243E` — dominant background.
- `--color-gold` `#FFC20E` — equal structural second color; owns full-bleed
  sections (Mission band), not just accents.
- `--color-paper` `#F7F5F0` — body text on navy, and the Articles section
  background.
- `--color-navy-ink` `#0E1A2C` — a darker navy utility shade (platform
  strip, episodes-adjacent surfaces, footer) used to vary depth within the
  navy family without introducing a fourth hue.

Rule with zero exceptions: white/paper text never sits on gold. Every
`bg-gold` pairing in the codebase uses `text-navy`.

## Type

- Display: **Fredoka** (`--font-display`), self-hosted via `next/font/google`,
  weights 500/600/700, uppercase in section headings — the rounded
  geometric face named in the brief.
- Body: **Public Sans** (`--font-body`), weights 400–700 — legible grotesque
  for long-form article reading.
- Editorial numerals: episode numbers set in Fredoka at poster scale
  (`EP. Nº` at up to 9rem in the hero) — the one deliberate exception to a
  general 6rem display ceiling, because the oversized numeral is the
  page's named signature move, not incidental emphasis.

## Signature marks

Two original SVG reconstructions, used everywhere except the Header/Footer
brand mark (user-confirmed exception below):

- `components/icons/KwanzaFrame.tsx` — the logo's concentric rounded-corner
  frame, rebuilt as a dashed rounded-rect stroke (round linecaps produce the
  bracket-arm curves) plus four small vesica "seed" shapes at the edge
  midpoints. Used as a low-opacity background watermark on hero/catalogue
  sections (Episódios, Notícias), never as a decorative border on ordinary
  content.
- `components/icons/Pensador.tsx` — a stylized seated, chin-on-fist
  silhouette. Used as: the favicon (`app/icon.svg`), the section-divider
  rule (`.pensador-rule`), the Eventos/Artigos hero mark, and the list
  bullet for articles, notícias, and upcoming events — replacing the
  generic numbered-list / colored-left-border patterns the craft floor
  bans.

**Header/Footer exception:** both use the real logo file
(`public/brand/geracao-kwanza-logo.png`, the supplied full lockup) directly
via `next/image`, sized with `h-9 w-auto sm:h-10` (Header, `priority` since
it's above the fold) and `h-10 w-auto` (Footer) — not the deconstructed
marks. This is the one place the "SVG reconstruction only" rule doesn't
apply, per explicit brand-owner direction; every other placement of the two
marks still follows it.

## Corner & border system

Rectangular by default — cards, buttons, images, containers all use sharp
corners. Rounding is reserved for the two signature marks (the frame motif
and the Pensador's circular head/fist) and the app icon's rounded-square
tile. No arbitrary `rounded-xl` grid.

Borders are always full 2px outlines (`border-2`) or full-width rules
(`border-t-2` / `border-b-2` / `divide-y-2`) in a brand color — never a
colored single-side accent border on a card or list item.

## Content hierarchy

Four content types, fixed order and never merged into one grid. Episódios,
Artigos, and Notícias each pair a homepage preview section with a dedicated
full-listing page; Eventos follows the same preview-plus-page pattern
instead of showing its full archive inline on the homepage:

1. **Episódios** — hero (latest) + `EpisodesSection` grid (recent) on the
   homepage; full catalogue at `/episodios` (`EpisodeEntry`). Poster cards:
   big `EP. Nº` numeral, theme tag, title, guest/duration footer. No
   photography (none was supplied, and gray placeholder thumbnails are
   banned) — the numeral and theme tag carry the visual weight instead.
2. **Artigos** — `ArticlesSection` preview on the homepage, off-white
   editorial list register (Fredoka titles, Public Sans leads, Pensador
   bullet, author/date); full catalogue with theme filter at `/artigos`
   (`ArticlesBrowser`), individual reading pages at `/artigos/[slug]`.
3. **Notícias** — `NoticiasSection` preview on the homepage, dark
   navy-ink register (distinct from Artigos' paper register): compact
   dated rows (`NoticiaList`) with theme tag, title, one/two-line summary,
   date — no author, no reading time, no per-item page, since a notícia is
   a quick factual update rather than long-form analysis. Full list at
   `/noticias`.
4. **Eventos** — `EventsSection` homepage preview (trimmed: up to 2
   upcoming, 3 past) linking to the full `/eventos` page (`EventList`,
   unsliced). Two unequal columns: Próximos (empty state when no real date
   is confirmed — never a fabricated entry) and Anteriores (compact
   archive list). `EventList` is shared between the preview and the full
   page so the two-column markup isn't duplicated.

`MissionBand` is the one full-gold section (brief requirement), a short,
factual statement of purpose tied to the three theme pillars — no invented
metrics or testimonials.

## Placeholder system

`lib/content.ts` is the single content source. Every field is a bracketed
placeholder (`[TÍTULO DO EPISÓDIO]`) with `isPlaceholder: true`; components
read that flag to render a dashed border + "Por preencher" tag so a
placeholder can never be mistaken for a shipped entry. Replacing the data
file with real content and flipping the flag is the entire integration
path — no component code changes needed.

## Motion

One authored moment: the hero numeral does a single clip-path reveal on
load (`numeral-reveal` keyframe, `prefers-reduced-motion` respected).
Everywhere else motion is a hover micro-interaction (CTA lift, card
hover-invert, play-button scale) — no fade-up-on-scroll applied uniformly
across sections.

## Accessibility

AA contrast throughout; gold-on-navy and navy-on-gold only. Visible
`:focus-visible` outline in gold. `::selection` themed. Video embeds use a
click-to-load facade (`components/VideoFacade.tsx`) — no iframe mounts
until the visitor clicks, and the control is `disabled` (not merely
inert-looking) when no real video ID exists yet.

## Known gaps (by design, not oversight)

No real episodes, articles, events, platform links, or contact email were
supplied — see `PRODUCT.md` § Evidence on Hand. The page is fully wired to
receive them via `lib/content.ts`.
