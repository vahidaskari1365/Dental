import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppointmentForm } from "@/components/appointment-form";
import { ArrowIcon, CalendarIcon, CheckIcon, ClockIcon, ServiceIcon } from "@/components/icons";
import {JsonLd, PageHero, Section, SectionHeading, Breadcrumb } from "@/components/ui";
import { getServiceBySlug, getServices, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { TIME_SLOTS } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return buildMetadata({ title: "خدمت یافت نشد", description: "این خدمت وجود ندارد.", path: "/services", noIndex: true });
  }
  return buildMetadata({
    title: service.seoTitle ?? `${service.title} در تهران | هزینه و مراحل درمان`,
    description:
      service.seoDescription ??
      `${service.summary} ${service.title} در کلینیک دندانپزشکی مهرادنت سعادت‌آباد تهران؛ هزینه پایه ${service.price ?? "استعلام"} و مدت درمان ${service.duration ?? "متفاوت"}.`,
    path: `/services/${service.slug}`,
    image: service.imageUrl ?? "/images/hero-clinic.jpg",
    keywords: [service.title, `${service.title} تهران`, `${service.title} هزینه`],
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const [service, services, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSettings(),
  ]);

  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "خدمات", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(service)} />

      <PageHero
        eyebrow={service.duration ?? undefined}
        title={service.title}
        description={service.summary}
        breadcrumb={<Breadcrumb current={service.title} />}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative aspect-16/9 overflow-hidden rounded-[2rem]">
              <Image
                src={service.imageUrl ?? "/images/clinic-room.jpg"}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>
              <h2 className="text-2xl font-extrabold text-brand-950">مراحل درمان</h2>
            </div>
            <p className="mt-4 leading-9 text-ink-700">{service.description}</p>

            <h3 className="mt-8 text-xl font-extrabold text-brand-950">آنچه در این خدمت دریافت می‌کنید</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-2xl bg-brand-50/70 p-4 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="grid gap-6">
            <div className="surface-card p-6">
              <h3 className="text-lg font-extrabold text-brand-950">اطلاعات درمان</h3>
              <dl className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-brand-50 p-3">
                  <dt className="text-ink-500">هزینه پایه</dt>
                  <dd className="font-extrabold text-brand-800">{service.price}</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-brand-50 p-3">
                  <dt className="text-ink-500">مدت درمان</dt>
                  <dd className="font-extrabold text-brand-800">{service.duration}</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-brand-50 p-3">
                  <dt className="text-ink-500">معاینه اولیه</dt>
                  <dd className="font-extrabold text-brand-800">رایگان</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-brand-50 p-3">
                  <dt className="text-ink-500">بیمه و اقساط</dt>
                  <dd className="font-extrabold text-brand-800">پذیرفته می‌شود</dd>
                </div>
              </dl>
              <Link href={`/appointment?service=${service.slug}`} className="btn-primary mt-5 w-full">
                <CalendarIcon className="h-5 w-5" />
                رزرو نوبت این خدمت
              </Link>
              <a href={`tel:${settings.phone}`} className="btn-ghost mt-3 w-full">
                <ClockIcon className="h-5 w-5" />
                مشاوره تلفنی
              </a>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-extrabold text-brand-950">خدمات مرتبط</h3>
              <ul className="mt-4 grid gap-2 text-sm">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-ink-700 transition hover:bg-brand-50 hover:text-brand-800"
                    >
                      {item.title}
                      <ArrowIcon className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="رزرو آنلاین"
          title={`نوبت ${service.title}`}
          description="فرم زیر را پر کنید؛ پذیرش کلینیک برای تأیید نهایی تماس می‌گیرد."
        />
        <div className="mx-auto max-w-3xl">
          <AppointmentForm
            services={services.map((item) => ({ slug: item.slug, title: item.title }))}
            timeSlots={TIME_SLOTS}
            phone={settings.phone}
            defaultService={service.slug}
          />
        </div>
      </Section>
    </>
  );
}
