import Image from "next/image";
import Link from "next/link";
import { AGE_GROUPS } from "@/lib/config";

/**
 * Home hero. Occupies roughly two thirds of the first screen.
 *
 * The backdrop is a 2880x1440 wall built from real catalogue covers
 * (`scripts/build-hero.py`). The previous source, `banner-cabecera.png`, was
 * 1536x470 and had to be upscaled ~1.5x to cover a hero this tall, which read
 * as soft. Regenerate the wall after adding books; the original banner is kept
 * in the repo so the hero can be switched back with one line.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[max(30rem,68svh)] items-end overflow-hidden bg-ink sm:min-h-[min(44rem,72svh)]">
      <Image
        src="/images/brand/hero-portadas.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={62}
        className="object-cover object-center"
      />
      <div className="scrim absolute inset-0" />
      <div className="scrim-side absolute inset-0 hidden sm:block" />
      {/*
        Dedicated band behind the header. The wall is built from whatever covers
        the catalogue happens to hold, so header legibility cannot depend on the
        top row being dark.
      */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink via-ink/70 to-transparent" />

      <div className="shell relative z-10 w-full pb-12 pt-28 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl">
          {/*
            Age is the first question a parent answers, so the six ranges are
            the primary action. The orange eyebrow that sat above the H1 was
            removed: over the cover wall it read badly on mobile (audit B20).
          */}
          <h1 className="animate-reveal font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
            Encuentra el próximo libro que le va a encantar
          </h1>
          <p className="animate-reveal-delay-1 mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Recomendaciones de libros infantiles y juveniles seleccionadas por
            edad, género y tipo de lector.
          </p>

          <div className="animate-reveal-delay-2 mt-6">
            <p className="text-sm font-semibold text-white">¿Qué edad tiene?</p>
            <ul className="mt-2.5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              {AGE_GROUPS.map((ag) => (
                <li key={ag.range}>
                  <Link
                    href={`/${ag.slug}`}
                    className="block rounded-full bg-white px-4 py-2.5 text-center text-sm font-bold text-ink shadow-lg transition-colors duration-200 hover:bg-primary-light sm:px-5 sm:text-base"
                  >
                    {ag.range.replace("-", " a ")}
                    <span className="sr-only"> años</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/colecciones/para-quienes-dicen-que-no-les-gusta-leer"
              className="mt-4 inline-block text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              ¿Dice que leer es aburrido? Empieza por aquí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
