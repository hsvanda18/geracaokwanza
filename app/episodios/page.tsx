import type { Metadata } from "next";
import { EpisodiosBrowser } from "@/components/EpisodiosBrowser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KwanzaFrame } from "@/components/icons/KwanzaFrame";
import { VideoCard } from "@/components/VideoCard";
import { getEpisodios, getVideos } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Episódios — Geração Kwanza",
  description:
    "Todos os episódios da Geração Kwanza, ouve directamente aqui: economia, política e sociedade de Angola.",
};

export default async function EpisodiosPage() {
  const [episodios, videos] = await Promise.all([getEpisodios(), getVideos()]);

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

        <section className="bg-navy-ink pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <EpisodiosBrowser episodios={episodios} />
          </div>
        </section>

        {videos.length > 0 && (
          <section className="border-t-2 border-gold/20 bg-navy py-12 sm:py-16">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
              <h2 className="font-display mb-6 text-xl font-semibold tracking-wide text-paper uppercase sm:mb-10 sm:text-2xl">
                Outros vídeos
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, i) => (
                  <VideoCard key={i} video={video} />
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
