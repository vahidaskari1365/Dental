import Image from "next/image";
import { deleteGalleryAction, saveGalleryAction } from "../actions";
import { AdminButton, AdminCard, Field, ToggleField } from "@/components/admin/ui";
import { getGalleryCases } from "@/lib/data";
import { toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

function GalleryForm({ editing }: { editing?: Awaited<ReturnType<typeof getGalleryCases>>[number] }) {
  return (
    <form action={saveGalleryAction} className="grid gap-4">
      {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="عنوان مورد درمانی" name="title" defaultValue={editing?.title} required />
        <Field label="دسته‌بندی" name="category" defaultValue={editing?.category ?? "زیبایی"} />
        <Field
          label="تصویر قبل"
          name="beforeUrl"
          defaultValue={editing?.beforeUrl ?? "/images/gallery/case-1-before.jpg"}
          dir="ltr"
        />
        <Field
          label="تصویر بعد"
          name="afterUrl"
          defaultValue={editing?.afterUrl ?? "/images/gallery/case-1-after.jpg"}
          dir="ltr"
        />
        <Field label="پزشک درمانگر" name="doctorName" defaultValue={editing?.doctorName} />
        <Field label="مدت درمان" name="durationText" defaultValue={editing?.durationText} placeholder="یک جلسه / ۱۴ ماه" />
        <Field label="ترتیب نمایش" name="sortOrder" type="number" defaultValue={editing?.sortOrder ?? 10} />
        <ToggleField label="نمایش در سایت" name="isActive" defaultChecked={editing?.isActive ?? true} />
      </div>
      <Field label="توضیح کوتاه" name="description" defaultValue={editing?.description} rows={3} />
      <AdminButton>{editing ? "ذخیره تغییرات" : "افزودن مورد"}</AdminButton>
    </form>
  );
}

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; saved?: string; deleted?: string }>;
}) {
  const { edit, saved, deleted } = await searchParams;
  const cases = await getGalleryCases(false);
  const editing = edit ? cases.find((item) => item.id === Number(edit)) : undefined;

  return (
    <div className="grid gap-6">
      {saved ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">مورد درمانی ذخیره شد.</p> : null}
      {deleted ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">مورد درمانی حذف شد.</p> : null}

      <AdminCard
        title="گالری قبل و بعد"
        description={`${toFaDigits(cases.length)} مورد ثبت شده است. تصاویر را در پوشه public/images/gallery قرار دهید و آدرس را اینجا وارد کنید.`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex gap-2">
                <div className="relative h-24 w-1/2 overflow-hidden rounded-xl">
                  <Image src={item.beforeUrl} alt={`${item.title} قبل`} fill sizes="200px" className="object-cover" />
                  <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 text-[10px] text-white">قبل</span>
                </div>
                <div className="relative h-24 w-1/2 overflow-hidden rounded-xl">
                  <Image src={item.afterUrl} alt={`${item.title} بعد`} fill sizes="200px" className="object-cover" />
                  <span className="absolute bottom-1 right-1 rounded bg-brand-600/90 px-1.5 text-[10px] text-white">بعد</span>
                </div>
              </div>
              <p className="mt-3 font-extrabold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500">
                {item.category} · {item.durationText ?? "-"} · {item.isActive ? "فعال" : "غیرفعال"}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <a
                  href={`/admin/gallery?edit=${item.id}`}
                  className="rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800 transition hover:bg-brand-100"
                >
                  ویرایش
                </a>
                <form action={deleteGalleryAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <AdminButton tone="danger" size="sm">
                    حذف
                  </AdminButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard
        title={editing ? `ویرایش: ${editing.title}` : "افزودن مورد جدید"}
        action={
          editing ? (
            <a href="/admin/gallery" className="text-xs font-bold text-slate-500 hover:underline">
              انصراف از ویرایش
            </a>
          ) : null
        }
      >
        {editing ? <GalleryForm editing={editing} /> : (
          <details>
            <summary className="mb-4 w-fit cursor-pointer rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700">
              نمایش فرم مورد جدید
            </summary>
            <GalleryForm />
          </details>
        )}
      </AdminCard>
    </div>
  );
}
