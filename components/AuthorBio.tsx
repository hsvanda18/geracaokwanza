import Image from "next/image";
import type { Autor } from "@/lib/content";
import { Pensador } from "./icons/Pensador";

/** Closing "about the author" byline card — credits the artigo's author with a photo and bio, when set. */
export function AuthorBio({ autor }: { autor: Autor }) {
  return (
    <div className="mt-12 flex items-start gap-5 border-t-2 border-navy/10 pt-8">
      {autor.foto ? (
        <Image
          src={autor.foto.url}
          alt=""
          width={96}
          height={96}
          className="h-20 w-20 shrink-0 border-2 border-navy/15 object-cover sm:h-24 sm:w-24"
        />
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-navy/15 bg-navy/5 sm:h-24 sm:w-24">
          <Pensador size={28} color="var(--color-navy)" className="opacity-30" />
        </div>
      )}

      <div>
        <p className="font-body text-xs font-semibold tracking-wide text-navy/50 uppercase">Sobre o autor</p>
        <p className="font-display mt-1 text-lg font-semibold">{autor.nome}</p>
        {autor.bio && <p className="mt-2 max-w-xl font-body text-sm leading-relaxed opacity-80">{autor.bio}</p>}
      </div>
    </div>
  );
}
