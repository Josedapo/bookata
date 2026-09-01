import type { Book } from "@/lib/types";
import BookCard from "./BookCard";

export default function BookGrid({
  books,
  title,
  tone = "light",
  showBadge = true,
}: {
  books: Book[];
  title?: string;
  tone?: "light" | "dark";
  showBadge?: boolean;
}) {
  if (books.length === 0) return null;

  return (
    <section>
      {title && (
        <h2
          className={`mb-6 font-display text-2xl font-bold ${
            tone === "dark" ? "text-on-ink" : "text-text"
          }`}
        >
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            tone={tone}
            showBadge={showBadge}
            sizes="(min-width: 1280px) 180px, (min-width: 1024px) 200px, (min-width: 640px) 28vw, 44vw"
          />
        ))}
      </div>
    </section>
  );
}
