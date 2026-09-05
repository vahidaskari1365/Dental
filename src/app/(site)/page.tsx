import Image from "next/image";
import Link from "next/link";
import { BeforeAfterCard } from "@/components/before-after";
import {
  ArrowIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  LocationIcon,
  PhoneIcon,
  ServiceIcon,
  ShieldIcon,
  SpeedIcon,
  ToothIcon,
} from "@/components/icons";
import { CountUp, PointerParallax, Reveal, TiltCard } from "@/components/motion";
import {
  Accordion,
  CtaBanner,
  JsonLd,
  Marquee,
  Section,
  SectionHeading,
  Stat,
  Stars,
} from "@/components/ui";
import {
  getGalleryCases,
  getPosts,
  getServices,
  getSettings,
  getTeamMembers,
  getTestimonials,
} from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { TIME_SLOTS } from "@/lib/site";
import { formatFaDate, toFaDigits } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "کلینیک دندانپزشکی مهرادنت | ایمپلنت، ارتودنسی و لمینت در تهران",
  description:
    "کلینیک دندانپزشکی مهرادنت در سعادت‌آباد تهران؛ ایمپلنت با گارانتی، ارتودنسی نامرئی، لمینت سرامیکی، بلیچینگ، درمان ریشه و دندانپزشکی کودکان. نوبت‌دهی آنلاین و مشاوره اولیه رایگان.",
  path: "/",
  keywords: [
    "کلینیک دندانپزشکی تهران",
    "ایمپلنت دندان تهران",
    "ارتودنسی نامرئی قیمت",
    "لمینت دندان",
    "نوبت دندانپزشکی آنلاین",
    "دندانپزشکی سعادت آباد",
  ],
});

const FAQ_ITEMS = [
  {
    question: "چطور می‌توانم نوبت بگیرم؟",
    answer:
      "از صفحه «رزرو نوبت» فرم کوتاه را پر کنید (نام، شماره تماس، نوع خدمت، تاریخ و بازه ساعتی). پذیرش کلینیک تا ۲ ساعت کاری بعد برای تأیید نهایی تماس می‌گیرد. همچنین تماس مستقیم با ۰۲۱-۸۸۷۷۶۶۵۵ ممکن است.",
  },
  {
    question: "هزینه ایمپلنت دندان چقدر است؟",
    answer:
      "هزینه ایمپلنت به برند فیکسچر (کره‌ای، سوئیسی)، نیاز به سینوس‌لیفت یا گرافت استخوان و نوع روکش بستگی دارد. در مهرادنت پس از سی‌تی‌اسکن و معاینه اولیه، برآورد دقیق و پلن مالی شفاف ارائه می‌شود.",
  },
  {
    question: "آیا درمان‌ها قابل پرداخت اقساطی هستند؟",
    answer:
      "بله. ارتودنسی، ایمپلنت و لمینت در قالب قرارداد با پرداخت پیش‌پرداخت و اقساط ماهانه بدون بهره انجام می‌شود. جزئیات در جلسه مشاوره اعلام می‌گردد.",
  },
  {
    question: "ارتودنسی نامرئی برای من مناسب است؟",
    answer:
      "الاینر شفاف برای شلوغی خفیف تا متوسط و بیمارانی که همکاری بالایی دارند بهترین نتیجه را می‌دهد. برای ناهنجاری‌های اسکلتتی شدید، براکت ثابت کنترل بهتری می‌دهد. تشخیص نهایی پس از اسکن سه‌بعدی است.",
  },
  {
    question: "اورژانس دندانپزشکی دارید؟",
    answer:
      "بله. درد شدید، تورم، خونریزی یا ضربه به دندان در اولین بازه خالی همان روز پذیرش می‌شود. در ساعات غیر کاری با شماره ۰۹۱۲-۳۴۵-۶۷۸۹ تماس بگیرید.",
  },
  {
    question: "استریل تجهیزات چگونه انجام می‌شود؟",
    answer:
      "همه ابزار در اتوکلاو کلاس B استریل و در پک‌های یکبار مصرف مهر و موم شده تحویل می‌شوند. یونیت‌ها پس از هر بیمار با محلول‌های سطح‌بالا ضدعفونی می‌شوند.",
  },
];

