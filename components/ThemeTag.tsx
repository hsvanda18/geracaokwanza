import type { Tema } from "@/lib/content";

export function ThemeTag({ tema, dark = false }: { tema: Tema; dark?: boolean }) {
  return (
    <span
      className={`inline-block font-body text-[11px] font-bold tracking-[0.16em] uppercase ${
        dark ? "text-navy" : "text-gold"
      }`}
    >
      {tema}
    </span>
  );
}
