import Image from "next/image";
import Link from "next/link";
import { AGE_GROUPS, GENRES } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-10">
      <div className="shell">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {/* Same brand files as the header, unmodified. */}
            <Link href="/" className="flex items-center gap-2" aria-label="Bookata, inicio">
              <Image
                src="/images/brand/imagotype.png"
                alt=""
                width={566}
                height={441}
                className="h-9 w-auto"
              />
              <Image
                src="/images/brand/logo.png"
                alt="Bookata"
                width={973}
                height={256}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-ink-soft">
              Recomendaciones curadas de libros infantiles y juveniles para
              padres que quieren acertar con el próximo libro de sus hijos.
            </p>
          </div>

          <nav aria-labelledby="footer-edades">
            <h2
              id="footer-edades"
              className="text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60"
            >
              Por edad
            </h2>
            <ul className="mt-4 space-y-2.5">
              {AGE_GROUPS.map((ag) => (
                <li key={ag.range}>
                  <Link
                    href={`/${ag.slug}`}
                    className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                  >
                    {ag.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-generos">
            <h2
              id="footer-generos"
              className="text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60"
            >
              Géneros
            </h2>
            <ul className="mt-4 space-y-2.5">
              {GENRES.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/${g.slug}`}
                    className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-bookata">
            <h2
              id="footer-bookata"
              className="text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60"
            >
              Bookata
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/por-edades"
                  className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                >
                  Todas las edades
                </Link>
              </li>
              <li>
                <Link
                  href="/colecciones"
                  className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                >
                  Colecciones
                </Link>
              </li>
              <li>
                <Link
                  href="/libros-para-adolescentes"
                  className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                >
                  Libros para adolescentes
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-bookata"
                  className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                >
                  Sobre Bookata
                </Link>
              </li>
              <li>
                <Link
                  href="/como-seleccionamos"
                  className="text-sm text-on-ink-soft transition-colors hover:text-primary"
                >
                  Cómo seleccionamos
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-ink-line/60 pt-6">
          <p className="text-xs leading-relaxed text-on-ink-soft/60">
            Bookata participa en el Programa de Afiliados de Amazon EU, un
            programa de publicidad para afiliados diseñado para ofrecer a sitios
            web un modo de obtener comisiones por publicidad.
          </p>
          <p className="mt-2 text-xs text-on-ink-soft/60">
            &copy; {new Date().getFullYear()} Bookata. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
