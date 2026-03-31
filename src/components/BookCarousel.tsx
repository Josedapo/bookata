import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCarousel({
  title,
  books,
  href,
}: {
  title: string;
  books: Book[];
  href: string;
}) {
  if (books.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-text sm:text-2xl">
          {title}
        </h2>
        <Link
          href={href}
          className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          <span className="sm:hidden">Todos</span>
          <span className="hidden sm:inline">Ver todos</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/libro/${book.slug}`}
            className="flex-none book-card-hover"
          >
            <div className="relative h-44 w-28 overflow-hidden rounded-xl shadow-md sm:h-52 sm:w-36">
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-light p-2">
                  <p className="text-center text-xs font-semibold text-primary">
                    {book.title}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
