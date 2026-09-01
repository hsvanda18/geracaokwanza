import Image from "next/image";
import type { Autor } from "@/lib/content";
import { Pensador } from "./icons/Pensador";

/** "About the author" card — credits the artigo's author with a centered photo, name and bio, when set. */
export function AuthorBio({ autor }: { autor: Autor }) {
  return (
    <div className="mt-8 flex flex-col items-center border-t-2 border-b-2 border-navy/10 py-8 text-center">
      <p className="font-body text-xs font-semibold tracking-wide text-navy/50 uppercase">Sobre o autor</p>

      {autor.foto ? (
        <Image
          src={autor.foto.url}
          alt=""
          width={112}
          height={112}
          className="mt-4 h-24 w-24 border-2 border-navy/15 object-cover sm:h-28 sm:w-28"
        />
      ) : (
        <div className="mt-4 flex h-24 w-24 items-center justify-center border-2 border-navy/15 bg-navy/5 sm:h-28 sm:w-28">
          <Pensador size={32} color="var(--color-navy)" className="opacity-30" />
        </div>
      )}

      <p className="font-display mt-4 text-xl font-semibold">{autor.nome}</p>
      {autor.bio && <p className="mt-2 max-w-lg font-body text-sm leading-relaxed opacity-80">{autor.bio}</p>}
    </div>
  );
}
