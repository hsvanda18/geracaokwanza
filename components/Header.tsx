import Link from "next/link";
import { KwanzaFrame } from "./icons/KwanzaFrame";
import { Pensador } from "./icons/Pensador";

const links = [
  { href: "/episodios", label: "Episódios" },
  { href: "/artigos", label: "Artigos" },
  { href: "/#eventos", label: "Eventos" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-gold/30 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <KwanzaFrame size={40} color="var(--color-gold)" strokeWidth={9} seeds={false} />
            <Pensador size={16} color="var(--color-gold)" className="absolute" />
          </span>
          <span className="font-display text-sm leading-[0.95] font-semibold tracking-wide text-paper uppercase">
            Geração
            <br />
            Kwanza
          </span>
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

        <Link
          href="/episodios"
          className="border-2 border-gold px-4 py-2 font-body text-xs font-bold tracking-[0.1em] text-gold uppercase transition-colors hover:bg-gold hover:text-navy sm:text-sm"
        >
          Ouvir agora
        </Link>
      </div>
    </header>
  );
}
