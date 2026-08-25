import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KwanzaFrame } from "@/components/icons/KwanzaFrame";
import { NoticiasBrowser } from "@/components/NoticiasBrowser";
import { noticias } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notícias — Geração Kwanza",
  description:
    "Atualizações rápidas sobre economia, política e sociedade de Angola pela Geração Kwanza.",
};

export default function NoticiasPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-gold/30 bg-navy-ink">
          <KwanzaFrame
            size={520}
            color="var(--color-gold)"
            strokeWidth={20}
            className="pointer-events-none absolute -top-32 -right-40 opacity-[0.07]"
          />
          <div className="relative mx-auto max-w-[1400px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <h1 className="font-display max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold text-paper uppercase">
              Notícias
            </h1>
            <p className="mt-4 max-w-xl font-body text-paper/70">
              Atualizações rápidas sobre economia, política e sociedade de Angola.
            </p>
          </div>
        </section>

        <section className="bg-navy-ink pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <NoticiasBrowser noticias={noticias} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
