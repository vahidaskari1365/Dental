import Link from "next/link";
import { AdminCard, StatusPill } from "@/components/admin/ui";
import {
  getAppointmentStats,
  getAppointments,
  getPublicCounts,
  getTasks,
} from "@/lib/data";
import { formatDateTime, toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, counts, appointments, tasks] = await Promise.all([
    getAppointmentStats(),
    getPublicCounts(),
    getAppointments(),
    getTasks(),
  ]);

  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const progress = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  const cards = [
    { label: "کل درخواست‌های نوبت", value: stats.total, href: "/admin/appointments", tone: "bg-brand-50 text-brand-800" },
    { label: "در انتظار تماس", value: stats.pending, href: "/admin/appointments?status=pending", tone: "bg-amber-50 text-amber-700" },
    { label: "نوبت تأییدشده", value: stats.confirmed, href: "/admin/appointments?status=confirmed", tone: "bg-emerald-50 text-emerald-700" },
    { label: "مقالات بلاگ", value: counts.posts, href: "/admin/posts", tone: "bg-sky-50 text-sky-700" },
    { label: "خدمات فعال", value: counts.services, href: "/admin/services", tone: "bg-indigo-50 text-indigo-700" },
    { label: "اعضای تیم", value: counts.team, href: "/admin/team", tone: "bg-rose-50 text-rose-700" },
  ];

  return (
    <div className="grid gap-6">
      <AdminCard
        title="داشبورد کلینیک"
        description="خلاصه وضعیت نوبت‌ها، محتوای سایت و پیشرفت پروژه راه‌اندازی."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-300"
            >
              <p className={`inline-flex rounded-xl px-3 py-1 text-xs font-bold ${card.tone}`}>{card.label}</p>
              <p className="mt-3 text-3xl font-extrabold text-slate-900">{toFaDigits(card.value)}</p>
            </Link>
          ))}
        </div>
      </AdminCard>

      <AdminCard
        title="پیشرفت پروژه راه‌اندازی سایت"
        description={`${toFaDigits(doneTasks)} از ${toFaDigits(tasks.length)} وظیفه تکمیل شده است.`}
        action={
          <Link href="/admin/flow" className="text-xs font-bold text-brand-700 hover:underline">
            مدیریت جریان کاری →
          </Link>
        }
      >
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm font-bold text-slate-700">{toFaDigits(progress)}٪ تکمیل</p>
        <ul className="mt-5 grid gap-2">
          {tasks
            .filter((task) => task.status !== "done")
            .slice(0, 4)
            .map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm">
                <span className="font-bold text-slate-700">{task.title}</span>
                <StatusPill status={task.status} />
              </li>
            ))}
        </ul>
      </AdminCard>

      <AdminCard
        title="آخرین درخواست‌های نوبت"
        description="فهرست ۵ درخواست آخر ثبت‌شده از فرم سایت."
        action={
          <Link href="/admin/appointments" className="text-xs font-bold text-brand-700 hover:underline">
            همه نوبت‌ها →
          </Link>
        }
      >
        {appointments.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            هنوز درخواستی ثبت نشده است. با انتشار لینک رزرو نوبت، درخواست‌ها اینجا نمایش داده می‌شوند.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="p-2 text-start">بیمار</th>
                  <th className="p-2 text-start">تماس</th>
                  <th className="p-2 text-start">خدمت</th>
                  <th className="p-2 text-start">زمان درخواست</th>
                  <th className="p-2 text-start">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="p-2 font-bold text-slate-800">{item.fullName}</td>
                    <td className="p-2" dir="ltr">
                      {item.phone}
                    </td>
                    <td className="p-2 text-slate-600">{item.serviceSlug ?? "مشاوره"}</td>
                    <td className="p-2 text-slate-600">
                      {item.preferredDate} · {item.preferredTime ?? "-"}
                    </td>
                    <td className="p-2">
                      <StatusPill status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-4 text-xs text-slate-400">
          آخرین به‌روزرسانی: {formatDateTime(new Date())}
        </p>
      </AdminCard>
    </div>
  );
}
