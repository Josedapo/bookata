import booksData from "@/data/books.json";
import type {
  Book,
  BooksData,
  AgeRange,
  Genre,
  CollectionInfo,
  Section,
} from "./types";
import { SECTIONS, COLLECTIONS, AGE_GROUPS } from "./config";

let cached: BooksData | null = null;

export function getBooksData(): BooksData {
  if (cached) return cached;
  cached = booksData as BooksData;
  return cached;
}

export function getAllBooks(): Book[] {
  return getBooksData().books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return getAllBooks().find((b) => b.slug === slug);
}

export function getBooksByAge(age: AgeRange): Book[] {
  return getAllBooks().filter((b) => b.ageRange.includes(age));
}

/** A book's age ranges in catalogue order, youngest first. */
export function sortAges(ranges: AgeRange[]): AgeRange[] {
  const order = AGE_GROUPS.map((ag) => ag.range);
  return [...ranges].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

/**
 * The whole span a book is recommended for, e.g. "6 a 10 años". Cards and the
 * book page used to print only ageRange[0], so a 6-10 book listed on the 8-10
 * page was labelled "6 a 8 años". Every range in the catalogue is contiguous;
 * a gap would fall back to listing the labels.
 */
export function ageSpanLabel(ranges: AgeRange[]): string {
  const sorted = sortAges(ranges);
  if (sorted.length === 0) return "";
  const order = AGE_GROUPS.map((ag) => ag.range);
  const idx = sorted.map((r) => order.indexOf(r));
  const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (!contiguous) {
    return sorted
      .map((r) => AGE_GROUPS.find((ag) => ag.range === r)?.label)
      .filter(Boolean)
      .join(" y ");
  }
  const from = sorted[0].split("-")[0];
  const to = sorted[sorted.length - 1].split("-")[1];
  return `${from} a ${to} años`;
}

export function getBooksByGenre(genre: Genre): Book[] {
  return getAllBooks().filter((b) => b.genres.includes(genre));
}

export function getAdolescentBooks(): Book[] {
  return getAllBooks().filter((b) =>
    b.ageRange.some((a) => a === "12-14" || a === "14-16")
  );
}

/* ------------------------------------------------------------------ */
/* Deterministic ordering                                              */
/* ------------------------------------------------------------------ */

/**
 * Stable hash over a book id. Used to vary the order of cover mosaics and
 * collection rails without Math.random, which would produce a different static
 * build on every deploy.
 */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** Same input always yields the same order. */
function stableShuffle<T extends { id: string }>(items: T[], salt = ""): T[] {
  return [...items].sort((a, b) => hash(a.id + salt) - hash(b.id + salt));
}

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

/**
 * Books curated into any of a collection's sections, de-duplicated and ordered
 * deterministically so the rail mixes ages instead of listing 3-5 first.
 * Returns an empty array for a collection with no backing sections, which is
 * how declared-but-unpopulated collections stay invisible.
 */
export function getBooksByCollection(collection: CollectionInfo): Book[] {
  if (collection.sections.length === 0) return [];
  const wanted = new Set(collection.sections);
  const matches = getAllBooks().filter((b) =>
    b.sections.some((s) => wanted.has(s))
  );
  return stableShuffle(matches, collection.id);
}

/** One block per age range, youngest first, as rendered by AgeGroupedBooks. */
export interface AgeBlock {
  range: AgeRange;
  books: Book[];
}

/**
 * Splits a list into age blocks. A book recommended for 6-10 appears under both
 * 6-8 and 8-10: a parent looking for a nine-year-old must find it in 8-10.
 * The input order is kept inside each block.
 */
export function groupBooksByAge(books: Book[]): AgeBlock[] {
  return AGE_GROUPS.map((ag) => ({
    range: ag.range,
    books: books.filter((b) => b.ageRange.includes(ag.range)),
  })).filter((block) => block.books.length > 0);
}

/**
 * Age blocks for a collection, keyed on the age of the curated section that put
 * each book in the collection (section ids start with their range, e.g.
 * "8-10--acierto-seguro"). This follows the editor's placement exactly instead
 * of the book's wider age span, so nothing is re-picked by hand.
 */
export function groupCollectionByAge(collection: CollectionInfo): AgeBlock[] {
  const books = getBooksByCollection(collection);
  return AGE_GROUPS.map((ag) => {
    const sectionIds = new Set(
      collection.sections.filter((id) => id.startsWith(`${ag.range}--`))
    );
    return {
      range: ag.range,
      books: books.filter((b) => b.sections.some((s) => sectionIds.has(s))),
    };
  }).filter((block) => block.books.length > 0);
}

export function getCollectionBySlug(slug: string): CollectionInfo | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/** Only the collections that actually resolve to books. */
export function getPopulatedCollections(): {
  collection: CollectionInfo;
  books: Book[];
}[] {
  return COLLECTIONS.map((collection) => ({
    collection,
    books: getBooksByCollection(collection),
  })).filter((row) => row.books.length > 0);
}

/**
 * Home "destacados". Drawn from the safe-bet sections that the catalogue
 * already curates, so nothing is promoted that was not editorially chosen.
 */
export function getFeaturedBooks(limit = 18): Book[] {
  const safeBet = COLLECTIONS.find((c) => c.id === "los-clasicos-que-nunca-fallan");
  const books = safeBet ? getBooksByCollection(safeBet) : [];
  return books.slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Covers and mosaics                                                  */
/* ------------------------------------------------------------------ */

/**
 * Real covers used to build the visual tiles for genres, ages and collections.
 * The catalogue is the image bank: no stock photography, no invented artwork.
 */
export function getCoversForGenre(genre: Genre, count = 3): string[] {
  return stableShuffle(getBooksByGenre(genre), genre)
    .map((b) => b.coverUrl)
    .filter((c): c is string => Boolean(c))
    .slice(0, count);
}

export function getCoversForAge(age: AgeRange, count = 3): string[] {
  return stableShuffle(getBooksByAge(age), age)
    .map((b) => b.coverUrl)
    .filter((c): c is string => Boolean(c))
    .slice(0, count);
}

export function getCoversForCollection(
  collection: CollectionInfo,
  count = 3
): string[] {
  return getBooksByCollection(collection)
    .map((b) => b.coverUrl)
    .filter((c): c is string => Boolean(c))
    .slice(0, count);
}

/* ------------------------------------------------------------------ */
/* Book detail helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * The curated section labels a book belongs to, e.g. "Para quienes dicen que no
 * les gusta leer". These feed the "Perfecto para..." block on the book page:
 * they are existing editorial statements, not generated copy.
 */
export function getSectionLabelsForBook(book: Book): string[] {
  const seen = new Set<string>();
  const labels: string[] = [];
  for (const id of book.sections) {
    const section = SECTIONS.find((s) => s.id === id);
    if (section && !seen.has(section.label)) {
      seen.add(section.label);
      labels.push(section.label);
    }
  }
  return labels;
}

/** The safe-bet badge, derived from real curation rather than invented. */
export function isSafeBet(book: Book): boolean {
  return book.sections.some(
    (s) => s.endsWith("--acierto-seguro") || s === "3-5--para-no-fallar"
  );
}

/**
 * Related books, scored instead of concatenated. Sharing a curated section is
 * the strongest signal because it means an editor grouped the two titles for
 * the same reason; genre and age follow.
 */
export function getRelatedBooks(book: Book, limit = 12): Book[] {
  const bookSections = new Set<Section>(book.sections);
  const bookGenres = new Set<Genre>(book.genres);
  const bookAges = new Set<AgeRange>(book.ageRange);

  const scored = getAllBooks()
    .filter((b) => b.id !== book.id)
    .map((b) => {
      let score = 0;
      for (const s of b.sections) if (bookSections.has(s)) score += 3;
      for (const g of b.genres) if (bookGenres.has(g)) score += 2;
      for (const a of b.ageRange) if (bookAges.has(a)) score += 2;
      return { book: b, score };
    })
    .filter((row) => row.score > 0);

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      hash(a.book.id + book.id) - hash(b.book.id + book.id)
  );

  return scored.slice(0, limit).map((row) => row.book);
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

export interface SearchEntry {
  t: string; // title
  a: string; // author
  s: string; // slug
  c: string; // cover url
  ag: AgeRange[];
  g: Genre[];
}

/**
 * Slim index for the client-side search overlay. Only the fields the overlay
 * renders, so the payload stays small; it is imported dynamically and never
 * reaches the initial bundle.
 */
export function getSearchIndex(): SearchEntry[] {
  return getAllBooks().map((b) => ({
    t: b.title,
    a: b.author,
    s: b.slug,
    c: b.coverUrl ?? "",
    ag: b.ageRange,
    g: b.genres,
  }));
}

/**
 * Human-readable month the catalogue was last updated, taken from the data
 * itself so it can never claim a freshness the books do not have.
 */
/**
 * The catalogue date as ISO 8601, for `dateModified` in structured data. Google
 * cross-references the visible date against the structured one, so both must come
 * from this single value in `books.json` and never be written by hand.
 */
export function getCatalogueDateISO(): string {
  return getBooksData().meta.lastUpdated;
}

export function getCatalogueDate(): string {
  const [year, month] = getBooksData().meta.lastUpdated.split("-");
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${months[parseInt(month, 10) - 1]} de ${year}`;
}
