import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "8-10")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para niños de 8 a 10 años — Recomendaciones por edad",
  description: "Los mejores libros para niños de 8 a 10 años. Historias de aventuras, misterio y fantasía seleccionadas para lectores que ya devoran libros.",
  path: "/libros-ninos-8-10-anos",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
