"use client";

import { useState } from "react";
import { CalendarIcon, CheckIcon, PhoneIcon } from "./icons";
import { isValidIranPhone, toFaDigits } from "@/lib/utils";

type Props = {
  services: Array<{ slug: string; title: string }>;
  timeSlots: string[];
  phone: string;
  defaultService?: string;
};

export function AppointmentForm({ services, timeSlots, phone, defaultService }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      serviceSlug: String(form.get("serviceSlug") ?? ""),
      preferredDate: String(form.get("preferredDate") ?? ""),
      preferredTime: String(form.get("preferredTime") ?? ""),
      note: String(form.get("note") ?? "").trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (payload.fullName.length < 3) nextErrors.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
    if (!isValidIranPhone(payload.phone)) nextErrors.phone = "شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
    if (!payload.preferredDate) nextErrors.preferredDate = "تاریخ مراجعه را انتخاب کنید.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setState("loading");
    setMessage("");
    // نسخه فرانت‌اَند: درخواست به‌صورت محلی ثبت و کد پیگیری ساخته می‌شود.
    const trackingCode = `MD-${String(Date.now()).slice(-6)}`;
    window.setTimeout(() => {
      setState("done");
      setMessage(
        `درخواست شما با کد پیگیری ${toFaDigits(trackingCode)} ثبت شد. برای تأیید نهایی لطفاً با پذیرش ${phone} تماس بگیرید.`,
      );
    }, 700);
  }

  const inputClass =
    "w-full rounded-2xl border border-ink-50 bg-cream-50 px-4 py-3 text-ink-900 outline-none transition focus:border-brand-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]";

  if (state === "done") {
    return (
      <div className="surface-card p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold text-brand-950">نوبت شما ثبت شد</h3>
        <p className="mt-3 text-ink-700">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`tel:${phone}`} className="btn-primary">
            <PhoneIcon className="h-4 w-4" />
            تماس با پذیرش
          </a>
          <button type="button" onClick={() => setState("idle")} className="btn-ghost">
            ثبت نوبت دیگر
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card p-6 md:p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-bold text-brand-900">
            نام و نام خانوادگی <span className="text-red-500">*</span>
          </label>
          <input id="fullName" name="fullName" className={inputClass} placeholder="مثال: زهرا کریمی" autoComplete="name" />
          {errors.fullName ? <p className="mt-2 text-xs font-bold text-red-500">{errors.fullName}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-bold text-brand-900">
            شماره همراه <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            inputMode="tel"
            dir="ltr"
            className={inputClass}
            placeholder="09123456789"
            autoComplete="tel"
          />
          {errors.phone ? <p className="mt-2 text-xs font-bold text-red-500">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="serviceSlug" className="mb-2 block text-sm font-bold text-brand-900">
            نوع خدمت
          </label>
          <select id="serviceSlug" name="serviceSlug" defaultValue={defaultService ?? ""} className={inputClass}>
            <option value="">مشاوره و معاینه (نمی‌دانم)</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="preferredTime" className="mb-2 block text-sm font-bold text-brand-900">
            بازه ساعتی
          </label>
          <select id="preferredTime" name="preferredTime" className={inputClass}>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="preferredDate" className="mb-2 block text-sm font-bold text-brand-900">
            تاریخ پیشنهادی <span className="text-red-500">*</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className={`${inputClass} max-w-xs`}
          />
          {errors.preferredDate ? <p className="mt-2 text-xs font-bold text-red-500">{errors.preferredDate}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="note" className="mb-2 block text-sm font-bold text-brand-900">
            توضیح کوتاه (اختیاری)
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            className={inputClass}
            placeholder="مثلاً: دندان عقل درد گرفته، حساسیت سرما و گرما دارم."
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "loading"} className="btn-primary disabled:opacity-60">
          <CalendarIcon className="h-5 w-5" />
          {state === "loading" ? "در حال ثبت..." : "ثبت درخواست نوبت"}
        </button>
        <p className="text-sm text-ink-500">
          یا تماس مستقیم: <a href={`tel:${phone}`} className="font-bold text-brand-700" dir="ltr">{phone}</a>
        </p>
      </div>

      {state === "error" ? (
        <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">{message}</p>
      ) : null}
      <p className="mt-4 text-xs leading-6 text-ink-500">
        اطلاعات شما فقط برای هماهنگی نوبت استفاده می‌شود و در بستر امن (HTTPS) منتقل می‌گردد.
      </p>
    </form>
  );
}
