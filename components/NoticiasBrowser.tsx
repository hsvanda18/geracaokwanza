"use client";

import { useState } from "react";
import { type Noticia } from "@/lib/content";
import { correspondePesquisa } from "@/lib/search";
import { NoticiaList } from "./NoticiaList";
import { SearchField } from "./SearchField";

export function NoticiasBrowser({ noticias }: { noticias: Noticia[] }) {
  const [busca, setBusca] = useState("");

  if (noticias.length === 0) {
    return <p className="py-10 font-body text-sm text-paper/60">Sem notícias publicadas de momento.</p>;
  }

  const filtradas = noticias.filter((n) => correspondePesquisa(`${n.titulo} ${n.resumo}`, busca));

  return (
    <div>
      <SearchField
        id="busca-noticias"
        label="Pesquisar"
        placeholder="Título ou resumo..."
        value={busca}
        onChange={setBusca}
        dark
      />

      {filtradas.length > 0 ? (
        <NoticiaList noticias={filtradas} />
      ) : (
        <p className="py-10 font-body text-sm text-paper/60">
          Nenhuma notícia encontrada para &ldquo;{busca}&rdquo;.
        </p>
      )}
    </div>
  );
}
