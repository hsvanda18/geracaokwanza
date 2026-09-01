import Image from "next/image";
import type { Imagem } from "@/lib/content";

export function ImageGallery({ imagens }: { imagens: Imagem[] }) {
  return (
    <div className="my-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {imagens.map((imagem, i) => (
        <div key={i} className="relative aspect-[4/3] border-2 border-navy/10">
          <Image
            src={imagem.url}
            alt={imagem.alt ?? ""}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
