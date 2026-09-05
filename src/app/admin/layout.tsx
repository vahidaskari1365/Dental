import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "./actions";
import { LoginForm } from "./login-form";
import { isAdminAuthenticated } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "پنل مدیریت | کلینیک دندانپزشکی مهرادنت",
  robots: { index: false, follow: false },
};

const ADMIN_NAV = [
  { href: "/admin", label: "داشبورد", icon: "▦" },
  { href: "/admin/appointments", label: "نوبت‌ها", icon: "🗓" },
  { href: "/admin/posts", label: "بلاگ", icon: "✍" },
  { href: "/admin/services", label: "خدمات", icon: "🦷" },
  { href: "/admin/team", label: "تیم پزشکی", icon: "👩‍⚕️" },
  { href: "/admin/gallery", label: "گالری", icon: "🖼" },
  { href: "/admin/settings", label: "تنظیمات سایت", icon: "⚙" },
  { href: "/admin/flow", label: "جریان کاری پروژه", icon: "🧩" },
  { href: "/admin/seo", label: "سئو و نقشه", icon: "🔍" },
  { href: "/admin/guide", label: "راهنمای پشتیبانی", icon: "📘" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 font-extrabold text-white">
              م
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-slate-900">پنل مدیریت مهرادنت</p>
              <p className="text-xs text-slate-500">سیستم مدیریت محتوای کلینیک</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-brand-300"
            >
              مشاهده سایت
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
              >
                خروج
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 lg:flex-row">
        <nav className="lg:w-64 lg:shrink-0" aria-label="منوی پنل مدیریت">
          <ul className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 lg:flex-col lg:overflow-visible">
            {ADMIN_NAV.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-800",
                  )}
                >
                  <span aria-hidden>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
