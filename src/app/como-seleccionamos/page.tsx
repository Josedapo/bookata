import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Cómo seleccionamos los libros",
  description:
    "Nuestra metodología de curación: cómo elegimos los libros que recomendamos en Bookata y por qué puedes fiarte de nuestras recomendaciones.",
  path: "/como-seleccionamos",
});

export default function ComoSeleccionamosPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cómo seleccionamos" }]} />

      <article className="mx-auto max-w-2xl animate-reveal">
        <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
          Cómo seleccionamos los libros
        </h1>

        <div className="mt-8 space-y-8 text-lg leading-relaxed text-text-secondary">
          <section>
            <h2 className="font-display text-xl font-bold text-text">
              Criterios de selección
            </h2>
            <p className="mt-3">
              No incluimos un libro solo porque sea popular o porque aparezca en
              las listas de más vendidos. Cada título que entra en Bookata
              cumple con nuestros criterios de calidad:
            </p>
            <ul className="mt-4 space-y-2 pl-6 list-disc">
              <li>
                <strong className="text-text">Calidad narrativa:</strong> La
                historia está bien escrita y mantiene el interés del lector.
              </li>
              <li>
                <strong className="text-text">Adecuación a la edad:</strong> El
                contenido, vocabulario y temas son apropiados para la franja de
                edad indicada.
              </li>
              <li>
                <strong className="text-text">Valor más allá del
                entretenimiento:</strong> El libro aporta algo — ya sea
                imaginación, reflexión, conocimiento o desarrollo emocional.
              </li>
              <li>
                <strong className="text-text">Disponibilidad:</strong> El libro
                está disponible para comprar en España en formato físico.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text">
              Nuestra opinión editorial
            </h2>
            <p className="mt-3">
              Cada libro tiene una sección &ldquo;Por qué te va a
              encantar&rdquo; que es nuestra opinión personal, no una copia de
              la contraportada. Escribimos estas recomendaciones pensando en el
              padre o madre que está leyendo: qué puede esperar, por qué ese
              libro funciona para esa edad, y qué tiene de especial.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text">
              Independencia
            </h2>
            <p className="mt-3">
              Bookata no recibe dinero de editoriales ni de autores por incluir
              sus libros. Nuestras recomendaciones son independientes. Los
              ingresos provienen exclusivamente del programa de afiliados de
              Amazon: si compras un libro a través de nuestros enlaces,
              recibimos una pequeña comisión sin coste adicional para ti. Esto
              no influye en qué libros seleccionamos.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
