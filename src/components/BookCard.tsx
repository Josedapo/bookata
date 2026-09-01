import Link from "next/link";
import type { Book } from "@/lib/types";
import { AGE_GROUPS } from "@/lib/config";
import { isSafeBet } from "@/lib/data";
import BookCover from "./BookCover";

/**
 * Cover-first book card. The cover carries the card; title, author and age sit
 * underneath in small type. Used identically in grids and in carousel rails so
 * the catalogue reads as one system.
 */
export default function BookCard({
  book,
  tone = "light",
  sizes = "(min-width: 1024px) 200px, (min-width: 640px) 26vw, 42vw",
  priority = false,
  showBadge = true,
}: {
  book: Book;
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
  /** Off inside collections where every book already carries the badge. */
  showBadge?: boolean;
}) {
  const ageLabel = AGE_GROUPS.find((ag) => ag.range === book.ageRange[0])?.label;
  const safeBet = showBadge && isSafeBet(book);

  const titleColor = tone === "dark" ? "text-on-ink" : "text-text";
  const metaColor = tone === "dark" ? "text-on-ink-soft" : "text-text-secondary";

  return (
    <Link href={`/libro/${book.slug}`} className="group block">
      <div
        className={`relative aspect-2/3 overflow-hidden rounded-xl shadow-cover transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-cover-lift ${
          tone === "dark" ? "bg-ink-soft" : "bg-surface-alt"
        }`}
      >
        <BookCover
          src={book.coverUrl}
          title={book.title}
          author={book.author}
          sizes={sizes}
          priority={priority}
        />

        {safeBet && (
          <span className="absolute left-2 top-2 rounded-full bg-gold/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink shadow-sm">
            Acierto seguro
          </span>
        )}

        {/* Revealed on hover, hidden from touch devices where hover is meaningless. */}
        <div className="scrim-card pointer-events-none absolute inset-0 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg">
            Ver libro
          </span>
        </div>
      </div>

      <div className="mt-2.5 px-0.5">
        <h3
          className={`line-clamp-2 font-body text-sm font-semibold leading-snug ${titleColor} transition-colors group-hover:text-primary`}
        >
          {book.title}
        </h3>
        <p className={`mt-0.5 line-clamp-1 text-xs ${metaColor}`}>{book.author}</p>
        {ageLabel && (
          <p className={`mt-0.5 text-xs ${metaColor} opacity-80`}>{ageLabel}</p>
        )}
      </div>
    </Link>
  );
}
