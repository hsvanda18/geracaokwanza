import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageGallery } from "@/components/ImageGallery";
import { Pensador } from "@/components/icons/Pensador";
import { PlaceholderTag } from "@/components/PlaceholderTag";
import { ShareButtons } from "@/components/ShareButtons";
import { ThemeTag } from "@/components/ThemeTag";
import { getNoticiaBySlug, getNoticiaSlugs } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getNoticiaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) return {};
  const imagem = noticia.imagens?.[0];
  return {
    title: `${noticia.titulo} — Geração Kwanza`,
    description: noticia.resumo,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo,
      type: "article",
      ...(imagem && { images: [imagem.url] }),
    },
  };
}

export default async function NoticiaPage(props: PageProps<"/noticias/[slug]">) {
  const { slug } = await props.params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) notFound();

  const temLinks = noticia.eventoRelacionado || noticia.href;

  return (
    <>
      <Header />
      <main className="bg-paper text-navy">
        <article className="mx-auto max-w-[72ch] px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
          <Link
            href="/noticias"
            className="font-body text-sm font-semibold tracking-wide uppercase opacity-60 transition-opacity hover:opacity-100"
          >
            ← Notícias
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ThemeTag tema={noticia.tema} dark />
            {noticia.isPlaceholder && <PlaceholderTag className="border-navy/30 text-navy/50" />}
          </div>

          <h1 className="font-display mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.08] font-semibold">
            {noticia.titulo}
          </h1>

          <p className="mt-4 font-body text-sm font-semibold opacity-70">{noticia.data}</p>

          <div className="mt-5">
            <ShareButtons path={`/noticias/${noticia.slug}`} titulo={noticia.titulo} dark />
          </div>

          <div className="pensador-rule my-8 text-navy/30">
            <Pensador size={18} color="var(--color-navy)" className="opacity-50" />
          </div>

          {noticia.corpo && noticia.corpo.length > 0 ? (
            <div className="space-y-5 font-body text-[1.05rem] leading-relaxed opacity-90">
              <PortableText value={noticia.corpo} />
            </div>
          ) : (
            <p className="font-body text-xl leading-relaxed font-medium opacity-90">{noticia.resumo}</p>
          )}

          {noticia.imagens && noticia.imagens.length > 0 && <ImageGallery imagens={noticia.imagens} />}

          {temLinks && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-navy/10 pt-6">
              {noticia.eventoRelacionado && (
                <Link
                  href={`/eventos/${noticia.eventoRelacionado.slug}`}
                  className="font-body text-xs font-semibold tracking-wide uppercase opacity-70 transition-opacity hover:opacity-100"
                >
                  Evento: {noticia.eventoRelacionado.nome} →
                </Link>
              )}
              {noticia.href && (
                <a
                  href={noticia.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs font-semibold tracking-wide uppercase opacity-70 transition-opacity hover:opacity-100"
                >
                  Fonte ↗
                </a>
              )}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
