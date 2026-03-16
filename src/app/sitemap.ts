import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://thumbnailai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/generate`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/templates`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
