import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBio } from "@/components/AuthorBio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageGallery } from "@/components/ImageGallery";
import { Pensador } from "@/components/icons/Pensador";
import { PlaceholderTag } from "@/components/PlaceholderTag";
import { ShareButtons } from "@/components/ShareButtons";
import { ThemeTag } from "@/components/ThemeTag";
import { tempoDeLeitura } from "@/lib/content";
import { getArtigoBySlug, getArtigoSlugs } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getArtigoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/artigos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const artigo = await getArtigoBySlug(slug);
  if (!artigo) return {};
  return {
    title: `${artigo.titulo} — Geração Kwanza`,
    description: artigo.lead,
  };
}

export default async function ArtigoPage(props: PageProps<"/artigos/[slug]">) {
  const { slug } = await props.params;
  const artigo = await getArtigoBySlug(slug);
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

          <AuthorBio autor={artigo.autor} />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ThemeTag tema={artigo.tema} dark />
            {artigo.isPlaceholder && <PlaceholderTag className="border-navy/30 text-navy/50" />}
          </div>

          <h1 className="font-display mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.08] font-semibold">
            {artigo.titulo}
          </h1>

          <p className="mt-4 font-body text-sm font-semibold opacity-70">
            {artigo.autor.nome} · {artigo.data} · {tempoDeLeitura(artigo)} min de leitura
          </p>

          <div className="mt-5">
            <ShareButtons path={`/artigos/${artigo.slug}`} titulo={artigo.titulo} dark />
          </div>

          <p className="mt-8 font-body text-xl leading-relaxed font-medium opacity-90">
            {artigo.lead}
          </p>

          <div className="pensador-rule my-8 text-navy/30">
            <Pensador size={18} color="var(--color-navy)" className="opacity-50" />
          </div>

          <div className="space-y-5 font-body text-[1.05rem] leading-relaxed opacity-90">
            <PortableText value={artigo.corpo} />
          </div>

          {artigo.imagens && artigo.imagens.length > 0 && <ImageGallery imagens={artigo.imagens} />}
        </article>
      </main>
      <Footer />
    </>
  );
}
