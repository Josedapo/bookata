import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "3-5")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para niños de 3 a 5 años — Recomendaciones por edad",
  description: "Descubre los mejores libros para niños de 3 a 5 años. Álbumes ilustrados, primeros cuentos y historias perfectas para leer juntos.",
  path: "/libros-ninos-3-5-anos",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
