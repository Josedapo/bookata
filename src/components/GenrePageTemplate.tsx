import Link from "next/link";
import type { GenreInfo } from "@/lib/types";
import { getBooksByGenre } from "@/lib/data";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { BASE_URL, GENRES, GENRE_ICONS } from "@/lib/config";
import BookGrid from "./BookGrid";
import Breadcrumbs from "./Breadcrumbs";
import PageHeader from "./PageHeader";

export default function GenrePageTemplate({ genre }: { genre: GenreInfo }) {
  const books = getBooksByGenre(genre.id);
  const heading = `Libros de ${genre.label.toLowerCase()} para jóvenes`;
  const otherGenres = GENRES.filter((g) => g.id !== genre.id);

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

      <PageHeader
        eyebrow="Género"
        title={heading}
        description={genre.description}
        breadcrumbs={<Breadcrumbs variant="light" items={[{ label: genre.label }]} />}
      >
        <p className="mt-5 text-sm text-on-ink-soft/70">
          {books.length} libros recomendados
        </p>
      </PageHeader>

      <div className="shell py-12 sm:py-16">
        {books.length > 0 ? (
          <BookGrid books={books} />
        ) : (
          <p className="py-8 text-center text-text-muted">
            Estamos preparando las recomendaciones para este género. Vuelve pronto.
          </p>
        )}

        <nav className="mt-16 border-t border-border pt-8" aria-label="Otros géneros">
          <h2 className="font-display text-lg font-bold text-text">Otros géneros</h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {otherGenres.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/${g.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  <span aria-hidden="true">{GENRE_ICONS[g.id]}</span>
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
