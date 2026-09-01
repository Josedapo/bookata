import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { BASE_URL } from "@/lib/config";
import AgeShowcase from "@/components/AgeShowcase";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildPageMetadata({
  title: "Libros por edad — De 3 a 16 años",
  description:
    "Elige la edad y descubre los libros infantiles y juveniles recomendados para cada etapa: de 3 a 5, 6 a 8, 8 a 10, 10 a 12, 12 a 14 y 14 a 16 años.",
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
        title="Libros por edad"
        description="La edad es el mejor punto de partida: un libro que funciona a los seis años rara vez funciona a los doce. Elige la etapa y verás las selecciones curadas para ella."
        breadcrumbs={<Breadcrumbs variant="light" items={[{ label: "Por edades" }]} />}
      />

      <div className="shell py-12 sm:py-16">
        <AgeShowcase />
      </div>
    </>
  );
}
