import Link from "next/link";
import { ToothIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
        <ToothIcon className="h-10 w-10" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-brand-950">صفحه مورد نظر پیدا نشد</h1>
      <p className="mt-3 max-w-md text-ink-700">
        ممکن است آدرس تغییر کرده باشد یا صفحه حذف شده باشد. از منوی بالا استفاده کنید یا مستقیم نوبت رزرو کنید.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          بازگشت به خانه
        </Link>
        <Link href="/appointment" className="btn-ghost">
          رزرو نوبت آنلاین
        </Link>
      </div>
    </div>
  );
}
