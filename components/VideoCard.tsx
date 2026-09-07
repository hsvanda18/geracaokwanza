"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/lib/content";
import { VideoLightbox } from "./VideoLightbox";

/**
 * Lighter-weight card for "outros vídeos" — YouTube content that isn't a
 * numbered podcast episódio (no guest, duration, or temas required).
 * Opens straight into the cinema-mode VideoLightbox on click, since these
 * don't get their own watch page.
 */
export function VideoCard({ video }: { video: Video }) {
  const [aberto, setAberto] = useState(false);
  const thumbnail = video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : null;

  return (
    <li className="flex h-full flex-col border-2 border-gold">
      <button
        type="button"
        onClick={() => video.youtubeId && setAberto(true)}
        disabled={!video.youtubeId}
        aria-label={video.youtubeId ? `Reproduzir: ${video.titulo}` : "Vídeo por fornecer"}
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
          <span className="flex h-12 w-12 items-center justify-center border-2 border-gold bg-navy/70 text-gold transition-transform group-enabled:group-hover:scale-110">
            <svg width="16" height="19" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
              <path d="M0 0 L22 13 L0 26 Z" />
            </svg>
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug font-semibold text-paper">{video.titulo}</h3>
        {video.descricao && (
          <p className="mt-2 font-body text-sm leading-relaxed text-paper/70">{video.descricao}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4 font-body text-xs text-paper/50">
          <span>{video.data}</span>
          {video.href && (
            <a
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold tracking-wide uppercase transition-colors hover:text-gold"
            >
              Ver no YouTube ↗
            </a>
          )}
        </div>
      </div>

      {video.youtubeId && (
        <VideoLightbox youtubeId={video.youtubeId} title={video.titulo} open={aberto} onClose={() => setAberto(false)} />
      )}
    </li>
  );
}
