"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Imagem } from "@/lib/content";

export function ImageGallery({ imagens }: { imagens: Imagem[] }) {
  const [aberta, setAberta] = useState<number | null>(null);

  useEffect(() => {
    if (aberta === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowRight") setAberta((i) => (i === null ? i : (i + 1) % imagens.length));
      if (e.key === "ArrowLeft") setAberta((i) => (i === null ? i : (i - 1 + imagens.length) % imagens.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [aberta, imagens.length]);

  return (
    <>
      <div className="my-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {imagens.map((imagem, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setAberta(i)}
            aria-label="Ver foto em tamanho maior"
            className="group relative aspect-[4/3] cursor-zoom-in border-2 border-navy/10"
          >
            <Image
              src={imagem.url}
              alt={imagem.alt ?? ""}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors group-hover:bg-navy/40">
              <span className="flex h-9 w-9 scale-90 items-center justify-center border-2 border-paper text-paper opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                <ExpandIcon />
              </span>
            </span>
          </button>
        ))}
      </div>

      {aberta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setAberta(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-navy/95 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setAberta(null)}
            aria-label="Fechar"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border-2 border-paper/30 text-paper transition-colors hover:border-gold hover:text-gold sm:top-6 sm:right-6"
          >
            ✕
          </button>

          <div className="relative max-h-[60vh] max-w-full sm:max-h-[75vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={imagens[aberta].url}
              alt={imagens[aberta].alt ?? ""}
              width={imagens[aberta].largura || 1600}
              height={imagens[aberta].altura || 1200}
              className="h-auto max-h-[60vh] w-auto max-w-full object-contain sm:max-h-[75vh]"
            />
          </div>

          <div
            className="flex w-full max-w-md flex-col items-center gap-3 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {imagens.length > 1 && (
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setAberta((i) => (i === null ? i : (i - 1 + imagens.length) % imagens.length))}
                  aria-label="Foto anterior"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-paper/30 text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  ←
                </button>
                <p className="font-body text-xs font-semibold tracking-wide text-paper/50 uppercase">
                  {aberta + 1} / {imagens.length}
                </p>
                <button
                  type="button"
                  onClick={() => setAberta((i) => (i === null ? i : (i + 1) % imagens.length))}
                  aria-label="Foto seguinte"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-paper/30 text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  →
                </button>
              </div>
            )}
            {imagens[aberta].alt && (
              <p className="max-w-xl font-body text-sm text-paper/70">{imagens[aberta].alt}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
