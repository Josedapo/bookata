import type { Book } from "@/lib/types";
import BookCard from "./BookCard";

export default function BookGrid({
  books,
  title,
}: {
  books: Book[];
  title?: string;
}) {
  if (books.length === 0) return null;

  return (
    <section className="animate-reveal">
      {title && (
        <h2 className="mb-6 font-display text-2xl font-bold text-text">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
