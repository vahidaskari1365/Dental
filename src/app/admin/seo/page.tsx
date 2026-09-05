import { AdminCard } from "@/components/admin/ui";
import { getPublicCounts, getSettings } from "@/lib/data";
import { auditPage, resolveBaseUrls, type AuditStatus } from "@/lib/seo-audit";
import { SITE_URL } from "@/lib/site";
import { toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

const AUDIT_PATHS = ["/", "/services", "/appointment", "/gallery", "/blog", "/contact"];

const TECH_CHECKS: Array<{ label: string; detail: string; status: AuditStatus }> = [
  { label: "نقشه سایت XML", detail: "/sitemap.xml به‌صورت پویا از خدمات و مقالات ساخته می‌شود.", status: "pass" },
  { label: "فایل robots.txt", detail: "/robots.txt با اجازه ایندکس صفحات عمومی و مسدودسازی /admin.", status: "pass" },
  {
    label: "داده ساختاریافته LocalBusiness / Dentist",
    detail: "نام، تلفن، آدرس، ساعات کاری و ReserveAction برای رزرو نوبت.",
    status: "pass",
  },
  { label: "Schema مقالات (BlogPosting)", detail: "برای هر مقاله تاریخ انتشار، نویسنده و تصویر اعلام می‌شود.", status: "pass" },
  { label: "Schema سؤالات پرتکرار (FAQPage)", detail: "۶ پرسش صفحه اصلی به‌عنوان FAQPage منتشر شده است.", status: "pass" },
  { label: "BreadcrumbList", detail: "مسیر صفحات داخلی به موتور جست‌وجو اعلام می‌شود.", status: "pass" },
  { label: "بهینه‌سازی تصاویر", detail: "استفاده از next/image با سایز responsive و فرمت‌های مدرن.", status: "pass" },
  { label: "URL‌های یکتا و canonical", detail: "برای همه صفحات نسخه استاندارد تنظیم شده است.", status: "pass" },
  { label: "ثبت در گوگل سرچ کنسول", detail: "کد تأیید را در بخش تنظیمات سایت وارد و سپس سایت‌مپ را ارسال کنید.", status: "warn" },
  { label: "اتصال HTTPS / SSL", detail: "گواهی Let's Encrypt روی دامنه اصلی؛ ریدایرکت ۳۰۱ به https فعال شود.", status: "warn" },
];

const LAUNCH_STEPS = [
  {
    title: "۱. ثبت دامنه و تنظیم DNS",
    items: [
      "رکورد A دامنه را به IP سرور و رکورد www را به‌صورت CNAME به دامنه اصلی متصل کنید.",
      "رکورد TXT مربوط به تأیید مالکیت گوگل را اضافه کنید.",
    ],
  },
  {
    title: "۲. نصب SSL (HTTPS)",
    items: [
      "در هاست/سرور گواهی Let's Encrypt صادر کنید و تمدید خودکار (auto-renew) را فعال کنید.",
      "ریدایرکت دائمی ۳۰۱ از http و www به https دامنه اصلی را تنظیم کنید.",
      "هدر HSTS را برای افزایش امنیت فعال کنید.",
    ],
  },
  {
    title: "۳. ثبت سایت در گوگل سرچ کنسول",
    items: [
      "حساب بسازید، دامنه را اضافه و کد تأیید را در بخش «تنظیمات سایت» همین پنل وارد کنید.",
      "نقشه سایت /sitemap.xml را از بخش Sitemaps ارسال کنید.",
      "پس از دو هفته، کوئری‌های محلی (مثلاً «دندانپزشکی سعادت‌آباد») را بررسی کنید.",
    ],
  },
  {
    title: "۴. ثبت کلینیک در گوگل مپ (Google Business Profile)",
    items: [
      "پروفایل با دسته‌بندی اصلی Dentist و دسته‌های فرعی Orthodontist، Cosmetic Dentist بسازید.",
      "آدرس، تلفن، ساعات کاری و لینک صفحه رزرو نوبت سایت را وارد کنید.",
      "حداقل ۱۰ عکس واقعی از مطب و اتاق درمان بارگذاری کنید.",
      "پس از تأیید (کد پستی/تلفنی)، لینک ثبت نظر را برای بیماران ارسال کنید و به همه نظرات پاسخ دهید.",
      "سرویس‌ها و محصولات مطابق فهرست خدمات سایت تکمیل شوند تا هم‌راستایی محتوایی ایجاد شود.",
    ],
  },
  {
    title: "۵. سنجش و بهبود مستمر",
    items: [
      "سرعت صفحات را با PageSpeed Insights ماهانه بررسی کنید (هدف: Mobile بالای ۸۵).",
      "هر ماه ۲ تا ۴ مقاله با کلیدواژه‌های محلی منتشر کنید.",
      "نوبت‌های دریافتی را با منبع ورودی (گوگل مپ / جست‌وجو / اینستاگرام) مقایسه کنید.",
    ],
  },
];

export default async function AdminSeoPage() {
  const [baseUrls, counts, settings] = await Promise.all([
    resolveBaseUrls(),
    getPublicCounts(),
    getSettings(),
  ]);
  const audits = await Promise.all(AUDIT_PATHS.map((path) => auditPage(baseUrls, path)));

  const scoreByStatus = (status: AuditStatus) => audits.filter((audit) => audit.ok).flatMap((a) => a.checks).filter((c) => c.status === status).length;

  return (
    <div className="grid gap-6">
      <AdminCard
        title="ممیزی سئوی داخلی صفحات"
        description="بررسی زنده صفحات اصلی سایت بر اساس قواعد سئوی داخلی (عنوان، متا، H1، اسکیما، alt تصاویر، عمق محتوا)."
      >
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-2xl font-extrabold text-emerald-700">{toFaDigits(scoreByStatus("pass"))}</p>
            <p className="text-xs font-bold text-emerald-700">بررسی موفق</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-2xl font-extrabold text-amber-700">{toFaDigits(scoreByStatus("warn"))}</p>
            <p className="text-xs font-bold text-amber-700">نیازمند بهبود</p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4">
            <p className="text-2xl font-extrabold text-rose-700">{toFaDigits(scoreByStatus("fail"))}</p>
            <p className="text-xs font-bold text-rose-700">مشکل جدی</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {audits.map((audit) => (
            <div key={audit.path} className="rounded-2xl border border-slate-200 p-4">
              <a
                href={audit.path}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold text-brand-700 hover:underline"
                dir="ltr"
              >
                {audit.path}
              </a>
              <ul className="mt-3 grid gap-2">
                {audit.checks.map((check) => (
                  <li key={check.label} className="flex items-start justify-between gap-3 text-sm">
                    <span className="font-bold text-slate-700">{check.label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                        check.status === "pass"
                          ? "bg-emerald-50 text-emerald-700"
                          : check.status === "warn"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {check.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          ممیزی بر اساس آدرس فعلی (<span dir="ltr">{baseUrls[0]}</span>) انجام شد؛ پس از اتصال دامنه اصلی و SSL،
          دامنه را در «تنظیمات سایت» به‌روزرسانی کنید. دامنه ثبت‌شده فعلی: <span dir="ltr">{settings.siteUrl || SITE_URL}</span>
        </p>
      </AdminCard>

      <AdminCard title="چک‌لیست فنی سئو" description="وضعیت زیرساخت فنی سایت از نظر سئو و سرعت.">
        <ul className="grid gap-3">
          {TECH_CHECKS.map((check) => (
            <li key={check.label} className="flex flex-wrap items-start justify-between gap-3 rounded-xl bg-slate-50 p-3">
              <span className="font-bold text-slate-800">{check.label}</span>
              <span className="flex max-w-xl items-center gap-2 text-sm text-slate-600">
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    check.status === "pass" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {check.status === "pass" ? "انجام شده" : "در انتظار شما"}
                </span>
                {check.detail}
              </span>
            </li>
          ))}
        </ul>
      </AdminCard>

      <AdminCard
        title="محتوای فعلی سایت"
        description="تعداد صفحات محتوایی ثبت‌شده در سیستم مدیریت محتوا."
      >
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { label: "خدمات", value: counts.services },
            { label: "مقالات", value: counts.posts },
            { label: "اعضای تیم", value: counts.team },
            { label: "موارد قبل و بعد", value: counts.cases },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-slate-900">{toFaDigits(item.value)}</p>
              <p className="text-xs font-bold text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard
        title="راهنمای راه‌اندازی: دامنه، SSL، سرچ کنسول و گوگل مپ"
        description="مراحل تکمیل پروژه از سمت کارفرما (۵ مرحله)."
      >
        <div className="grid gap-5">
          {LAUNCH_STEPS.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 p-4">
              <h3 className="font-extrabold text-slate-800">{step.title}</h3>
              <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-600">
                {step.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
