import type { AgeGroup, CollectionInfo, GenreInfo, SectionInfo } from "./types";

export const BASE_URL = "https://bookata.es";
export const SITE_NAME = "Bookata";

export const AGE_GROUPS: AgeGroup[] = [
  {
    range: "3-5",
    display: "3 — 5",
    tagline: "Primeras aventuras",
    label: "3 a 5 años",
    slug: "libros-ninos-3-5-anos",
    description:
      "Libros para niños de 3 a 5 años: álbumes ilustrados, primeros cuentos y historias cortas perfectas para leer juntos antes de dormir o para sus primeros pasos como lectores.",
  },
  {
    range: "6-8",
    display: "6 — 8",
    tagline: "Empiezan las grandes historias",
    label: "6 a 8 años",
    slug: "libros-ninos-6-8-anos",
    description:
      "Libros para niños de 6 a 8 años: primeros lectores autónomos que empiezan a disfrutar historias más largas con capítulos cortos, ilustraciones y mucha aventura.",
  },
  {
    range: "8-10",
    display: "8 — 10",
    tagline: "Historias que no podrán soltar",
    label: "8 a 10 años",
    slug: "libros-ninos-8-10-anos",
    description:
      "Libros para niños de 8 a 10 años: lectores que ya devoran libros por su cuenta y buscan historias con más acción, misterio y personajes con los que identificarse.",
  },
  {
    range: "10-12",
    display: "10 — 12",
    tagline: "La edad de devorar libros",
    label: "10 a 12 años",
    slug: "libros-ninos-10-12-anos",
    description:
      "Libros para niños de 10 a 12 años: la edad dorada de la lectura infantil. Historias más complejas, mundos fantásticos, y tramas que enganchan de principio a fin.",
  },
  {
    range: "12-14",
    display: "12 — 14",
    tagline: "Mundos que se abren",
    label: "12 a 14 años",
    slug: "libros-adolescentes-12-14",
    description:
      "Libros para adolescentes de 12 a 14 años: la transición a la literatura juvenil. Temas más maduros, protagonistas adolescentes y primeras reflexiones sobre identidad.",
  },
  {
    range: "14-16",
    display: "14 — 16",
    tagline: "Historias que dejan huella",
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
  { id: "3-5--para-no-fallar", label: "Para no fallar", slug: "para-no-fallar", ageRange: "3-5", order: 0 },
  { id: "3-5--los-que-mas-les-gustan-a-ellos", label: "Los que más les gustan a ellos", slug: "los-que-mas-les-gustan-a-ellos", ageRange: "3-5", order: 1 },
  { id: "3-5--los-mas-recomendados-por-profes", label: "Los más recomendados por profes", slug: "los-mas-recomendados-por-profes", ageRange: "3-5", order: 2 },
  { id: "3-5--risas-aseguradas", label: "Risas aseguradas", slug: "risas-aseguradas", ageRange: "3-5", order: 3 },
  { id: "3-5--pequenos-exploradores-grandes-preguntas", label: "Pequeños exploradores, grandes preguntas", slug: "pequenos-exploradores-grandes-preguntas", ageRange: "3-5", order: 4 },
  { id: "3-5--para-entender-lo-que-sienten", label: "Para entender lo que sienten", slug: "para-entender-lo-que-sienten", ageRange: "3-5", order: 5 },
  { id: "3-5--sus-primeras-lecturas", label: "Sus primeras lecturas", slug: "sus-primeras-lecturas", ageRange: "3-5", order: 6 },
  { id: "3-5--leemos-juntos-antes-de-dormir", label: "Leemos juntos antes de dormir", slug: "leemos-juntos-antes-de-dormir", ageRange: "3-5", order: 7 },
  { id: "3-5--historias-para-crecer-por-dentro", label: "Historias para crecer por dentro", slug: "historias-para-crecer-por-dentro", ageRange: "3-5", order: 8 },
  { id: "6-8--no-podran-dejar-de-leer", label: "No podrán dejar de leer", slug: "no-podran-dejar-de-leer", ageRange: "6-8", order: 0 },
  { id: "6-8--para-quienes-dicen-que-no-les-gusta-leer", label: "Para quienes dicen que no les gusta leer", slug: "para-quienes-dicen-que-no-les-gusta-leer", ageRange: "6-8", order: 1 },
  { id: "6-8--acierto-seguro", label: "Acierto seguro", slug: "acierto-seguro", ageRange: "6-8", order: 2 },
  { id: "6-8--los-que-ellos-eligen-una-y-otra-vez", label: "Los que ellos eligen una y otra vez", slug: "los-que-ellos-eligen-una-y-otra-vez", ageRange: "6-8", order: 3 },
  { id: "6-8--con-el-sello-de-los-profes", label: "Con el sello de los profes", slug: "con-el-sello-de-los-profes", ageRange: "6-8", order: 4 },
  { id: "6-8--diversion-pagina-tras-pagina", label: "Diversión página tras página", slug: "diversion-pagina-tras-pagina", ageRange: "6-8", order: 5 },
  { id: "6-8--para-mentes-que-no-paran-de-preguntar", label: "Para mentes que no paran de preguntar", slug: "para-mentes-que-no-paran-de-preguntar", ageRange: "6-8", order: 6 },
  { id: "6-8--puertas-a-otros-mundos", label: "Puertas a otros mundos", slug: "puertas-a-otros-mundos", ageRange: "6-8", order: 7 },
  { id: "6-8--historias-para-convivir-mejor", label: "Historias para convivir mejor", slug: "historias-para-convivir-mejor", ageRange: "6-8", order: 8 },
  { id: "6-8--leemos-juntos-antes-de-dormir", label: "Leemos juntos antes de dormir", slug: "leemos-juntos-antes-de-dormir", ageRange: "6-8", order: 9 },
  { id: "6-8--para-dar-el-paso-a-leer-solo", label: "Para dar el paso a leer solo", slug: "para-dar-el-paso-a-leer-solo", ageRange: "6-8", order: 10 },
  { id: "6-8--libros-sobre-alimentacion-saludable", label: "Libros sobre alimentación saludable", slug: "libros-sobre-alimentacion-saludable", ageRange: "6-8", order: 11 },
  { id: "8-10--te-atrapan-desde-la-primera-pagina", label: "Te atrapan desde la primera página", slug: "te-atrapan-desde-la-primera-pagina", ageRange: "8-10", order: 0 },
  { id: "8-10--para-quienes-creen-que-leer-es-aburrido", label: "Para quienes creen que leer es aburrido", slug: "para-quienes-creen-que-leer-es-aburrido", ageRange: "8-10", order: 1 },
  { id: "8-10--mucho-mas-que-futbol", label: "Mucho más que fútbol", slug: "mucho-mas-que-futbol", ageRange: "8-10", order: 2 },
  { id: "8-10--para-los-mas-deportistas", label: "Para los más deportistas", slug: "para-los-mas-deportistas", ageRange: "8-10", order: 3 },
  { id: "8-10--acierto-seguro", label: "¡Acierto seguro!", slug: "acierto-seguro", ageRange: "8-10", order: 4 },
  { id: "8-10--los-favoritos-de-los-lectores-mas-jovenes", label: "Los favoritos de los lectores más jóvenes", slug: "los-favoritos-de-los-lectores-mas-jovenes", ageRange: "8-10", order: 5 },
  { id: "8-10--los-mas-recomendados-por-profes", label: "Los más recomendados por profes", slug: "los-mas-recomendados-por-profes", ageRange: "8-10", order: 6 },
  { id: "8-10--risas-garantizadas", label: "Risas garantizadas", slug: "risas-garantizadas", ageRange: "8-10", order: 7 },
  { id: "8-10--para-mentes-curiosas", label: "Para mentes curiosas", slug: "para-mentes-curiosas", ageRange: "8-10", order: 8 },
  { id: "8-10--donde-la-magia-cobra-vida", label: "Donde la magia cobra vida", slug: "donde-la-magia-cobra-vida", ageRange: "8-10", order: 9 },
  { id: "8-10--para-hablar-de-emociones", label: "Para hablar de emociones", slug: "para-hablar-de-emociones", ageRange: "8-10", order: 10 },
  { id: "8-10--si-les-gustan-los-videojuegos-prueba-con-estos", label: "Si les gustan los videojuegos, prueba con estos", slug: "si-les-gustan-los-videojuegos-prueba-con-estos", ageRange: "8-10", order: 11 },
  { id: "10-12--imposible-dejarlo-a-medias", label: "Imposible dejarlo a medias", slug: "imposible-dejarlo-a-medias", ageRange: "10-12", order: 0 },
  { id: "10-12--para-quienes-aun-no-han-encontrado-su-libro", label: "Para quienes aún no han encontrado su libro", slug: "para-quienes-aun-no-han-encontrado-su-libro", ageRange: "10-12", order: 1 },
  { id: "10-12--para-los-que-solo-piensan-en-futbol", label: "Para los que solo piensan en fútbol", slug: "para-los-que-solo-piensan-en-futbol", ageRange: "10-12", order: 2 },
  { id: "10-12--para-los-que-el-basket-es-su-pasion", label: "Para los que el basket es su pasión", slug: "para-los-que-el-basket-es-su-pasion", ageRange: "10-12", order: 3 },
  { id: "10-12--para-los-que-se-distraen-con-todo", label: "Para los que se distraen con todo", slug: "para-los-que-se-distraen-con-todo", ageRange: "10-12", order: 4 },
  { id: "10-12--acierto-seguro", label: "¡Acierto seguro!", slug: "acierto-seguro", ageRange: "10-12", order: 5 },
  { id: "10-12--los-libros-favoritos-de-ninos-y-ninas-de-esta-edad", label: "Los libros favoritos de niños y niñas de esta edad", slug: "los-libros-favoritos-de-ninos-y-ninas-de-esta-edad", ageRange: "10-12", order: 6 },
  { id: "10-12--con-el-sello-de-los-profes", label: "Con el sello de los profes", slug: "con-el-sello-de-los-profes", ageRange: "10-12", order: 7 },
  { id: "10-12--humor-sin-frenos", label: "Humor sin frenos", slug: "humor-sin-frenos", ageRange: "10-12", order: 8 },
  { id: "10-12--misterios-para-mentes-inquietas", label: "Misterios para mentes inquietas", slug: "misterios-para-mentes-inquietas", ageRange: "10-12", order: 9 },
  { id: "10-12--la-imaginacion-no-tiene-limites", label: "La imaginación no tiene límites", slug: "la-imaginacion-no-tiene-limites", ageRange: "10-12", order: 10 },
  { id: "10-12--historias-que-dejan-huella", label: "Historias que dejan huella", slug: "historias-que-dejan-huella", ageRange: "10-12", order: 11 },
  { id: "10-12--si-les-apasionan-los-videojuegos-empieza-por-aqui", label: "Si les apasionan los videojuegos, empieza por aquí", slug: "si-les-apasionan-los-videojuegos-empieza-por-aqui", ageRange: "10-12", order: 12 },
  { id: "10-12--leer-para-cuidar-el-planeta", label: "Leer para cuidar el planeta", slug: "leer-para-cuidar-el-planeta", ageRange: "10-12", order: 13 },
  { id: "12-14--no-podras-dejar-de-leerlos", label: "No podrás dejar de leerlos", slug: "no-podras-dejar-de-leerlos", ageRange: "12-14", order: 0 },
  { id: "12-14--historias-que-se-quedan-contigo", label: "Historias que se quedan contigo", slug: "historias-que-se-quedan-contigo", ageRange: "12-14", order: 1 },
  { id: "12-14--acierto-seguro", label: "¡Acierto seguro!", slug: "acierto-seguro", ageRange: "12-14", order: 2 },
  { id: "12-14--mas-adictivos-que-una-pantalla", label: "Más adictivos que una pantalla", slug: "mas-adictivos-que-una-pantalla", ageRange: "12-14", order: 3 },
  { id: "12-14--si-te-gusto-harry-potter-te-encantaran-estos", label: "Si te gustó Harry Potter, te encantarán estos", slug: "si-te-gusto-harry-potter-te-encantaran-estos", ageRange: "12-14", order: 4 },
  { id: "12-14--historias-que-dejan-huella", label: "Historias que dejan huella", slug: "historias-que-dejan-huella", ageRange: "12-14", order: 5 },
  { id: "12-14--risas-garantizadas", label: "Risas garantizadas", slug: "risas-garantizadas", ageRange: "12-14", order: 6 },
  { id: "12-14--misterios-imposibles-de-soltar", label: "Misterios imposibles de soltar", slug: "misterios-imposibles-de-soltar", ageRange: "12-14", order: 7 },
  { id: "12-14--con-el-sello-de-los-profes", label: "Con el sello de los profes", slug: "con-el-sello-de-los-profes", ageRange: "12-14", order: 8 },
  { id: "12-14--perfectos-para-regalar", label: "Perfectos para regalar", slug: "perfectos-para-regalar", ageRange: "12-14", order: 9 },
  { id: "14-16--una-pagina-mas-y-me-voy-a-dormir", label: "Una página más y me voy a dormir", slug: "una-pagina-mas-y-me-voy-a-dormir", ageRange: "14-16", order: 0 },
  { id: "14-16--historias-para-enamorarse-de-la-lectura", label: "Historias para enamorarse... de la lectura", slug: "historias-para-enamorarse-de-la-lectura", ageRange: "14-16", order: 1 },
  { id: "14-16--imposible-dejar-de-leerlos", label: "Imposible dejar de leerlos", slug: "imposible-dejar-de-leerlos", ageRange: "14-16", order: 2 },
  { id: "14-16--mundos-magicos-que-parecen-reales", label: "Mundos mágicos que parecen reales", slug: "mundos-magicos-que-parecen-reales", ageRange: "14-16", order: 3 },
  { id: "14-16--historias-para-entender-a-los-adolescentes", label: "Historias para entender a los adolescentes", slug: "historias-para-entender-a-los-adolescentes", ageRange: "14-16", order: 4 },
  { id: "14-16--adrenalina-en-cada-capitulo", label: "Adrenalina en cada capítulo", slug: "adrenalina-en-cada-capitulo", ageRange: "14-16", order: 5 },
  { id: "14-16--las-novelas-graficas-de-las-que-todo-el-mundo-habla", label: "Las novelas gráficas de las que todo el mundo habla", slug: "las-novelas-graficas-de-las-que-todo-el-mundo-habla", ageRange: "14-16", order: 6 },
  { id: "14-16--libros-que-te-cambian-por-dentro", label: "Libros que te cambian por dentro", slug: "libros-que-te-cambian-por-dentro", ageRange: "14-16", order: 7 },
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

export const GENRE_ICONS: Record<string, string> = {
  aventuras: "\uD83E\uDDED",
  misterio: "\uD83D\uDD0D",
  fantasia: "\u2728",
  valores: "\uD83C\uDF31",
  educativo: "\uD83D\uDD2C",
  amor: "\uD83D\uDC96",
  comic: "\uD83D\uDCAC",
};

/** Brighter genre tints, tuned to read over the dark cover mosaics. */
export const GENRE_GLOW: Record<string, string> = {
  aventuras: "#10B981",
  misterio: "#3B82F6",
  fantasia: "#A855F7",
  valores: "#F59E0B",
  educativo: "#06B6D4",
  amor: "#EC4899",
  comic: "#EF4444",
};

/**
 * Cross-age editorial collections.
 *
 * Every collection is backed by sections that already exist in SECTIONS, so no
 * book is ever placed in a collection it was not curated into. A collection
 * whose `sections` resolve to no books is not rendered: that is how
 * "Joyas que quizá no conozcas" stays declared and ready without inventing a
 * catalogue to fill it.
 */
export const COLLECTIONS: CollectionInfo[] = [
  {
    id: "lectores-que-devoran-historias",
    label: "Para lectores que devoran historias",
    slug: "lectores-que-devoran-historias",
    tagline: "Empiezan un viernes y el domingo piden el siguiente",
    description:
      "Libros que enganchan desde la primera página y se terminan de una sentada. Para niños y adolescentes que leen rápido y siempre quieren más.",
    sections: [
      "6-8--no-podran-dejar-de-leer",
      "8-10--te-atrapan-desde-la-primera-pagina",
      "10-12--imposible-dejarlo-a-medias",
      "12-14--no-podras-dejar-de-leerlos",
      "14-16--imposible-dejar-de-leerlos",
      "14-16--una-pagina-mas-y-me-voy-a-dormir",
    ],
  },
  {
    id: "para-quienes-dicen-que-no-les-gusta-leer",
    label: "Para quienes dicen que no les gusta leer",
    slug: "para-quienes-dicen-que-no-les-gusta-leer",
    tagline: "El libro que les hace cambiar de opinión",
    description:
      "Historias pensadas para lectores que aún no han encontrado su libro: ritmo rápido, capítulos cortos y tramas que no dan tregua.",
    sections: [
      "6-8--para-quienes-dicen-que-no-les-gusta-leer",
      "6-8--para-dar-el-paso-a-leer-solo",
      "8-10--para-quienes-creen-que-leer-es-aburrido",
      "10-12--para-quienes-aun-no-han-encontrado-su-libro",
      "10-12--para-los-que-se-distraen-con-todo",
    ],
  },
  {
    id: "los-clasicos-que-nunca-fallan",
    label: "Los clásicos que nunca fallan",
    slug: "los-clasicos-que-nunca-fallan",
    tagline: "Si dudas, empieza por aquí",
    description:
      "Los títulos con los que es muy difícil equivocarse. Funcionan con casi cualquier lector de su edad y son la apuesta segura para un regalo.",
    sections: [
      "3-5--para-no-fallar",
      "6-8--acierto-seguro",
      "8-10--acierto-seguro",
      "10-12--acierto-seguro",
      "12-14--acierto-seguro",
    ],
  },
  {
    id: "aventuras-que-no-podras-soltar",
    label: "Aventuras que no podrás soltar",
    slug: "aventuras-que-no-podras-soltar",
    tagline: "Adrenalina en cada capítulo",
    description:
      "Acción, riesgo y giros constantes. Aventuras que compiten de tú a tú con cualquier pantalla.",
    sections: [
      "12-14--mas-adictivos-que-una-pantalla",
      "14-16--adrenalina-en-cada-capitulo",
    ],
  },
  {
    id: "misterios-para-pequenos-detectives",
    label: "Misterios para pequeños detectives",
    slug: "misterios-para-pequenos-detectives",
    tagline: "Pistas, sospechosos y finales inesperados",
    description:
      "Enigmas por resolver para mentes inquietas. Historias que invitan a leer con lápiz en la mano para no perderse ninguna pista.",
    sections: [
      "10-12--misterios-para-mentes-inquietas",
      "12-14--misterios-imposibles-de-soltar",
    ],
  },
  {
    id: "historias-para-leer-en-familia",
    label: "Historias para leer en familia",
    slug: "historias-para-leer-en-familia",
    tagline: "Diez minutos antes de dormir",
    description:
      "Libros pensados para leer en voz alta y compartir. El rato de lectura antes de dormir, convertido en costumbre.",
    sections: [
      "3-5--leemos-juntos-antes-de-dormir",
      "6-8--leemos-juntos-antes-de-dormir",
    ],
  },
  {
    id: "con-el-sello-de-los-profes",
    label: "Con el sello de los profes",
    slug: "con-el-sello-de-los-profes",
    tagline: "Los que más se recomiendan en clase",
    description:
      "Títulos que aparecen una y otra vez en las recomendaciones de profesores y bibliotecas escolares.",
    sections: [
      "3-5--los-mas-recomendados-por-profes",
      "6-8--con-el-sello-de-los-profes",
      "8-10--los-mas-recomendados-por-profes",
      "10-12--con-el-sello-de-los-profes",
      "12-14--con-el-sello-de-los-profes",
    ],
  },
  {
    id: "risas-garantizadas",
    label: "Risas garantizadas",
    slug: "risas-garantizadas",
    tagline: "Humor que funciona a cualquier edad",
    description:
      "Libros que hacen reír de verdad. El mejor punto de entrada para un lector al que hay que convencer.",
    sections: [
      "3-5--risas-aseguradas",
      "6-8--diversion-pagina-tras-pagina",
      "8-10--risas-garantizadas",
      "10-12--humor-sin-frenos",
      "12-14--risas-garantizadas",
    ],
  },
  {
    id: "historias-que-dejan-huella",
    label: "Historias que dejan huella",
    slug: "historias-que-dejan-huella",
    tagline: "De los que se recuerdan años después",
    description:
      "Libros que hacen pensar y remueven algo por dentro. Los que se siguen recordando mucho después de la última página.",
    sections: [
      "3-5--historias-para-crecer-por-dentro",
      "10-12--historias-que-dejan-huella",
      "12-14--historias-que-dejan-huella",
      "14-16--libros-que-te-cambian-por-dentro",
    ],
  },
  {
    /*
     * Declared and ready, but the catalogue has no curated section for it yet.
     * It resolves to zero books and is therefore never rendered. Populate it by
     * adding a matching section in the source Excel, not by hand-picking titles.
     */
    id: "joyas-que-quiza-no-conozcas",
    label: "Joyas que quizá no conozcas",
    slug: "joyas-que-quiza-no-conozcas",
    tagline: "Fuera de las listas de más vendidos",
    description:
      "Libros excelentes que no aparecen en los escaparates. Pendiente de curación en el catálogo.",
    sections: [],
  },
];
