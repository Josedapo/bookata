import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "6-8")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para niños de 6 a 8 años — Recomendaciones por edad",
  description: "Descubre los mejores libros para niños de 6 a 8 años. Recomendaciones curadas con opinión editorial para primeros lectores autónomos.",
  path: "/libros-ninos-6-8-anos",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
