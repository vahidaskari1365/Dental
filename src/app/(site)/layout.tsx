import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat-widget";
import { BackToTop, ScrollProgress } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/ui";
import { getServices, getSettings, getTestimonials } from "@/lib/data";
import { clinicJsonLd, webSiteJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [settings, services, testimonials] = await Promise.all([
    getSettings(),
    getServices(),
    getTestimonials(),
  ]);

  const averageRating = testimonials.length
    ? testimonials.reduce((total, item) => total + item.rating, 0) / testimonials.length
    : 0;

  return (
    <>
      <JsonLd
        data={clinicJsonLd({
          settings: settings as unknown as Record<string, string>,
          services: services.map((service) => ({
            title: service.title,
            slug: service.slug,
            summary: service.summary,
            price: service.price,
          })),
          rating: { value: averageRating, count: testimonials.length },
          reviews: testimonials.map((item) => ({
            name: item.name,
            rating: item.rating,
            comment: item.comment,
            treatment: item.treatment,
          })),
        })}
      />
      <JsonLd data={webSiteJsonLd(settings as unknown as Record<string, string>)} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[70] focus:rounded-xl focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        رفتن به محتوای اصلی
      </a>
      <ScrollProgress />
      <SiteHeader
        phone={settings.phone}
        phone2={settings.phone2}
        address={settings.address}
        hoursWeek={settings.workingHoursWeek}
        emergencyNote={settings.emergencyNote}
        instagram={settings.instagram}
        telegram={settings.telegram}
        whatsapp={settings.whatsapp}
      />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} services={services} />
      <ChatWidget clinicName={settings.clinicShortName} />
      <BackToTop />
    </>
  );
}
