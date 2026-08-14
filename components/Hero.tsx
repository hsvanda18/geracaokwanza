import Link from "next/link";
import { ultimoEpisodio } from "@/lib/content";
import { KwanzaFrame } from "./icons/KwanzaFrame";
import { ThemeTag } from "./ThemeTag";
import { VideoFacade } from "./VideoFacade";

export function Hero() {
  const ep = ultimoEpisodio;

  return (
    <section id="ultimo-episodio" className="relative overflow-hidden border-b-2 border-gold/30 bg-navy">
      <KwanzaFrame
        size={780}
        color="var(--color-gold)"
        strokeWidth={26}
        nested
        className="pointer-events-none absolute -top-40 -right-56 opacity-[0.08] sm:opacity-[0.1]"
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
        <div>
          <span className="sr-only">Último episódio:</span>
          <p className="font-display hero-numeral text-[clamp(4.5rem,18vw,9rem)] leading-[0.82] font-semibold text-gold">
            EP. {ep.numero}
          </p>

          <h1 className="font-display mt-4 max-w-2xl text-[clamp(1.75rem,4.4vw,3rem)] leading-[1.05] font-semibold text-paper">
            {ep.titulo}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm text-paper/80">
            {ep.convidado !== ep.titulo && (
              <>
                <span>
                  Com <span className="font-semibold text-paper">{ep.convidado}</span>
                </span>
                <span aria-hidden="true" className="text-gold">
                  •
                </span>
              </>
            )}
            <span>{ep.duracao}</span>
            <span aria-hidden="true" className="text-gold">
              •
            </span>
            <span className="flex flex-wrap items-center gap-3">
              {ep.temas.map((tema) => (
                <ThemeTag key={tema} tema={tema} />
              ))}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/episodios"
              className="border-2 border-gold bg-gold px-6 py-3 font-body text-sm font-bold tracking-[0.08em] text-navy uppercase transition-transform hover:-translate-y-0.5"
            >
              Ver todos os episódios
            </Link>
            {ep.href !== "#" && (
              <a
                href={ep.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs font-semibold tracking-wide text-paper/50 uppercase transition-colors hover:text-gold"
              >
                Ver no YouTube ↗
              </a>
            )}
          </div>
        </div>

        <div className="lg:pb-1">
          <p className="mb-3 font-body text-xs font-bold tracking-[0.18em] text-gold/80 uppercase">
            Ouve aqui, sem sair da página
          </p>
          <VideoFacade youtubeId={ep.youtubeId} title={ep.titulo} />
        </div>
      </div>
    </section>
  );
}
