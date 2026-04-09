import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/factory-research/admin", "/c/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
