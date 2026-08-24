import type { Noticia } from "@/lib/content";
import { Pensador } from "./icons/Pensador";
import { PlaceholderTag } from "./PlaceholderTag";
import { ThemeTag } from "./ThemeTag";

/**
 * Compact, dated news-item list — deliberately terser than ArticleList
 * (no author, no reading time, no dedicated page): a notícia is a quick
 * factual update, not long-form analysis.
 */
export function NoticiaList({ noticias }: { noticias: Noticia[] }) {
  return (
    <ul className="divide-y-2 divide-paper/15">
      {noticias.map((noticia, i) => (
        <li key={i}>
          <Row noticia={noticia} />
        </li>
      ))}
    </ul>
  );
}

function Row({ noticia }: { noticia: Noticia }) {
  const content = (
    <>
      <Pensador size={18} color="var(--color-paper)" className="mt-1 shrink-0 opacity-30" />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <ThemeTag tema={noticia.tema} />
          {noticia.isPlaceholder && <PlaceholderTag className="border-paper/30 text-paper/50" />}
        </div>
        <h3 className="font-display mt-2 text-lg leading-snug font-semibold text-paper">
          {noticia.titulo}
        </h3>
        <p className="mt-1 max-w-2xl font-body text-sm leading-relaxed text-paper/70">
          {noticia.resumo}
        </p>
      </div>
      <span className="font-body text-xs font-semibold whitespace-nowrap text-paper/50 sm:text-right">
        {noticia.data}
      </span>
    </>
  );

  const className =
    "group flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-4" +
    (noticia.isPlaceholder ? " opacity-70" : "");

  if (noticia.href) {
    return (
      <a href={noticia.href} target="_blank" rel="noopener noreferrer" className={`${className} hover:opacity-80`}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
