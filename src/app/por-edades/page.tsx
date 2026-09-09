import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { BASE_URL } from "@/lib/config";
import AgeShowcase from "@/components/AgeShowcase";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildPageMetadata({
  title: "Cómo elegir libros según la edad",
  description:
    "La edad orienta, no decide. Qué mirar en cada etapa, de 3 a 16 años, y qué hacer cuando lee por encima o por debajo de lo que le tocaría.",
  path: "/por-edades",
});

export default function PorEdadesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: "Por edades" },
            ])
          ),
        }}
      />

      <PageHeader
        eyebrow="Descubrir"
        title="Cómo elegir un libro según la edad"
        description="La edad es el mejor punto de partida: un libro que funciona a los seis años rara vez funciona a los doce. Elige la etapa y verás las selecciones curadas para ella."
        breadcrumbs={<Breadcrumbs variant="light" items={[{ label: "Por edades" }]} />}
      />

      <div className="shell py-12 sm:py-16">
        <AgeShowcase />
      </div>

      {/*
        This page used to duplicate what the home page already offers. Its job
        now is the decision itself: the questions a parent asks before picking
        an age range. Each answer is written to stand alone if it is quoted.
      */}
      <div className="shell space-y-8 border-t border-border py-12 sm:py-16">
        <section>
          <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
            ¿Cómo sé qué libro es adecuado para la edad de mi hijo?
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">
            Mira dos cosas antes que la edad de la contraportada: la forma del
            libro y el tema. La forma es la longitud, el tamaño de letra y si hay
            ilustraciones, y determina si va a poder terminarlo. El tema es lo
            que decide si va a querer empezarlo. Un lector de nueve años con un
            interés fuerte lee cosas de doce, y al revés.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
            ¿Y si lee por debajo o por encima de su edad?
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">
            Es lo normal, no una señal de nada. Si le cuesta, baja de franja sin
            avisarle: lo que hunde a un lector nuevo es abandonar libros a la
            mitad. Si va sobrado, sube de franja mirando el tema, porque a los
            diez años se lee sin problema una novela de doce pero no todos los
            asuntos de los que trata.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
            ¿Y si no le gusta leer?
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">
            Casi siempre es que no ha dado con el libro, no que no le guste leer.{" "}
            <Link
              href="/colecciones/para-quienes-dicen-que-no-les-gusta-leer"
              className="text-primary underline underline-offset-4"
            >
              Esta selección
            </Link>{" "}
            está hecha para eso: libros que entran rápido, se leen en pocas
            tardes y no parecen deberes.
          </p>
        </section>
      </div>
    </>
  );
}
