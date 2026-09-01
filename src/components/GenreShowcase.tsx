import Link from "next/link";
import { GENRES, GENRE_ICONS, GENRE_GLOW } from "@/lib/config";
import { getCoversForGenre } from "@/lib/data";
import CoverMosaic from "./CoverMosaic";

/**
 * "¿Qué le apetece leer?" — the genre entry point. Visual tiles rather than
 * buttons, scrolling horizontally on narrow screens and settling into a grid
 * from tablet up.
 */
export default function GenreShowcase() {
  const genres = GENRES.map((g) => ({
    ...g,
    covers: getCoversForGenre(g.id, 2),
  }));

  return (
    <section>
      <div className="shell">
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
          ¿Qué le apetece leer?
        </h2>
        <p className="mt-1.5 text-sm text-text-secondary sm:text-base">
          Elige un género y descubre los libros que mejor funcionan en cada edad.
        </p>
      </div>

      <div className="rail no-scrollbar mt-5 gap-3 px-4 pb-2 sm:gap-4 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-8 xl:grid-cols-7">
        {genres.map((g) => (
          <Link
            key={g.id}
            href={`/${g.slug}`}
            className="group relative block h-36 w-44 overflow-hidden rounded-2xl shadow-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-cover-lift sm:h-40 sm:w-52 lg:h-44 lg:w-auto"
          >
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
              <CoverMosaic
                covers={g.covers}
                sizes="(min-width: 1280px) 90px, (min-width: 1024px) 150px, 105px"
              />
            </div>

            <div className="scrim-card absolute inset-0" />
            <div
              className="absolute inset-0 opacity-45 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-25"
              style={{ backgroundColor: GENRE_GLOW[g.id] }}
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3.5">
              <span className="text-lg leading-none" aria-hidden="true">
                {GENRE_ICONS[g.id]}
              </span>
              <span className="font-display text-base font-bold text-white drop-shadow-sm">
                {g.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