const MARQUEE_ITEMS = [
  "ایمپلنت با گاید دیجیتال",
  "ارتودنسی نامرئی",
  "لمینت E-max",
  "بلیچینگ آفیس",
  "درمان ریشه یک‌جلسه‌ای",
  "دندانپزشکی کودکان",
  "جراحی لثه",
  "طراحی دیجیتال لبخند",
];

const PROCESS_STEPS = [
  {
    step: "۰",
    title: "رزرو و پذیرش بدون معطلی",
    text: "نوبت آنلاین یا تلفنی؛ پیامک یادآوری یک روز قبل و پذیرش رأس ساعت.",
  },
  {
    step: "۰۲",
    title: "معاینه و تشخیص دیجیتال",
    text: "رادیوگرافی دیجیتال و اسکن اینترااورال؛ نتیجه روی مانیتور کنار شما توضیح داده می‌شود.",
  },
  {
    step: "۰۳",
    title: "پلن درمان کتبی",
    text: "مراحل، مدت زمان و برآورد هزینه به‌صورت مکتب؛ بدون هزینه پنهان در میانه راه.",
  },
  {
    step: "۰۴",
    title: "درمان و پیگیری",
    text: "بی‌حسی مؤثر، جلسه‌های به‌موقع و تماس پیگیری تا ۴۸ ساعت پس از هر جلسه.",
  },
];

