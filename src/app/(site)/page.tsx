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
import { CountUp, Reveal } from "@/components/motion";
import { Accordion, JsonLd, Section, SectionHeading, Stat, Stars } from "@/components/ui";
import {
  getGalleryCases,
  getPosts,
  getServices,
  getSettings,
  getTeamMembers,
  getTestimonials,
} from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
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

      {/* ================================= HERO ================================= */}
      <section className="relative overflow-hidden bg-cream-50">
        <span className="wash -start-24 -top-24 h-96 w-96 bg-brand-100/80" aria-hidden />
        <span
          className="wash -end-24 top-16 h-96 w-96 bg-sand-200/60"
          style={{ animationDelay: "6s" }}
          aria-hidden
        />
        <span className="dots-pattern absolute inset-x-0 bottom-0 h-48 opacity-50" aria-hidden />

        <div className="page-shell relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.04fr_0.96fr]">
          {/* ستون متن */}
          <div className="animate-float-up">
            <span className="chip-light">
              <span className="anim-dot h-2 w-2 rounded-full bg-brand-500" />
              امروز پذیرش داریم · ۹:۰۰ تا ۲۰:۰۰
            </span>

            <h1 className="display-hero mt-6 text-ink-900">
              لبخند سالم،
              <span className="mt-1 block">
                از <span className="underline-squiggle text-brand-700">همین هفته</span> شروع می‌شود
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-9 text-ink-700 md:text-lg">
              کلینیک {settings.clinicShortName} در سعادت‌آباد تهران — ۹ یونیت مجزا، تشخیص کاملاً دیجیتال و
              تیم متخصص ایمپلنت، ارتودنسی و زیبایی. معاینه اولیه و مشاوره درمان رایگان است.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/appointment" className="btn-primary shine !px-8 !py-4 text-base">
                <CalendarIcon className="h-5 w-5" />
                رزرو نوبت آنلاین
              </Link>
              <a href={`tel:${settings.phone}`} className="btn-ghost !px-7 !py-4 text-base">
                <PhoneIcon className="h-5 w-5 text-brand-600" />
                <span dir="ltr">{settings.phone}</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex items-center">
                {["ز", "م", "ن", "س"].map((letter, index) => (
                  <span
                    key={letter}
                    className="anim-float -ms-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream-50 bg-white text-sm font-black text-brand-700 shadow-sm first:ms-0"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div>
                <Stars rating={Math.round(averageRating)} />
                <p className="mt-0.5 text-xs text-ink-500">
                  امتیاز {toFaDigits(averageRating.toFixed(1))} از ۵ · بیش از{" "}
                  <CountUp value={2400} suffix="+" /> بیمار
                </p>
              </div>
            </div>

            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                { value: 18, suffix: "", label: "سال تجربه" },
                { value: 4000, suffix: "+", label: "ایمپلنت" },
                { value: 95, suffix: "٪", label: "موفقیت درمان" },
              ].map((item) => (
                <div key={item.label} className="card-soft p-4 text-center">
                  <dt className="text-2xl font-black text-brand-700 md:text-3xl">
                    <CountUp value={item.value} suffix={item.suffix} />
                  </dt>
                  <dd className="mt-1 text-[11px] font-bold text-ink-500">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* کلاژ تصویر ارگانیک */}
          <div className="animate-float-up delay-2 relative mx-auto w-full max-w-lg pb-10 pt-6">
            {/* دایره نقطه‌ای تزئینی */}
            <span className="dots-pattern absolute -top-2 -end-2 h-40 w-40 rounded-full opacity-70" aria-hidden />
            <span className="anim-pulse-ring absolute start-1/2 top-1/2 h-72 w-72 rounded-full border border-brand-200" aria-hidden />

            <div className="relative aspect-4/5 w-[86%]">
              <Image
                src="/images/hero-clinic.jpg"
                alt="اتاق درمان کلینیک دندانپزشکی مهرادنت با تجهیزات دیجیتال"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="blob-img object-cover"
              />
            </div>

            {/* کارت تصویر دوم */}
            <div className="absolute -bottom-2 -start-2 w-40 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-[0_24px_48px_-30px_rgba(16,63,64,0.6)] sm:w-48">
              <div className="relative aspect-square">
                <Image
                  src="/images/clinic-room.jpg"
                  alt="تجهیزات استریل و اتاق درمان مجزا"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* کارت امتیاز */}
            <div className="anim-float-card absolute -top-4 -start-4 rounded-2xl border border-cream-200 bg-white/95 p-4 shadow-[0_20px_40px_-28px_rgba(16,63,64,0.6)] backdrop-blur">
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

            {/* کارت نوبت‌های آزاد */}
            <div
              className="anim-float-card absolute -bottom-4 -end-2 w-44 rounded-2xl bg-brand-700 p-4 text-white shadow-[0_24px_44px_-26px_rgba(19,93,92,0.9)]"
              style={{ animationDelay: "1.6s" }}
            >
              <p className="flex items-center gap-2 text-[11px] font-bold text-white/70">
                <span className="anim-dot h-2 w-2 rounded-full bg-sand-400" />
                نوبت‌های آزاد امروز
              </p>
              <p className="mt-2 text-2xl font-black">{toFaDigits(3)} بازه خالی</p>
              <p className="mt-0.5 text-[11px] text-white/60">{TIME_SLOTS[3]}</p>
              <Link
                href="/appointment"
                className="mt-3 flex items-center justify-between rounded-xl bg-white/15 px-3 py-2 text-[11px] font-black transition hover:bg-white/25"
              >
                همین حالا رزرو کن
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* نشان استریل */}
            <div className="absolute -top-6 end-6 flex items-center gap-2 rounded-full border border-cream-200 bg-white px-3 py-2 text-[11px] font-black text-ink-900 shadow-sm">
              <ShieldIcon className="h-4 w-4 text-brand-600" />
              اتوکلاو کلاس B
            </div>
          </div>
        </div>

        {/* نوار متحرک خدمات */}
        <div className="relative border-y border-cream-200 bg-white py-4">
          <div dir="ltr" className="mask-fade-x overflow-hidden">
            <div className="marquee-track gap-10">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-3 text-sm font-bold text-ink-500">
                  <ToothIcon className="h-4 w-4 text-brand-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= TRUST STRIP ============================= */}
      <div className="bg-white py-8">
        <div className="page-shell grid gap-6 text-sm font-bold text-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <SpeedIcon className="h-5 w-5" />, title: "درمان یک‌جلسه‌ای", text: "درمان ریشه و بلیچینگ در یک جلسه" },
            { icon: <ShieldIcon className="h-5 w-5" />, title: "اتوکلاو کلاس B", text: "پک یکبار مصرف برای هر بیمار" },
            { icon: <CalendarIcon className="h-5 w-5" />, title: "وقت‌دهی بدون معطلی", text: "رزرو آنلاین و تأیید تلفنی" },
            { icon: <CheckIcon className="h-5 w-5" />, title: "گارانتی درمان", text: "گارانتی مادام‌العمر فیکسچر" },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
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
              <Link
                href={`/services/${service.slug}`}
                className="surface-card group flex h-full flex-col p-6 hover:-translate-y-2"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition duration-500 group-hover:bg-brand-700 group-hover:text-white">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </span>
                <h3 className="display-2 mt-5 text-ink-900">{service.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-7 text-ink-500">{service.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-4 text-sm">
                  <span className="font-extrabold text-brand-700">{service.price}</span>
                  <ArrowIcon className="h-5 w-5 text-brand-300 transition group-hover:-translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================================ WHY US ================================ */}
      <Section tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-cream-200">
              <Image
                src="/images/clinic-room.jpg"
                alt="اتاق درمان دندانپزشکی با تجهیزات دیجیتال"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 start-4 rounded-2xl border border-white/60 bg-white/95 p-4 text-sm shadow-xl">
                <p className="font-black text-ink-900">تشخیص دیجیتال، درمان دقیق‌تر</p>
                <p className="text-xs text-ink-500">رادیوگرافی OPC، اسکنر اینترااورال و راهنمای جراحی سه‌بعدی</p>
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
                  <span className="surface-card flex items-start gap-3 p-4 hover:-translate-y-1">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
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
      <Section tone="night">
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
          <Link href="/gallery" className="btn-outline-light">
            مشاهده همه موارد درمانی
            <ArrowIcon className="h-5 w-5" />
          </Link>
        </div>
      </Section>

      {/* ================================= TEAM ================================= */}
      <Section tone="light">
        <SectionHeading
          eyebrow="تیم پزشکی"
          title="متخصص‌های بورد‌دار، همیشه در دسترس"
          description="هر بیمار یک پزشک مسئول دارد؛ از جلسه اول تا تحویل نهایی و پیگیری."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.slug} delay={(index % 4) * 90} as="article" className="h-full">
              <div className="surface-card group h-full overflow-hidden hover:-translate-y-2">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={member.imageUrl ?? "/images/team/doctor-1.jpg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 start-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-brand-700">
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
      <Section tone="soft">
        <SectionHeading
          eyebrow="نظر بیماران"
          title="اعتماد شما، بهترین معرف ماست"
          description="میانگین امتیاز رضایت بیماران بر اساس نظرات ثبت‌شده در گوگل و پرسشنامه کلینیک."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 100} as="article" className="h-full">
              <div className="surface-card h-full p-6 hover:-translate-y-1">
                <Stars rating={item.rating} />
                <p className="mt-4 leading-8 text-ink-700">«{item.comment}»</p>
                <footer className="mt-5 flex items-center gap-3 border-t border-cream-200 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-black text-brand-700">
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
      <Section tone="light">
        <SectionHeading
          eyebrow="بلاگ سلامت دهان"
          title="دانستنی‌هایی که هزینه درمان را کم می‌کند"
          description="مقالات کاربردی به قلم پزشکان کلینیک؛ بر اساس پروتکل‌های روز دنیا."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 110} as="article" className="h-full">
              <div className="surface-card group h-full overflow-hidden hover:-translate-y-2">
                <div className="relative aspect-16/9 overflow-hidden">
                  <Image
                    src={post.coverUrl ?? "/images/clinic-room.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute end-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-brand-700">
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
      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="start"
            eyebrow="سؤالات پرتکرار"
            title="هر آنچه قبل از مراجعه باید بدانید"
            description="اگر پاسخ سؤال خود را پیدا نکردید، از چت آنلاین سایت یا تلفن پذیرش بپرسید."
          />
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* ================================ MAP + CTA ================================ */}
      <Section tone="night">
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="ring-gradient h-full overflow-hidden rounded-[1.6rem] border border-white/15">
              <iframe
                src={settings.mapEmbedUrl}
                title={`نقشه موقعیت ${settings.clinicName}`}
                className="h-full min-h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-dark h-full p-8">
              <h2 className="display-1 text-white">آدرس و ساعات کاری</h2>
              <ul className="mt-6 grid gap-4 text-sm leading-8 text-white/70">
                <li className="flex gap-3">
                  <LocationIcon className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
                  <span>{settings.address}</span>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-brand-300" />
                  <span className="grid gap-1">
                    <a href={`tel:${settings.phone}`} dir="ltr" className="font-bold text-white">
                      {settings.phone}
                    </a>
                    <a href={`tel:${settings.phone2}`} dir="ltr" className="font-bold text-white/70">
                      {settings.phone2}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
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
      </Section>
    </>
  );
}
