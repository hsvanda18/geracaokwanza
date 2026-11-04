"use client";

import { useEffect, useRef } from "react";
import { YouTubeEmbed } from "./YouTubeEmbed";

/**
 * Cinema-mode overlay for a YouTube embed, shared by VideoFacade and
 * VideoCard. Starts at `start` and hands the position it reached back to
 * `onClose`, so the caller can carry on from there.
 */
export function VideoLightbox({
  youtubeId,
  title,
  open,
  start = 0,
  onClose,
}: {
  youtubeId: string;
  title: string;
  open: boolean;
  start?: number;
  onClose: (segundos: number) => void;
}) {
  const tempoRef = useRef(start);

  useEffect(() => {
    if (open) tempoRef.current = start;
  }, [open, start]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose(tempoRef.current);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const fechar = () => onClose(tempoRef.current);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={fechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={fechar}
        aria-label="Fechar"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border-2 border-paper/30 text-paper transition-colors hover:border-gold hover:text-gold sm:top-6 sm:right-6"
      >
        ✕
      </button>

      <div className="aspect-video w-full max-w-5xl border-2 border-gold" onClick={(e) => e.stopPropagation()}>
        <YouTubeEmbed
          youtubeId={youtubeId}
          title={title}
          start={start}
          onTime={(t) => (tempoRef.current = t)}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
