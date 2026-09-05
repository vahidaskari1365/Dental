"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  CloseIcon,
  LocationIcon,
  MenuIcon,
  PhoneIcon,
  ToothIcon,
} from "./icons";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { phone: string; phone2: string; address: string };

export function SiteHeader({ phone, phone2, address }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[1.4rem] border px-3 py-2.5 backdrop-blur-xl transition-all duration-500",
            scrolled
              ? "border-cream-200 bg-white/90 shadow-[0_18px_44px_-30px_rgba(16,63,64,0.55)]"
              : "border-cream-200/70 bg-cream-50/85",
          )}
        >
          {/* لوگو */}
          <Link href="/" className="group flex items-center gap-2.5 ps-1">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-700 text-white transition duration-500 group-hover:rotate-6">
              <ToothIcon className="h-5.5 w-5.5" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-black text-ink-900">مهرادنت</span>
              <span className="hidden text-[11px] font-bold text-ink-500 sm:block">
                کلینیک تخصصی دندانپزشکی
              </span>
            </span>
          </Link>

          {/* ناوبری دسکتاپ */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="منوی اصلی">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-bold transition duration-300",
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-700 hover:bg-cream-100 hover:text-brand-700",
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
              className="hidden h-10 items-center gap-2 rounded-full border border-cream-200 bg-white px-4 text-[13px] font-bold text-ink-900 transition hover:border-brand-300 hover:text-brand-700 md:flex"
            >
              <PhoneIcon className="h-4 w-4 text-brand-600" />
              <span dir="ltr">{phone}</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-900 md:hidden"
              aria-label="تماس با کلینیک"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <Link
              href="/appointment"
              className="hidden h-10 items-center gap-2 rounded-full bg-brand-700 px-5 text-[13px] font-black text-white shadow-[0_14px_26px_-16px_rgba(19,93,92,0.9)] transition hover:-translate-y-0.5 hover:bg-brand-800 sm:flex"
            >
              <CalendarIcon className="h-4 w-4" />
              رزرو نوبت
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-900 transition hover:bg-cream-100 lg:hidden"
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
          "fixed inset-0 z-40 flex flex-col bg-cream-50 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <span className="wash -start-24 -top-20 h-72 w-72 bg-brand-100" aria-hidden />
        <span
          className="wash -end-20 bottom-10 h-72 w-72 bg-sand-200/70"
          style={{ animationDelay: "5s" }}
          aria-hidden
        />
        <span className="dots-pattern absolute inset-x-0 top-0 h-56 opacity-40" aria-hidden />

        <div className="page-shell relative flex h-full flex-col justify-between pt-24 pb-10">
          <nav aria-label="منوی موبایل">
            <ul className="grid gap-2">
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
                        "flex items-center justify-between rounded-2xl border bg-white px-5 py-4 text-xl font-black transition",
                        active
                          ? "border-brand-200 bg-brand-50 text-brand-700"
                          : "border-cream-200 text-ink-900",
                      )}
                    >
                      {item.label}
                      <span className="text-xs font-bold text-ink-500/60">
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
            <p className="flex items-start gap-2 pt-2 text-xs leading-6 text-ink-500">
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
