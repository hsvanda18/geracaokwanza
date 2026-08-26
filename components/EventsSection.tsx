import Link from "next/link";
import { getEventosAnteriores, getEventosProximos } from "@/lib/sanity/queries";
import { EventList } from "./EventList";

const PROXIMOS_PREVIEW_LIMIT = 2;
const ANTERIORES_PREVIEW_LIMIT = 3;

export async function EventsSection() {
  const [proximosEventos, eventosAnteriores] = await Promise.all([
    getEventosProximos(),
    getEventosAnteriores(),
  ]);

  return (
    <section id="eventos" className="bg-navy-ink py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-paper uppercase sm:text-3xl">
            Eventos
          </h2>
          <Link
            href="/eventos"
            className="font-body text-sm font-semibold tracking-wide text-gold uppercase transition-colors hover:text-paper"
          >
            Ver todos →
          </Link>
        </div>

        <EventList
          proximos={proximosEventos.slice(0, PROXIMOS_PREVIEW_LIMIT)}
          anteriores={eventosAnteriores.slice(0, ANTERIORES_PREVIEW_LIMIT)}
        />
      </div>
    </section>
  );
}
