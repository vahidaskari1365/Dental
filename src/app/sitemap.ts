import type { MetadataRoute } from "next";
import { getGalleryCases, getPosts, getServices, getTeamMembers } from "@/lib/data";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * sitemap.xml — با lastmod واقعی، اولویت و تصویر شاخص هر صفحه
 * (بر اساس چک‌لیست اسکیل seo-sitemap).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, gallery, team] = await Promise.all([
    getServices(),
    getPosts(),
    getGalleryCases(),
    getTeamMembers(),
  ]);

  const galleryImages = gallery.slice(0, 8).map((item) => `${SITE_URL}${item.afterUrl}`);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-09-05"),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}${OG_IMAGE}`],
    },
    { url: `${SITE_URL}/appointment`, lastModified: new Date("2026-09-05"), changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/services`, lastModified: new Date("2026-09-05"), changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date("2026-09-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      images: galleryImages,
    },
    {
      url: `${SITE_URL}/team`,
      lastModified: new Date("2026-09-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      images: team.filter((member) => member.imageUrl).map((member) => `${SITE_URL}${member.imageUrl}`),
    },
    { url: `${SITE_URL}/blog`, lastModified: new Date("2026-09-05"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date("2026-09-05"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date("2026-09-05"), changeFrequency: "yearly", priority: 0.7 },
  ];

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: service.createdAt ?? new Date("2026-09-05"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: service.imageUrl ? [`${SITE_URL}${service.imageUrl}`] : undefined,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? new Date("2026-09-05"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: post.coverUrl ? [`${SITE_URL}${post.coverUrl}`] : undefined,
    })),
  ];
}
