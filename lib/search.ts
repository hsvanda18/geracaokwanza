/** Strips diacritics so "política" matches a "politica" query. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/** Case- and accent-insensitive substring match; an empty query matches everything. */
export function correspondePesquisa(alvo: string, busca: string): boolean {
  const buscaLimpa = busca.trim();
  if (!buscaLimpa) return true;
  return normalizar(alvo).includes(normalizar(buscaLimpa));
}
