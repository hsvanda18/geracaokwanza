import { Pensador } from "./icons/Pensador";

const pilares = [
  {
    tema: "ECONOMIA",
    texto: "O kwanza, os preços, o crédito e o trabalho — como se decide o que se pode pagar.",
  },
  {
    tema: "POLÍTICA",
    texto: "Poder, instituições e decisões públicas — quem decide e a favor de quem.",
  },
  {
    tema: "SOCIEDADE",
    texto: "Cidade, cultura e vida quotidiana angolana — o que muda fora dos gabinetes.",
  },
];

export function MissionBand() {
  return (
    <section className="bg-gold py-16 text-navy sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="font-display max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold uppercase">
          Debate a sério sobre Angola, sem filtro de entretenimento
        </h2>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed opacity-85">
          A Geração Kwanza discute a economia, a política e a sociedade angolanas com
          profundidade — em episódios, artigos e eventos que tratam o público como
          adulto.
        </p>

        <ul className="mt-14 grid gap-8 border-t-2 border-navy/20 pt-10 sm:grid-cols-3">
          {pilares.map((p) => (
            <li key={p.tema}>
              <Pensador size={26} color="var(--color-navy)" className="opacity-80" />
              <p className="font-display mt-3 text-sm font-bold tracking-[0.14em] uppercase">
                {p.tema}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed opacity-80">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
