export type AgeRange = "6-8" | "8-10" | "10-12" | "12-14" | "14-16";

export type Genre =
  | "misterio"
  | "amor"
  | "fantasia"
  | "aventuras"
  | "ciencia-ficcion"
  | "autoayuda";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  ageRange: AgeRange[];
  genres: Genre[];
  synopsis: string;
  hook: string;
  amazonUrl: string;
  coverUrl: string | null;
  slug: string;
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
  slug: string;
  description: string;
}

export interface GenreInfo {
  id: Genre;
  label: string;
  slug: string;
  description: string;
}
