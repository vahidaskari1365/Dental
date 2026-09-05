import Link from "next/link";
import { AppointmentForm } from "@/components/appointment-form";
import { CheckIcon, ClockIcon, PhoneIcon, ShieldIcon } from "@/components/icons";
import { Accordion, JsonLd, PageHero, Section, SectionHeading } from "@/components/ui";
import { getServices, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { TIME_SLOTS } from "@/lib/site";
import { toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "رزرو نوبت آنلاین دندانپزشکی | مهرادنت تهران",
  description:
    "نوبت‌دهی آنلاین کلینیک دندانپزشکی مهرادنت در سعادت‌آباد تهران. فرم کوتاه با حداقل فیلد، تأیید تلفنی در کمتر از ۲ ساعت کاری، معاینه اولیه رایگان.",
  path: "/appointment",
  keywords: ["نوبت دندانپزشکی", "رزرو آنلاین نوبت دکتر دندان", "نوبت دهی آنلاین دندانپزشکی تهران"],
});

const STEPS = [
  { title: "فرم را پر کنید", text: "حدود ۳۰ ثانیه زمان می‌برد؛ فقط نام، شماره و زمان دلخواه." },
  { title: "تأیید تلفنی", text: "پذیرش تا ۲ ساعت کاری بعد تماس می‌گیرد و ساعت دقیق را قطعی می‌کند." },
  { title: "معاینه و پلن درمان", text: "معاینه رایگان، رادیوگرافی در صورت نیاز و برآورد کتبی هزینه." },
];

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; note?: string }>;
}) {
  const { service } = await searchParams;
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "رزرو نوبت", path: "/appointment" },
        ])}
      />

      <PageHero
        eyebrow="تأیید در کمتر از ۲ ساعت کاری"
        title="رزرو نوبت آنلاین"
        description={`فرم نوبت‌دهی با حداقل فیلد طراحی شده است. برای اورژانس همین حالا با ${settings.phone2} تماس بگیرید.`}
        breadcrumb={
          <nav className="text-sm text-brand-200" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">رزرو نوبت</span>
          </nav>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading
              align="start"
              eyebrow="فرم نوبت‌دهی"
              title="اطلاعات خود را وارد کنید"
              description="اطلاعات شما محرمانه است و فقط برای هماهنگی نوبت استفاده می‌شود."
            />
            <AppointmentForm
              services={services.map((item) => ({ slug: item.slug, title: item.title }))}
              timeSlots={TIME_SLOTS}
              phone={settings.phone}
              defaultService={service}
            />
          </div>

          <aside className="grid gap-6">
            <div className="surface-card p-6">
              <h3 className="text-lg font-extrabold text-brand-950">مسیر نوبت‌گیری</h3>
              <ol className="mt-5 grid gap-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-extrabold text-white">
                      {toFaDigits(index + 1)}
                    </span>
                    <span>
                      <span className="block font-bold text-brand-950">{step.title}</span>
                      <span className="mt-1 block text-sm leading-7 text-ink-700">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-extrabold text-brand-950">تماس مستقیم</h3>
              <ul className="mt-4 grid gap-3 text-sm">
                <li>
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 rounded-xl bg-brand-50 p-3">
                    <PhoneIcon className="h-5 w-5 text-brand-600" />
                    <span dir="ltr" className="font-bold text-brand-800">
                      {settings.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${settings.phone2}`} className="flex items-center gap-3 rounded-xl bg-brand-50 p-3">
                    <PhoneIcon className="h-5 w-5 text-brand-600" />
                    <span dir="ltr" className="font-bold text-brand-800">
                      {settings.phone2}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-sand-50 p-3 text-sand-600">
                  <ClockIcon className="mt-0.5 h-5 w-5" />
                  <span className="grid gap-1 text-xs leading-6">
                    <span>{settings.workingHoursWeek}</span>
                    <span>{settings.workingHoursThu}</span>
                    <span>{settings.workingHoursFri}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-brand-50 p-3 text-xs leading-6 text-ink-700">
                  <ShieldIcon className="mt-0.5 h-5 w-5 text-brand-600" />
                  ارسال اطلاعات روی بستر امن HTTPS انجام می‌شود.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="قبل از مراجعه"
          title="سؤالات رایج نوبت‌دهی"
          description="اگر پاسخ سؤال شما اینجا نبود، از چت آنلاین پایین صفحه بپرسید."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion
            items={[
              {
                question: "چه مدت قبل باید نوبت بگیرم؟",
                answer:
                  "برای معاینه و خدمات ترمیمی معمولاً ۲ تا ۵ روز کاری. برای جراحی ایمپلنت و مشاوره ارتودنسی حدود ۱ هفته. اورژانس در همان روز پذیرش می‌شود.",
              },
              {
                question: "چه چیزهایی را همراه بیاورم؟",
                answer:
                  "کارت ملی، رادیوگرافی‌های قبلی (در صورت وجود)، لیست داروهای مصرفی و کارت بیمه تکمیلی. اگر درمان ریشه داشته‌اید، فایل رادیوگرافی دیجیتال مفید است.",
              },
              {
                question: "اگر نتوانم در ساعت نوبت حاضر شوم؟",
                answer:
                  "تا ۴ ساعت قبل با پذیرش تماس بگیرید تا زمان به بیمار بعدی داده شود و برای شما ساعت جدید هماهنگ شود.",
              },
              {
                question: "آیا برای کودکان نوبت جداگانه لازم است؟",
                answer:
                  "بله، بخش کودکان زمان‌بندی جداگانه دارد تا فضای انتظار آرام بماند. در فرم نوبت، در بخش توضیحات سن کودک را ذکر کنید.",
              },
              {
                question: "پرداخت چگونه انجام می‌شود؟",
                answer: "نقدی، کارت‌خوان، کارت به کارت و قرارداد اقساطی برای درمان‌های بزرگ. بیمه تکمیلی نیز تسویه می‌شود.",
              },
            ]}
          />
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-500">
          <CheckIcon className="h-4 w-4 text-brand-500" />
          بیش از {toFaDigits(2400)} بیمار تا امروز در مهرادنت درمان شده‌اند.
        </p>
      </Section>
    </>
  );
}
