import Link from "next/link";
import type { AgeGroup } from "@/lib/types";
import { getBooksByAge } from "@/lib/data";
import { buildItemListJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/jsonld";
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

  const reluctantAnswer =
    "Es lo más habitual a esta edad, y casi siempre es cuestión de no haber dado todavía con el libro. Los que mejor funcionan con lectores que dicen que leer no es lo suyo entran rápido, se leen en pocas tardes y no parecen deberes.";
  const faq = [
    {
      question: `¿Qué libros son buenos para un ${audience === "niños" ? "niño" : "adolescente"} de ${ageGroup.label}?`,
      answer: ageGroup.guidance,
    },
    { question: "¿Y si no le gusta leer?", answer: reluctantAnswer },
  ];

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faq)) }}
      />

      <PageHeader
        eyebrow={ageGroup.tagline}
        title={heading}
        description={`${ageGroup.lead} Aquí hay ${books.length} libros elegidos para esa edad, agrupados por lo que le gusta a cada lector.`}
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
          {sectionRows.length} selecciones para esta edad
        </p>
      </PageHeader>

      {/*
        Question-form heading with a self-contained answer. It exists so a search
        snippet or an LLM can lift the paragraph and attribute it, which the
        editorial section titles below cannot do on their own.
      */}
      <section className="shell pt-10 sm:pt-12">
        <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
          {faq[0].question}
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">
          {ageGroup.guidance}
        </p>
      </section>

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

      <section className="shell border-t border-border py-10">
        <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
          ¿Y si no le gusta leer?
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">
          Es lo más habitual a esta edad, y casi siempre es cuestión de no haber
          dado todavía con el libro.{" "}
          <Link
            href="/colecciones/para-quienes-dicen-que-no-les-gusta-leer"
            className="text-primary underline underline-offset-4"
          >
            Esta selección
          </Link>{" "}
          reúne los que mejor funcionan con lectores que dicen que leer no es lo
          suyo: entran rápido, se leen en pocas tardes y no parecen deberes.
        </p>
      </section>

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
