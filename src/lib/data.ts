import booksData from "@/data/books.json";
import type { Book, BooksData, AgeRange, Genre } from "./types";

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

export function getBooksByGenre(genre: Genre): Book[] {
  return getAllBooks().filter((b) => b.genres.includes(genre));
}

export function getAdolescentBooks(): Book[] {
  return getAllBooks().filter((b) =>
    b.ageRange.some((a) => a === "12-14" || a === "14-16")
  );
}

export function getCoverUrl(isbn: string, size: "S" | "M" | "L" = "L"): string {
  const bareIsbn = isbn.replace(/-/g, "");
  return `https://covers.openlibrary.org/b/isbn/${bareIsbn}-${size}.jpg?default=false`;
}

export function getRelatedBooks(book: Book, limit: number = 4): Book[] {
  const all = getAllBooks().filter((b) => b.id !== book.id);
  const sameGenre = all.filter((b) =>
    b.genres.some((g) => book.genres.includes(g))
  );
  const sameAge = all.filter((b) =>
    b.ageRange.some((a) => book.ageRange.includes(a))
  );
  const combined = [...new Set([...sameGenre, ...sameAge])];
  return combined.slice(0, limit);
}
