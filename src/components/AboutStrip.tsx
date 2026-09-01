import Link from "next/link";

/** Short "Sobre Bookata" block for the foot of the home page. */
export default function AboutStrip() {
  return (
    <section className="shell py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
          Cómo elegimos los libros
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          Ningún libro entra en Bookata por ser un superventas. Cada título se
          selecciona por calidad narrativa, por encajar de verdad con la edad
          que recomendamos y por aportar algo más que entretenimiento. Y cada
          recomendación es una opinión propia, no la contraportada copiada.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/como-seleccionamos"
            className="rounded-full bg-text px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary"
          >
            Cómo seleccionamos
          </Link>
          <Link
            href="/sobre-bookata"
            className="rounded-full border border-border px-6 py-3 text-sm font-bold text-text transition-colors hover:border-primary hover:text-primary"
          >
            Sobre Bookata
          </Link>
        </div>
      </div>
    </section>
  );
}
