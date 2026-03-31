import type { GenreInfo } from "@/lib/types";
import { getBooksByGenre } from "@/lib/data";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { BASE_URL } from "@/lib/config";
import BookGrid from "./BookGrid";
import Breadcrumbs from "./Breadcrumbs";

export default function GenrePageTemplate({
  genre,
}: {
  genre: GenreInfo;
}) {
  const books = getBooksByGenre(genre.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildItemListJsonLd(books, `Libros de ${genre.label.toLowerCase()}`)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: genre.label },
            ])
          ),
        }}
      />

      <Breadcrumbs items={[{ label: genre.label }]} />

      <div className="animate-reveal">
        <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
          Libros de {genre.label.toLowerCase()} para jóvenes
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {genre.description}
        </p>
      </div>

      <div className="mt-10">
        <BookGrid books={books} />
      </div>

      {books.length === 0 && (
        <p className="mt-8 text-center text-text-muted">
          Estamos preparando las recomendaciones para este género. Vuelve pronto.
        </p>
      )}
    </>
  );
}
