import { deleteServiceAction, saveServiceAction } from "../actions";
import { AdminButton, AdminCard, Field, Notice, SelectField, ToggleField } from "@/components/admin/ui";
import { ServiceIcon } from "@/components/icons";
import { getServices } from "@/lib/data";
import { toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ICONS = ["implant", "aligner", "smile", "sparkle", "kids", "root", "gum", "design"];

function ServiceForm({ editing }: { editing?: Awaited<ReturnType<typeof getServices>>[number] }) {
  return (
    <form action={saveServiceAction} className="grid gap-4">
      {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="نام خدمت" name="title" defaultValue={editing?.title} required />
        <Field label="نامک (slug)" name="slug" defaultValue={editing?.slug} dir="ltr" hint="برای آدرس صفحه استفاده می‌شود." />
        <SelectField
          label="آیکون"
          name="icon"
          defaultValue={editing?.icon}
          options={ICONS.map((icon) => ({ value: icon, label: icon }))}
        />
        <Field label="ترتیب نمایش" name="sortOrder" type="number" defaultValue={editing?.sortOrder ?? 10} />
        <Field label="هزینه پایه" name="price" defaultValue={editing?.price} placeholder="از ۲۴,۰۰۰,۰۰۰ تومان" />
        <Field label="مدت درمان" name="duration" defaultValue={editing?.duration} placeholder="۲ جلسه" />
        <Field label="آدرس تصویر" name="imageUrl" defaultValue={editing?.imageUrl ?? "/images/clinic-room.jpg"} dir="ltr" />
        <ToggleField label="نمایش در سایت" name="isActive" defaultChecked={editing?.isActive ?? true} />
      </div>
      <Field label="خلاصه (نمایش در کارت‌ها)" name="summary" defaultValue={editing?.summary} rows={2} required />
      <Field label="توضیح کامل (متن صفحه خدمت)" name="description" defaultValue={editing?.description} rows={6} />
      <Field label="ویژگی‌ها (هر خط یک مورد)" name="features" defaultValue={editing?.features.join("\n")} rows={5} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="عنوان سئو" name="seoTitle" defaultValue={editing?.seoTitle ?? ""} />
        <Field label="توضیح سئو" name="seoDescription" defaultValue={editing?.seoDescription ?? ""} rows={2} />
      </div>
      <AdminButton>{editing ? "ذخیره تغییرات" : "افزودن خدمت"}</AdminButton>
    </form>
  );
}

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; saved?: string; deleted?: string }>;
}) {
  const { edit, saved, deleted } = await searchParams;
  const services = await getServices(false);
  const editing = edit ? services.find((service) => service.id === Number(edit)) : undefined;

  return (
    <div className="grid gap-6">
      {saved ? <Notice kind="success">خدمت ذخیره شد.</Notice> : null}
      {deleted ? <Notice kind="success">خدمت حذف شد.</Notice> : null}

      <AdminCard title="خدمات کلینیک" description={`${toFaDigits(services.length)} خدمت ثبت شده است.`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="p-2 text-start">خدمت</th>
                <th className="p-2 text-start">هزینه</th>
                <th className="p-2 text-start">مدت</th>
                <th className="p-2 text-start">ترتیب</th>
                <th className="p-2 text-start">وضعیت</th>
                <th className="p-2 text-start">اقدام</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-slate-100">
                  <td className="p-2">
                    <span className="flex items-center gap-2 font-bold text-slate-800">
                      <ServiceIcon name={service.icon} className="h-5 w-5 text-brand-600" />
                      {service.title}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-slate-400" dir="ltr">
                      /services/{service.slug}
                    </span>
                  </td>
                  <td className="p-2 text-slate-600">{service.price ?? "-"}</td>
                  <td className="p-2 text-slate-600">{service.duration ?? "-"}</td>
                  <td className="p-2 text-slate-600">{toFaDigits(service.sortOrder)}</td>
                  <td className="p-2 text-xs font-bold">
                    {service.isActive ? (
                      <span className="text-emerald-600">فعال</span>
                    ) : (
                      <span className="text-slate-400">غیرفعال</span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-1.5">
                      <a
                        href={`/admin/services?edit=${service.id}`}
                        className="rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800 transition hover:bg-brand-100"
                      >
                        ویرایش
                      </a>
                      <form action={deleteServiceAction}>
                        <input type="hidden" name="id" value={service.id} />
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
      </AdminCard>

      <AdminCard
        title={editing ? `ویرایش: ${editing.title}` : "افزودن خدمت جدید"}
        description="خدمات روی صفحه اصلی، صفحه خدمات، منوی فوتر و نقشه سایت اثر می‌گذارند."
        action={
          editing ? (
            <a href="/admin/services" className="text-xs font-bold text-slate-500 hover:underline">
              انصراف از ویرایش
            </a>
          ) : null
        }
      >
        {editing ? <ServiceForm editing={editing} /> : (
          <details>
            <summary className="mb-4 w-fit cursor-pointer rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700">
              نمایش فرم خدمت جدید
            </summary>
            <ServiceForm />
          </details>
        )}
      </AdminCard>
    </div>
  );
}
