import type { Book } from "./types";
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from "./config";
import { getCatalogueDateISO } from "./data";

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "es",
    dateModified: getCatalogueDateISO(),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function buildBookJsonLd(book: Book) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author },
    isbn: book.isbn,
    url: `${BASE_URL}/libro/${book.slug}`,
    description: book.hook,
    ...(book.coverUrl ? { image: book.coverUrl } : {}),
  };
}

/**
 * A listing page is a CollectionPage whose main entity is the ItemList. The wrapper
 * exists so the page can carry `dateModified`: `ItemList` is an Intangible, not a
 * CreativeWork, so a date on it would be invalid schema.
 *
 * The date is the catalogue's, which is genuinely this page's date, because a listing
 * page *is* the set of books it shows. Book detail pages deliberately carry no date:
 * `books.json` holds no per-book date, and claiming the catalogue's would be asserting
 * a freshness the data cannot back.
 */
export function buildItemListJsonLd(books: Book[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: listName,
    inLanguage: "es",
    dateModified: getCatalogueDateISO(),
    mainEntity: {
      "@type": "ItemList",
      name: listName,
      itemListElement: books.map((book, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: book.title,
        url: `${BASE_URL}/libro/${book.slug}`,
      })),
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

/**
 * FAQPage for question blocks that are visible on the page. Only ever called
 * with questions a reader can actually see, which is what the markup requires.
 */
export function buildFaqJsonLd(qa: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
