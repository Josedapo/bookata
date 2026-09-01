import Link from "next/link";
import { AGE_GROUPS, GENRES } from "@/lib/config";

/**
 * "¿No sabes qué elegir?" — a short, zero-JavaScript shortcut block. Doubles as
 * internal linking to every age and genre page.
 */
export default function HelpModule() {
  return (
    <section className="bg-ink py-14 sm:py-20">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            ¿No sabes qué elegir?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-on-ink-soft">
            Empieza por la edad. Es la forma más rápida de acertar, porque un
            libro que funciona a los seis años rara vez funciona a los doce.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {AGE_GROUPS.map((ag) => (
            <Link
              key={ag.range}
              href={`/${ag.slug}`}
              className="rounded-full border border-ink-line bg-ink-soft px-5 py-2.5 text-sm font-semibold text-on-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {ag.label}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-on-ink-soft/70">
          O empieza por lo que le gusta
        </p>
        <div className="mx-auto mt-3 flex max-w-3xl flex-wrap justify-center gap-2">
          {GENRES.map((g) => (
            <Link
              key={g.id}
              href={`/${g.slug}`}
              className="rounded-full px-4 py-2 text-sm text-on-ink-soft transition-colors hover:text-primary"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
