import Image from "next/image";
import { getContacto, getPlataformas } from "@/lib/sanity/queries";
import { PlaceholderTag } from "./PlaceholderTag";

export async function Footer() {
  const [plataformas, contacto] = await Promise.all([getPlataformas(), getContacto()]);

  return (
    <footer className="border-t-2 border-gold/30 bg-navy py-14 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/geracao-kwanza-logo.png"
              alt="Geração Kwanza"
              width={1600}
              height={901}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-[26ch] font-body text-sm leading-relaxed text-paper/60">
              Vivendo e pensando Angola
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
              {contacto.emailIsPlaceholder ? (
                contacto.email
              ) : (
                <a href={`mailto:${contacto.email}`} className="hover:text-gold">
                  {contacto.email}
                </a>
              )}
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
