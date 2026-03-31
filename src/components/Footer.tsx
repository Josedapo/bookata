import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="font-display text-xl font-bold text-primary">
            Bookata
          </Link>
          <p className="max-w-md text-sm text-text-secondary">
            Recomendaciones curadas de libros infantiles y juveniles para padres
            que quieren acertar con el próximo libro de sus hijos.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/sobre-bookata"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Sobre Bookata
            </Link>
            <Link
              href="/como-seleccionamos"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Cómo seleccionamos
            </Link>
          </div>
          <div className="border-t border-border pt-6 w-full">
            <p className="text-xs text-text-muted">
              Bookata participa en el Programa de Afiliados de Amazon EU, un
              programa de publicidad para afiliados diseñado para ofrecer a
              sitios web un modo de obtener comisiones por publicidad.
            </p>
            <p className="mt-2 text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Bookata. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
