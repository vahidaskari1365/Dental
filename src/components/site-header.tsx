"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  CloseIcon,
  InstagramIcon,
  LocationIcon,
  MenuIcon,
  PhoneIcon,
  TelegramIcon,
  ToothIcon,
  WhatsappIcon,
} from "./icons";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  phone: string;
  phone2: string;
  address: string;
  hoursWeek: string;
  emergencyNote: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
};

export function SiteHeader({
  phone,
  phone2,
  address,
  hoursWeek,
  emergencyNote,
  instagram,
  telegram,
  whatsapp,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // بستن منو هنگام تغییر مسیر — الگوی «state مشتق‌شده هنگام رندر» بدون setState در effect
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* نوار کاربردی بالا */}
      <div className="relative overflow-hidden bg-night-950 text-mint-100">
        <span className="dots-pattern-light absolute inset-0 opacity-20" aria-hidden />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-brand-400/70 to-transparent"
          aria-hidden
        />
        <div className="page-shell relative flex h-10 items-center justify-between gap-4 text-[11px] font-bold">
          <p className="flex min-w-0 items-center gap-2">
            <ClockIcon className="h-3.5 w-3.5 shrink-0 text-mint-300" />
            <span className="truncate">{hoursWeek}</span>
            <span className="hidden text-mint-300/70 md:inline">·</span>
            <span className="hidden truncate text-mint-200/80 md:inline">{emergencyNote}</span>
          </p>
          <div className="flex shrink-0 items-center gap-1">
            {[
              { href: `https://wa.me/${whatsapp}`, label: "واتس‌اپ", Icon: WhatsappIcon },
              { href: instagram, label: "اینستاگرام", Icon: InstagramIcon },
              { href: telegram, label: "تلگرام", Icon: TelegramIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-full text-mint-200/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={`tel:${phone2}`}
              dir="ltr"
              className="ms-2 hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-mint-100 transition hover:bg-white/20 sm:flex"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {phone2}
            </a>
          </div>
        </div>
      </div>

      {/* هدر شیشه‌ای چسبان */}
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[1.6rem] border px-3 py-2.5 backdrop-blur-xl transition-all duration-500",
            scrolled
              ? "border-mint-200 bg-white/88 shadow-[0_20px_46px_-30px_rgba(9,68,48,0.6)]"
              : "border-white/60 bg-white/55 shadow-[0_10px_30px_-24px_rgba(9,68,48,0.45)]",
          )}
        >
          {/* لوگو */}
          <Link href="/" className="group flex items-center gap-3 ps-1" aria-label="مهرادنت — صفحه اصلی">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-700 to-night-900 text-white shadow-[0_10px_22px_-12px_rgba(13,132,85,0.9)] transition duration-500 group-hover:rotate-6 group-hover:scale-105">
              <ToothIcon className="h-6 w-6" />
              <span className="absolute -top-1 -end-1 h-3 w-3 rounded-full bg-sand-400 ring-2 ring-white" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-black text-ink-900">مهرادنت</span>
              <span className="hidden text-[11px] font-bold text-brand-700 sm:block">
                کلینیک تخصصی دندانپزشکی
              </span>
            </span>
          </Link>

          {/* ناوبری دسکتاپ */}
          <nav
            className="hidden items-center gap-1 rounded-full border border-mint-200/80 bg-mint-50/80 p-1 lg:flex"
            aria-label="منوی اصلی"
          >
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-bold transition duration-300",
                    active
                      ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[0_8px_18px_-10px_rgba(13,132,85,0.9)]"
                      : "text-ink-700 hover:bg-white hover:text-brand-700",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* اقدامات */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="hidden h-10 items-center gap-2 rounded-full border border-mint-300 bg-white/80 px-4 text-[13px] font-bold text-brand-800 transition hover:-translate-y-0.5 hover:border-brand-400 hover:bg-mint-50 md:flex"
            >
              <PhoneIcon className="h-4 w-4 text-brand-600" />
              <span dir="ltr">{phone}</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-mint-300 bg-white/80 text-brand-700 md:hidden"
              aria-label="تماس با کلینیک"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <Link
              href="/appointment"
              className="hidden h-10 items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 text-[13px] font-black text-white shadow-[0_14px_26px_-14px_rgba(13,132,85,0.95)] transition hover:-translate-y-0.5 hover:brightness-110 sm:flex"
            >
              <CalendarIcon className="h-4 w-4" />
              رزرو نوبت
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-mint-300 bg-white/80 text-brand-800 transition hover:bg-mint-50 lg:hidden"
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              aria-expanded={open}
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* منوی موبایل تمام‌صفحه */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-hidden bg-mint-50 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <span className="leaf-pattern pointer-events-none absolute inset-0" aria-hidden />
        <span className="wash -start-24 -top-20 h-80 w-80 bg-mint-200" aria-hidden />
        <span
          className="wash -end-20 bottom-10 h-80 w-80 bg-sand-200/70"
          style={{ animationDelay: "5s" }}
          aria-hidden
        />
        <span className="dots-pattern absolute inset-x-0 top-0 h-56 opacity-40" aria-hidden />

        <div className="page-shell relative flex h-full flex-col justify-between pt-28 pb-10">
          <nav aria-label="منوی موبایل">
            <ul className="grid gap-2.5">
              {NAV_ITEMS.map((item, index) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li
                    key={item.href}
                    style={{ transitionDelay: `${index * 45}ms` }}
                    className={cn(
                      "transition-all duration-500",
                      open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border bg-white/90 px-5 py-4 text-xl font-black shadow-mint-sm transition",
                        active
                          ? "border-brand-400 bg-gradient-to-l from-brand-600 to-brand-800 text-white"
                          : "border-mint-200 text-ink-900",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "text-xs font-bold",
                          active ? "text-mint-200/80" : "text-ink-400",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="grid gap-3">
            <Link href="/appointment" className="btn-primary w-full !py-4 text-base">
              <CalendarIcon className="h-5 w-5" />
              رزرو نوبت آنلاین
            </Link>
            <a href={`tel:${phone}`} className="btn-ghost w-full !py-4">
              <PhoneIcon className="h-5 w-5 text-brand-600" />
              <span dir="ltr">{phone}</span>
            </a>
            <p className="flex items-start gap-2 pt-2 text-xs leading-6 text-ink-600">
              <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {address}
              <span className="ms-auto shrink-0 font-bold" dir="ltr">
                {phone2}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
