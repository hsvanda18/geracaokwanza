import Image from "next/image";
import type { Membro } from "@/lib/content";
import { Pensador } from "./icons/Pensador";

export function MembroCard({ membro }: { membro: Membro }) {
  return (
    <li className="flex flex-col items-center border-2 border-navy/10 p-6 text-center">
      {membro.foto ? (
        <Image
          src={membro.foto.url}
          alt=""
          width={112}
          height={112}
          className="h-24 w-24 border-2 border-navy/15 object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center border-2 border-navy/15 bg-navy/5">
          <Pensador size={28} color="var(--color-navy)" className="opacity-30" />
        </div>
      )}

      <p className="font-display mt-4 text-lg font-semibold">{membro.nome}</p>
      <p className="mt-1 font-body text-xs font-semibold tracking-wide text-navy/60 uppercase">{membro.cargo}</p>
      {membro.bio && <p className="mt-3 font-body text-sm leading-relaxed opacity-80">{membro.bio}</p>}
      {membro.href && (
        <a
          href={membro.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 font-body text-xs font-semibold tracking-wide uppercase opacity-60 transition-opacity hover:opacity-100"
        >
          Perfil ↗
        </a>
      )}
    </li>
  );
}
