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
import type { Service } from "@/db/schema";

export function SiteFooter({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  return (
    <footer className="noise relative overflow-hidden bg-night-950 pt-16 pb-8 text-white/70">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" aria-hidden />
      <span className="aurora start-[-10%] top-[10%] h-72 w-72 bg-brand-500/20" aria-hidden />
      <span
        className="aurora end-[-12%] bottom-[0%] h-80 w-80 bg-sand-400/15"
        style={{ animationDelay: "6s" }}
        aria-hidden
      />
      <span className="grid-lines absolute inset-0" aria-hidden />

      <div className="page-shell relative grid gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-700 text-white">
              <ToothIcon className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black text-white">{settings.clinicShortName}</span>
              <span className="block text-[11px] text-white/45">{settings.tagline}</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-8 text-white/55">
            کلینیک تخصصی دندانپزشکی با ۹ یونیت مجزا، تجهیزات دیجیتال و تیم متخصص در سعادت‌آباد تهران. تمام
            خدمات با استریل اتوکلاو کلاس B و مواد با اصالت تأییدشده انجام می‌شود.
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
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-white/70 transition hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-white"
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
                <Link href={item.href} className="text-white/55 transition hover:text-brand-300">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className="text-white/40 transition hover:text-brand-300">
                ورود مدیران (CMS)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black text-white">خدمات تخصصی</h3>
          <ul className="grid gap-2.5 text-sm">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-white/55 transition hover:text-brand-300">
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
              <LocationIcon className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
              <span className="leading-7 text-white/55">{settings.address}</span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="h-5 w-5 shrink-0 text-brand-300" />
              <span className="grid gap-1">
                <a href={`tel:${settings.phone}`} dir="ltr" className="font-bold text-white">
                  {settings.phone}
                </a>
                <a href={`tel:${settings.phone2}`} dir="ltr" className="font-bold text-white/70">
                  {settings.phone2}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
              <span className="grid gap-1 text-xs leading-6 text-white/55">
                <span>{settings.workingHoursWeek}</span>
                <span>{settings.workingHoursThu}</span>
                <span>{settings.workingHoursFri}</span>
              </span>
            </li>
          </ul>
          <p className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-[11px] leading-6 text-white/55">
            <ShieldIcon className="h-5 w-5 shrink-0 text-brand-300" />
            اتصال امن SSL · گواهی HTTPS فعال · انتقال رمزنگاری‌شده اطلاعات
          </p>
        </div>
      </div>

      <div className="page-shell relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/35 md:flex-row">
        <p>© {year} تمامی حقوق برای {settings.clinicName} محفوظ است.</p>
        <p>
          طراحی و بهینه‌سازی سئو با Next.js ·{" "}
          <a href="/sitemap.xml" className="text-brand-300 transition hover:text-white">
            sitemap.xml
          </a>{" "}
          ·{" "}
          <a href="/robots.txt" className="text-brand-300 transition hover:text-white">
            robots.txt
          </a>
        </p>
      </div>
    </footer>
  );
}
