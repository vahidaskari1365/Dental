import { deleteTaskAction, saveTaskAction, updateTaskStatusAction } from "../actions";
import { AdminButton, AdminCard, Field, Notice, SelectField, StatusPill } from "@/components/admin/ui";
import { getTasks } from "@/lib/data";
import { toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = [
  { value: "todo", label: "انجام نشده" },
  { value: "doing", label: "در حال انجام" },
  { value: "done", label: "انجام شد" },
  { value: "blocked", label: "مسدود" },
];

export default async function AdminFlowPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; updated?: string; deleted?: string }>;
}) {
  const { saved, updated, deleted } = await searchParams;
  const tasks = await getTasks();
  const phases = Array.from(new Set(tasks.map((task) => task.phase)));
  const done = tasks.filter((task) => task.status === "done").length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="grid gap-6">
      {saved ? <Notice kind="success">وظیفه ذخیره شد.</Notice> : null}
      {updated ? <Notice kind="success">وضعیت وظیفه تغییر کرد.</Notice> : null}
      {deleted ? <Notice kind="success">وظیفه حذف شد.</Notice> : null}

      <AdminCard
        title="جریان کاری پروژه (Workflow)"
        description="مدلِ ردیابی وظایف با فاز، مسئول و وضعیت — نمای کلی پیشرفت راه‌اندازی و پشتیبانی سایت."
      >
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm font-extrabold text-slate-700">
            {toFaDigits(progress)}٪ ({toFaDigits(done)} از {toFaDigits(tasks.length)})
          </p>
        </div>

        <div className="grid gap-6">
          {phases.map((phase) => {
            const phaseTasks = tasks.filter((task) => task.phase === phase);
            const phaseDone = phaseTasks.filter((task) => task.status === "done").length;
            return (
              <div key={phase} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-extrabold text-slate-800">{phase}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {toFaDigits(phaseDone)} / {toFaDigits(phaseTasks.length)}
                  </span>
                </div>
                <ul className="grid gap-3">
                  {phaseTasks.map((task) => (
                    <li key={task.id} className="rounded-xl bg-slate-50 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800">{task.title}</p>
                          {task.description ? (
                            <p className="mt-1 text-sm leading-7 text-slate-600">{task.description}</p>
                          ) : null}
                          <p className="mt-2 text-xs text-slate-400">مسئول: {task.owner}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <StatusPill status={task.status} />
                          <div className="flex flex-wrap justify-end gap-1.5">
                            {STATUSES.filter((status) => status.value !== task.status).map((status) => (
                              <form key={status.value} action={updateTaskStatusAction}>
                                <input type="hidden" name="id" value={task.id} />
                                <input type="hidden" name="status" value={status.value} />
                                <AdminButton tone="soft" size="sm">
                                  {status.label}
                                </AdminButton>
                              </form>
                            ))}
                            <form action={deleteTaskAction}>
                              <input type="hidden" name="id" value={task.id} />
                              <AdminButton tone="danger" size="sm">
                                حذف
                              </AdminButton>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </AdminCard>

      <AdminCard title="افزودن وظیفه جدید" description="برای پیگیری کارهای پشتیبانی و توسعه‌های بعدی استفاده کنید.">
        <details>
          <summary className="mb-4 w-fit cursor-pointer rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700">
            نمایش فرم وظیفه
          </summary>
          <form action={saveTaskAction} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="عنوان وظیفه" name="title" required />
              <Field label="فاز" name="phase" defaultValue={phases[0] ?? "فاز ۱ · راه‌اندازی"} />
              <Field label="مسئول" name="owner" defaultValue="تیم فنی" />
              <SelectField label="وضعیت" name="status" options={STATUSES} />
              <Field label="ترتیب" name="sortOrder" type="number" defaultValue={tasks.length + 1} />
            </div>
            <Field label="توضیح" name="description" rows={3} />
            <AdminButton>افزودن وظیفه</AdminButton>
          </form>
        </details>
      </AdminCard>
    </div>
  );
}
