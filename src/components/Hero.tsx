import Image from "next/image";
import Link from "next/link";

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
    <section className="relative flex h-[68svh] max-h-[44rem] min-h-[30rem] items-end overflow-hidden bg-ink sm:h-[72svh]">
      <Image
        src="/images/brand/hero-portadas.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
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
          <p className="animate-reveal text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Libros infantiles y juveniles
          </p>
          <h1 className="animate-reveal-delay-1 mt-3 font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
            Encuentra el próximo libro que le va a encantar
          </h1>
          <p className="animate-reveal-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Recomendaciones de libros infantiles y juveniles seleccionadas por
            edad, género y tipo de lector.
          </p>

          <div className="animate-reveal-delay-3 mt-7 flex flex-wrap gap-3">
            <Link
              href="#catalogo"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-xl sm:text-base"
            >
              Explorar libros
            </Link>
            <Link
              href="/por-edades"
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 sm:text-base"
            >
              Descubrir por edad
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
