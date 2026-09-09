import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { getBooksByAge } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "12-14")!;

const bookCount = getBooksByAge(ageGroup.range).length;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para adolescentes de 12 a 14 años",
  description: `${bookCount} libros para adolescentes de 12 a 14 años, elegidos uno a uno y agrupados por tipo de lector. Con edad recomendada y por qué engancha cada uno.`,
  path: "/libros-adolescentes-12-14",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
