import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { getAdolescentBooks } from "@/lib/data";
import { BASE_URL } from "@/lib/config";
import BookGrid from "@/components/BookGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para adolescentes — Recomendaciones juveniles",
  description:
    "Los mejores libros para adolescentes recomendados por edad. Literatura juvenil curada con opinión editorial: romance, fantasía, misterio, ciencia ficción y más.",
  path: "/libros-para-adolescentes",
});

export default function LibrosParaAdolescentesPage() {
  const books = getAdolescentBooks();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildItemListJsonLd(books, "Libros para adolescentes")
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: "Libros para adolescentes" },
            ])
          ),
        }}
      />

      <Breadcrumbs items={[{ label: "Libros para adolescentes" }]} />

      <div className="animate-reveal">
        <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
          Libros para adolescentes
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
          Los mejores libros recomendados para adolescentes de 12 a 16 años.
          Romance, fantasía, misterio, ciencia ficción y novelas que emocionan y
          desafían. Cada recomendación incluye nuestra opinión editorial para que
          sepas por qué merece la pena.
        </p>
      </div>

      <div className="mt-10">
        <BookGrid books={books} />
      </div>
    </>
  );
}
