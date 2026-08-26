import Link from "next/link";
import { getArtigos } from "@/lib/sanity/queries";
import { ArticleList } from "./ArticleList";

const RECENTES_LIMIT = 3;

export async function ArticlesSection() {
  const artigos = await getArtigos();

  if (artigos.length === 0) return null;

  return (
    <section id="artigos" className="bg-paper py-16 text-navy sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-navy pb-4">
          <h2 className="font-display text-2xl font-semibold tracking-wide uppercase sm:text-3xl">
            Artigos
          </h2>
          <Link
            href="/artigos"
            className="font-body text-sm font-semibold tracking-wide uppercase opacity-70 transition-opacity hover:opacity-100"
          >
            Ver todos →
          </Link>
        </div>

        <ArticleList artigos={artigos.slice(0, RECENTES_LIMIT)} />
      </div>
    </section>
  );
}
