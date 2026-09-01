"use client";

import { useEffect, useState } from "react";
import { ExpandIcon } from "./icons/Expand";

type VideoFacadeProps = {
  youtubeId?: string;
  title: string;
  className?: string;
};

const EMBED_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

/**
 * Lazy-load facade for the embedded episode player: renders a thumbnail and
 * play control only, and mounts the actual YouTube iframe solely after a
 * click — never on page load. A separate "maximizar" control opens the same
 * video larger, in a cinema-mode overlay, whether or not it's already
 * playing inline.
 */
export function VideoFacade({ youtubeId, title, className = "" }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [maximizado, setMaximizado] = useState(false);

  useEffect(() => {
    if (!maximizado) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMaximizado(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [maximizado]);

  return (
    <>
      <div
        className={`relative aspect-video w-full overflow-hidden border-2 ${
          playing ? "border-gold" : "border-dashed border-gold/60"
        } ${className}`}
      >
        {playing && youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow={EMBED_ALLOW}
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => youtubeId && setPlaying(true)}
            disabled={!youtubeId}
            aria-label={youtubeId ? `Reproduzir: ${title}` : "Vídeo por fornecer"}
            className="group absolute inset-0 flex w-full items-center justify-center bg-navy-ink text-left disabled:cursor-not-allowed"
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
        )}

        {youtubeId && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMaximizado(true);
            }}
            aria-label="Maximizar vídeo"
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border-2 border-paper/40 bg-navy/50 text-paper transition-colors hover:border-gold hover:text-gold"
          >
            <ExpandIcon />
          </button>
        )}
      </div>

      {maximizado && youtubeId && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setMaximizado(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setMaximizado(false)}
            aria-label="Fechar"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border-2 border-paper/30 text-paper transition-colors hover:border-gold hover:text-gold sm:top-6 sm:right-6"
          >
            ✕
          </button>

          <div
            className="aspect-video w-full max-w-5xl border-2 border-gold"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              allow={EMBED_ALLOW}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
