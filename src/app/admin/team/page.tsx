import Image from "next/image";
import { deleteTeamAction, saveTeamAction } from "../actions";
import { AdminButton, AdminCard, Field, ToggleField } from "@/components/admin/ui";
import { getTeamMembers } from "@/lib/data";
import { toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

function TeamForm({ editing }: { editing?: Awaited<ReturnType<typeof getTeamMembers>>[number] }) {
  return (
    <form action={saveTeamAction} className="grid gap-4">
      {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="نام پزشک" name="name" defaultValue={editing?.name} required />
        <Field label="نامک (slug)" name="slug" defaultValue={editing?.slug} dir="ltr" />
        <Field label="عنوان شغلی" name="role" defaultValue={editing?.role} required placeholder="متخصص ارتودنسی" />
        <Field label="زیرتخصص" name="specialty" defaultValue={editing?.specialty} />
        <Field label="سابقه (سال)" name="experienceYears" type="number" defaultValue={editing?.experienceYears ?? 5} />
        <Field label="ترتیب نمایش" name="sortOrder" type="number" defaultValue={editing?.sortOrder ?? 10} />
        <Field
          label="آدرس تصویر"
          name="imageUrl"
          defaultValue={editing?.imageUrl ?? "/images/team/doctor-1.jpg"}
          dir="ltr"
          hint="تصاویر آماده: /images/team/doctor-1.jpg تا doctor-4.jpg"
        />
        <ToggleField label="نمایش در سایت" name="isActive" defaultChecked={editing?.isActive ?? true} />
      </div>
      <Field label="معرفی کوتاه" name="bio" defaultValue={editing?.bio} rows={4} />
      <AdminButton>{editing ? "ذخیره تغییرات" : "افزودن عضو تیم"}</AdminButton>
    </form>
  );
}

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; saved?: string; deleted?: string }>;
}) {
  const { edit, saved, deleted } = await searchParams;
  const members = await getTeamMembers(false);
  const editing = edit ? members.find((member) => member.id === Number(edit)) : undefined;

  return (
    <div className="grid gap-6">
      {saved ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">عضو تیم ذخیره شد.</p> : null}
      {deleted ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">عضو تیم حذف شد.</p> : null}

      <AdminCard title="تیم پزشکی" description={`${toFaDigits(members.length)} عضو ثبت شده است.`}>
        <div className="grid gap-4 md:grid-cols-2">
          {members.map((member) => (
            <div key={member.id} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={member.imageUrl ?? "/images/team/doctor-1.jpg"}
                  alt={member.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-slate-800">{member.name}</p>
                <p className="text-xs font-bold text-brand-700">{member.role}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {toFaDigits(member.experienceYears)} سال سابقه ·{" "}
                  {member.isActive ? "فعال" : "غیرفعال"}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <a
                    href={`/admin/team?edit=${member.id}`}
                    className="rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800 transition hover:bg-brand-100"
                  >
                    ویرایش
                  </a>
                  <form action={deleteTeamAction}>
                    <input type="hidden" name="id" value={member.id} />
                    <AdminButton tone="danger" size="sm">
                      حذف
                    </AdminButton>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard
        title={editing ? `ویرایش: ${editing.name}` : "افزودن عضو جدید"}
        description="اعضای تیم در صفحه تیم پزشکی و صفحه اصلی نمایش داده می‌شوند."
        action={
          editing ? (
            <a href="/admin/team" className="text-xs font-bold text-slate-500 hover:underline">
              انصراف از ویرایش
            </a>
          ) : null
        }
      >
        {editing ? <TeamForm editing={editing} /> : (
          <details>
            <summary className="mb-4 w-fit cursor-pointer rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700">
              نمایش فرم عضو جدید
            </summary>
            <TeamForm />
          </details>
        )}
      </AdminCard>
    </div>
  );
}
