import type { Book } from "./types";
import { BASE_URL, SITE_NAME } from "./config";

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Descubre los mejores libros para niños y adolescentes organizados por edad y género literario.",
    inLanguage: "es",
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Recomendaciones curadas de libros infantiles y juveniles para padres en España.",
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

export function buildItemListJsonLd(books: Book[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: books.map((book, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: book.title,
      url: `${BASE_URL}/libro/${book.slug}`,
    })),
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
