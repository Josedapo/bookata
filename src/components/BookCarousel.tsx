import Link from "next/link";
import type { Book } from "@/lib/types";
import BookCard from "./BookCard";
import CarouselRail from "./CarouselRail";

/**
 * Horizontal rail of covers. A server component: the cards are rendered here
 * and handed to the client shell as children, so book data never crosses the
 * serialization boundary. Only the scroll behaviour ships as JavaScript.
 */
export default function BookCarousel({
  title,
  subtitle,
  books,
  href,
  hrefLabel = "Ver todos",
  tone = "light",
  priority = false,
  headingLevel = "h2",
  limit = 20,
  showBadge = true,
}: {
  title: string;
  subtitle?: string;
  books: Book[];
  href?: string;
  hrefLabel?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  /**
   * Rails show a slice, not the whole shelf: the "Ver todos" link carries the
   * rest. Keeps the home page from mounting the entire 243-book catalogue.
   */
  limit?: number;
  showBadge?: boolean;
}) {
  if (books.length === 0) return null;

  const visible = books.slice(0, limit);
  const Heading = headingLevel;
  const titleColor = tone === "dark" ? "text-on-ink" : "text-text";
  const subtitleColor = tone === "dark" ? "text-on-ink-soft" : "text-text-secondary";

  return (
    <section>
      <div className="shell flex items-end justify-between gap-4">
        <div className="min-w-0">
          <Heading
            className={`font-display text-xl font-bold leading-tight ${titleColor} sm:text-2xl`}
          >
            {title}
          </Heading>
          {subtitle && <p className={`mt-1 text-sm ${subtitleColor}`}>{subtitle}</p>}
        </div>
        {href && (
          <Link
            href={href}
            className={`flex-none text-sm font-semibold transition-colors ${
              tone === "dark"
                ? "text-on-ink-soft hover:text-primary"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            {hrefLabel}
            <span aria-hidden="true"> →</span>
          </Link>
        )}
      </div>

      <CarouselRail>
        {visible.map((book, i) => (
          <div key={book.id} className="w-[7.5rem] sm:w-[9.5rem] lg:w-[11.6rem]">
            <BookCard
              book={book}
              tone={tone}
              sizes="(min-width: 1024px) 186px, (min-width: 640px) 152px, 120px"
              priority={priority && i < 6}
              showBadge={showBadge}
            />
          </div>
        ))}
      </CarouselRail>
    </section>
  );
}
