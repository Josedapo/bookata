import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COLLECTIONS, BASE_URL } from "@/lib/config";
import {
  getBooksByCollection,
  getCollectionBySlug,
  getPopulatedCollections,
} from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import BookGrid from "@/components/BookGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";

/**
 * Only collections that resolve to real books get a page. A collection declared
 * with no backing sections is intentionally not generated, so the site never
 * ships an empty page to fill a slot.
 */
export function generateStaticParams() {
  return getPopulatedCollections().map(({ collection }) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  return buildPageMetadata({
    title: `${collection.label} — Colección Bookata`,
    description: collection.description,
    path: `/colecciones/${collection.slug}`,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const books = getBooksByCollection(collection);
  if (books.length === 0) notFound();

  const others = COLLECTIONS.filter(
    (c) => c.id !== collection.id && getBooksByCollection(c).length > 0
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemListJsonLd(books, collection.label)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: "Colecciones", url: `${BASE_URL}/colecciones` },
              { name: collection.label },
            ])
          ),
        }}
      />

      <PageHeader
        eyebrow={collection.tagline}
        title={collection.label}
        description={collection.description}
        breadcrumbs={
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Colecciones", href: "/colecciones" },
              { label: collection.label },
            ]}
          />
        }
      />

      <div className="shell py-12 sm:py-16">
        <BookGrid
          books={books}
          showBadge={collection.id !== "los-clasicos-que-nunca-fallan"}
        />

        <nav className="mt-16 border-t border-border pt-8" aria-label="Otras colecciones">
          <h2 className="font-display text-lg font-bold text-text">
            Otras colecciones
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {others.map((c) => (
              <li key={c.id}>
                <a
                  href={`/colecciones/${c.slug}`}
                  className="inline-block rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
