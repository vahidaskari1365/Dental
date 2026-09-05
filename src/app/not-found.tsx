import Link from "next/link";
import { ToothIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20 text-center">
      <span className="leaf-pattern pointer-events-none absolute inset-0" aria-hidden />
      <span className="wash -start-24 top-0 h-80 w-80 bg-mint-200/80" aria-hidden />
      <span
        className="wash -end-24 bottom-0 h-80 w-80 bg-sand-200/50"
        style={{ animationDelay: "5s" }}
        aria-hidden
      />

      <div className="page-shell relative">
        <span className="anim-float mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-700 to-night-900 text-white shadow-[0_24px_48px_-20px_rgba(13,132,85,0.9)]">
          <ToothIcon className="h-12 w-12" />
        </span>
        <p className="eyebrow-line mt-8 justify-center text-brand-600">خطای ۴۰۴</p>
        <h1 className="display-1 mx-auto mt-3 max-w-xl text-balance text-ink-900">
          صفحه‌ای که دنبالش بودید پیدا نشد
        </h1>
        <p className="lede mx-auto mt-4 max-w-md">
          ممکن است آدرس تغییر کرده باشد یا صفحه حذف شده باشد. از منوی بالا استفاده کنید یا مستقیم
          نوبت رزرو کنید.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            بازگشت به خانه
          </Link>
          <Link href="/appointment" className="btn-ghost">
            رزرو نوبت آنلاین
          </Link>
        </div>
      </div>
    </div>
  );
}
