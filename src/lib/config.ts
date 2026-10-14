import sectionsData from "@/data/sections.json";
import type { AgeGroup, CollectionInfo, GenreInfo, SectionInfo } from "./types";

export const BASE_URL = "https://bookata.es";
export const SITE_NAME = "Bookata";

/**
 * Site owner for the legal pages (LSSI art. 10, RGPD art. 13). Confirmed by
 * Joseda on 2026-09-24. The NIF is deliberately not published for now: do not
 * add it, or a placeholder for it, without his say.
 */
export const LEGAL_OWNER = "Raúl Poveda";
export const CONTACT_EMAIL = "raulopove@hotmail.com";
export const LEGAL_UPDATED = "24 de septiembre de 2026";

/**
 * The one description of what Bookata is. AI engines resolve entities before
 * they choose passages, and a product described three different ways reads as
 * three weak entities. Schema, footer and about page all use this string.
 */
export const SITE_DESCRIPTION =
  "Recomendaciones de libros infantiles y juveniles seleccionadas una a una y organizadas por edad y por tipo de lector, para padres que buscan el libro adecuado para un niño concreto.";

export const AGE_GROUPS: AgeGroup[] = [
  {
    range: "3-5",
    display: "3 — 5",
    tagline: "Primeras aventuras",
    label: "3 a 5 años",
    slug: "libros-ninos-3-5-anos",
    lead:
      "A los 3-5 años el libro se lee en voz alta y se mira tanto como se escucha.",
    guidance:
      "Álbumes ilustrados y cuentos cortos, con texto breve y una imagen que sostenga la historia. A esta edad el libro se comparte, así que funciona mejor lo que se puede leer entero de una sentada: rimas, repeticiones y humor físico.",
    description:
      "Libros para niños de 3 a 5 años: álbumes ilustrados, primeros cuentos y historias cortas perfectas para leer juntos antes de dormir o para sus primeros pasos como lectores.",
  },
  {
    range: "6-8",
    display: "6 — 8",
    tagline: "Empiezan las grandes historias",
    label: "6 a 8 años",
    slug: "libros-ninos-6-8-anos",
    lead:
      "A los 6-8 años empiezan a leer solos y necesitan capítulos cortos y letra grande.",
    guidance:
      "Capítulos cortos, letra grande y una sola historia por libro. Están aprendiendo a leer solos, así que la victoria es terminarlo. Las ilustraciones intercaladas y las series con el mismo personaje ayudan a que pidan el siguiente.",
    description:
      "Libros para niños de 6 a 8 años: primeros lectores autónomos que empiezan a disfrutar historias más largas con capítulos cortos, ilustraciones y mucha aventura.",
  },
  {
    range: "8-10",
    display: "8 — 10",
    tagline: "Historias que no podrán soltar",
    label: "8 a 10 años",
    slug: "libros-ninos-8-10-anos",
    lead:
      "A los 8-10 años ya leen del tirón y buscan personajes a los que volver.",
    guidance:
      "Novelas de 100 a 200 páginas con humor, aventura o misterio, y capítulos que acaben con ganas de seguir. Es la edad de las series largas: si un personaje les gusta, se leen los ocho tomos seguidos.",
    description:
      "Libros para niños de 8 a 10 años: lectores que ya devoran libros por su cuenta y buscan historias con más acción, misterio y personajes con los que identificarse.",
  },
  {
    range: "10-12",
    display: "10 — 12",
    tagline: "La edad de devorar libros",
    label: "10 a 12 años",
    slug: "libros-ninos-10-12-anos",
    lead:
      "A los 10-12 años ya leen solos y buscan historias largas que les duren.",
    guidance:
      "Novelas largas con trama propia, sea fantasía, misterio o realismo. Ya sostienen 300 páginas y agradecen que no se les hable como a niños pequeños. Es la mejor edad para engancharles a una saga.",
    description:
      "Libros para niños de 10 a 12 años: la edad dorada de la lectura infantil. Historias más complejas, mundos fantásticos, y tramas que enganchan de principio a fin.",
  },
  {
    range: "12-14",
    display: "12 — 14",
    tagline: "Mundos que se abren",
    label: "12 a 14 años",
    slug: "libros-adolescentes-12-14",
    lead:
      "A los 12-14 años el libro compite con el móvil y solo gana si engancha pronto.",
    guidance:
      "Historias con conflicto real y protagonistas de su edad. Funciona lo que arranca rápido: distopía, misterio, novela gráfica. Un libro que tarda cincuenta páginas en empezar se queda en la mesilla.",
    description:
      "Libros para adolescentes de 12 a 14 años: la transición a la literatura juvenil. Temas más maduros, protagonistas adolescentes y primeras reflexiones sobre identidad.",
  },
  {
    range: "14-16",
    display: "14 — 16",
    tagline: "Historias que dejan huella",
    label: "14 a 16 años",
    slug: "libros-adolescentes-14-16",
    lead:
      "A los 14-16 años quieren que les hablen de igual a igual, sin tono infantil.",
    guidance:
      "Novelas juveniles sin edulcorar: amor, identidad, injusticia, humor negro. A esta edad rechazan lo que suene a lectura obligatoria del colegio, así que pesa más el tema que el nivel de lectura.",
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

/**
 * Curated sections per age range, generated with books.json by scripts/build-books.py from
 * the Excel. Never edit by hand: change the Excel and rerun the script.
 */
export const SECTIONS = sectionsData as SectionInfo[];

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
/**
 * Collections kept for readers but out of the index: each targets the same
 * search intent as a genre page that already owns it (Seoseda keyword map,
 * 2026-09-09). The collection page sets noindex and the sitemap skips them.
 */
export const NOINDEX_COLLECTIONS = [
  "aventuras-que-no-podras-soltar",
  "historias-que-dejan-huella",
];

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
