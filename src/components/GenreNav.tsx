import Link from "next/link";
import { GENRES } from "@/lib/config";

const GENRE_BG_COLORS: Record<string, string> = {
  fantasia: "#EDE9FE",
  aventuras: "#D1FAE5",
  misterio: "#DBEAFE",
  amor: "#FCE7F3",
  "ciencia-ficcion": "#CFFAFE",
  autoayuda: "#FEF3C7",
};

const GENRE_TEXT_COLORS: Record<string, string> = {
  fantasia: "#6D28D9",
  aventuras: "#047857",
  misterio: "#1E40AF",
  amor: "#BE185D",
  "ciencia-ficcion": "#0E7490",
  autoayuda: "#B45309",
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
            className="book-card-hover group flex flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center border border-border transition-transform"
            style={{
              backgroundColor: GENRE_BG_COLORS[g.id] || "#F3F4F6",
              color: GENRE_TEXT_COLORS[g.id] || "#374151",
            }}
          >
            <span className="text-3xl">{GENRE_ICONS[g.id]}</span>
            <span className="text-base font-bold">{g.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
