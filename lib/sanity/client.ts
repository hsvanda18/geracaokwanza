import { createClient, type QueryParams } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-01-01";

/** How long a page may serve stale content before refetching from Sanity. */
const REVALIDATE_SECONDS = 60;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Sanity's own CDN cache and Next's fetch cache would otherwise stack two
  // independent staleness windows on top of each other; skip the CDN and
  // let REVALIDATE_SECONDS below be the single source of truth.
  useCdn: false,
  perspective: "published",
});

/**
 * client.fetch(), with Next.js time-based revalidation (ISR) applied. Without
 * this, Next's default fetch caching keeps a query's first result forever —
 * edits published in the Studio would never reach the live site.
 */
export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}
