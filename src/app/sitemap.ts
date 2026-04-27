import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/tools",
    "/tools/rireki",
    "/tools/shokumu-keirekisho",
    "/tools/pdf-converter",
    "/tools/photo-resize",
    "/tools/resume-photo-maker",
    "/tools/entry-sheet",
    "/services/works",
    "/services/plan",
    "/services/toeic-casino",
    "/services/affiliate",
    "/pricing",
    "/works",
    "/contact",
    "/partners",
    "/operator",
    "/tokusho",
    "/privacy-policy",
    "/company",
    "/essay",
    "/essay/fulcomm-sales-intern",
    "/essay/effort-without-growth",
    "/portfolio",
  ];
  return routes.map((path) => ({
    url: `${BASE}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
}
