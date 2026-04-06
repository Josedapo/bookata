import Link from "next/link";
import { GENRES } from "@/lib/config";

const GENRE_BG_COLORS: Record<string, string> = {
  aventuras: "#D1FAE5",
  misterio: "#DBEAFE",
  fantasia: "#EDE9FE",
  valores: "#FEF3C7",
  educativo: "#CFFAFE",
  amor: "#FCE7F3",
  comic: "#FEE2E2",
};

const GENRE_TEXT_COLORS: Record<string, string> = {
  aventuras: "#047857",
  misterio: "#1E40AF",
  fantasia: "#6D28D9",
  valores: "#B45309",
  educativo: "#0E7490",
  amor: "#BE185D",
  comic: "#B91C1C",
};

const GENRE_ICONS: Record<string, string> = {
  aventuras: "\uD83D\uDDFA\uFE0F",
  misterio: "\uD83D\uDD0D",
  fantasia: "\uD83E\uDDD9\u200D\u2642\uFE0F",
  valores: "\uD83C\uDF1F",
  educativo: "\uD83D\uDCA1",
  amor: "\uD83D\uDC95",
  comic: "\uD83D\uDCAC",
};

export default function GenreNav() {
  return (
    <section className="animate-reveal-delay-2">
      <h2 className="mb-5 font-display text-xl font-semibold text-text sm:text-2xl">
        Explora por género
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
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
