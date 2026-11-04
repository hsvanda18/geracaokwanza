"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ExpandIcon } from "./icons/Expand";
import { VideoLightbox } from "./VideoLightbox";
import { YouTubeEmbed } from "./YouTubeEmbed";

type VideoFacadeProps = {
  youtubeId?: string;
  title: string;
  className?: string;
};

/**
 * Lazy-load facade for the embedded episode player: renders a thumbnail and
 * play control only, and mounts the actual YouTube iframe solely after a
 * click — never on page load. A separate "maximizar" control opens the same
 * video larger, in a cinema-mode overlay (VideoLightbox). Only one player
 * runs at a time: maximizing stops the inline one and carries on from the
 * same second, and closing the overlay hands the position back inline.
 */
export function VideoFacade({ youtubeId, title, className = "" }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [maximizado, setMaximizado] = useState(false);
  const [inicio, setInicio] = useState(0);
  const tempoRef = useRef(0);

  function maximizar() {
    setInicio(tempoRef.current);
    setPlaying(false);
    setMaximizado(true);
  }

  function fecharMaximizado(segundos: number) {
    setMaximizado(false);
    tempoRef.current = segundos;
    setInicio(segundos);
    if (segundos > 0) setPlaying(true);
  }

  return (
    <>
      <div
        className={`relative aspect-video w-full overflow-hidden border-2 ${
          youtubeId ? "border-gold" : "border-dashed border-gold/60"
        } ${className}`}
      >
        {playing && youtubeId ? (
          <YouTubeEmbed
            youtubeId={youtubeId}
            title={title}
            start={inicio}
            onTime={(t) => (tempoRef.current = t)}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => youtubeId && setPlaying(true)}
            disabled={!youtubeId}
            aria-label={youtubeId ? `Reproduzir: ${title}` : "Vídeo por fornecer"}
            className="group absolute inset-0 flex w-full items-center justify-center bg-navy-ink text-left disabled:cursor-not-allowed"
          >
            {youtubeId ? (
              <>
                <Image
                  src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt=""
                  fill
                  preload
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="pointer-events-none object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-navy/30 transition-colors group-hover:bg-navy/50"
                />
              </>
            ) : (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, var(--color-gold) 0 2px, transparent 2px 26px)",
                }}
              />
            )}
            <span className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center border-2 border-gold bg-navy/70 text-gold transition-transform group-enabled:group-hover:scale-110">
                <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
                  <path d="M0 0 L22 13 L0 26 Z" />
                </svg>
              </span>
              <span className="bg-navy/70 px-2 py-1 font-body text-xs font-semibold tracking-[0.14em] text-gold uppercase">
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
              maximizar();
            }}
            aria-label="Maximizar vídeo"
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border-2 border-paper/40 bg-navy/50 text-paper transition-colors hover:border-gold hover:text-gold"
          >
            <ExpandIcon />
          </button>
        )}
      </div>

      {youtubeId && (
        <VideoLightbox
          youtubeId={youtubeId}
          title={title}
          open={maximizado}
          start={inicio}
          onClose={fecharMaximizado}
        />
      )}
    </>
  );
}
