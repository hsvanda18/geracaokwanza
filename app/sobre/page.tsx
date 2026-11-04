import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pensador } from "@/components/icons/Pensador";
import { MembroCard } from "@/components/MembroCard";
import { pilares } from "@/components/MissionBand";
import { PlaceholderTag } from "@/components/PlaceholderTag";
import { getContacto, getMembrosEquipa, getNumeros, getSobre } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Sobre nós — Geração Kwanza",
  description:
    "A Geração Kwanza é uma plataforma de podcast e conteúdo sobre economia, política e sociedade angolanas.",
};

const CONTAINER = "mx-auto max-w-[1400px] px-5 sm:px-8";

function Titulo({ children, claro = false }: { children: ReactNode; claro?: boolean }) {
  return (
    <h2
      className={`font-display border-b-2 pb-4 text-2xl font-semibold tracking-wide uppercase sm:text-3xl ${
        claro ? "border-gold/40 text-paper" : "border-navy"
      }`}
    >
      {children}
    </h2>
  );
}

export default async function SobrePage() {
  const [sobre, equipa, numeros, contacto] = await Promise.all([
    getSobre(),
    getMembrosEquipa(),
    getNumeros(),
    getContacto(),
  ]);

  // Real counts only — a type with nothing published yet is simply left out.
  const estatisticas = [
    { valor: numeros.episodios, singular: "Episódio", plural: "Episódios" },
    { valor: numeros.artigos, singular: "Artigo", plural: "Artigos" },
    { valor: numeros.noticias, singular: "Notícia", plural: "Notícias" },
    { valor: numeros.eventos, singular: "Evento", plural: "Eventos" },
  ].filter((e) => e.valor > 0);

  const temMissao = Boolean(sobre.missao || sobre.visao);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="border-b-2 border-gold/30 bg-navy">
          <div className={`${CONTAINER} pt-12 pb-14 sm:pt-16 sm:pb-20`}>
            <Pensador size={30} color="var(--color-gold)" className="opacity-60" />
            <h1 className="font-display mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold text-paper uppercase">
              Sobre nós
            </h1>
            <p className="mt-4 max-w-xl font-body text-lg text-paper/70">
              Um jornal de opinião com energia de podcast.
            </p>

            {estatisticas.length > 0 && (
              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t-2 border-gold/20 pt-8 sm:mt-14 sm:grid-cols-4">
                {estatisticas.map((e) => (
                  <div key={e.plural} className="flex flex-col-reverse">
                    <dt className="mt-2 font-body text-xs font-bold tracking-[0.16em] text-paper/60 uppercase">
                      {e.valor === 1 ? e.singular : e.plural}
                    </dt>
                    <dd className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none font-semibold text-gold">
                      {e.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* Quem somos */}
        <section className="bg-paper py-14 text-navy sm:py-20">
          <div className={CONTAINER}>
            <Titulo>Quem somos</Titulo>
            <div className="mt-8 max-w-[72ch]">
              <p className="font-body text-xl leading-relaxed font-medium opacity-90">
                A Geração Kwanza é uma plataforma de podcast e conteúdo sobre economia, política e
                sociedade angolanas.
              </p>
              <p className="mt-5 font-body text-lg leading-relaxed opacity-80">
                Não fazemos entretenimento nem comédia. Fazemos debate cívico a sério, com
                identidade editorial forte: substância rigorosa, entrega visual ousada. Juntamos
                vozes angolanas para discutir o que molda o país — da economia ao poder, da
                cultura ao quotidiano — em episódios, artigos e eventos que tratam o público como
                adulto.
              </p>

              {sobre.texto && (
                <div className="mt-6 space-y-4 font-body text-lg leading-relaxed opacity-80">
                  <PortableText value={sobre.texto} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Áreas de cobertura */}
        <section className="bg-navy py-14 sm:py-20">
          <div className={CONTAINER}>
            <Titulo claro>O que cobrimos</Titulo>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {pilares.map((p) => (
                <li key={p.tema} className="border-2 border-gold/30 p-6">
                  <Pensador size={26} color="var(--color-gold)" className="opacity-80" />
                  <p className="font-display mt-4 text-lg font-bold tracking-[0.14em] text-gold uppercase">
                    {p.tema}
                  </p>
                  <p className="mt-2 font-body leading-relaxed text-paper/80">{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* A nossa história */}
        {sobre.marcos.length > 0 && (
          <section className="bg-paper py-14 text-navy sm:py-20">
            <div className={CONTAINER}>
              <Titulo>A nossa história</Titulo>
              <ol className="mt-10 max-w-3xl">
                {sobre.marcos.map((m, i) => (
                  <li key={i} className="relative grid grid-cols-[4.5rem_1fr] gap-5 pb-10 last:pb-0 sm:grid-cols-[5.5rem_1fr]">
                    {i < sobre.marcos.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-12 bottom-0 left-[2.25rem] w-0.5 bg-navy/15 sm:left-[2.75rem]"
                      />
                    )}
                    <span className="font-display relative flex h-12 items-center justify-center bg-gold text-lg font-semibold text-navy">
                      {m.ano}
                    </span>
                    <div className="border-2 border-navy/10 p-5">
                      <h3 className="font-display text-lg font-semibold">{m.titulo}</h3>
                      {m.descricao && (
                        <p className="mt-2 font-body leading-relaxed opacity-80">{m.descricao}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Missão e visão */}
        {temMissao && (
          <section className="bg-gold py-14 text-navy sm:py-20">
            <div className={`${CONTAINER} grid gap-10 sm:grid-cols-2 sm:gap-14`}>
              {[
                { titulo: "Missão", texto: sobre.missao },
                { titulo: "Visão", texto: sobre.visao },
              ]
                .filter((b) => b.texto)
                .map((b) => (
                  <div key={b.titulo} className="border-t-2 border-navy/30 pt-6">
                    <Pensador size={26} color="var(--color-navy)" className="opacity-80" />
                    <h2 className="font-display mt-4 text-2xl font-semibold tracking-wide uppercase sm:text-3xl">
                      {b.titulo}
                    </h2>
                    <p className="mt-4 font-body text-lg leading-relaxed whitespace-pre-line opacity-90">
                      {b.texto}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Valores e equipa */}
        {(sobre.valores.length > 0 || equipa.length > 0) && (
          <section className="bg-paper py-14 text-navy sm:py-20">
            <div className={CONTAINER}>
              {sobre.valores.length > 0 && (
                <>
                  <Titulo>Os nossos valores</Titulo>
                  <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {sobre.valores.map((v, i) => (
                      <li key={i} className="border-2 border-navy/10 p-6">
                        <p className="font-display text-3xl leading-none font-semibold text-navy/25">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="font-display mt-4 text-lg font-semibold uppercase">{v.titulo}</h3>
                        {v.descricao && (
                          <p className="mt-2 font-body text-sm leading-relaxed opacity-80">{v.descricao}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {equipa.length > 0 && (
                <div className={sobre.valores.length > 0 ? "mt-16 sm:mt-20" : ""}>
                  <Titulo>A equipa</Titulo>
                  <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {equipa.map((membro, i) => (
                      <MembroCard key={i} membro={membro} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Perguntas frequentes e contacto */}
        <section className="bg-navy-ink py-14 sm:py-20">
          <div
            className={`${CONTAINER} grid gap-12 ${sobre.perguntas.length > 0 ? "lg:grid-cols-[2fr_1fr]" : ""}`}
          >
            {sobre.perguntas.length > 0 && (
              <div>
                <Titulo claro>Perguntas frequentes</Titulo>
                <div className="mt-8 divide-y-2 divide-gold/15 border-y-2 border-gold/15">
                  {sobre.perguntas.map((p, i) => (
                    <details key={i} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-body font-semibold text-paper transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                        {p.pergunta}
                        <span
                          aria-hidden="true"
                          className="font-display text-2xl leading-none text-gold transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="pb-6 font-body leading-relaxed whitespace-pre-line text-paper/75">
                        {p.resposta}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <aside className="h-fit max-w-xl border-2 border-gold p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-wide text-paper uppercase">
                Fala connosco
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-paper/70">
                Tens uma pergunta, uma sugestão ou uma proposta de parceria? Escreve-nos.
              </p>

              <p className="mt-6 font-body text-xs font-bold tracking-[0.16em] text-gold uppercase">Email</p>
              <p className="mt-2 flex flex-wrap items-center gap-2 font-body text-paper">
                {contacto.emailIsPlaceholder ? (
                  <>
                    <span className="text-paper/70">{contacto.email}</span>
                    <PlaceholderTag className="border-paper/30 text-paper/50" />
                  </>
                ) : (
                  <a href={`mailto:${contacto.email}`} className="break-all underline-offset-4 hover:text-gold hover:underline">
                    {contacto.email}
                  </a>
                )}
              </p>

              {contacto.redes.length > 0 && (
                <>
                  <p className="mt-6 font-body text-xs font-bold tracking-[0.16em] text-gold uppercase">Redes</p>
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {contacto.redes.map((r, i) => (
                      <li key={i}>
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-paper/80 hover:text-gold"
                        >
                          {r.nome} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {!contacto.emailIsPlaceholder && (
                <a
                  href={`mailto:${contacto.email}`}
                  className="mt-8 inline-block border-2 border-gold bg-gold px-5 py-3 font-body text-sm font-bold tracking-[0.1em] text-navy uppercase transition-colors hover:bg-transparent hover:text-gold"
                >
                  Enviar email
                </a>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
