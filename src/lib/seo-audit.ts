import { headers } from "next/headers";

export type AuditStatus = "pass" | "warn" | "fail";

export type AuditCheck = {
  label: string;
  status: AuditStatus;
  detail: string;
};

export type PageAudit = {
  path: string;
  ok: boolean;
  checks: AuditCheck[];
};

/** آدرس‌های پایه کاندید برای ممیزی زنده صفحات (دامنه عمومی + لوکال‌هاست) */
export async function resolveBaseUrls(): Promise<string[]> {
  const store = await headers();
  const host = store.get("x-forwarded-host") ?? store.get("host") ?? "localhost:3000";
  const proto = store.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const port = process.env.PORT ?? "3000";
  const candidates = [
    `${proto}://${host}`,
    `http://127.0.0.1:${port}`,
    `http://localhost:${port}`,
  ];
  return Array.from(new Set(candidates));
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

export async function auditPage(baseUrls: string[], path: string): Promise<PageAudit> {
  let lastError = "خطای نامشخص";

  for (const baseUrl of baseUrls) {
    const result = await runAudit(baseUrl, path);
    if (result) return result;
    lastError = lastErrorMessage;
  }

  return {
    path,
    ok: false,
    checks: [
      {
        label: "بررسی زنده صفحه",
        status: "warn",
        detail: `امکان دریافت صفحه نبود: ${lastError}`,
      },
    ],
  };
}

let lastErrorMessage = "خطای نامشخص";

async function runAudit(baseUrl: string, path: string): Promise<PageAudit | null> {
  try {
    const response = await fetch(new URL(path === "/" ? "/" : path, baseUrl), {
      cache: "no-store",
      headers: { "user-agent": "MehrDent-SEO-Audit/1.0" },
    });
    if (!response.ok) {
      return {
        path,
        ok: false,
        checks: [{ label: "دسترسی صفحه", status: "fail", detail: `کد وضعیت ${response.status}` }],
      };
    }
    const html = await response.text();
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "";
    const description =
      html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ??
      html.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i)?.[1] ??
      "";
    const h1Count = countMatches(html, /<h1[\s>]/gi);
    const jsonLdCount = countMatches(html, /application\/ld\+json/gi);
    const images = html.match(/<img[^>]*>/gi) ?? [];
    const imagesWithoutAlt = images.filter((tag) => !/\salt=/.test(tag)).length;
    const words = stripTags(html).split(" ").filter(Boolean).length;
    const hasCanonical = /rel="canonical"/i.test(html);
    const isResponsive = /width=device-width/i.test(html);
    const langCorrect = /<html[^>]+lang="fa"/i.test(html) && /dir="rtl"/i.test(html);

    const titleLength = title.length;
    const descriptionLength = description.length;

    const checks: AuditCheck[] = [
      {
        label: "طول تگ عنوان",
        status: titleLength >= 30 && titleLength <= 65 ? "pass" : titleLength ? "warn" : "fail",
        detail: `${titleLength} کاراکتر (بازه پیشنهادی ۳۰ تا ۶۵)`,
      },
      {
        label: "طول توضیحات متا",
        status: descriptionLength >= 120 && descriptionLength <= 170 ? "pass" : descriptionLength ? "warn" : "fail",
        detail: `${descriptionLength} کاراکتر (بازه پیشنهادی ۱۲۰ تا ۱۷۰)`,
      },
      {
        label: "تک‌بودن H1",
        status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warn",
        detail: `${h1Count} تگ H1 در صفحه`,
      },
      {
        label: "داده ساختاریافته (Schema)",
        status: jsonLdCount >= 1 ? "pass" : "fail",
        detail: `${jsonLdCount} بلوک JSON-LD`,
      },
      {
        label: "متن جایگزین تصاویر (alt)",
        status: imagesWithoutAlt === 0 ? "pass" : imagesWithoutAlt > 2 ? "fail" : "warn",
        detail: `${imagesWithoutAlt} تصویر از ${images.length} تصویر بدون alt`,
      },
      {
        label: "لینک canonical",
        status: hasCanonical ? "pass" : "fail",
        detail: hasCanonical ? "تنظیم شده است" : "یافت نشد",
      },
      {
        label: "ریسپانسیو بودن",
        status: isResponsive ? "pass" : "fail",
        detail: isResponsive ? "viewport تنظیم شده است" : "متاتگ viewport یافت نشد",
      },
      {
        label: "زبان و جهت متن",
        status: langCorrect ? "pass" : "warn",
        detail: langCorrect ? "lang=fa و dir=rtl" : "باید lang=fa و dir=rtl باشد",
      },
      {
        label: "عمق محتوا",
        status: words >= 300 ? "pass" : words >= 150 ? "warn" : "fail",
        detail: `${words} کلمه در متن صفحه`,
      },
    ];

    return { path, ok: true, checks };
  } catch (error) {
    lastErrorMessage = error instanceof Error ? error.message : "خطای نامشخص";
    return null;
  }
}
