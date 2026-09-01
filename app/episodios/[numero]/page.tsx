import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EpisodeEntry } from "@/components/EpisodeEntry";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShareButtons } from "@/components/ShareButtons";
import { ThemeTag } from "@/components/ThemeTag";
import { VideoFacade } from "@/components/VideoFacade";
import { getEpisodioByNumero, getEpisodios } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const episodios = await getEpisodios();
  return episodios.map((ep) => ({ numero: ep.numero }));
}

export async function generateMetadata(props: PageProps<"/episodios/[numero]">): Promise<Metadata> {
  const { numero } = await props.params;
  const ep = await getEpisodioByNumero(numero);
  if (!ep) return {};
  return {
    title: `${ep.titulo} — Geração Kwanza`,
    description: ep.convidado !== ep.titulo ? `Com ${ep.convidado}. ${ep.duracao}.` : ep.duracao,
  };
}

export default async function EpisodioPage(props: PageProps<"/episodios/[numero]">) {
  const { numero } = await props.params;
  const ep = await getEpisodioByNumero(numero);
  if (!ep) notFound();

  const episodios = await getEpisodios();
  const outros = episodios.filter((e) => e.numero !== ep.numero).slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-navy">
        <div className="mx-auto max-w-[960px] px-5 pt-8 pb-16 sm:px-8 sm:pt-10">
          <Link
            href="/episodios"
            className="font-body text-sm font-semibold tracking-wide text-paper/60 uppercase transition-colors hover:text-paper"
          >
            ← Episódios
          </Link>

          <div className="mt-6">
            <VideoFacade youtubeId={ep.youtubeId} title={ep.titulo} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {ep.temas.map((tema) => (
              <ThemeTag key={tema} tema={tema} />
            ))}
          </div>

          <p className="font-display mt-3 text-2xl font-semibold text-gold">EP. {ep.numero}</p>

          <h1 className="font-display mt-2 text-[clamp(1.6rem,4vw,2.5rem)] leading-[1.1] font-semibold text-paper">
            {ep.titulo}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-paper/70">
            {ep.convidado !== ep.titulo && <span>Com {ep.convidado}</span>}
            <span>{ep.duracao}</span>
          </div>

          {ep.href !== "#" && (
            <a
              href={ep.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-wide text-paper/50 uppercase transition-colors hover:text-gold"
            >
              Ver no YouTube ↗
            </a>
          )}

          <div className="mt-6">
            <ShareButtons path={`/episodios/${ep.numero}`} titulo={ep.titulo} />
          </div>
        </div>

        {outros.length > 0 && (
          <div className="border-t-2 border-gold/20 bg-navy-ink py-12 sm:py-16">
            <div className="mx-auto max-w-[960px] px-5 sm:px-8">
              <h2 className="font-display mb-6 text-xl font-semibold tracking-wide text-paper uppercase">
                Mais episódios
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {outros.map((outro) => (
                  <EpisodeEntry key={outro.numero} ep={outro} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
