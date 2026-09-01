import Link from "next/link";
import { AGE_GROUPS } from "@/lib/config";
import { getBooksByAge, getCoversForAge } from "@/lib/data";
import CoverMosaic from "./CoverMosaic";

/**
 * The six age ranges as large visual blocks. The ranges themselves are
 * unchanged; only their presentation is.
 */
export default function AgeShowcase({
  headingLevel = "h2",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const groups = AGE_GROUPS.map((ag) => ({
    ...ag,
    covers: getCoversForAge(ag.range, 3),
    count: getBooksByAge(ag.range).length,
  }));

  const Heading = headingLevel;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((ag) => (
        <Link
          key={ag.range}
          href={`/${ag.slug}`}
          className="group relative block h-48 overflow-hidden rounded-2xl shadow-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-cover-lift sm:h-56"
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
            <CoverMosaic
              covers={ag.covers}
              sizes="(min-width: 1024px) 145px, (min-width: 640px) 16vw, 33vw"
            />
          </div>
          <div className="scrim-tile absolute inset-0" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <Heading className="font-display text-3xl font-extrabold leading-none text-white sm:text-4xl">
              {ag.display}
              <span className="ml-1.5 text-base font-semibold text-white/70">
                años
              </span>
            </Heading>
            <p className="mt-1.5 font-display text-base font-semibold text-primary">
              {ag.tagline}
            </p>
            <p className="mt-0.5 text-xs text-white/60">
              {ag.count} libros recomendados
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
