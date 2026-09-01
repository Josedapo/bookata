import type { Metadata } from "next";
import Link from "next/link";
import { getBooksByAge, getFeaturedBooks, getPopulatedCollections } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import { AGE_GROUPS } from "@/lib/config";
import { buildWebsiteJsonLd, buildOrganizationJsonLd } from "@/lib/jsonld";
import Hero from "@/components/Hero";
import GenreShowcase from "@/components/GenreShowcase";
import BookCarousel from "@/components/BookCarousel";
import HelpModule from "@/components/HelpModule";
import AboutStrip from "@/components/AboutStrip";

/*
 * The home page carried no canonical or OpenGraph tags before the redesign: it
 * was the only page that never called buildPageMetadata.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Bookata — Libros infantiles y juveniles recomendados por edad",
  description:
    "Descubre los mejores libros para niños y adolescentes organizados por edad y género. Recomendaciones curadas para padres con opinión editorial y enlace de compra.",
  path: "/",
  absoluteTitle: true,
});

/** Rail titles for the home page, per the redesign brief. */
const AGE_RAIL_TITLES: Record<string, string> = {
  "3-5": "Los favoritos para 3-5 años",
  "6-8": "Los mejores libros para 6-8 años",
  "8-10": "Para lectores de 8-10 años",
  "10-12": "Para lectores de 10-12 años",
  "12-14": "Para lectores de 12-14 años",
  "14-16": "Para adolescentes de 14-16 años",
};

export default function HomePage() {
  const featured = getFeaturedBooks(18);
  const booksByAge = AGE_GROUPS.map((ag) => ({
    ...ag,
    books: getBooksByAge(ag.range),
  }));
  const collections = getPopulatedCollections();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
      />

      <Hero />

      <div className="py-12 sm:py-16">
        <GenreShowcase />
      </div>

      <div id="catalogo" className="scroll-mt-20 space-y-12 pb-14 sm:space-y-14 sm:pb-20">
        <BookCarousel
          title="Libros destacados"
          subtitle="Los que casi nunca fallan, elijas la edad que elijas"
          books={featured}
          href="/colecciones/los-clasicos-que-nunca-fallan"
          priority
          showBadge={false}
        />

        {booksByAge.map((ag) => (
          <BookCarousel
            key={ag.range}
            title={AGE_RAIL_TITLES[ag.range] ?? `Libros para ${ag.label}`}
            books={ag.books}
            href={`/${ag.slug}`}
          />
        ))}
      </div>

      {/* Colecciones Bookata */}
      <section className="bg-surface-alt py-14 sm:py-20">
        <div className="shell">
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            Colecciones Bookata
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-text-secondary sm:text-base">
            Selecciones que cruzan edades y géneros, pensadas para cuando no
            buscas un título concreto sino un tipo de lectura.
          </p>
          <Link
            href="/colecciones"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Ver todas las colecciones
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="mt-8 space-y-12 sm:space-y-14">
          {collections.slice(0, 5).map(({ collection, books }) => (
            <BookCarousel
              key={collection.id}
              title={collection.label}
              subtitle={collection.tagline}
              books={books}
              href={`/colecciones/${collection.slug}`}
              showBadge={collection.id !== "los-clasicos-que-nunca-fallan"}
            />
          ))}
        </div>
      </section>

      <HelpModule />
      <AboutStrip />
    </>
  );
}
