import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "10-12")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para niños de 10 a 12 años — Recomendaciones por edad",
  description: "Libros recomendados para niños de 10 a 12 años. La edad dorada de la lectura: mundos fantásticos y tramas que enganchan de principio a fin.",
  path: "/libros-ninos-10-12-anos",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
