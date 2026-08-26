/** Formats a Sanity "date" (YYYY-MM-DD) as "2 de agosto de 2026". */
export function formatarData(iso: string): string {
  const data = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("pt-PT", { day: "numeric", month: "long", year: "numeric" }).format(data);
}

/** Formats a Sanity "datetime" as "2 de agosto de 2026 · 16h00". */
export function formatarDataHora(iso: string): string {
  const data = new Date(iso);
  const dataFormatada = new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(data);
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${dataFormatada} · ${horas}h${minutos}`;
}
