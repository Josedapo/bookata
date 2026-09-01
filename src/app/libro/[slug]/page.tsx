import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBooks,
  getBookBySlug,
  getRelatedBooks,
  getSectionLabelsForBook,
  isSafeBet,
} from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBookJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { AGE_GROUPS, GENRES, BASE_URL, GENRE_GLOW } from "@/lib/config";
import AmazonButton from "@/components/AmazonButton";
import StickyBuyBar from "@/components/StickyBuyBar";
import BookCarousel from "@/components/BookCarousel";
import Breadcrumbs from "@/components/Breadcrumbs";

const BUY_ANCHOR = "ver-precio";

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

/** Short teaser for the top block. The full synopsis still renders below. */
function teaser(text: string, max = 210): string {
  if (!text) return "";
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (lastStop > max * 0.5) return cut.slice(0, lastStop + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = getRelatedBooks(book, 14);
  const ageGroup = AGE_GROUPS.find((ag) => ag.range === book.ageRange[0]);
  const sectionLabels = getSectionLabelsForBook(book);
  const shortDescription = teaser(book.synopsis || book.hook);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBookJsonLd(book)) }}
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

      {/*
        Above the fold: cover, the essential facts and the price CTA. Nothing
        else comes before the button, on desktop or on mobile.
      */}
      <section className="relative overflow-hidden bg-ink">
        {book.coverUrl && (
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={book.coverUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-150 object-cover blur-3xl brightness-[0.35] saturate-150"
            />
            <div className="absolute inset-0 bg-ink/55" />
          </div>
        )}

        <div className="shell relative z-10 pb-10 pt-19 sm:pb-14 sm:pt-28">
          <Breadcrumbs
            variant="light"
            items={[
              ...(ageGroup ? [{ label: ageGroup.label, href: `/${ageGroup.slug}` }] : []),
              { label: book.title },
            ]}
          />

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-10">
            <div className="relative aspect-2/3 w-32 flex-none overflow-hidden rounded-xl shadow-2xl sm:w-52 lg:w-60">
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={`Portada de ${book.title}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 128px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-ink-elevated p-4 text-center">
                  <p className="font-display font-semibold text-on-ink">{book.title}</p>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              {isSafeBet(book) && (
                <span className="mb-2 inline-block sm:mb-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                  Acierto seguro
                </span>
              )}

              <h1 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>
              <p className="mt-1.5 text-base text-white/75 sm:mt-2 sm:text-lg">{book.author}</p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4 sm:justify-start">
                {book.ageRange.map((age) => {
                  const ag = AGE_GROUPS.find((a) => a.range === age);
                  return (
                    <Link
                      key={age}
                      href={ag ? `/${ag.slug}` : "#"}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-3.5 sm:py-1.5 sm:text-sm"
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
                      className="rounded-full px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-85 sm:px-3.5 sm:py-1.5 sm:text-sm"
                      style={{ backgroundColor: `${GENRE_GLOW[genre] ?? "#64748B"}D0` }}
                    >
                      {g?.label ?? genre}
                    </Link>
                  );
                })}
              </div>

              {shortDescription && (
                <p className="mx-auto mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/80 sm:mx-0 sm:mt-5 sm:line-clamp-none sm:text-base">
                  {shortDescription}
                </p>
              )}

              <div className="mt-5 sm:mt-7">
                <AmazonButton
                  id={BUY_ANCHOR}
                  url={book.amazonUrl}
                  bookTitle={book.title}
                />
                <p className="mt-2 text-[11px] leading-snug text-white/50 sm:text-xs">
                  Te llevamos a Amazon. Bookata recibe una pequeña comisión sin
                  coste adicional para ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-2xl space-y-10">
            {book.synopsis && (
              <section>
                <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
                  De qué va
                </h2>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  {book.synopsis}
                </p>
              </section>
            )}

            <section>
              <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
                ¿Por qué lo recomendamos?
              </h2>
              <p className="mt-3 leading-relaxed text-text-secondary">{book.hook}</p>
            </section>
          </div>

          {/*
            "Perfecto para..." is assembled from the curated sections this book
            was placed in plus its age and genre. Every line is existing
            editorial data, never generated copy.
          */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-surface-alt p-6">
              <h2 className="font-display text-lg font-bold text-text">
                Perfecto para...
              </h2>
              <ul className="mt-4 space-y-2.5">
                {ageGroup && (
                  <li className="flex gap-2.5 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    Lectores de {ageGroup.label}
                  </li>
                )}
                {book.genres.map((genre) => {
                  const g = GENRES.find((gi) => gi.id === genre);
                  if (!g) return null;
                  return (
                    <li key={genre} className="flex gap-2.5 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      Quien disfruta de {g.label.toLowerCase()}
                    </li>
                  );
                })}
                {sectionLabels.map((label) => (
                  <li key={label} className="flex gap-2.5 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-border pt-5">
                <AmazonButton
                  url={book.amazonUrl}
                  bookTitle={book.title}
                  variant="compact"
                />
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <div className="bg-surface-alt py-12 sm:py-16">
          <BookCarousel title="También te puede gustar" books={related} />
        </div>
      )}

      <StickyBuyBar url={book.amazonUrl} title={book.title} watchId={BUY_ANCHOR} />
    </>
  );
}
