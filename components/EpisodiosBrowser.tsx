"use client";

import { useState } from "react";
import { type Episodio } from "@/lib/content";
import { correspondePesquisa } from "@/lib/search";
import { EpisodeEntry } from "./EpisodeEntry";
import { SearchField } from "./SearchField";

export function EpisodiosBrowser({ episodios }: { episodios: Episodio[] }) {
  const [busca, setBusca] = useState("");

  if (episodios.length === 0) {
    return <p className="py-10 font-body text-sm text-paper/60">Sem episódios publicados de momento.</p>;
  }

  const filtrados = episodios.filter((ep) => correspondePesquisa(`${ep.titulo} ${ep.convidado}`, busca));

  return (
    <div>
      <div className="pb-6">
        <SearchField
          id="busca-episodios"
          label="Pesquisar"
          placeholder="Título ou convidado..."
          value={busca}
          onChange={setBusca}
          dark
        />
      </div>

      {filtrados.length > 0 ? (
        <ul>
          {filtrados.map((ep) => (
            <EpisodeEntry key={ep.numero} ep={ep} />
          ))}
        </ul>
      ) : (
        <p className="py-10 font-body text-sm text-paper/60">
          Nenhum episódio encontrado para &ldquo;{busca}&rdquo;.
        </p>
      )}
    </div>
  );
}
