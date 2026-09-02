import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pensador } from "@/components/icons/Pensador";
import { NoticiaList } from "@/components/NoticiaList";
import { ShareButtons } from "@/components/ShareButtons";
import { getEventoBySlug, getEventoSlugs, getNoticiasPorEvento } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getEventoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/eventos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const evento = await getEventoBySlug(slug);
  if (!evento) return {};
  return {
    title: `${evento.nome} — Geração Kwanza`,
    description: `${evento.data} · ${evento.local}`,
    openGraph: {
      title: evento.nome,
      description: `${evento.data} · ${evento.local}`,
      type: "article",
    },
  };
}

export default async function EventoPage(props: PageProps<"/eventos/[slug]">) {
  const { slug } = await props.params;
  const [evento, noticiasRelacionadas] = await Promise.all([
    getEventoBySlug(slug),
    getNoticiasPorEvento(slug),
  ]);
  if (!evento) notFound();

  return (
    <>
      <Header />
      <main className="bg-navy-ink">
        <div className="mx-auto max-w-[72ch] px-5 pt-12 pb-16 sm:px-8 sm:pt-16">
          <Link
            href="/eventos"
            className="font-body text-sm font-semibold tracking-wide text-paper/60 uppercase transition-colors hover:text-paper"
          >
            ← Eventos
          </Link>

          <h1 className="font-display mt-6 text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.08] font-semibold text-paper">
            {evento.nome}
          </h1>

          <p className="mt-4 font-body text-sm font-semibold text-paper/70">
            {evento.data} · {evento.local}
          </p>

          <div className="mt-5">
            <ShareButtons path={`/eventos/${evento.slug}`} titulo={evento.nome} />
          </div>

          {evento.descricao && evento.descricao.length > 0 && (
            <div className="mt-8 space-y-4 font-body leading-relaxed text-paper/85">
              <PortableText value={evento.descricao} />
            </div>
          )}

          {evento.href && (
            <a
              href={evento.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-wide text-paper/50 uppercase transition-colors hover:text-gold"
            >
              Mais informações ↗
            </a>
          )}

          {noticiasRelacionadas.length > 0 && (
            <>
              <div className="pensador-rule my-8 text-paper/30">
                <Pensador size={18} color="var(--color-paper)" className="opacity-50" />
              </div>

              <h2 className="font-display text-lg font-semibold tracking-wide text-paper uppercase">
                Notícias sobre este evento
              </h2>
              <NoticiaList noticias={noticiasRelacionadas} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
