import Link from "next/link";
import { tempoDeLeitura, type Artigo } from "@/lib/content";
import { Pensador } from "./icons/Pensador";
import { PlaceholderTag } from "./PlaceholderTag";
import { ThemeTag } from "./ThemeTag";

export function ArticleList({ artigos }: { artigos: Artigo[] }) {
  return (
    <ul className="divide-y-2 divide-navy/15">
      {artigos.map((artigo) => (
        <li key={artigo.slug}>
          <Link
            href={`/artigos/${artigo.slug}`}
            className="group grid gap-3 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8"
          >
            <Pensador size={22} color="var(--color-navy)" className="mt-1 opacity-30" />

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <ThemeTag tema={artigo.tema} dark />
                {artigo.isPlaceholder && <PlaceholderTag className="border-navy/30 text-navy/50" />}
              </div>
              <h3 className="font-display text-xl leading-snug font-semibold group-hover:underline sm:text-2xl">
                {artigo.titulo}
              </h3>
              <p className="mt-2 max-w-2xl font-body text-[0.95rem] leading-relaxed opacity-80">
                {artigo.lead}
              </p>
            </div>

            <div className="font-body text-sm font-semibold whitespace-nowrap opacity-70 sm:text-right">
              {artigo.autor}
              <br />
              {artigo.data}
              <br />
              <span className="opacity-70">{tempoDeLeitura(artigo)} min de leitura</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
