import type { MetadataRoute } from "next";
import { getAllBooks, getPopulatedCollections } from "@/lib/data";
import { AGE_GROUPS, GENRES, BASE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const agePages: MetadataRoute.Sitemap = AGE_GROUPS.map((ag) => ({
    url: `${BASE_URL}/${ag.slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const hubPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/libros-para-adolescentes`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/por-edades`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/colecciones`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Only collections that resolve to real books are generated, so only those
  // are listed here.
  const collectionPages: MetadataRoute.Sitemap = getPopulatedCollections().map(
    ({ collection }) => ({
      url: `${BASE_URL}/colecciones/${collection.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const genrePages: MetadataRoute.Sitemap = GENRES.map((g) => ({
    url: `${BASE_URL}/${g.slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const bookPages: MetadataRoute.Sitemap = getAllBooks().map((book) => ({
    url: `${BASE_URL}/libro/${book.slug}`,
    lastModified: lastMod,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/sobre-bookata`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/como-seleccionamos`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [
    ...home,
    ...agePages,
    ...hubPage,
    ...genrePages,
    ...collectionPages,
    ...bookPages,
    ...utilityPages,
  ];
}
