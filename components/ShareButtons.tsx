"use client";

import { useState } from "react";

/**
 * Text-label share links — matches the site's existing pattern for
 * secondary actions ("Ver no YouTube ↗", "Fonte ↗") rather than an icon
 * row, which this design system otherwise avoids. `path` is the canonical
 * pathname (e.g. `/artigos/o-slug`); the absolute URL is only computed at
 * click time from `window.location.origin`, so it's correct on any host
 * (preview, custom domain, localhost) with no server/client mismatch.
 */
export function ShareButtons({ path, titulo, dark = false }: { path: string; titulo: string; dark?: boolean }) {
  const [copiado, setCopiado] = useState(false);

  function url() {
    return `${window.location.origin}${path}`;
  }

  function abrirPartilha(base: string) {
    window.open(base, "_blank", "noopener,noreferrer");
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(url());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard API unavailable — the other share options still work.
    }
  }

  const redes = [
    {
      nome: "WhatsApp",
      onClick: () => abrirPartilha(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${titulo} ${url()}`)}`),
    },
    {
      nome: "Facebook",
      onClick: () => abrirPartilha(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`),
    },
    {
      nome: "LinkedIn",
      onClick: () => abrirPartilha(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`),
    },
  ];

  const linkClass = dark
    ? "font-body text-xs font-semibold tracking-wide uppercase text-navy/50 transition-colors hover:text-navy"
    : "font-body text-xs font-semibold tracking-wide uppercase text-paper/50 transition-colors hover:text-gold";

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className={`font-body text-xs font-semibold tracking-wide uppercase ${dark ? "text-navy/40" : "text-paper/40"}`}>
        Partilhar
      </span>
      {redes.map((rede) => (
        <button key={rede.nome} type="button" onClick={rede.onClick} className={linkClass}>
          {rede.nome} ↗
        </button>
      ))}
      <button type="button" onClick={copiarLink} className={linkClass}>
        {copiado ? "Link copiado ✓" : "Copiar link"}
      </button>
    </div>
  );
}
