import Link from "next/link";
import type { Book } from "@/lib/types";
import { GENRE_COLORS, GENRES } from "@/lib/config";
import BookCover from "./BookCover";

export default function BookCard({ book }: { book: Book }) {
  const primaryGenre = book.genres[0];
  const genreColor = GENRE_COLORS[primaryGenre] || "#78716C";
  const coverSrc = book.coverUrl || "";

  return (
    <Link
      href={`/libro/${book.slug}`}
      className="book-card-hover block rounded-2xl border border-border bg-surface-card overflow-hidden shadow-sm"
    >
      <div
        className="flex h-60 items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${genreColor}12` }}
      >
        <BookCover
          src={coverSrc}
          title={book.title}
          author={book.author}
          genreColor={genreColor}
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {book.ageRange.map((age) => (
            <span
              key={age}
              className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-medium text-primary-dark"
            >
              {age} años
            </span>
          ))}
          {book.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: GENRE_COLORS[genre] || "#78716C" }}
            >
              {GENRES.find((g) => g.id === genre)?.label || genre.charAt(0).toUpperCase() + genre.slice(1)}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
          {book.hook}
        </p>
      </div>
    </Link>
  );
}
