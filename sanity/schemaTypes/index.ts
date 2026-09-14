import { artigo } from "./artigo";
import { autor } from "./autor";
import { contacto } from "./contacto";
import { episodio } from "./episodio";
import { evento } from "./evento";
import { membro } from "./membro";
import { noticia } from "./noticia";
import { plataforma } from "./plataforma";
import { sobre } from "./sobre";
import { video } from "./video";

export const schemaTypes = [
  episodio,
  video,
  artigo,
  autor,
  noticia,
  evento,
  plataforma,
  membro,
  sobre,
  contacto,
];
