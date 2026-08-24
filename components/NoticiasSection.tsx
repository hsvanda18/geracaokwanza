import Link from "next/link";
import { noticias } from "@/lib/content";
import { NoticiaList } from "./NoticiaList";

const RECENTES_LIMIT = 3;

export function NoticiasSection() {
  if (noticias.length === 0) return null;

  return (
    <section id="noticias" className="bg-navy-ink py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-gold/30 pb-4">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-paper uppercase sm:text-3xl">
            Notícias
          </h2>
          <Link
            href="/noticias"
            className="font-body text-sm font-semibold tracking-wide text-gold uppercase transition-colors hover:text-paper"
          >
            Ver todas →
          </Link>
        </div>

        <NoticiaList noticias={noticias.slice(0, RECENTES_LIMIT)} />
      </div>
    </section>
  );
}
