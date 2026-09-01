"use client";

import { useState } from "react";
import Image from "next/image";
import type { Episodio } from "@/lib/content";
import { PlaceholderTag } from "./PlaceholderTag";
import { ThemeTag } from "./ThemeTag";
import { VideoLightbox } from "./VideoLightbox";

/**
 * YouTube-style grid card for the /episodios catalogue: real video
 * thumbnail (fetched from YouTube itself, since the id is real content),
 * clicking it opens the cinema-mode VideoLightbox directly rather than an
 * inline embed — a grid cell is too small to watch comfortably in place.
 */
export function EpisodeEntry({ ep }: { ep: Episodio }) {
  const [aberto, setAberto] = useState(false);
  const thumbnail = ep.youtubeId ? `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg` : null;

  return (
    <li id={`ep-${ep.numero}`} className="scroll-mt-24">
      <div className="flex h-full flex-col border-2 border-gold">
        <button
          type="button"
          onClick={() => ep.youtubeId && setAberto(true)}
          disabled={!ep.youtubeId}
          aria-label={ep.youtubeId ? `Reproduzir: ${ep.titulo}` : "Vídeo por fornecer"}
          className="group relative aspect-video w-full overflow-hidden border-b-2 border-gold bg-navy-ink disabled:cursor-not-allowed"
        >
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform group-enabled:group-hover:scale-105"
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
          <span className="absolute inset-0 flex items-center justify-center bg-navy/20 transition-colors group-enabled:group-hover:bg-navy/50">
            <span className="flex h-14 w-14 items-center justify-center border-2 border-gold bg-navy/70 text-gold transition-transform group-enabled:group-hover:scale-110">
              <svg width="18" height="21" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
                <path d="M0 0 L22 13 L0 26 Z" />
              </svg>
            </span>
          </span>
          <span className="font-display absolute top-3 left-3 bg-navy/70 px-2 py-1 text-sm font-semibold text-gold">
            EP. {ep.numero}
          </span>
        </button>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-3">
            {ep.temas.map((tema) => (
              <ThemeTag key={tema} tema={tema} />
            ))}
            {ep.isPlaceholder && <PlaceholderTag className="border-gold/40 text-gold/60" />}
          </div>

          <h3 className="font-display mt-3 text-lg leading-snug font-semibold text-paper">{ep.titulo}</h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-paper/70">
            {ep.convidado !== ep.titulo && <span>{ep.convidado}</span>}
            <span>{ep.duracao}</span>
          </div>

          {ep.href !== "#" && (
            <a
              href={ep.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-4 font-body text-xs font-semibold tracking-wide text-paper/50 uppercase transition-colors hover:text-gold"
            >
              Ver no YouTube ↗
            </a>
          )}
        </div>
      </div>

      {ep.youtubeId && (
        <VideoLightbox youtubeId={ep.youtubeId} title={ep.titulo} open={aberto} onClose={() => setAberto(false)} />
      )}
    </li>
  );
}
