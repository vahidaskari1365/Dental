"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<{ error?: string } | null, FormData>(
    loginAction,
    null,
  );

  return (
    <form action={formAction} className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-extrabold text-white">
          م
        </span>
        <h1 className="mt-4 text-xl font-extrabold text-slate-900">ورود به پنل مدیریت</h1>
        <p className="mt-1 text-sm text-slate-500">کلینیک دندانپزشکی مهرادنت</p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold text-slate-700">رمز عبور مدیر</span>
        <input
          name="password"
          type="password"
          required
          dir="ltr"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
        />
      </label>

      {state?.error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-600">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-extrabold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "در حال بررسی..." : "ورود به پنل"}
      </button>

      <p className="mt-5 text-center text-xs leading-6 text-slate-400">
        رمز پیش‌فرض نسخه نمایشی: <span dir="ltr" className="font-bold text-slate-600">mehrdent</span>
        <br />
        برای تغییر، متغیر محیطی <span dir="ltr">ADMIN_PASSWORD</span> را تنظیم کنید.
      </p>
    </form>
  );
}
