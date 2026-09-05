import Image from "next/image";
import Link from "next/link";
import { CheckIcon, ShieldIcon, SpeedIcon, ToothIcon } from "@/components/icons";
import { JsonLd, PageHero, Section, SectionHeading, Stat } from "@/components/ui";
import { getSettings } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { toFaDigits } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "درباره کلینیک مهرادنت | ۱۸ سال تجربه دندانپزشکی در تهران",
  description:
    "کلینیک دندانپزشکی مهرادنت با ۹ یونیت مجزا، تیم متخصص بورد‌دار، تجهیزات دیجیتال و پروتکل کنترل عفونت در سعادت‌آباد تهران. با ما آشنا شوید.",
  path: "/about",
  keywords: ["درباره کلینیک دندانپزشکی", "مهرادنت", "دندانپزشکی سعادت آباد"],
});

const TIMELINE = [
  { year: "۱۳۸۷", title: "شروع با یک یونیت", text: "دکتر محمدی مطب خود را در سعادت‌آباد با تمرکز بر ترمیمی و زیبایی آغاز کرد." },
  { year: "۱۳۹۲", title: "راه‌اندازی بخش جراحی", text: "افزودن اتاق جراحی مجزا و شروع خدمات ایمپلنت با گاید دیجیتال." },
  { year: "۱۳۹۷", title: "بخش ارتودنسی و کودکان", text: "تشکیل تیم ارتودنسی و طراحی فضای کودکان برای درمان بدون ترس." },
  { year: "۱۴۰۳", title: "کلینیک دیجیتال", text: "اسکنر اینترااورال، چاپ سه‌بعدی و پرونده دیجیتال برای همه بیماران." },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "درباره کلینیک", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="از ۱۳۸۷ تا امروز"
        title={`درباره ${settings.clinicName}`}
        description="ما باور داریم دندانپزشکی خوب، دندانپزشکی قابل پیش‌بینی است: تشخیص شفاف، درمان بدون درد و هزینه‌ای که از قبل می‌دانید."
        breadcrumb={
          <nav className="text-sm text-brand-200" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">درباره کلینیک</span>
          </nav>
        }
      />

      <Section tone="aurora">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-cream-200 shadow-[0_30px_60px_-30px_rgba(16,63,64,0.45)]">
            <Image
              src="/images/hero-clinic.jpg"
              alt="فضای پذیرش کلینیک دندانپزشکی مهرادنت"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="start"
              eyebrow="داستان ما"
              title="کلینیکی که برای آرامش بیمار طراحی شده"
              description="از لحظه ورود، همه چیز برای کاهش اضطراب طراحی شده: فضای آرام، پذیرش بدون معطلی، توضیح کامل مراحل درمان و بی‌حسی مؤثر."
            />
            <p className="leading-9 text-ink-700">
              مهرادنت امروز ۹ یونیت مجزا، اتاق جراحی اختصاصی، بخش ارتودنسی و فضای کودکان دارد. تمام ابزار در اتوکلاو
              کلاس B استریل و در پک اختصاصی هر بیمار تحویل می‌شود. پرونده شما دیجیتال است؛ رادیوگرافی، عکس‌های
              درمان و پلن هزینه همیشه در دسترس خودتان است.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat value={`${toFaDigits(18)}`} label="سال سابقه" />
              <Stat value={`${toFaDigits(9)}`} label="یونیت درمان" />
              <Stat value={`${toFaDigits(4)}`} label="متخصص بورد‌دار" />
              <Stat value={`${toFaDigits(2400)}+`} label="بیمار" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeading eyebrow="مسیر رشد" title="از یک مطب کوچک تا کلینیک تخصصی" />
        <ol className="grid gap-6 md:grid-cols-4">
          {TIMELINE.map((item) => (
            <li key={item.year} className="surface-card p-6">
              <span className="text-2xl font-extrabold text-brand-300">{item.year}</span>
              <h3 className="mt-3 font-extrabold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-700">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="gradient">
        <SectionHeading
          eyebrow="ارزش‌های ما"
          title="چهار اصلی که تغییر نمی‌کند"
          description="این اصول در جلسات ماهانه تیم بازبینی و برای هر پزشک و پرسنل الزامی است."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <ToothIcon className="h-6 w-6" />, title: "شفافیت تشخیص", text: "هر بیمار عکس و رادیوگرافی خود را می‌بیند و گزینه‌های درمان را با هزینه می‌شنود." },
            { icon: <ShieldIcon className="h-6 w-6" />, title: "ایمنی بی‌تعارف", text: "کنترل عفونت با اتوکلاو کلاس B و پک اختصاصی، بدون استثنا." },
            { icon: <SpeedIcon className="h-6 w-6" />, title: "وقت شما ارزشمند است", text: "زمان‌بندی واقع‌بینانه؛ اگر تأخیر بیش از ۱۵ دقیقه شد، جلسه بعدی رایگان." },
            { icon: <CheckIcon className="h-6 w-6" />, title: "پیگیری پس از درمان", text: "تماس پیگیری در ۴۸ ساعت اول و کنترل ۶ ماهه برای همه بیماران." },
          ].map((value) => (
            <div key={value.title} className="surface-card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                {value.icon}
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-brand-950">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-700">{value.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="surface-card grid items-center gap-8 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-12">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-950 md:text-3xl">
              اولین قدم، یک معاینه رایگان است
            </h2>
            <p className="mt-4 leading-9 text-ink-700">
              در جلسه معاینه، وضعیت دهان و دندان‌های شما بررسی می‌شود، رادیوگرافی در صورت نیاز انجام می‌گیرد و پلن
              درمان کتبی با برآورد هزینه دریافت می‌کنید. هیچ الزامی برای شروع درمان در همان جلسه نیست.
            </p>
          </div>
          <div className="grid gap-3">
            <Link href="/appointment" className="btn-primary w-full">
              رزرو معاینه رایگان
            </Link>
            <a href={`tel:${settings.phone}`} className="btn-ghost w-full" dir="ltr">
              {settings.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
