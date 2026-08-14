import { eventosAnteriores, proximosEventos } from "@/lib/content";
import { Pensador } from "./icons/Pensador";
import { PlaceholderTag } from "./PlaceholderTag";

export function EventsSection() {
  return (
    <section id="eventos" className="bg-navy-ink py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="font-display mb-10 text-2xl font-semibold tracking-wide text-paper uppercase sm:mb-14 sm:text-3xl">
          Eventos
        </h2>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="mb-6 border-b-2 border-gold/40 pb-3 font-body text-sm font-bold tracking-[0.18em] text-gold uppercase">
              Próximos
            </p>
            {proximosEventos.length === 0 ? (
              <p className="max-w-md font-body text-sm leading-relaxed text-paper/60">
                Sem eventos agendados de momento. Esta secção volta a aparecer assim que
                houver uma data confirmada.
              </p>
            ) : (
              <ul className="space-y-6">
                {proximosEventos.map((ev, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Pensador size={16} color="var(--color-gold)" className="mt-1.5 shrink-0" />
                    <div>
                      <p className="font-display text-lg font-semibold text-paper">{ev.nome}</p>
                      <p className="mt-1 font-body text-sm text-paper/70">
                        {ev.data} · {ev.local}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="mb-6 border-b-2 border-paper/20 pb-3 font-body text-sm font-bold tracking-[0.18em] text-paper/60 uppercase">
              Anteriores
            </p>
            <ul className="space-y-4">
              {eventosAnteriores.map((ev, i) => (
                <li
                  key={i}
                  className={`flex items-start justify-between gap-4 border-b border-paper/10 pb-4 ${
                    ev.isPlaceholder ? "opacity-60" : ""
                  }`}
                >
                  <div>
                    <p className="font-body text-sm font-semibold text-paper">{ev.nome}</p>
                    <p className="mt-0.5 font-body text-xs text-paper/60">
                      {ev.data} · {ev.local}
                    </p>
                  </div>
                  {ev.isPlaceholder && (
                    <PlaceholderTag className="shrink-0 border-paper/30 text-paper/50" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
