import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pensador } from "@/components/icons/Pensador";
import { PlaceholderTag } from "@/components/PlaceholderTag";
import { ThemeTag } from "@/components/ThemeTag";
import { artigos, tempoDeLeitura } from "@/lib/content";

function getArtigo(slug: string) {
  return artigos.find((a) => a.slug === slug);
}

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/artigos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const artigo = getArtigo(slug);
  if (!artigo) return {};
  return {
    title: `${artigo.titulo} — Geração Kwanza`,
    description: artigo.lead,
  };
}

export default async function ArtigoPage(props: PageProps<"/artigos/[slug]">) {
  const { slug } = await props.params;
  const artigo = getArtigo(slug);
  if (!artigo) notFound();

  return (
    <>
      <Header />
      <main className="bg-paper text-navy">
        <article className="mx-auto max-w-[72ch] px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
          <Link
            href="/artigos"
            className="font-body text-sm font-semibold tracking-wide uppercase opacity-60 transition-opacity hover:opacity-100"
          >
            ← Artigos
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ThemeTag tema={artigo.tema} dark />
            {artigo.isPlaceholder && <PlaceholderTag className="border-navy/30 text-navy/50" />}
          </div>

          <h1 className="font-display mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.08] font-semibold">
            {artigo.titulo}
          </h1>

          <p className="mt-4 font-body text-sm font-semibold opacity-70">
            {artigo.autor} · {artigo.data} · {tempoDeLeitura(artigo)} min de leitura
          </p>

          <p className="mt-8 font-body text-xl leading-relaxed font-medium opacity-90">
            {artigo.lead}
          </p>

          <div className="pensador-rule my-8 text-navy/30">
            <Pensador size={18} color="var(--color-navy)" className="opacity-50" />
          </div>

          <div className="space-y-5 font-body text-[1.05rem] leading-relaxed opacity-90">
            {artigo.corpo.map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
