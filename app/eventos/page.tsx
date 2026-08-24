import type { Metadata } from "next";
import { EventList } from "@/components/EventList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pensador } from "@/components/icons/Pensador";
import { eventosAnteriores, proximosEventos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Eventos — Geração Kwanza",
  description:
    "Agenda e arquivo de eventos da Geração Kwanza: encontros, conversas e apresentações públicas.",
};

export default function EventosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b-2 border-gold/30 bg-navy-ink">
          <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <Pensador size={30} color="var(--color-gold)" className="opacity-60" />
            <h1 className="font-display mt-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold text-paper uppercase">
              Eventos
            </h1>
            <p className="mt-4 max-w-xl font-body text-paper/70">
              Próximos encontros e arquivo de eventos passados da Geração Kwanza.
            </p>
          </div>
        </section>

        <section className="bg-navy-ink pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <EventList proximos={proximosEventos} anteriores={eventosAnteriores} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
