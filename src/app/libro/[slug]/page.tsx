import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBooks, getBookBySlug, getRelatedBooks } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBookJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { AGE_GROUPS, GENRES, BASE_URL, GENRE_COLORS } from "@/lib/config";
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
  const coverSrc = book.coverUrl || "";

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

      {/* Hero backdrop with blurred cover */}
      {coverSrc && (
        <div
          className="relative -mx-4 -mt-8 mb-10 overflow-hidden sm:-mx-6 lg:-mx-8"
          style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
        >
          {/* Blurred background */}
          <div className="absolute inset-0">
            <Image
              src={coverSrc}
              alt=""
              fill
              className="object-cover scale-150 blur-[15px] brightness-[0.45]"
              sizes="100vw"
              aria-hidden="true"
            />
          </div>
          {/* Gradient fade to page background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, #FFF8F0 100%)' }} />

          {/* Breadcrumbs inside hero */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <Breadcrumbs
              variant="light"
              items={[
                ...(ageGroup
                  ? [{ label: ageGroup.label, href: `/${ageGroup.slug}` }]
                  : []),
                { label: book.title },
              ]}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-12 sm:flex-row sm:items-end sm:gap-10 sm:px-6 sm:pb-16 lg:px-8">
            <div className="flex-shrink-0">
              <Image
                src={coverSrc}
                alt={`Portada de ${book.title}`}
                width={220}
                height={330}
                className="h-72 w-auto rounded-xl shadow-2xl sm:h-80"
              />
            </div>
            <div className="text-center sm:text-left sm:pb-4">
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-1 text-lg text-white/80">{book.author}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {book.ageRange.map((age) => {
                  const ag = AGE_GROUPS.find((a) => a.range === age);
                  return (
                    <Link
                      key={age}
                      href={ag ? `/${ag.slug}` : "#"}
                      className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      {age} años
                    </Link>
                  );
                })}
                {book.genres.map((genre) => {
                  const g = GENRES.find((gi) => gi.id === genre);
                  return (
                    <Link
                      key={genre}
                      href={g ? `/${g.slug}` : "#"}
                      className="rounded-full px-3 py-1 text-sm font-medium text-white hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: (GENRE_COLORS[genre] || "#78716C") + "CC",
                      }}
                    >
                      {genre === "ciencia-ficcion"
                        ? "Ciencia ficción"
                        : genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <article className="animate-reveal max-w-3xl">
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold text-text">
            Sinopsis
          </h2>
          <p className="mt-3 leading-relaxed text-text-secondary">
            {book.synopsis}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border-l-4 border-primary bg-primary-light/50 p-6">
          <h2 className="font-display text-xl font-bold text-primary-dark">
            ¿Por qué te va a enganchar?
          </h2>
          <p className="mt-3 leading-relaxed text-text">
            {book.hook}
          </p>
        </div>

        <div className="mt-8">
          <AmazonButton url={book.amazonUrl} bookTitle={book.title} />
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
