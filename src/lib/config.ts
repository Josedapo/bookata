import type { AgeGroup, GenreInfo, SectionInfo } from "./types";

export const BASE_URL = "https://bookata.es";
export const SITE_NAME = "Bookata";

export const AGE_GROUPS: AgeGroup[] = [
  {
    range: "3-5",
    label: "3 a 5 años",
    slug: "libros-ninos-3-5-anos",
    description:
      "Libros para niños de 3 a 5 años: álbumes ilustrados, primeros cuentos y historias cortas perfectas para leer juntos antes de dormir o para sus primeros pasos como lectores.",
  },
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
    id: "fantasia",
    label: "Fantasía",
    slug: "libros-fantasia-juvenil",
    description:
      "Los mejores libros de fantasía para niños y adolescentes: mundos mágicos, criaturas extraordinarias y aventuras épicas que despiertan la imaginación.",
  },
  {
    id: "valores",
    label: "Valores",
    slug: "libros-valores-juvenil",
    description:
      "Libros que transmiten valores a niños y adolescentes: empatía, respeto, amistad y superación a través de historias que emocionan y dejan huella.",
  },
  {
    id: "educativo",
    label: "Educativo",
    slug: "libros-educativos-juvenil",
    description:
      "Libros educativos para niños y adolescentes: ciencia, historia, naturaleza y curiosidades del mundo explicadas de forma amena y visual.",
  },
  {
    id: "amor",
    label: "Amor",
    slug: "libros-amor-juvenil",
    description:
      "Libros de amor para adolescentes: primeros amores, emociones intensas y relaciones que resuenan con la experiencia juvenil.",
  },
  {
    id: "comic",
    label: "Cómic",
    slug: "libros-comic-juvenil",
    description:
      "Cómics y novelas gráficas para niños y adolescentes: historias visuales que enganchan desde la primera viñeta, perfectas para todos los niveles de lectura.",
  },
];

export const SECTIONS: SectionInfo[] = [
  {
    id: "acierto-seguro",
    label: "Para no fallar (acierto seguro)",
    slug: "acierto-seguro",
  },
  {
    id: "favoritos-ninos",
    label: "Los favoritos de los niños (no de los adultos)",
    slug: "favoritos-ninos",
  },
  {
    id: "recomendados-profes",
    label: "Los más recomendados por profes",
    slug: "recomendados-profes",
  },
  {
    id: "humor",
    label: "Para reírse a carcajadas",
    slug: "humor",
  },
  {
    id: "mentes-curiosas",
    label: "Para mentes curiosas",
    slug: "mentes-curiosas",
  },
  {
    id: "emociones",
    label: "Para ayudarles a entender lo que sienten",
    slug: "emociones",
  },
  {
    id: "leer-solo",
    label: "Para dar el paso a leer solo",
    slug: "leer-solo",
  },
  {
    id: "leer-juntos",
    label: "Para leer juntos antes de dormir",
    slug: "leer-juntos",
  },
  {
    id: "cuidar-de-mi",
    label: "Para aprender a cuidar de mí y de los demás",
    slug: "cuidar-de-mi",
  },
];

export const GENRE_COLORS: Record<string, string> = {
  aventuras: "#059669",
  misterio: "#1D4ED8",
  fantasia: "#7C3AED",
  valores: "#D97706",
  educativo: "#0891B2",
  amor: "#DB2777",
  comic: "#DC2626",
};
