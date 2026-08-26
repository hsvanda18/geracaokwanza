import Link from "next/link";
import { getEpisodiosRecentes } from "@/lib/sanity/queries";
import { KwanzaFrame } from "./icons/KwanzaFrame";
import { PlaceholderTag } from "./PlaceholderTag";
import { ThemeTag } from "./ThemeTag";

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
          {episodiosRecentes.map((ep, i) => (
            <li key={i}>
              <Link
                href={`/episodios#ep-${ep.numero}`}
                className={`group flex h-full flex-col border-2 p-6 transition-colors ${
                  ep.isPlaceholder
                    ? "border-dashed border-gold/50"
                    : "border-gold hover:bg-gold hover:text-navy"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="flex flex-wrap items-center gap-3">
                    {ep.temas.map((tema) => (
                      <ThemeTag key={tema} tema={tema} />
                    ))}
                  </span>
                  {ep.isPlaceholder && <PlaceholderTag className="border-gold/40 text-gold/60" />}
                </div>

                <p className="font-display mt-4 text-4xl font-semibold text-gold group-hover:text-navy">
                  EP. {ep.numero}
                </p>

                <h3 className="font-display mt-3 text-lg leading-snug font-semibold text-paper group-hover:text-navy">
                  {ep.titulo}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-6 font-body text-xs text-paper/70 group-hover:text-navy/80">
                  {ep.convidado !== ep.titulo && <span>{ep.convidado}</span>}
                  <span className="ml-auto">{ep.duracao}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
