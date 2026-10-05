import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import client from "@/sanity/lib/client";
import { ALL_POST_SLUGS } from "@/sanity/lib/queries";
import type { ALL_POST_SLUGS_RESULT } from "@/sanity/sanity.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/editorials`, lastModified: new Date() },
    { url: `${baseUrl}/editorials/submit`, lastModified: new Date() },
    { url: `${baseUrl}/subscribe`, lastModified: new Date() },
  ];

  try {
    const posts = await client
      .withConfig({ useCdn: false })
      .fetch<ALL_POST_SLUGS_RESULT>(ALL_POST_SLUGS);

    const postRoutes: MetadataRoute.Sitemap = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
      }));

    return [...staticRoutes, ...postRoutes];
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return staticRoutes;
  }
}
