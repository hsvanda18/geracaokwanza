import type { Metadata } from "next";
import { EpisodeEntry } from "@/components/EpisodeEntry";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KwanzaFrame } from "@/components/icons/KwanzaFrame";
import { episodios } from "@/lib/content";

export const metadata: Metadata = {
  title: "Episódios — Geração Kwanza",
  description:
    "Todos os episódios da Geração Kwanza, ouve directamente aqui: economia, política e sociedade de Angola.",
};

export default function EpisodiosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-gold/30 bg-navy">
          <KwanzaFrame
            size={620}
            color="var(--color-gold)"
            strokeWidth={22}
            nested
            className="pointer-events-none absolute -top-32 -right-44 opacity-[0.08]"
          />
          <div className="relative mx-auto max-w-[1400px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <h1 className="font-display max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold text-paper uppercase">
              Episódios
            </h1>
            <p className="mt-4 max-w-xl font-body text-paper/70">
              Todas as conversas, ouve directamente aqui — sem sair da Geração Kwanza.
            </p>
          </div>
        </section>

        <section className="bg-navy-ink py-4 sm:py-6">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <ul>
              {episodios.map((ep) => (
                <EpisodeEntry key={ep.numero} ep={ep} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
