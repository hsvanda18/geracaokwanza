import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pensador } from "@/components/icons/Pensador";
import { MembroCard } from "@/components/MembroCard";
import { getMembrosEquipa, getSobre } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Sobre nós — Geração Kwanza",
  description:
    "A Geração Kwanza é uma plataforma de podcast e conteúdo sobre economia, política e sociedade angolanas.",
};

export default async function SobrePage() {
  const [texto, equipa] = await Promise.all([getSobre(), getMembrosEquipa()]);

  return (
    <>
      <Header />
      <main>
        <section className="border-b-2 border-gold/30 bg-navy">
          <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <Pensador size={30} color="var(--color-gold)" className="opacity-60" />
            <h1 className="font-display mt-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold text-paper uppercase">
              Sobre nós
            </h1>
            <p className="mt-4 max-w-xl font-body text-paper/70">
              Um jornal de opinião com energia de podcast.
            </p>
          </div>
        </section>

        <section className="bg-paper pt-12 pb-16 text-navy sm:pt-16 sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="max-w-[72ch]">
              <p className="font-body text-xl leading-relaxed font-medium opacity-90">
                A Geração Kwanza é uma plataforma de podcast e conteúdo sobre economia, política e
                sociedade angolanas.
              </p>
              <p className="mt-5 font-body text-lg leading-relaxed opacity-80">
                Não fazemos entretenimento nem comédia. Fazemos debate cívico a sério, com
                identidade editorial forte: substância rigorosa, entrega visual ousada. Juntamos
                vozes angolanas para discutir o que molda o país — da economia ao poder, da
                cultura ao quotidiano — em episódios, artigos e eventos que tratam o público como
                adulto.
              </p>

              {texto && texto.length > 0 && (
                <div className="mt-8 space-y-4 border-t-2 border-navy/10 pt-8 font-body leading-relaxed opacity-90">
                  <PortableText value={texto} />
                </div>
              )}
            </div>

            {equipa.length > 0 && (
              <div className="mt-16 sm:mt-20">
                <h2 className="pensador-rule font-display border-b-2 border-navy pb-4 text-2xl font-semibold tracking-wide uppercase sm:text-3xl">
                  A equipa
                </h2>
                <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {equipa.map((membro, i) => (
                    <MembroCard key={i} membro={membro} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
