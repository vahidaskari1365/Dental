import Link from "next/link";
import { deleteAppointmentAction, updateAppointmentStatusAction } from "../actions";
import { AdminButton, AdminCard, Notice, StatusPill } from "@/components/admin/ui";
import { getAppointments } from "@/lib/data";
import { STATUS_LABELS, formatDateTime, toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FILTERS = [
  { value: "", label: "همه" },
  { value: "pending", label: "در انتظار تماس" },
  { value: "confirmed", label: "تأیید شده" },
  { value: "done", label: "انجام شد" },
  { value: "canceled", label: "لغو شده" },
];

export default async function AdminAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; updated?: string; deleted?: string }>;
}) {
  const { status, updated, deleted } = await searchParams;
  const all = await getAppointments();
  const filtered = status ? all.filter((item) => item.status === status) : all;

  return (
    <div className="grid gap-6">
      {updated ? <Notice kind="success">وضعیت نوبت با موفقیت به‌روزرسانی شد.</Notice> : null}
      {deleted ? <Notice kind="success">درخواست نوبت حذف شد.</Notice> : null}

      <AdminCard
        title="مدیریت نوبت‌ها"
        description={`${toFaDigits(filtered.length)} درخواست نمایش داده می‌شود. برای تغییر وضعیت از دکمه‌های ردیف استفاده کنید.`}
      >
        <div className="mb-5 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Link
              key={filter.value || "all"}
              href={filter.value ? `/admin/appointments?status=${filter.value}` : "/admin/appointments"}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                (status ?? "") === filter.value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
            درخواستی با این وضعیت وجود ندارد.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="p-2 text-start">کد</th>
                  <th className="p-2 text-start">بیمار</th>
                  <th className="p-2 text-start">تماس</th>
                  <th className="p-2 text-start">خدمت</th>
                  <th className="p-2 text-start">تاریخ و ساعت</th>
                  <th className="p-2 text-start">یادداشت</th>
                  <th className="p-2 text-start">ثبت</th>
                  <th className="p-2 text-start">وضعیت</th>
                  <th className="p-2 text-start">اقدام</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 align-top">
                    <td className="p-2 font-mono text-xs text-slate-400">
                      {toFaDigits(String(item.id).padStart(5, "0"))}
                    </td>
                    <td className="p-2 font-bold text-slate-800">{item.fullName}</td>
                    <td className="p-2" dir="ltr">
                      <a href={`tel:${item.phone}`} className="text-brand-700 hover:underline">
                        {item.phone}
                      </a>
                    </td>
                    <td className="p-2 text-slate-600">{item.serviceSlug ?? "مشاوره"}</td>
                    <td className="p-2 text-slate-600">
                      <span dir="ltr" className="block text-xs">
                        {item.preferredDate}
                      </span>
                      <span className="text-xs text-slate-400">{item.preferredTime ?? "-"}</span>
                    </td>
                    <td className="max-w-48 p-2 text-xs leading-6 text-slate-500">{item.note ?? "-"}</td>
                    <td className="p-2 text-xs text-slate-400">{formatDateTime(item.createdAt)}</td>
                    <td className="p-2">
                      <StatusPill status={item.status} />
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1.5">
                        {(["confirmed", "done", "canceled", "pending"] as const).map((next) => (
                          <form key={next} action={updateAppointmentStatusAction}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="status" value={next} />
                            <AdminButton tone="soft" size="sm">
                              {STATUS_LABELS[next]}
                            </AdminButton>
                          </form>
                        ))}
                        <form action={deleteAppointmentAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <AdminButton tone="danger" size="sm">
                            حذف
                          </AdminButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
