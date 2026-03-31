import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre Bookata",
  description:
    "Bookata es un sitio de recomendaciones curadas de libros infantiles y juveniles para padres que quieren acertar con el próximo libro de sus hijos.",
  path: "/sobre-bookata",
});

export default function SobreBookataPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Sobre Bookata" }]} />

      <article className="mx-auto max-w-2xl animate-reveal">
        <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
          Sobre Bookata
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-text-secondary">
          <p>
            Bookata nace de una frustración sencilla: encontrar un buen libro
            para un niño no debería ser tan difícil. Los padres quieren que sus
            hijos lean, pero cuando buscan recomendaciones se encuentran con
            listados interminables de Amazon, posts de blog desactualizados o
            páginas de editoriales que solo promocionan su propio catálogo.
          </p>

          <p>
            Bookata es diferente. Cada libro que aparece aquí ha sido
            seleccionado con criterio y tiene una recomendación editorial propia:
            no una sinopsis genérica de la contraportada, sino una opinión
            honesta sobre por qué ese libro merece la pena para un niño de esa
            edad concreta.
          </p>

          <p>
            Organizamos los libros por franja de edad y género literario porque
            así es como los padres realmente buscan: &ldquo;tengo un hijo de 10
            años al que le gusta la aventura, ¿qué le doy?&rdquo;. La respuesta
            debería estar a dos clics, no a veinte scrolls.
          </p>

          <p>
            No vendemos libros directamente. Cuando encuentras un libro que te
            convence, te llevamos a Amazon donde puedes comprarlo. Bookata
            participa en el programa de afiliados de Amazon, lo que significa que
            recibimos una pequeña comisión por cada compra, sin coste adicional
            para ti.
          </p>
        </div>
      </article>
    </>
  );
}
