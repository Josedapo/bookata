import { getSearchIndex } from "@/lib/data";

/*
 * The search index is served as a statically generated file rather than bundled
 * into the client. books.json is ~302 KB; this slim projection is ~12 KB gzipped
 * and is only fetched the first time a visitor opens the search overlay, so the
 * initial page payload does not grow at all.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchIndex(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
