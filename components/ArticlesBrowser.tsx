"use client";

import Link from "next/link";
import { useState } from "react";
import { TEMAS, tempoDeLeitura, type Artigo, type Tema } from "@/lib/content";
import { correspondePesquisa } from "@/lib/search";
import { ArticleList } from "./ArticleList";
import { PlaceholderTag } from "./PlaceholderTag";
import { SearchField } from "./SearchField";
import { ThemeTag } from "./ThemeTag";

/**
 * The dedicated /artigos page: the newest article leads as a featured
 * block (scale carries the emphasis — no "em destaque" eyebrow label), and
 * the rest of the catalogue is filterable by theme and searchable by text.
 * The featured block steps aside while a search is active, since it isn't
 * itself part of the filtered result set.
 */
export function ArticlesBrowser({ artigos }: { artigos: Artigo[] }) {
  const [filtro, setFiltro] = useState<Tema | "TODOS">("TODOS");
  const [busca, setBusca] = useState("");
  const [destaque, ...resto] = artigos;

  if (!destaque) return null;

  const emPesquisa = busca.trim().length > 0;
  const base = emPesquisa ? artigos : resto;
  const porTema = filtro === "TODOS" ? base : base.filter((a) => a.tema === filtro);
  const listaFiltrada = porTema.filter((a) => correspondePesquisa(`${a.titulo} ${a.lead}`, busca));

  return (
    <div>
      {!emPesquisa && (
        <Link href={`/artigos/${destaque.slug}`} className="group block border-b-2 border-navy pb-12">
          <span className="sr-only">Artigo em destaque:</span>
          <div className="flex flex-wrap items-center gap-3">
            <ThemeTag tema={destaque.tema} dark />
            {destaque.isPlaceholder && <PlaceholderTag className="border-navy/30 text-navy/50" />}
          </div>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] font-semibold group-hover:underline">
            {destaque.titulo}
          </h2>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed opacity-80">{destaque.lead}</p>
          <p className="mt-4 font-body text-sm font-semibold opacity-60">
            {destaque.autor} · {destaque.data} · {tempoDeLeitura(destaque)} min de leitura
          </p>
        </Link>
      )}

      {resto.length > 0 && (
        <>
          <div className={`flex flex-wrap items-end justify-between gap-6 ${emPesquisa ? "" : "mt-10"}`}>
            <div role="group" aria-label="Filtrar artigos por tema" className="flex flex-wrap items-center gap-3">
              <FiltroBotao label="Todos" active={filtro === "TODOS"} onClick={() => setFiltro("TODOS")} />
              {TEMAS.map((tema) => (
                <FiltroBotao
                  key={tema}
                  label={tema}
                  active={filtro === tema}
                  onClick={() => setFiltro(tema)}
                />
              ))}
            </div>
            <SearchField
              id="busca-artigos"
              label="Pesquisar"
              placeholder="Título ou resumo..."
              value={busca}
              onChange={setBusca}
            />
          </div>

          {listaFiltrada.length > 0 ? (
            <ArticleList artigos={listaFiltrada} />
          ) : (
            <p className="py-10 font-body text-sm text-navy/60">
              {emPesquisa
                ? `Nenhum artigo encontrado para "${busca}".`
                : `Ainda não há artigos de ${filtro} além do destaque acima.`}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function FiltroBotao({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border-2 px-4 py-1.5 font-body text-xs font-bold tracking-[0.1em] uppercase transition-colors ${
        active
          ? "border-navy bg-navy text-paper"
          : "border-navy/30 text-navy/60 hover:border-navy hover:text-navy"
      }`}
    >
      {label}
    </button>
  );
}
