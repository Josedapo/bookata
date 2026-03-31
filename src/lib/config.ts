import type { AgeGroup, GenreInfo } from "./types";

export const BASE_URL = "https://bookata.es";
export const SITE_NAME = "Bookata";

export const AGE_GROUPS: AgeGroup[] = [
  {
    range: "6-8",
    label: "6 a 8 años",
    slug: "libros-ninos-6-8-anos",
    description:
      "Libros para niños de 6 a 8 años: primeros lectores autónomos que empiezan a disfrutar historias más largas con capítulos cortos, ilustraciones y mucha aventura.",
  },
  {
    range: "8-10",
    label: "8 a 10 años",
    slug: "libros-ninos-8-10-anos",
    description:
      "Libros para niños de 8 a 10 años: lectores que ya devoran libros por su cuenta y buscan historias con más acción, misterio y personajes con los que identificarse.",
  },
  {
    range: "10-12",
    label: "10 a 12 años",
    slug: "libros-ninos-10-12-anos",
    description:
      "Libros para niños de 10 a 12 años: la edad dorada de la lectura infantil. Historias más complejas, mundos fantásticos, y tramas que enganchan de principio a fin.",
  },
  {
    range: "12-14",
    label: "12 a 14 años",
    slug: "libros-adolescentes-12-14",
    description:
      "Libros para adolescentes de 12 a 14 años: la transición a la literatura juvenil. Temas más maduros, protagonistas adolescentes y primeras reflexiones sobre identidad.",
  },
  {
    range: "14-16",
    label: "14 a 16 años",
    slug: "libros-adolescentes-14-16",
    description:
      "Libros para adolescentes de 14 a 16 años: literatura juvenil con profundidad. Romance, ciencia ficción, thrillers y novelas que desafían y emocionan a partes iguales.",
  },
];

export const GENRES: GenreInfo[] = [
  {
    id: "fantasia",
    label: "Fantasía",
    slug: "libros-fantasia-juvenil",
    description:
      "Los mejores libros de fantasía para niños y adolescentes: mundos mágicos, criaturas extraordinarias y aventuras épicas que despiertan la imaginación.",
  },
  {
    id: "aventuras",
    label: "Aventuras",
    slug: "libros-aventuras-juvenil",
    description:
      "Libros de aventuras para jóvenes lectores: exploraciones, viajes, desafíos y héroes que no paran quietos. Historias que mantienen el ritmo de principio a fin.",
  },
  {
    id: "misterio",
    label: "Misterio",
    slug: "libros-misterio-juvenil",
    description:
      "Libros de misterio para niños y adolescentes: enigmas por resolver, pistas que seguir y finales que no te esperas. Perfectos para mentes curiosas.",
  },
  {
    id: "amor",
    label: "Amor",
    slug: "libros-amor-juvenil",
    description:
      "Libros de amor para adolescentes: primeros amores, emociones intensas y relaciones que resuenan con la experiencia juvenil.",
  },
  {
    id: "ciencia-ficcion",
    label: "Ciencia ficción",
    slug: "libros-ciencia-ficcion-juvenil",
    description:
      "Libros de ciencia ficción para jóvenes: futuros posibles, tecnología, viajes espaciales y reflexiones sobre la humanidad envueltas en historias trepidantes.",
  },
  {
    id: "autoayuda",
    label: "Crecimiento personal",
    slug: "libros-autoayuda-juvenil",
    description:
      "Libros que inspiran a niños y adolescentes a conocerse mejor, superar retos y desarrollar empatía a través de historias que dejan huella.",
  },
];

export const GENRE_COLORS: Record<string, string> = {
  fantasia: "#7C3AED",
  aventuras: "#059669",
  misterio: "#1D4ED8",
  amor: "#DB2777",
  "ciencia-ficcion": "#0891B2",
  autoayuda: "#D97706",
};
