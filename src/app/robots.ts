import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt — بر اساس بخش «AI Crawler Management» اسکیل seo-technical.
 * برای یک کسب‌وکار محلی، دیده‌شدن در پاسخ‌دهنده‌های هوش مصنوعی (ChatGPT، Perplexity،
 * Gemini) یک کانال ارجاع واقعی است؛ بنابراین خزنده‌های AI باز گذاشته می‌شوند و
 * فقط مسیرهای خصوصی بسته می‌شوند.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // خزنده‌های هوش مصنوعی — دسترسی کامل برای نقل‌قول و پاسخ‌دهی
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
