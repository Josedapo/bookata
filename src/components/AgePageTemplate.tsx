import type { AgeRange } from "@/lib/types";
import type { AgeGroup } from "@/lib/types";
import { getBooksByAge } from "@/lib/data";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { BASE_URL } from "@/lib/config";
import BookGrid from "./BookGrid";
import Breadcrumbs from "./Breadcrumbs";

export default function AgePageTemplate({
  ageGroup,
}: {
  ageGroup: AgeGroup;
}) {
  const books = getBooksByAge(ageGroup.range);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildItemListJsonLd(books, `Libros para niños de ${ageGroup.label}`)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: `${ageGroup.label}` },
            ])
          ),
        }}
      />

      <Breadcrumbs items={[{ label: `${ageGroup.label}` }]} />

      <div className="animate-reveal">
        <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
          Libros para niños de {ageGroup.label}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {ageGroup.description}
        </p>
      </div>

      <div className="mt-10">
        <BookGrid books={books} />
      </div>

      {books.length === 0 && (
        <p className="mt-8 text-center text-text-muted">
          Estamos preparando las recomendaciones para esta franja de edad. Vuelve pronto.
        </p>
      )}
    </>
  );
}
