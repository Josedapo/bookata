import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "14-16")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para adolescentes de 14 a 16 años — Recomendaciones por edad",
  description: "Libros recomendados para adolescentes de 14 a 16 años. Romance, ciencia ficción, thrillers y novelas que desafían y emocionan.",
  path: "/libros-adolescentes-14-16",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
