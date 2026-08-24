import { ArticlesSection } from "@/components/ArticlesSection";
import { EpisodesSection } from "@/components/EpisodesSection";
import { EventsSection } from "@/components/EventsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MissionBand } from "@/components/MissionBand";
import { NoticiasSection } from "@/components/NoticiasSection";
import { PlatformStrip } from "@/components/PlatformStrip";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PlatformStrip />
        <EpisodesSection />
        <ArticlesSection />
        <NoticiasSection />
        <MissionBand />
        <EventsSection />
      </main>
      <Footer />
    </>
  );
}
