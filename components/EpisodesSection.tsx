import Link from "next/link";
import { getEpisodiosRecentes } from "@/lib/sanity/queries";
import { EpisodeEntry } from "./EpisodeEntry";
import { KwanzaFrame } from "./icons/KwanzaFrame";

export async function EpisodesSection() {
  const episodiosRecentes = await getEpisodiosRecentes();

  if (episodiosRecentes.length === 0) return null;

  return (
    <section id="episodios" className="relative overflow-hidden bg-navy py-16 sm:py-24">
      <KwanzaFrame
        size={520}
        color="var(--color-gold)"
        strokeWidth={20}
        className="pointer-events-none absolute -bottom-36 -left-40 opacity-[0.07]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <div className="pensador-rule flex-1 text-gold">
            <h2 className="font-display shrink-0 text-2xl font-semibold tracking-wide text-paper uppercase sm:text-3xl">
              Episódios recentes
            </h2>
          </div>
          <Link
            href="/episodios"
            className="font-body text-sm font-semibold tracking-wide text-gold uppercase transition-colors hover:text-paper"
          >
            Ver todos →
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodiosRecentes.map((ep) => (
            <EpisodeEntry key={ep.numero} ep={ep} />
          ))}
        </ul>
      </div>
    </section>
  );
}
