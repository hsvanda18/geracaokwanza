import Image from "next/image";
import Link from "next/link";
import type { Episodio } from "@/lib/content";
import { PlaceholderTag } from "./PlaceholderTag";
import { ThemeTag } from "./ThemeTag";

/**
 * YouTube-style grid card for the /episodios catalogue (and the "mais
 * episódios" list on a watch page): real video thumbnail (fetched from
 * YouTube itself, since the id is real content). Clicking it navigates to
 * the episode's own watch page rather than playing inline — a grid cell is
 * too small to watch comfortably in place.
 */
export function EpisodeEntry({ ep }: { ep: Episodio }) {
  const thumbnail = ep.youtubeId ? `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg` : null;

  return (
    <li>
      <Link href={`/episodios/${ep.numero}`} className="group flex h-full flex-col border-2 border-gold">
        <div className="relative aspect-video w-full overflow-hidden border-b-2 border-gold bg-navy-ink">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, var(--color-gold) 0 2px, transparent 2px 26px)",
              }}
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-navy/20 transition-colors group-hover:bg-navy/50">
            <span className="flex h-14 w-14 items-center justify-center border-2 border-gold bg-navy/70 text-gold transition-transform group-hover:scale-110">
              <svg width="18" height="21" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
                <path d="M0 0 L22 13 L0 26 Z" />
              </svg>
            </span>
          </span>
          <span className="font-display absolute top-3 left-3 bg-navy/70 px-2 py-1 text-sm font-semibold text-gold">
            EP. {ep.numero}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-3">
            {ep.temas.map((tema) => (
              <ThemeTag key={tema} tema={tema} />
            ))}
            {ep.isPlaceholder && <PlaceholderTag className="border-gold/40 text-gold/60" />}
          </div>

          <h3 className="font-display mt-3 text-lg leading-snug font-semibold text-paper group-hover:underline">
            {ep.titulo}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-paper/70">
            {ep.convidado !== ep.titulo && <span>{ep.convidado}</span>}
            <span>{ep.duracao}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
