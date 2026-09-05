import { saveSettingsAction } from "../actions";
import { AdminButton, AdminCard, Field, Notice } from "@/components/admin/ui";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const settings = await getSettings();

  return (
    <div className="grid gap-6">
      {saved ? <Notice kind="success">تنظیمات ذخیره شد و در تمام صفحات سایت اعمال گردید.</Notice> : null}

      <form action={saveSettingsAction} className="grid gap-6">
        <AdminCard title="اطلاعات کلینیک" description="این اطلاعات در هدر، فوتر، نقشه و اسکیمای سئو استفاده می‌شود.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="نام کامل کلینیک" name="clinicName" defaultValue={settings.clinicName} />
            <Field label="نام کوتاه (لوگو)" name="clinicShortName" defaultValue={settings.clinicShortName} />
            <Field label="شعار کلینیک" name="tagline" defaultValue={settings.tagline} />
            <Field label="کد تأیید گوگل سرچ کنسول" name="googleVerification" defaultValue={settings.googleVerification} dir="ltr" hint="مقدار content متاتگ google-site-verification" />
            <Field label="آدرس کامل" name="address" defaultValue={settings.address} rows={2} className="md:col-span-2" />
            <Field label="کد پستی" name="postalCode" defaultValue={settings.postalCode} dir="ltr" />
            <Field label="آدرس دامنه سایت" name="siteUrl" defaultValue={settings.siteUrl} dir="ltr" hint="برای نقشه سایت و canonical استفاده می‌شود." />
          </div>
        </AdminCard>

        <AdminCard title="راه‌های ارتباطی">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="تلفن پذیرش" name="phone" defaultValue={settings.phone} dir="ltr" />
            <Field label="تلفن دوم / اورژانس" name="phone2" defaultValue={settings.phone2} dir="ltr" />
            <Field label="شماره واتس‌اپ (با 98)" name="whatsapp" defaultValue={settings.whatsapp} dir="ltr" />
            <Field label="ایمیل" name="email" defaultValue={settings.email} dir="ltr" />
            <Field label="لینک اینستاگرام" name="instagram" defaultValue={settings.instagram} dir="ltr" />
            <Field label="لینک تلگرام" name="telegram" defaultValue={settings.telegram} dir="ltr" />
          </div>
        </AdminCard>

        <AdminCard title="ساعات کاری و اورژانس">
          <div className="grid gap-4">
            <Field label="شنبه تا چهارشنبه" name="workingHoursWeek" defaultValue={settings.workingHoursWeek} />
            <Field label="پنجشنبه" name="workingHoursThu" defaultValue={settings.workingHoursThu} />
            <Field label="جمعه" name="workingHoursFri" defaultValue={settings.workingHoursFri} />
            <Field label="یادداشت اورژانس" name="emergencyNote" defaultValue={settings.emergencyNote} rows={2} />
          </div>
        </AdminCard>

        <AdminCard title="نقشه گوگل" description="لینک embed نقشه را از گوگل مپ (Share → Embed a map) کپی کنید.">
          <div className="grid gap-4">
            <Field label="لینک embed نقشه" name="mapEmbedUrl" defaultValue={settings.mapEmbedUrl} dir="ltr" rows={3} />
            <Field label="لینک مسیریابی" name="mapLink" defaultValue={settings.mapLink} dir="ltr" />
          </div>
        </AdminCard>

        <div className="flex flex-wrap items-center gap-3">
          <AdminButton>ذخیره همه تنظیمات</AdminButton>
          <p className="text-xs text-slate-400">
            پس از ذخیره، هدر، فوتر، صفحه تماس و داده ساختاریافته به‌روزرسانی می‌شوند.
          </p>
        </div>
      </form>
    </div>
  );
}
