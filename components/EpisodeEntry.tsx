import type { Episodio } from "@/lib/content";
import { PlaceholderTag } from "./PlaceholderTag";
import { ThemeTag } from "./ThemeTag";
import { VideoFacade } from "./VideoFacade";

/**
 * Full-width episode block for the dedicated /episodios page: plays on the
 * site itself via the lazy facade, so watching an episode never has to mean
 * leaving for youtube.com. The direct YouTube link stays available, but
 * de-emphasized — a secondary option, not the default action.
 */
export function EpisodeEntry({ ep }: { ep: Episodio }) {
  return (
    <li id={`ep-${ep.numero}`} className="scroll-mt-24 border-b-2 border-gold/20 py-12 first:pt-0 last:border-b-0">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {ep.temas.map((tema) => (
              <ThemeTag key={tema} tema={tema} />
            ))}
            {ep.isPlaceholder && <PlaceholderTag className="border-gold/40 text-gold/60" />}
          </div>

          <p className="font-display mt-4 text-5xl font-semibold text-gold sm:text-6xl">
            EP. {ep.numero}
          </p>

          <h2 className="font-display mt-3 max-w-xl text-2xl leading-snug font-semibold text-paper sm:text-3xl">
            {ep.titulo}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-paper/70">
            {ep.convidado !== ep.titulo && <span>Com {ep.convidado}</span>}
            <span>{ep.duracao}</span>
          </div>

          {ep.href !== "#" && (
            <a
              href={ep.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-wide text-paper/50 uppercase transition-colors hover:text-gold"
            >
              Ver no YouTube ↗
            </a>
          )}
        </div>

        <VideoFacade youtubeId={ep.youtubeId} title={ep.titulo} />
      </div>
    </li>
  );
}
