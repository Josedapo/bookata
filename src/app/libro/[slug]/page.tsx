import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBooks, getBookBySlug, getRelatedBooks } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBookJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { AGE_GROUPS, BASE_URL, GENRE_COLORS } from "@/lib/config";
import AmazonButton from "@/components/AmazonButton";
import BookGrid from "@/components/BookGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};

  return buildPageMetadata({
    title: `${book.title} de ${book.author} — Reseña y recomendación`,
    description: book.hook,
    path: `/libro/${book.slug}`,
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = getRelatedBooks(book);
  const primaryGenre = book.genres[0];
  const genreColor = GENRE_COLORS[primaryGenre] || "#78716C";
  const ageGroup = AGE_GROUPS.find((ag) => ag.range === book.ageRange[0]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBookJsonLd(book)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              ...(ageGroup
                ? [{ name: ageGroup.label, url: `${BASE_URL}/${ageGroup.slug}` }]
                : []),
              { name: book.title },
            ])
          ),
        }}
      />

      <Breadcrumbs
        items={[
          ...(ageGroup
            ? [{ label: ageGroup.label, href: `/${ageGroup.slug}` }]
            : []),
          { label: book.title },
        ]}
      />

      <article className="animate-reveal">
        <div className="grid gap-8 lg:grid-cols-3">
          <div
            className="flex items-center justify-center rounded-xl p-10 lg:col-span-1"
            style={{ backgroundColor: `${genreColor}12` }}
          >
            <div className="text-center">
              <p
                className="font-display text-2xl font-bold leading-tight"
                style={{ color: genreColor }}
              >
                {book.title}
              </p>
              <p className="mt-3 text-text-secondary">{book.author}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-1 text-lg text-text-secondary">{book.author}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {book.ageRange.map((age) => (
                <span
                  key={age}
                  className="rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary-dark"
                >
                  {age} años
                </span>
              ))}
              {book.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full px-3 py-1 text-sm font-medium text-white"
                  style={{
                    backgroundColor: GENRE_COLORS[genre] || "#78716C",
                  }}
                >
                  {genre === "ciencia-ficcion"
                    ? "Ciencia ficción"
                    : genre.charAt(0).toUpperCase() + genre.slice(1)}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-text">
                Sinopsis
              </h2>
              <p className="mt-3 leading-relaxed text-text-secondary">
                {book.synopsis}
              </p>
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-primary bg-primary-light/50 p-6">
              <h2 className="font-display text-xl font-bold text-primary-dark">
                Por qué te va a enganchar
              </h2>
              <p className="mt-3 leading-relaxed text-text">
                {book.hook}
              </p>
            </div>

            <div className="mt-8">
              <AmazonButton url={book.amazonUrl} bookTitle={book.title} />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-16">
          <BookGrid books={related} title="También te puede interesar" />
        </div>
      )}
    </>
  );
}
