import type { StructureResolver } from "sanity/structure";

/**
 * Pins "Contacto" to a single fixed document (id "contacto") instead of a
 * list, since only one contact record should ever exist — the standard
 * Sanity singleton recipe.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.documentTypeListItem("episodio").title("Episódios"),
      S.documentTypeListItem("artigo").title("Artigos"),
      S.documentTypeListItem("autor").title("Autores"),
      S.documentTypeListItem("noticia").title("Notícias"),
      S.documentTypeListItem("evento").title("Eventos"),
      S.documentTypeListItem("plataforma").title("Plataformas"),
      S.divider(),
      S.listItem()
        .title("Contacto")
        .child(S.document().schemaType("contacto").documentId("contacto")),
    ]);
