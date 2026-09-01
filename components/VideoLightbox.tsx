"use client";

import { useEffect } from "react";

const EMBED_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

/** Cinema-mode overlay for a YouTube embed, shared by VideoFacade and EpisodeEntry. */
export function VideoLightbox({
  youtubeId,
  title,
  open,
  onClose,
}: {
  youtubeId: string;
  title: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border-2 border-paper/30 text-paper transition-colors hover:border-gold hover:text-gold sm:top-6 sm:right-6"
      >
        ✕
      </button>

      <div className="aspect-video w-full max-w-5xl border-2 border-gold" onClick={(e) => e.stopPropagation()}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow={EMBED_ALLOW}
          allowFullScreen
        />
      </div>
    </div>
  );
}
