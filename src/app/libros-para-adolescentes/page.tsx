import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { getAdolescentBooks } from "@/lib/data";
import { AGE_GROUPS, BASE_URL } from "@/lib/config";
import BookGrid from "@/components/BookGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para adolescentes — Recomendaciones juveniles",
  description:
    "Los mejores libros para adolescentes recomendados por edad. Literatura juvenil curada con opinión editorial: romance, fantasía, misterio, ciencia ficción y más.",
  path: "/libros-para-adolescentes",
});

export default function LibrosParaAdolescentesPage() {
  const books = getAdolescentBooks();
  const teenAges = AGE_GROUPS.filter(
    (ag) => ag.range === "12-14" || ag.range === "14-16"
  );

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

      <PageHeader
        eyebrow="De 12 a 16 años"
        title="Libros para adolescentes"
        description="Los mejores libros recomendados para adolescentes de 12 a 16 años. Romance, fantasía, misterio, ciencia ficción y novelas que emocionan y desafían. Cada recomendación incluye nuestra opinión editorial para que sepas por qué merece la pena."
        breadcrumbs={
          <Breadcrumbs variant="light" items={[{ label: "Libros para adolescentes" }]} />
        }
      >
        <div className="mt-6 flex flex-wrap gap-2.5">
          {teenAges.map((ag) => (
            <Link
              key={ag.range}
              href={`/${ag.slug}`}
              className="rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm font-semibold text-on-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {ag.label}
            </Link>
          ))}
        </div>
      </PageHeader>

      <div className="shell py-12 sm:py-16">
        <BookGrid books={books} />
      </div>
    </>
  );
}
