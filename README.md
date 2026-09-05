# کلینیک دندانپزشکی مهرادنت — وب‌سایت

وب‌سایت فارسی (RTL) کلینیک دندانپزشکی مهرادنت با **Next.js 16 (App Router) + Tailwind CSS v4**.
شامل صفحه اصلی، خدمات، گالری قبل/بعد با اسلایدر مقایسه، تیم پزشکی، بلاگ، نوبت‌دهی آنلاین،
چت پذیرش و سئوی ساختاریافته کامل.

## شروع سریع

```bash
npm install
npm run dev        # http://localhost:3000
```

اسکریپت‌های کیفیت:

```bash
npm run lint       # eslint (flat config + next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run build      # بیلد تولید
```

## دیزاین‌سیستم «باغ نعنایی»

تم روشن سبز با توکن‌های تعریف‌شده در `src/app/globals.css`:

| توکن | کاربرد |
| --- | --- |
| `mint-*` | لایه‌های پس‌زمینه نعنایی (بوم سایت) |
| `brand-*` | سبز یشمی برند (دکمه‌ها، لینک‌ها، لهجه‌ها) |
| `night-*` | سبز جنگلی تیره (فوتر، بخش‌های کنتراست) |
| `sand-*` | طلایی ملایم (امتیازها، CTA روی سبز تیره) |
| `sprout-*` | سبز جوانه (لهجه‌های تازه) |
| `ink-*` | متن با ته‌رنگ سبز |

کامپوننت‌های پایه در `src/components/ui.tsx` (`Section`, `PageHero`, `Stat`, `Accordion`,
`CtaBanner`, `Marquee`, `Breadcrumb`) و حرکت در `src/components/motion.tsx`
(`Reveal`, `CountUp`, `TiltCard`, `ScrollProgress`, `BackToTop`, `PointerParallax`).

## فونت

وزیرمتن به‌صورت **self-host و متغیر** در `public/fonts/` (یک فایل woff2 برای همه وزن‌ها)
با `preload` و fallback دارای `size-adjust` — بدون هیچ درخواست render-blocking به دامنه ثالث.

## دارایی‌های برند

لوگوها و تصویر اشتراک اجتماعی (OG 1200×630) به‌صورت قابل‌بازتولید تولید می‌شوند:

```bash
node scripts/build-assets.mjs
```

## اسکیل‌های نصب‌شده

اسکیل‌های Claude در `.claude/skills/` نصب شده‌اند و برای ممیزی و بهبود همین سایت استفاده شده‌اند:

- **claude-seo** — ۲۵ زیراسکیل سئو + ۱۸ ساب‌ایجنت (`seo-audit`, `seo-technical`, `seo-schema`, `seo-local`, `seo-geo`, …)
- **ruflo** — اسکیل اصلی ارکستراسیون + زیراسکیل‌های `performance-analysis`، `v3-performance-optimization`، `verification-quality`، `skill-builder`
- **freellmapi** — تعریف اسکیل روتر OpenAI-سازگار تجمیع‌کننده ۳۴ ارائه‌دهنده رایگان LLM

نصب/به‌روزرسانی مجدد:

```bash
bash scripts/install-skills.sh            # کش کلون‌ها پس از نصب پاک می‌شود
bash scripts/install-skills.sh --keep-cache
```

فهرست و نسخه منابع در `.claude/SKILLS.md` ثبت می‌شود.

## گزارش ممیزی سئو

خروجی ممیزی کامل بر اساس متدولوژی `seo-audit` در:

- `docs/seo-audit/FULL-AUDIT-REPORT.md`
- `docs/seo-audit/ACTION-PLAN.md`
- `docs/seo-audit/audit-data.json`

## ساختار محتوا

داده‌ها (خدمات، تیم، گالری، مقالات، نظرات) در `src/lib/data.ts` نگهداری می‌شوند و
اسکیمای ساختاریافته در `src/lib/seo.ts` ساخته می‌شود
(`clinicJsonLd`, `webSiteJsonLd`, `serviceJsonLd`, `postJsonLd`, `faqJsonLd`, `breadcrumbJsonLd`).
