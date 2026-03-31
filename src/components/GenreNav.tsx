import Link from "next/link";
import { GENRES, GENRE_COLORS } from "@/lib/config";

export default function GenreNav() {
  return (
    <section className="animate-reveal-delay-2">
      <h2 className="mb-4 font-display text-2xl font-bold text-text">
        Por género
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {GENRES.map((g) => (
          <Link
            key={g.id}
            href={`/${g.slug}`}
            className="book-card-hover group rounded-xl border border-border bg-surface-card p-4 text-center"
          >
            <span
              className="block text-lg font-semibold transition-colors"
              style={{ color: GENRE_COLORS[g.id] }}
            >
              {g.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
