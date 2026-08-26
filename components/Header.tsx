"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/episodios", label: "Episódios" },
  { href: "/artigos", label: "Artigos" },
  { href: "/noticias", label: "Notícias" },
  { href: "/eventos", label: "Eventos" },
];

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-gold/30 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMenuAberto(false)}>
          <Image
            src="/brand/geracao-kwanza-icon.png"
            alt="Geração Kwanza"
            width={859}
            height={852}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Secções" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-semibold tracking-wide text-paper/85 uppercase transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/episodios"
            className="border-2 border-gold px-4 py-2 font-body text-xs font-bold tracking-[0.1em] text-gold uppercase transition-colors hover:bg-gold hover:text-navy sm:text-sm"
          >
            Ouvir agora
          </Link>

          <button
            type="button"
            aria-expanded={menuAberto}
            aria-controls="menu-movel"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-gold/60 text-gold md:hidden"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              {menuAberto ? (
                <path
                  d="M1 1 L15 11 M15 1 L1 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              ) : (
                <path
                  d="M0 1 H16 M0 6 H16 M0 11 H16"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav
          id="menu-movel"
          aria-label="Secções"
          className="border-t-2 border-gold/30 bg-navy md:hidden"
        >
          <ul className="mx-auto flex max-w-[1400px] flex-col divide-y divide-gold/15 px-5 sm:px-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="block py-4 font-body text-sm font-semibold tracking-wide text-paper/85 uppercase transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
