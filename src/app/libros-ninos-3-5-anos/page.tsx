import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { getBooksByAge } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "3-5")!;

const bookCount = getBooksByAge(ageGroup.range).length;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para niños de 3 a 5 años recomendados",
  description: `${bookCount} libros para niños de 3 a 5 años, elegidos uno a uno y agrupados por tipo de lector. Con edad recomendada y por qué engancha cada uno.`,
  path: "/libros-ninos-3-5-anos",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
