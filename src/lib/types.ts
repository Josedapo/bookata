export type AgeRange = "3-5" | "6-8" | "8-10" | "10-12" | "12-14" | "14-16";

export type Genre =
  | "aventuras"
  | "misterio"
  | "fantasia"
  | "valores"
  | "educativo"
  | "amor"
  | "comic";

// Sections are curated per age range (e.g. "8-10--mucho-mas-que-futbol"),
// so the id is a free-form slug rather than a fixed union.
export type Section = string;

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  ageRange: AgeRange[];
  genres: Genre[];
  sections: Section[];
  synopsis: string;
  hook: string;
  amazonUrl: string;
  coverUrl: string | null;
  slug: string;
}

export interface SectionInfo {
  id: Section;
  label: string;
  slug: string;
  ageRange: AgeRange;
  order: number;
}

export interface BooksData {
  meta: {
    lastUpdated: string;
    totalBooks: number;
  };
  books: Book[];
}

export interface AgeGroup {
  range: AgeRange;
  label: string;
  /** Short display form used on the visual age cards, e.g. "3 — 5". */
  display: string;
  /** Editorial one-liner shown under the range on the age cards. */
  tagline: string;
  slug: string;
  description: string;
}

/**
 * A cross-age editorial collection. `sections` holds ids from SECTIONS; a
 * collection whose sections yield no books is simply not rendered, which is how
 * collections with no real catalogue backing stay declared but empty.
 */
export interface CollectionInfo {
  id: string;
  label: string;
  slug: string;
  tagline: string;
  description: string;
  sections: Section[];
}

export interface GenreInfo {
  id: Genre;
  label: string;
  slug: string;
  description: string;
}
