import type { Evento } from "@/lib/content";
import { Pensador } from "./icons/Pensador";
import { PlaceholderTag } from "./PlaceholderTag";

/**
 * The two-column Próximos/Anteriores grid, extracted so both the homepage
 * preview (EventsSection) and the full /eventos page can render it against
 * differently-sliced data without duplicating markup.
 */
export function EventList({
  proximos,
  anteriores,
}: {
  proximos: Evento[];
  anteriores: Evento[];
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
      <div>
        <p className="mb-6 border-b-2 border-gold/40 pb-3 font-body text-sm font-bold tracking-[0.18em] text-gold uppercase">
          Próximos
        </p>
        {proximos.length === 0 ? (
          <p className="max-w-md font-body text-sm leading-relaxed text-paper/60">
            Sem eventos agendados de momento. Esta secção volta a aparecer assim que houver
            uma data confirmada.
          </p>
        ) : (
          <ul className="space-y-6">
            {proximos.map((ev, i) => (
              <li key={i} id={`evento-${ev.slug}`} className="scroll-mt-24 flex items-start gap-3">
                <Pensador size={16} color="var(--color-gold)" className="mt-1.5 shrink-0" />
                <div>
                  <p className="font-display text-lg font-semibold text-paper">{ev.nome}</p>
                  <p className="mt-1 font-body text-sm text-paper/70">
                    {ev.data} · {ev.local}
                  </p>
                  {ev.href && (
                    <a
                      href={ev.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-body text-xs font-semibold tracking-wide text-gold uppercase transition-colors hover:text-paper"
                    >
                      Mais informações ↗
                    </a>
                  )}
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
        {anteriores.length === 0 ? (
          <p className="max-w-md font-body text-sm leading-relaxed text-paper/60">
            Sem eventos anteriores registados.
          </p>
        ) : (
          <ul className="space-y-4">
            {anteriores.map((ev, i) => (
              <li
                key={i}
                id={`evento-${ev.slug}`}
                className={`scroll-mt-24 flex items-start justify-between gap-4 border-b border-paper/10 pb-4 ${
                  ev.isPlaceholder ? "opacity-60" : ""
                }`}
              >
                <div>
                  <p className="font-body text-sm font-semibold text-paper">{ev.nome}</p>
                  <p className="mt-0.5 font-body text-xs text-paper/60">
                    {ev.data} · {ev.local}
                  </p>
                  {ev.href && (
                    <a
                      href={ev.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-body text-xs font-semibold tracking-wide text-paper/50 uppercase transition-colors hover:text-gold"
                    >
                      Mais informações ↗
                    </a>
                  )}
                </div>
                {ev.isPlaceholder && (
                  <PlaceholderTag className="shrink-0 border-paper/30 text-paper/50" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
