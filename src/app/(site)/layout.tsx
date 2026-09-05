import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/ui";
import { getServices, getSettings } from "@/lib/data";
import { clinicJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

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
        })}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[60] focus:rounded-xl focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        رفتن به محتوای اصلی
      </a>
      <SiteHeader phone={settings.phone} phone2={settings.phone2} address={settings.address} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} services={services} />
      <ChatWidget clinicName={settings.clinicShortName} />
    </>
  );
}
