import { plataformas } from "@/lib/content";
import { PlaceholderTag } from "./PlaceholderTag";

export function PlatformStrip() {
  return (
    <div className="border-b-2 border-gold/30 bg-navy-ink">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <span className="font-body text-xs font-bold tracking-[0.18em] text-paper/60 uppercase">
          Ouve em
        </span>
        {plataformas.map((p, i) => (
          <a
            key={i}
            href={p.href}
            className="flex items-center gap-2 font-body text-sm font-semibold text-paper/80 transition-colors hover:text-gold"
          >
            {p.nome}
            {p.isPlaceholder && <PlaceholderTag className="border-paper/30 text-paper/50" />}
          </a>
        ))}
      </div>
    </div>
  );
}
