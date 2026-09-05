# برنامه اقدام — mehrdent.ir

اولویت‌بندی بر اساس `FULL-AUDIT-REPORT.md`. موارد با ✅ در تغییر
`arena/01a0717e-dental` پیاده‌سازی شده‌اند.

## Critical (انجام‌شده در این تغییر)

- [x] Self-host کردن فونت وزیرمتن + preload + fallback metrics (LCP/CLS)
- [x] رفع breadcrumb نامرئی در همه صفحات داخلی (کنتراست AA)
- [x] هدرهای امنیتی کامل (HSTS، CSP، nosniff، Referrer-Policy، Permissions-Policy)

## High (انجام‌شده)

- [x] بازطراحی کامل تم به سبز نعنایی با سطوح کنتراست مشخص (UX/SXO)
- [x] `aggregateRating` + `review` در اسکیمای کلینیک
- [x] `geo` با ۵ رقم اعشار + `hasMap` + `sameAs`
- [x] تصویر OG اختصاصی ۱۲۰۰×۶۳۰ و لوگوی استاندارد

## Medium (انجام‌شده)

- [x] سیاست خزنده‌های AI در robots.txt
- [x] sitemap با تصویر شاخص و lastmod پایدار
- [x] `Service` + `Offer` برای صفحات خدمت
- [x] AVIF/WebP و کش‌هدر دارایی‌های استاتیک
- [x] گره‌های `WebSite`/`Organization` مجزا
- [x] تصحیح `wordCount` و افزودن `speakable`

## باقی‌مانده (بعد از این تغییر)

- [ ] `specialOpeningHoursSpecification` اورژانس جمعه
- [ ] sameAs پزشکان به شناسه نظام پزشکی
- [ ] برنامه بازبینی فصلی مقالات (تازگی محتوا برای نقل‌قول AI)
- [ ] بازنویسی بدنه مقالات به گذاره‌های ۱۳۴–۱۶۷ کلمه‌ای
- [ ] خوشه محتوایی «بیمه و پرداخت اقساطی»
- [ ] اتصال CrUX/GSC برای پایش میدانی CWV

## صریحاً انجام‌نشد (با دلیل)

- ❌ `llms.txt` — طبق `seo-geo` (بیانیه Mueller، ۲۰۲۶-۰۵-۱۵) وزن نقل‌قولی برای گوگل ندارد.
- ❌ AMP — طبق `seo-technical` مزیت رتبه‌ای ندارد.
- ❌ حذف `FAQPage` — گوگل ریچ‌ریزلت آن را بازنشسته ولی برای موتورهای دیگر/AI مفید است (سطح Info).