export default async function HomePage() {
  const [settings, services, gallery, team, testimonials, posts] = await Promise.all([
    getSettings(),
    getServices(),
    getGalleryCases(),
    getTeamMembers(),
    getTestimonials(),
    getPosts({ limit: 3 }),
  ]);

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((total, item) => total + item.rating, 0) / testimonials.length
      : 5;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "خانه", path: "/" }])} />
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />

      {/* ================================ HERO ================================ */}
      <section className="relative overflow-hidden pt-10 pb-0 md:pt-14">
        {/* بوم سبز با لایه‌های نور و الگوی برگ */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <span className="leaf-pattern absolute inset-0" />
          <span className="aurora start-[6%] top-[-12%] h-[30rem] w-[30rem] bg-mint-300/60" />
          <span
            className="aurora end-[2%] top-[12%] h-[26rem] w-[26rem] bg-sand-300/40"
            style={{ animationDelay: "6s" }}
          />
          <span
            className="aurora start-[42%] bottom-[-18%] h-[24rem] w-[24rem] bg-brand-300/40"
            style={{ animationDelay: "12s" }}
          />
          <span className="grid-lines-dark absolute inset-0 opacity-60" />
          <span className="dots-pattern absolute inset-x-0 bottom-0 h-52 opacity-40" />
        </div>

        <div className="page-shell relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* ستون متن */}
            <div className="animate-float-up text-center lg:text-start">
              <span className="chip-light">
                <span className="anim-dot h-2 w-2 rounded-full bg-brand-500" />
                امروز پذیرش داریم · ۹:۰۰ تا ۲۰:۰۰
              </span>

              <h1 className="display-hero mt-7 text-balance text-ink-900">
                لبخند سالم،
                <span className="mt-1 block">
                  از{" "}
                  <span className="underline-squiggle text-gradient-green">همین هفته</span>{" "}
                  شروع می‌شود
                </span>
              </h1>

              <p className="lede mx-auto mt-7 max-w-xl text-balance lg:mx-0">
                کلینیک {settings.clinicShortName} در سعادت‌آباد تهران — ۹ یونیت مجزا، تشخیص کاملاً
                دیجیتال و تیم متخصص ایمپلنت، ارتودنسی و زیبایی. معاینه اولیه و مشاوره درمان
                رایگان است.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/appointment"
                  className="btn-primary shine !px-9 !py-4 text-base"
                >
                  <CalendarIcon className="h-5 w-5" />
                  رزرو نوبت آنلاین
                </Link>
                <a href={`tel:${settings.phone}`} className="btn-ghost !px-7 !py-4 text-base">
                  <PhoneIcon className="h-5 w-5 text-brand-600" />
                  <span dir="ltr">{settings.phone}</span>
                </a>
              </div>

              {/* نشانگر اعتماد */}
              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8 lg:items-start">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {["ز", "م", "ن", "س"].map((letter, index) => (
                      <span
                        key={letter}
                        className="anim-float -ms-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-mint-100 bg-white text-sm font-black text-brand-700 shadow-mint-sm first:ms-0"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                  <div className="text-start">
                    <Stars rating={Math.round(averageRating)} />
                    <p className="mt-0.5 text-[11px] font-bold text-ink-500">
                      امتیاز {toFaDigits(averageRating.toFixed(1))} از ۵ · بیش از{" "}
                      <CountUp value={2400} suffix="+" /> بیمار
                    </p>
                  </div>
                </div>

                <div className="hidden h-10 w-px bg-mint-300 sm:block" aria-hidden />

                <div className="flex items-center gap-2 rounded-full border border-mint-200 bg-white/85 px-4 py-2 text-[11px] font-black text-ink-900 shadow-mint-sm backdrop-blur">
                  <ShieldIcon className="h-4 w-4 text-brand-600" />
                  اتوکلاو کلاس B · استریل ۱۰۰٪
                </div>
              </div>
            </div>

            {/* ستون تصویر */}
            <div className="animate-float-up delay-1 relative mx-auto w-full max-w-lg lg:max-w-none">
              <PointerParallax strength={8}>
                <div className="relative">
                  <span className="anim-sway absolute -top-8 -start-6 z-10 opacity-90" aria-hidden>
                    <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden>
                      <path d="M10 54C10 30 28 12 54 8c-2 26-16 42-44 46Z" fill="var(--color-brand-400)" opacity="0.85" />
                      <path d="M13 51C26 37 38 25 50 12" fill="none" stroke="var(--color-brand-800)" stroke-opacity="0.35" stroke-width="2.5" stroke-linecap="round" />
                    </svg>
                  </span>
                  <span className="anim-pulse-ring absolute start-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/70" aria-hidden />

                  <div className="media-frame relative aspect-4/5 w-full rounded-[2.2rem] sm:aspect-5/4 lg:aspect-4/5">
                    <Image
                      src="/images/hero-clinic.jpg"
                      alt="اتاق درمان کلینیک دندانپزشکی مهرادنت با تجهیزات دیجیتال"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 44vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night-950/70 to-transparent" aria-hidden />
                    <div className="absolute bottom-4 start-4 rounded-2xl border border-white/50 bg-white/92 p-3.5 text-xs shadow-mint-md backdrop-blur">
                      <p className="font-black text-ink-900">تشخیص دیجیتال، درمان دقیق‌تر</p>
                      <p className="mt-0.5 text-ink-500">رادیوگرافی OPC و اسکنر اینترااورال</p>
                    </div>
                  </div>

                  {/* کارت نوبت آزاد */}
                  <div className="anim-float-card absolute -bottom-8 -start-2 w-44 overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-brand-700 to-night-900 p-4 text-white shadow-mint-lg sm:-start-6">
                    <div className="absolute -end-10 -top-10 h-28 w-28 rounded-full bg-brand-400/40 blur-2xl" aria-hidden />
                    <p className="flex items-center gap-2 text-[10px] font-bold text-mint-200/80">
                      <span className="anim-dot h-2 w-2 rounded-full bg-sand-400" />
                      نوبت‌های آزاد امروز
                    </p>
                    <p className="mt-1.5 text-2xl font-black">{toFaDigits(3)} بازه خالی</p>
                    <p className="text-[10px] text-mint-200/70">{TIME_SLOTS[3]}</p>
                    <Link
                      href="/appointment"
                      className="mt-3 flex items-center justify-between rounded-xl bg-white/15 px-3 py-2 text-[11px] font-black transition hover:bg-white/25"
                    >
                      همین حالا رزرو کن
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* کارت امتیاز */}
                  <div
                    className="anim-float-card absolute -top-6 -end-2 rounded-[1.4rem] border border-mint-200 bg-white/95 p-4 shadow-mint-md backdrop-blur sm:-end-6"
                    style={{ animationDelay: "1.4s" }}
                  >
                    <div className="flex items-center gap-2">
                      <Stars rating={Math.round(averageRating)} />
                      <span className="text-lg font-black text-ink-900">
                        {toFaDigits(averageRating.toFixed(1))}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-ink-500">
                      میانگین {toFaDigits(480)} نظر ثبت‌شده در گوگل
                    </p>
                  </div>
                </div>
              </PointerParallax>
            </div>
          </div>

          {/* آمار سریع */}
          <dl className="relative z-10 mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { value: 18, suffix: "", label: "سال تجربه" },
              { value: 2400, suffix: "+", label: "بیمار درمان‌شده" },
              { value: 4000, suffix: "+", label: "ایمپلنت کاشته‌شده" },
              { value: 95, suffix: "٪", label: "موفقیت درمان" },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 80}>
                <div className="surface-card p-5 text-center">
                  <dt className="text-2xl font-black text-brand-700 md:text-3xl">
                    <CountUp value={item.value} suffix={item.suffix} />
                  </dt>
                  <dd className="mt-1 text-[11px] font-bold text-ink-500 md:text-xs">{item.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* نوار متحرک خدمات */}
        <div className="relative mt-16 border-y border-mint-200 bg-white/60 backdrop-blur-md md:mt-20">
          <div dir="ltr" className="mask-fade-x overflow-hidden py-4">
            <div className="marquee-track gap-10">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex shrink-0 items-center gap-3 text-sm font-bold text-ink-600"
                >
                  <ToothIcon className="h-4 w-4 text-brand-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= TRUST STRIP ============================= */}
      <div className="relative py-12">
        <div className="page-shell grid gap-5 text-sm font-bold text-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <SpeedIcon className="h-5 w-5" />, title: "درمان یک‌جلسه‌ای", text: "درمان ریشه و بلیچینگ در یک جلسه" },
            { icon: <ShieldIcon className="h-5 w-5" />, title: "اتوکلاو کلاس B", text: "پک یکبار مصرف برای هر بیمار" },
            { icon: <CalendarIcon className="h-5 w-5" />, title: "وقت‌دهی بدون معطلی", text: "رزرو آنلاین و تأیید تلفنی" },
            { icon: <CheckIcon className="h-5 w-5" />, title: "گارانتی درمان", text: "گارانتی مادام‌العمر فیکسچر" },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="surface-card flex items-center gap-3 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint-100 text-brand-700">
                  {item.icon}
                </span>
                <span>
                  <span className="block text-ink-900">{item.title}</span>
                  <span className="block text-xs font-normal text-ink-500">{item.text}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* =============================== SERVICES =============================== */}
      <Section id="services" tone="soft">
        <SectionHeading
          eyebrow="خدمات تخصصی"
          title="همه خدمات دندانپزشکی زیر یک سقف"
          description="از معاینه پیشگیرانه تا ایمپلنت تمام‌دهانی؛ با تجهیزات دیجیتال و پلن درمان شفاف."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 4) * 90} as="article" className="h-full">
              <TiltCard className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="surface-card group flex h-full flex-col overflow-hidden p-6"
                >
                  <span className="pointer-events-none absolute -end-10 -top-10 h-28 w-28 rounded-full bg-mint-100 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" aria-hidden />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint-100 to-mint-200 text-brand-700 transition duration-500 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white">
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="display-2 mt-5 text-ink-900">{service.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-7 text-ink-500">
                    {service.summary}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-mint-200 pt-4 text-sm">
                    <span className="font-extrabold text-brand-700">{service.price}</span>
                    <ArrowIcon className="h-5 w-5 text-brand-400 transition group-hover:-translate-x-1.5" />
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-ghost">
            مشاهده همه خدمات و تعرفه‌ها
            <ArrowIcon className="h-5 w-5" />
          </Link>
        </div>
      </Section>

      {/* ================================ PROCESS ================================ */}
      <Section tone="night" divided>
        <SectionHeading
          invert
          eyebrow="مسیر درمان در مهرادنت"
          title="چهار قدم تا لبخند نهایی"
          description="همه‌چیز از قبل روشن است: چه کاری، چند جلسه، چه هزینه‌ای."
        />
        <ol className="relative grid gap-6 md:grid-cols-4">
          <span
            className="pointer-events-none absolute inset-x-8 top-10 hidden h-px bg-gradient-to-l from-transparent via-brand-400/60 to-transparent md:block"
            aria-hidden
          />
          {PROCESS_STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 110} as="li" className="relative">
              <div className="card-dark h-full p-6">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-lg font-black text-white shadow-[0_14px_28px_-14px_rgba(28,161,106,0.9)]">
                  {item.step}
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-mint-100/65">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ================================ WHY US ================================ */}
      <Section tone="gradient" divided>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <span className="dots-pattern absolute -top-5 -end-5 h-32 w-32 rounded-full opacity-70" aria-hidden />
              <div className="media-frame relative aspect-4/3 rounded-[2rem]">
                <Image
                  src="/images/clinic-room.jpg"
                  alt="اتاق درمان دندانپزشکی با تجهیزات دیجیتال"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 start-4 rounded-2xl border border-white/60 bg-white/95 p-4 text-sm shadow-mint-md">
                  <p className="font-black text-ink-900">تشخیص دیجیتال، درمان دقیق‌تر</p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    رادیوگرافی OPC، اسکنر اینترااورال و راهنمای جراحی سه‌بعدی
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              align="start"
              eyebrow="چرا مهرادنت؟"
              title="تجربه‌ای که ترس دندانپزشکی را کم می‌کند"
              description="سه اصل هرگز تغییر نمی‌کند: تشخیص شفاف، درمان بدون درد، و هزینه‌ای که از قبل می‌دانید."
            />
            <ul className="grid gap-3">
              {[
                "پلن درمان کتبی با برآورد هزینه پیش از شروع",
                "درمان بدون درد با بی‌حسی کامپیوتری و آرام‌بخشی",
                "تصویربرداری دیجیتال با دوز پرتو تا ۸۰٪ کمتر",
                "پیگیری پس از درمان و مراقبت تلفنی ۷ روز اول",
                "پذیرش بیمه‌های تکمیلی و تسویه اقساطی",
              ].map((item, index) => (
                <Reveal key={item} delay={index * 70} as="li">
                  <span className="surface-card flex items-start gap-3 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-ink-700">{item}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <Stat value={`${toFaDigits(2400)}+`} label="بیمار درمان‌شده" />
              <Stat value={`${toFaDigits(4000)}+`} label="ایمپلنت کاشته‌شده" />
              <Stat value={`${toFaDigits(95)}٪`} label="موفقیت درمان" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================= BEFORE / AFTER ============================= */}
      <Section tone="brand" divided>
        <SectionHeading
          invert
          eyebrow="گالری قبل و بعد"
          title="نتایج واقعی، بدون روتوش"
          description="دستگیره را بکشید و تفاوت قبل و بعد درمان را ببینید."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {gallery.slice(0, 3).map((item, index) => (
            <Reveal key={item.id} delay={index * 110}>
              <BeforeAfterCard {...item} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/gallery" className="btn-gold">
            مشاهده همه موارد درمانی
            <ArrowIcon className="h-5 w-5" />
          </Link>
        </div>
      </Section>

      {/* ================================= TEAM ================================= */}
      <Section tone="warm" divided>
        <SectionHeading
          eyebrow="تیم پزشکی"
          title="متخصص‌های بورد‌دار، همیشه در دسترس"
          description="هر بیمار یک پزشک مسئول دارد؛ از جلسه اول تا تحویل نهایی و پیگیری."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.slug} delay={(index % 4) * 90} as="article" className="h-full">
              <div className="surface-card group h-full overflow-hidden">
                <div className="media-frame relative aspect-3/4 !rounded-none !border-0 !shadow-none">
                  <Image
                    src={member.imageUrl ?? "/images/team/doctor-1.jpg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-950/60 to-transparent" aria-hidden />
                  <span className="absolute top-3 start-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-black text-brand-700 shadow-mint-sm">
                    {toFaDigits(member.experienceYears)} سال سابقه
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="display-2 text-ink-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-bold text-brand-700">{member.role}</p>
                  <p className="mt-3 text-xs leading-6 text-ink-500">{member.specialty}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/team" className="btn-ghost">
            معرفی کامل تیم پزشکی
            <ArrowIcon className="h-5 w-5" />
          </Link>
        </div>
      </Section>

      {/* ============================== TESTIMONIALS ============================== */}
      <Section tone="aurora">
        <SectionHeading
          eyebrow="نظر بیماران"
          title="اعتماد شما، بهترین معرف ماست"
          description="میانگین امتیاز رضایت بیماران بر اساس نظرات ثبت‌شده در گوگل و پرسشنامه کلینیک."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 100} as="article" className="h-full">
              <div className="surface-card relative h-full p-6">
                <span className="pointer-events-none absolute -top-3 end-5 text-6xl font-black text-mint-200" aria-hidden>
                  ”
                </span>
                <Stars rating={item.rating} />
                <p className="mt-4 leading-8 text-ink-700">«{item.comment}»</p>
                <footer className="mt-5 flex items-center gap-3 border-t border-mint-200 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-mint-100 to-mint-200 font-black text-brand-700">
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-ink-900">{item.name}</span>
                    <span className="block text-xs text-ink-500">{item.treatment}</span>
                  </span>
                </footer>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================================= BLOG ================================= */}
      <Section tone="mint">
        <SectionHeading
          eyebrow="بلاگ سلامت دهان"
          title="دانستنی‌هایی که هزینه درمان را کم می‌کند"
          description="مقالات کاربردی به قلم پزشکان کلینیک؛ بر اساس پروتکل‌های روز دنیا."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 110} as="article" className="h-full">
              <div className="surface-card group h-full overflow-hidden">
                <div className="media-frame relative aspect-16/9 !rounded-none !border-0 !shadow-none">
                  <Image
                    src={post.coverUrl ?? "/images/clinic-room.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute end-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold text-brand-700 shadow-mint-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-ink-500">{formatFaDate(post.publishedAt)}</p>
                  <h3 className="display-2 mt-2 leading-9 text-ink-900">
                    <Link href={`/blog/${post.slug}`} className="transition hover:text-brand-700">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-ink-500">{post.excerpt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================================== FAQ ================================== */}
      <Section tone="gradient">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="start"
              eyebrow="سؤالات پرتکرار"
              title="هر آنچه قبل از مراجعه باید بدانید"
              description="اگر پاسخ سؤال خود را پیدا نکردید، از چت آنلاین سایت یا تلفن پذیرش بپرسید."
            />
            <div className="card-soft p-6">
              <p className="flex items-center gap-2 text-sm font-extrabold text-brand-900">
                <PhoneIcon className="h-5 w-5 text-brand-600" />
                پاسخ فوری تلفنی
              </p>
              <a
                href={`tel:${settings.phone}`}
                dir="ltr"
                className="mt-3 block text-2xl font-black text-brand-700 transition hover:text-brand-800"
              >
                {settings.phone}
              </a>
              <p className="mt-2 text-xs leading-6 text-ink-500">
                شنبه تا چهارشنبه ۹:۰۰ تا ۲۰:۰۰ · پنجشنبه ۹:۰۰ تا ۱۴:۰۰
              </p>
            </div>
          </div>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* ================================ MAP + CTA ================================ */}
      <Section tone="night" divided>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="ring-gradient h-full overflow-hidden rounded-[1.6rem] border border-white/15 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
              <iframe
                src={settings.mapEmbedUrl}
                title={`نقشه موقعیت ${settings.clinicName}`}
                className="h-full min-h-96 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-dark h-full p-8">
              <h2 className="display-1 text-white">آدرس و ساعات کاری</h2>
              <ul className="mt-6 grid gap-4 text-sm leading-8 text-mint-100/70">
                <li className="flex gap-3">
                  <LocationIcon className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
                  <span>{settings.address}</span>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-mint-300" />
                  <span className="grid gap-1">
                    <a href={`tel:${settings.phone}`} dir="ltr" className="font-bold text-white">
                      {settings.phone}
                    </a>
                    <a href={`tel:${settings.phone2}`} dir="ltr" className="font-bold text-mint-100/70">
                      {settings.phone2}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-mint-300" />
                  <span className="grid gap-1">
                    <span>{settings.workingHoursWeek}</span>
                    <span>{settings.workingHoursThu}</span>
                    <span>{settings.workingHoursFri}</span>
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/appointment" className="btn-primary">
                  <CalendarIcon className="h-5 w-5" />
                  رزرو نوبت
                </Link>
                <a
                  href={settings.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-light"
                >
                  مسیریابی با گوگل‌مپ
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-6">
          <Marquee items={MARQUEE_ITEMS} />
        </div>
      </Section>

      {/* =============================== FINAL CTA =============================== */}
      <Section tone="light">
        <CtaBanner
          title="اولین قدم، یک معاینه رایگان است"
          text="در جلسه معاینه، وضعیت دهان و دندان‌های شما بررسی می‌شود و پلن درمان کتبی با برآورد هزینه دریافت می‌کنید. هیچ الزامی برای شروع درمان در همان جلسه نیست."
          primary={
            <Link href="/appointment" className="btn-primary w-full md:w-auto">
              <CalendarIcon className="h-5 w-5" />
              رزرو معاینه رایگان
            </Link>
          }
          secondary={
            <a href={`tel:${settings.phone}`} className="btn-outline-light w-full md:w-auto" dir="ltr">
              {settings.phone}
            </a>
          }
        />
      </Section>
    </>
  );
}
