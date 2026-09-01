import Link from "next/link";
import type { AgeGroup } from "@/lib/types";
import { getBooksByAge } from "@/lib/data";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { AGE_GROUPS, BASE_URL, SECTIONS } from "@/lib/config";
import BookCarousel from "./BookCarousel";
import Breadcrumbs from "./Breadcrumbs";
import PageHeader from "./PageHeader";

export default function AgePageTemplate({ ageGroup }: { ageGroup: AgeGroup }) {
  const books = getBooksByAge(ageGroup.range);
  const isTeen = parseInt(ageGroup.range.split("-")[0], 10) >= 12;
  const audience = isTeen ? "adolescentes" : "niños";
  const heading = `Libros para ${audience} de ${ageGroup.label}`;

  const sectionRows = SECTIONS.filter((s) => s.ageRange === ageGroup.range)
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      ...section,
      books: books.filter((b) => b.sections.includes(section.id)),
    }))
    .filter((row) => row.books.length > 0);

  const otherAges = AGE_GROUPS.filter((ag) => ag.range !== ageGroup.range);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemListJsonLd(books, heading)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: "Por edades", url: `${BASE_URL}/por-edades` },
              { name: ageGroup.label },
            ])
          ),
        }}
      />

      <PageHeader
        eyebrow={ageGroup.tagline}
        title={heading}
        description={ageGroup.description}
        breadcrumbs={
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Por edades", href: "/por-edades" },
              { label: ageGroup.label },
            ]}
          />
        }
      >
        <p className="mt-5 text-sm text-on-ink-soft/70">
          {books.length} libros recomendados en {sectionRows.length} selecciones
        </p>
      </PageHeader>

      {books.length > 0 ? (
        <div className="space-y-12 py-12 sm:space-y-14 sm:py-16">
          {sectionRows.map((row) => (
            <BookCarousel key={row.id} title={row.label} books={row.books} />
          ))}
        </div>
      ) : (
        <p className="shell py-16 text-center text-text-muted">
          Estamos preparando las recomendaciones para esta franja de edad. Vuelve
          pronto.
        </p>
      )}

      <nav className="shell border-t border-border py-10" aria-label="Otras edades">
        <h2 className="font-display text-lg font-bold text-text">Otras edades</h2>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {otherAges.map((ag) => (
            <li key={ag.range}>
              <Link
                href={`/${ag.slug}`}
                className="inline-block rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                {ag.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
