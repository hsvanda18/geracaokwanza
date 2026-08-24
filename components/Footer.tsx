import { contacto, plataformas } from "@/lib/content";
import { KwanzaFrame } from "./icons/KwanzaFrame";
import { Pensador } from "./icons/Pensador";
import { PlaceholderTag } from "./PlaceholderTag";

export function Footer() {
  return (
    <footer className="border-t-2 border-gold/30 bg-navy py-14 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="relative flex h-11 w-11 items-center justify-center">
              <KwanzaFrame size={44} color="var(--color-gold)" strokeWidth={9} seeds={false} />
              <Pensador size={18} color="var(--color-gold)" className="absolute" />
            </span>
            <p className="font-display mt-4 text-lg font-semibold tracking-wide uppercase">
              Geração Kwanza
            </p>
            <p className="mt-2 max-w-[26ch] font-body text-sm leading-relaxed text-paper/60">
              Economia, política e sociedade de Angola — a sério.
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-bold tracking-[0.16em] text-gold uppercase">
              Ouve em
            </p>
            <ul className="mt-4 space-y-2">
              {plataformas.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <a href={p.href} className="font-body text-sm text-paper/80 hover:text-gold">
                    {p.nome}
                  </a>
                  {p.isPlaceholder && <PlaceholderTag className="border-paper/30 text-paper/50" />}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-bold tracking-[0.16em] text-gold uppercase">
              Redes
            </p>
            <ul className="mt-4 space-y-2">
              {contacto.redes.map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <a href={r.href} className="font-body text-sm text-paper/80 hover:text-gold">
                    {r.nome}
                  </a>
                  {r.isPlaceholder && <PlaceholderTag className="border-paper/30 text-paper/50" />}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-bold tracking-[0.16em] text-gold uppercase">
              Parcerias
            </p>
            <p className="mt-4 flex items-center gap-2 font-body text-sm text-paper/80">
              <a href={`mailto:${contacto.email}`} className="hover:text-gold">
                {contacto.email}
              </a>
              {contacto.emailIsPlaceholder && (
                <PlaceholderTag className="border-paper/30 text-paper/50" />
              )}
            </p>
          </div>
        </div>

        <p className="mt-14 border-t border-paper/10 pt-6 font-body text-xs text-paper/40">
          © {new Date().getFullYear()} Geração Kwanza. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
