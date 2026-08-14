"use client";

import { useState } from "react";

type VideoFacadeProps = {
  youtubeId?: string;
  title: string;
  className?: string;
};

/**
 * Lazy-load facade for the embedded episode player: renders a thumbnail and
 * play control only, and mounts the actual YouTube iframe solely after a
 * click — never on page load.
 */
export function VideoFacade({ youtubeId, title, className = "" }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && youtubeId) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden border-2 border-gold ${className}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => youtubeId && setPlaying(true)}
      disabled={!youtubeId}
      aria-label={youtubeId ? `Reproduzir: ${title}` : "Vídeo por fornecer"}
      className={`group relative flex aspect-video w-full items-center justify-center overflow-hidden border-2 border-dashed border-gold/60 bg-navy-ink text-left disabled:cursor-not-allowed ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-gold) 0 2px, transparent 2px 26px)",
        }}
      />
      <span className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center border-2 border-gold text-gold transition-transform group-enabled:group-hover:scale-110">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
            <path d="M0 0 L22 13 L0 26 Z" />
          </svg>
        </span>
        <span className="font-body text-xs font-semibold tracking-[0.14em] text-gold/80 uppercase">
          {youtubeId ? "Reproduzir episódio" : "Vídeo por fornecer"}
        </span>
      </span>
    </button>
  );
}
