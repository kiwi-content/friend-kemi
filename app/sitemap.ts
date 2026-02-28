import type { MetadataRoute } from "next";
import { blogPosts } from "./data/blog-posts";
import { SITE_URL } from "./lib/seo";

export const dynamic = "force-static";

const SLUGS = ["mok", "hwa", "to", "geum", "su"] as const;
const now = new Date();

const resultPages: MetadataRoute.Sitemap = SLUGS.flatMap((s1) =>
  SLUGS.map((s2) => ({
    url: `${SITE_URL}/result/${s1}-${s2}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))
);

const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
  url: `${SITE_URL}/blog/${post.slug}`,
  lastModified: now,
  changeFrequency: "monthly",
  priority: 0.7,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/combinations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/types`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...blogPages,
    ...resultPages,
  ];
}
