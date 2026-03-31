import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "12-14")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para adolescentes de 12 a 14 años — Recomendaciones por edad",
  description: "Los mejores libros para adolescentes de 12 a 14 años. Literatura juvenil con temas maduros y protagonistas adolescentes.",
  path: "/libros-adolescentes-12-14",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
