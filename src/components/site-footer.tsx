import Link from "next/link";
import {
  ClockIcon,
  InstagramIcon,
  LocationIcon,
  PhoneIcon,
  ShieldIcon,
  TelegramIcon,
  ToothIcon,
  WhatsappIcon,
} from "./icons";
import { NAV_ITEMS, type SiteSettings } from "@/lib/site";
import type { Service } from "@/lib/data";

export function SiteFooter({
  settings,
  services,
}: {
  settings: SiteSettings;
  services: Service[];
}) {
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  return (
    <footer className="noise relative overflow-hidden bg-night-950 pt-20 pb-8 text-mint-100/70">
      {/* لبه نورانی بالا */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-400/70 to-transparent"
        aria-hidden
      />
      <span className="aurora start-[-10%] top-[8%] h-80 w-80 bg-brand-500/25" aria-hidden />
      <span
        className="aurora end-[-12%] bottom-[-6%] h-96 w-96 bg-sprout-400/12"
        style={{ animationDelay: "6s" }}
        aria-hidden
      />
      <span className="grid-lines absolute inset-0 opacity-80" aria-hidden />
      <span className="dots-pattern-light absolute inset-x-0 top-0 h-40 opacity-20" aria-hidden />

      {/* کارت دعوت بالای فوتر */}
      <div className="page-shell relative">
        <div className="card-dark grid items-center gap-6 p-7 md:grid-cols-[1.3fr_1fr] md:p-9">
          <div>
            <p className="eyebrow-line text-mint-300">آماده‌ایم کمک کنیم</p>
            <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
              معاینه اولیه و مشاوره درمان، رایگان است
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-mint-100/60">
              همین امروز نوبت بگیرید یا عکس دندان‌تان را در واتس‌اپ بفرستید تا نظر اولیه پزشک را
              بدون مراجعه دریافت کنید.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/appointment" className="btn-primary w-full md:w-auto">
              رزرو نوبت آنلاین
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full md:w-auto"
            >
              <WhatsappIcon className="h-5 w-5" />
              مشاوره در واتس‌اپ
            </a>
          </div>
        </div>
      </div>

      <div className="page-shell relative mt-14 grid gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-700 to-night-900 text-white shadow-[0_14px_28px_-14px_rgba(28,161,106,0.9)]">
              <ToothIcon className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black text-white">{settings.clinicShortName}</span>
              <span className="block text-[11px] text-mint-200/60">{settings.tagline}</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-8 text-mint-100/55">
            کلینیک تخصصی دندانپزشکی با ۹ یونیت مجزا، تجهیزات دیجیتال و تیم متخصص در سعادت‌آباد
            تهران. تمام خدمات با استریل اتوکلاو کلاس B و مواد با اصالت تأییدشده انجام می‌شود.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {[
              { href: `https://wa.me/${settings.whatsapp}`, label: "واتس‌اپ", Icon: WhatsappIcon },
              { href: settings.instagram, label: "اینستاگرام", Icon: InstagramIcon },
              { href: settings.telegram, label: "تلگرام", Icon: TelegramIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-mint-100/70 transition hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-brand-500/20 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black text-white">دسترسی سریع</h3>
          <ul className="grid gap-2.5 text-sm">
            {[...NAV_ITEMS, { href: "/appointment", label: "رزرو نوبت آنلاین" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-mint-100/60 transition hover:translate-x-[-3px] hover:text-mint-300"
                >
                  <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black text-white">خدمات تخصصی</h3>
          <ul className="grid gap-2.5 text-sm">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-mint-100/60 transition hover:translate-x-[-3px] hover:text-mint-300"
                >
                  <span className="h-1 w-1 rounded-full bg-sand-400" aria-hidden />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black text-white">تماس با ما</h3>
          <ul className="grid gap-4 text-sm">
            <li className="flex gap-3">
              <LocationIcon className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
              <span className="leading-7 text-mint-100/60">{settings.address}</span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="h-5 w-5 shrink-0 text-mint-300" />
              <span className="grid gap-1">
                <a href={`tel:${settings.phone}`} dir="ltr" className="font-bold text-white">
                  {settings.phone}
                </a>
                <a href={`tel:${settings.phone2}`} dir="ltr" className="font-bold text-mint-100/70">
                  {settings.phone2}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
              <span className="grid gap-1 text-xs leading-6 text-mint-100/60">
                <span>{settings.workingHoursWeek}</span>
                <span>{settings.workingHoursThu}</span>
                <span>{settings.workingHoursFri}</span>
              </span>
            </li>
          </ul>
          <p className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-[11px] leading-6 text-mint-100/55">
            <ShieldIcon className="h-5 w-5 shrink-0 text-mint-300" />
            اتصال امن SSL · گواهی HTTPS فعال · انتقال رمزنگاری‌شده اطلاعات
          </p>
        </div>
      </div>

      <div className="page-shell relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-mint-100/40 md:flex-row">
        <p>© {year} تمامی حقوق برای {settings.clinicName} محفوظ است.</p>
        <p className="flex items-center gap-2">
          طراحی و بهینه‌سازی سئو با Next.js ·{" "}
          <a href="/sitemap.xml" className="text-mint-300 transition hover:text-white">
            sitemap.xml
          </a>{" "}
          ·{" "}
          <a href="/robots.txt" className="text-mint-300 transition hover:text-white">
            robots.txt
          </a>
        </p>
      </div>
    </footer>
  );
}
