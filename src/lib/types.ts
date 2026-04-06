export type AgeRange = "3-5" | "6-8" | "8-10" | "10-12" | "12-14" | "14-16";

export type Genre =
  | "aventuras"
  | "misterio"
  | "fantasia"
  | "valores"
  | "educativo"
  | "amor"
  | "comic";

export type Section =
  | "acierto-seguro"
  | "favoritos-ninos"
  | "recomendados-profes"
  | "humor"
  | "mentes-curiosas"
  | "emociones"
  | "leer-solo"
  | "leer-juntos"
  | "cuidar-de-mi";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  ageRange: AgeRange[];
  genres: Genre[];
  sections: Section[];
  hook: string;
  amazonUrl: string;
  coverUrl: string | null;
  slug: string;
}

export interface SectionInfo {
  id: Section;
  label: string;
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
