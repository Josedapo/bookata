import { describe, expect, it } from "vitest";
import {
  AGE_GROUPS,
  COLLECTIONS,
  GENRES,
  NOINDEX_COLLECTIONS,
  SECTIONS,
} from "@/lib/config";
import {
  ageSpanLabel,
  getAdolescentBooks,
  getAllBooks,
  getBookBySlug,
  getBooksByAge,
  getBooksByCollection,
  getBooksByGenre,
  getCatalogueDate,
  getCatalogueDateISO,
  getCollectionBySlug,
  getCoversForAge,
  getCoversForCollection,
  getCoversForGenre,
  getFeaturedBooks,
  getPopulatedCollections,
  getRelatedBooks,
  getSearchIndex,
  getSectionLabelsForBook,
  groupBooksByAge,
  groupCollectionByAge,
  isSafeBet,
  sortAges,
} from "@/lib/data";
import {
  buildBookJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/metadata";
import { diffGolden, goldenEntry, UPDATE } from "./helpers";

/*
 * Characterization goldens of the data layer over the whole catalogue (243 books). They freeze
 * current behaviour, quirks included; a change here is a change in what some page shows.
 */
const ids = (books: { id: string }[]) => books.map((b) => b.id);
const blocks = (bs: { range: string; books: { id: string }[] }[]) => bs.map((b) => [b.range, ids(b.books)]);

function collect(): Record<string, unknown> {
  const books = getAllBooks();
  const out: Record<string, unknown> = {
    "config.sections": SECTIONS,
    "config.collections": COLLECTIONS,
    "config.noindex": NOINDEX_COLLECTIONS,
    "catalogue.count": books.length,
    "catalogue.date": [getCatalogueDate(), getCatalogueDateISO()],
    "featured": ids(getFeaturedBooks()),
    "adolescent": ids(getAdolescentBooks()),
    "byAge.all": blocks(groupBooksByAge(books)),
    "collections.populated": getPopulatedCollections().map((r) => [r.collection.id, ids(r.books)]),
    "search": getSearchIndex(),
    "jsonld.website": buildWebsiteJsonLd(),
    "jsonld.organization": buildOrganizationJsonLd(),
    "jsonld.itemList": buildItemListJsonLd(books.slice(0, 5), "Lista"),
    "jsonld.breadcrumb": buildBreadcrumbJsonLd([{ name: "Inicio", url: "https://bookata.es" }, { name: "Hoja" }]),
    "jsonld.faq": buildFaqJsonLd([{ question: "¿Q?", answer: "R." }]),
    "metadata.home": buildPageMetadata({ title: "x".repeat(70), description: "y ".repeat(100), path: "/", absoluteTitle: true }),
    "metadata.clampSentence": buildPageMetadata({
      title: "Una frase corta. Y otra frase que hace que el título pase de cincuenta",
      description: "d",
      path: "/p",
    }),
    "sortAges": sortAges(["14-16", "3-5", "8-10"]),
    "ageSpan.gap": ageSpanLabel(["3-5", "10-12"]),
    "ageSpan.empty": ageSpanLabel([]),
  };
  for (const ag of AGE_GROUPS) {
    out[`age.${ag.range}`] = { books: ids(getBooksByAge(ag.range)), covers: getCoversForAge(ag.range) };
    out[`metadata.age.${ag.range}`] = buildPageMetadata({ title: ag.label, description: ag.description, path: `/${ag.slug}` });
  }
  for (const g of GENRES) {
    out[`genre.${g.id}`] = { books: ids(getBooksByGenre(g.id)), covers: getCoversForGenre(g.id) };
  }
  for (const c of COLLECTIONS) {
    out[`collection.${c.id}`] = {
      bySlug: getCollectionBySlug(c.slug)?.id ?? null,
      books: ids(getBooksByCollection(c)),
      byAge: blocks(groupCollectionByAge(c)),
      covers: getCoversForCollection(c),
    };
  }
  for (const b of books) {
    out[`book.${b.id}`] = {
      bySlug: getBookBySlug(b.slug)?.id ?? null,
      span: ageSpanLabel(b.ageRange),
      sorted: sortAges(b.ageRange),
      labels: getSectionLabelsForBook(b),
      safeBet: isSafeBet(b),
      related: ids(getRelatedBooks(b)),
      jsonld: buildBookJsonLd(b),
      metadata: buildPageMetadata({
        title: `${b.title}, de ${b.author}`,
        description: b.hook,
        path: `/libro/${b.slug}`,
        image: b.coverUrl ? { url: b.coverUrl, alt: b.title } : undefined,
      }),
    };
  }
  return out;
}

describe("data layer", () => {
  it("matches the pinned output of every data, JSON-LD and metadata function", () => {
    const value = collect();
    const diff = diffGolden("units.json", value);
    if (diff.length && !UPDATE) {
      const first = diff[0].slice(9);
      expect(value[first], `${diff.length} keys differ:\n${diff.slice(0, 40).join("\n")}`).toEqual(
        goldenEntry("units.json", first),
      );
    }
    expect(diff).toEqual([]);
  });
});
