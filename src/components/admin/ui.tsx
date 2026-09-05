import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminCard({
  title,
  description,
  children,
  action,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {title ? (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
  hint,
  dir,
  rows,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  dir?: "rtl" | "ltr";
  rows?: number;
  className?: string;
}) {
  const base =
    "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white";
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-bold text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      {rows ? (
        <textarea
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={rows}
          placeholder={placeholder}
          dir={dir}
          className={base}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          dir={dir}
          required={required}
          className={base}
        />
      )}
      {hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: Array<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-bold text-slate-700">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? options[0]?.value ?? ""}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ToggleField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm font-bold text-slate-700">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-teal-600" />
      {label}
    </label>
  );
}

export function AdminButton({
  children,
  tone = "primary",
  size = "md",
  type = "submit",
}: {
  children: ReactNode;
  tone?: "primary" | "ghost" | "danger" | "soft";
  size?: "sm" | "md";
  type?: "submit" | "button";
}) {
  const tones = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    ghost: "border border-slate-200 bg-white text-slate-700 hover:border-brand-300",
    soft: "bg-brand-50 text-brand-800 hover:bg-brand-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl font-bold transition",
        tones[tone],
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
      )}
    >
      {children}
    </button>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    done: "bg-teal-50 text-teal-700 border-teal-200",
    canceled: "bg-rose-50 text-rose-700 border-rose-200",
    todo: "bg-slate-100 text-slate-600 border-slate-200",
    doing: "bg-sky-50 text-sky-700 border-sky-200",
    blocked: "bg-rose-50 text-rose-700 border-rose-200",
  };
  const labels: Record<string, string> = {
    pending: "در انتظار تماس",
    confirmed: "تأیید شده",
    done: "انجام شد",
    canceled: "لغو شد",
    todo: "انجام نشده",
    doing: "در حال انجام",
    blocked: "مسدود",
  };
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-bold", map[status] ?? map.todo)}>
      {labels[status] ?? status}
    </span>
  );
}

export function Notice({ kind, children }: { kind: "success" | "error"; children: ReactNode }) {
  return (
    <p
      className={cn(
        "mb-6 rounded-xl border p-4 text-sm font-bold",
        kind === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700",
      )}
    >
      {children}
    </p>
  );
}
