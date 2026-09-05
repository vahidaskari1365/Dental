import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CalendarIcon, CheckIcon, ServiceIcon } from "@/components/icons";
import { JsonLd, PageHero, Section, SectionHeading } from "@/components/ui";
import { getServices, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { toFaDigits } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "خدمات دندانپزشکی | ایمپلنت، ارتودنسی، لمینت و بلیچینگ",
  description:
    "فهرست کامل خدمات کلینیک دندانپزشکی مهرادنت: ایمپلنت، ارتودنسی ثابت و نامرئی، لمینت سرامیکی، بلیچینگ، درمان ریشه، جراحی لثه، دندانپزشکی کودکان و طراحی دیجیتال لبخند همراه با هزینه تقریبی.",
  path: "/services",
  keywords: ["خدمات دندانپزشکی", "قیمت ایمپلنت", "ارتودنسی نامرئی", "لمینت دندان", "بلیچینگ", "درمان ریشه"],
});

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "خدمات", path: "/services" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "خدمات دندانپزشکی مهرادنت",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `/services/${service.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow={`${toFaDigits(services.length)} خدمت تخصصی`}
        title="خدمات کلینیک دندانپزشکی مهرادنت"
        description="هر خدمت با توضیح کامل مراحل درمان، مدت زمان و هزینه تقریبی. برای برآورد دقیق، معاینه اولیه رایگان است."
        breadcrumb={
          <nav className="text-sm text-brand-200" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">خدمات</span>
          </nav>
        }
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="surface-card overflow-hidden">
              <div className="relative aspect-16/9">
                <Image
                  src={service.imageUrl ?? "/images/clinic-room.jpg"}
                  alt={`${service.title} در کلینیک دندانپزشکی مهرادنت`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-4 end-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-brand-600">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-extrabold text-brand-950">
                  <Link href={`/services/${service.slug}`} className="transition hover:text-brand-600">
                    {service.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-8 text-ink-700">{service.summary}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-brand-50 p-3">
                    <dt className="text-xs text-ink-500">هزینه پایه</dt>
                    <dd className="mt-1 font-extrabold text-brand-800">{service.price}</dd>
                  </div>
                  <div className="rounded-xl bg-brand-50 p-3">
                    <dt className="text-xs text-ink-500">مدت درمان</dt>
                    <dd className="mt-1 font-extrabold text-brand-800">{service.duration}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/services/${service.slug}`} className="btn-ghost !px-5 !py-2.5 text-sm">
                    جزئیات درمان
                    <ArrowIcon className="h-4 w-4" />
                  </Link>
                  <Link href={`/appointment?service=${service.slug}`} className="btn-primary !px-5 !py-2.5 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    رزرو نوبت
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="پلن مالی"
          title="پرداخت اقساطی و بیمه تکمیلی"
          description="برای درمان‌های بزرگ (ایمپلنت، ارتودنسی، لمینت) قرارداد اقساطی بدون بهره ارائه می‌شود."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "پیش‌پرداخت ۳۰٪",
              text: "باقیمانده در ۶ تا ۱۲ قسط ماهانه بدون کارمزد نوشته می‌شود.",
            },
            {
              title: "بیمه تکمیلی",
              text: "با ارائه فرم بیمه، بخش قابل توجه هزینه درمان ریشه و ترمیم پوشش داده می‌شود.",
            },
            {
              title: "معاینه رایگان",
              text: "اولین معاینه و مشاوره درمان در مهرادنت رایگان است؛ فقط با تعیین وقت.",
            },
          ].map((item) => (
            <div key={item.title} className="surface-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <CheckIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-700">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-500">
          برای اطلاع از تعرفه روز با پذیرش تماس بگیرید:{" "}
          <a href={`tel:${settings.phone}`} className="font-bold text-brand-700" dir="ltr">
            {settings.phone}
          </a>
        </p>
      </Section>
    </>
  );
}
