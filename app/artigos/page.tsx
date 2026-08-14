import type { Metadata } from "next";
import { ArticlesBrowser } from "@/components/ArticlesBrowser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pensador } from "@/components/icons/Pensador";
import { artigos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Artigos — Geração Kwanza",
  description:
    "Análise escrita sobre economia, política e sociedade de Angola pela Geração Kwanza.",
};

export default function ArtigosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b-2 border-navy bg-paper text-navy">
          <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <Pensador size={30} color="var(--color-navy)" className="opacity-40" />
            <h1 className="font-display mt-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold uppercase">
              Artigos
            </h1>
            <p className="mt-4 max-w-xl font-body text-navy/70">
              Análise escrita sobre economia, política e sociedade de Angola.
            </p>
          </div>
        </section>

        <section className="bg-paper pb-16 text-navy sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <ArticlesBrowser artigos={artigos} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
