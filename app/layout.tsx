import type { Metadata } from "next";
import { Fredoka, Public_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Geração Kwanza — Economia, Política e Sociedade de Angola",
  description:
    "Podcast e plataforma de conteúdo sobre economia, política e sociedade de Angola. Episódios, artigos e eventos de debate cívico.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-AO" className={`${fredoka.variable} ${publicSans.variable} h-full`}>
      <body id="topo" className="min-h-full bg-navy font-body antialiased">
        {/*
          THESIS: a civic-debate podcast that reads as a broadsheet front page,
          not a podcast template.
          OWN-WORLD: brief-pinned navy #14243E / gold #FFC20E / off-white
          #F7F5F0; deconstructed logo-frame + Pensador silhouette as the only
          two signature SVG marks; Fredoka display + Public Sans body;
          rectangular containers, rounding reserved for the signature marks.
          STORY: visitor sees the latest episode is worth their time, acts on
          it, then finds articles and events as evidence of an active,
          serious operation.
          FIRST VIEWPORT: navy hero, left-aligned, giant "EP. Nº" numeral in
          gold, title, guest/duration/theme line, two CTAs, video facade at
          right (stacked below on mobile), frame watermark bleeding off the
          top-right corner.
          FORM: brief-pinned direction, concept roll skipped — art direction
          explicitly fixed as "não reinterpretar" in the brief.
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, and DESIGN.md.
        */}
        {children}
      </body>
    </html>
  );
}
