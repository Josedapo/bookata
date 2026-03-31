import Link from "next/link";
import { GENRES } from "@/lib/config";

const GENRE_BG_COLORS: Record<string, string> = {
  fantasia: "#7C3AED",
  aventuras: "#059669",
  misterio: "#1D4ED8",
  amor: "#DB2777",
  "ciencia-ficcion": "#0891B2",
  autoayuda: "#D97706",
};

const GENRE_ICONS: Record<string, string> = {
  fantasia: "🧙‍♂️",
  aventuras: "🗺️",
  misterio: "🔍",
  amor: "💕",
  "ciencia-ficcion": "🚀",
  autoayuda: "🌱",
};

export default function GenreNav() {
  return (
    <section className="animate-reveal-delay-2">
      <h2 className="mb-5 font-display text-xl font-semibold text-text sm:text-2xl">
        Explora por género
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {GENRES.map((g) => (
          <Link
            key={g.id}
            href={`/${g.slug}`}
            className="book-card-hover group flex flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center text-white transition-transform"
            style={{ backgroundColor: GENRE_BG_COLORS[g.id] || "#78716C" }}
          >
            <span className="text-3xl">{GENRE_ICONS[g.id]}</span>
            <span className="text-base font-bold">{g.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
