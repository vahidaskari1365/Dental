import Link from "next/link";
import { CalendarIcon, ClockIcon, InstagramIcon, LocationIcon, PhoneIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";
import {JsonLd, PageHero, Section, SectionHeading, Breadcrumb } from "@/components/ui";
import { getSettings } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "تماس با ما | آدرس، تلفن و نقشه کلینیک مهرادنت",
  description:
    "آدرس کلینیک دندانپزشکی مهرادنت در سعادت‌آباد تهران، شماره تماس پذیرش، ساعات کاری، نقشه گوگل و مسیریابی. اورژانس دندانپزشکی پاسخگو است.",
  path: "/contact",
  keywords: ["آدرس کلینیک دندانپزشکی سعادت آباد", "تلفن دندانپزشکی مهرادنت", "نقشه دندانپزشکی تهران"],
});

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "تماس با ما", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="سعادت‌آباد، بلوار دریا"
        title="تماس با کلینیک مهرادنت"
        description="برای مشاوره، هماهنگی نوبت یا اورژانس با ما در ارتباط باشید. پاسخگویی تلفنی در تمام ساعات کاری."
        breadcrumb={<Breadcrumb current="تماس با ما" />}
      />

      <Section tone="aurora">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <PhoneIcon className="h-6 w-6" />,
              title: "تلفن پذیرش",
              lines: [settings.phone, settings.phone2],
              href: `tel:${settings.phone}`,
              cta: "تماس آنی",
            },
            {
              icon: <WhatsappIcon className="h-6 w-6" />,
              title: "واتس‌اپ و شبکه‌ها",
              lines: ["ارسال عکس دندان و دریافت نظر اولیه", "پاسخ در ساعات کاری"],
              href: `https://wa.me/${settings.whatsapp}`,
              cta: "گفتگو در واتس‌اپ",
            },
            {
              icon: <ClockIcon className="h-6 w-6" />,
              title: "ساعات کاری",
              lines: [settings.workingHoursWeek, settings.workingHoursThu, settings.workingHoursFri],
              href: "/appointment",
              cta: "رزرو نوبت",
            },
          ].map((card) => (
            <div key={card.title} className="surface-card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                {card.icon}
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-brand-950">{card.title}</h2>
              <div className="mt-3 grid gap-1 text-sm leading-7 text-ink-700">
                {card.lines.map((line) => (
                  <span key={line} dir={line.match(/^\d/) ? "ltr" : undefined} className={line.match(/^\d/) ? "text-end" : undefined}>
                    {line}
                  </span>
                ))}
              </div>
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="btn-ghost mt-5 !px-5 !py-2.5 text-sm"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-card overflow-hidden">
            <iframe
              src={settings.mapEmbedUrl}
              title={`نقشه گوگل موقعیت ${settings.clinicName}`}
              className="h-full min-h-96 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="surface-card p-8">
            <h2 className="text-xl font-extrabold text-brand-950">آدرس و دسترسی</h2>
            <p className="mt-4 flex items-start gap-3 text-ink-700">
              <LocationIcon className="mt-1 h-6 w-6 shrink-0 text-brand-500" />
              {settings.address}
            </p>
            <p className="mt-4 rounded-2xl bg-brand-50 p-4 text-sm leading-7 text-ink-700">
              <strong className="text-brand-800">دسترسی با مترو:</strong> ایستگاه مترو ایران‌مال، خط ۳، سپس ۱۲ دقیقه
              با تاکسی یا اتوبوس خط بلوار دریا.
              <br />
              <strong className="text-brand-800">پارکینگ:</strong> پارکینگ اختصاصی برج پزشکان مهر (ورودی طبقه منفی یک).
            </p>
            <div className="mt-6 grid gap-3">
              <a href={settings.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                مسیریابی با گوگل مپ
              </a>
              <Link href="/appointment" className="btn-ghost">
                <CalendarIcon className="h-5 w-5" />
                رزرو نوبت آنلاین
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={settings.instagram}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition hover:bg-brand-600 hover:text-white"
                aria-label="اینستاگرام کلینیک"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={settings.telegram}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition hover:bg-brand-600 hover:text-white"
                aria-label="کانال تلگرام"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition hover:bg-brand-600 hover:text-white"
                aria-label="واتس‌اپ"
              >
                <WhatsappIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mint">
        <SectionHeading
          eyebrow="نظرات شما"
          title="تجربه خود را در گوگل ثبت کنید"
          description="نظرات شما به دیگر بیماران کمک می‌کند تصمیم بهتری بگیرند و ما هم کیفیت خدمات را بهتر کنیم."
        />
        <div className="text-center">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <LocationIcon className="h-5 w-5" />
            ثبت نظر در گوگل مپ
          </a>
          <p className="mt-4 text-sm text-ink-500">{settings.emergencyNote}</p>
        </div>
      </Section>
    </>
  );
}
