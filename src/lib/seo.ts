import type { Metadata } from "next";
import { DEFAULT_SETTINGS, GEO, SITE_URL } from "./site";

/* ==========================================================================
   لایه سئوی مهرادنت — بر اساس چک‌لیست اسکیل‌های نصب‌شده claude-seo
   (seo-schema / seo-local / seo-technical / seo-geo)
   ========================================================================== */

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/** تصویر پیش‌فرض اشتراک‌گذاری: کارت برند ۱۲۰۰×۶۳۰ */
export const OG_IMAGE = "/images/og-cover.png";

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = OG_IMAGE,
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  // عنوان خانه خودش شامل نام برند است؛ برای بقیه صفحات نام کوتاه اضافه می‌شود.
  const fullTitle =
    path === "/" ? title : `${title} | ${DEFAULT_SETTINGS.clinicShortName}`;
  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: DEFAULT_SETTINGS.clinicName,
      locale: "fa_IR",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

type JsonLdInput = {
  settings: Record<string, string>;
  services?: Array<{ title: string; slug: string; summary: string; price: string | null }>;
  faq?: Array<{ question: string; answer: string }>;
  rating?: { value: number; count: number };
  reviews?: Array<{ name: string; rating: number; comment: string; treatment?: string | null }>;
};

/**
 * موجودیت اصلی کلینیک (Dentist + MedicalClinic + LocalBusiness).
 * بر اساس seo-local: healthcare باید از زیرنوع اختصاصی استفاده کند، نه MedicalBusiness عمومی.
 * شامل geo با ۵ رقم اعشار، aggregateRating، sameAs و hasMap.
 */
export function clinicJsonLd({ settings, services = [], faq = [], rating, reviews = [] }: JsonLdInput) {
  const clinic: Record<string, unknown> = {
    "@type": ["Dentist", "MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_URL}/#clinic`,
    name: settings.clinicName,
    alternateName: settings.clinicShortName,
    slogan: settings.tagline,
    description: settings.tagline,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    image: `${SITE_URL}${OG_IMAGE}`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo-512.png`,
      width: 512,
      height: 512,
    },
    priceRange: "$$",
    currenciesAccepted: "IRR",
    paymentAccepted: "Cash, Credit Card, Installments",
    medicalSpecialty: "Dentistry",
    foundingDate: "2008",
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    hasMap: settings.mapLink,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "تهران",
      addressRegion: "تهران",
      postalCode: settings.postalCode,
      addressCountry: "IR",
    },
    sameAs: [settings.instagram, settings.telegram, `https://wa.me/${settings.whatsapp}`].filter(
      Boolean,
    ),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: { "@type": "City", name: "تهران" },
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/appointment`,
        inLanguage: "fa-IR",
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      result: { "@type": "Reservation", name: "رزرو نوبت دندانپزشکی" },
    },
  };

  if (rating && rating.count > 0) {
    clinic.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(rating.value.toFixed(1)),
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1,
    };
    clinic.review = reviews.slice(0, 6).map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: item.comment,
      ...(item.treatment ? { about: item.treatment } : {}),
    }));
  }

  const graph: Array<Record<string, unknown>> = [clinic];

  // نکته seo-schema: گوگل از می ۲۰۲۶ ریچ‌ریزلت FAQPage را برای همه سایت‌ها بازنشسته کرده؛
  // این گره فقط برای موتورهای دیگر و دستیارهای هوش مصنوعی نگه داشته می‌شود (سطح Info).
  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** گره WebSite + Organization برای صفحه اصلی و لی‌اوت سراسری */
export function webSiteJsonLd(settings: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: settings.clinicName,
        description: settings.tagline,
        inLanguage: "fa-IR",
        publisher: { "@id": `${SITE_URL}/#clinic` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: settings.clinicName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo-512.png`,
          width: 512,
          height: 512,
        },
        sameAs: [settings.instagram, settings.telegram].filter(Boolean),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: settings.phone,
          contactType: "customer service",
          areaServed: "IR",
          availableLanguage: ["fa", "en"],
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** خدمت単ی با قیمت (Offer) — برای صفحات /services/[slug] */
export function serviceJsonLd(service: {
  title: string;
  slug: string;
  summary: string;
  description: string;
  price: string | null;
  duration: string | null;
  imageUrl: string | null;
  features: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        "@id": `${SITE_URL}/services/${service.slug}#procedure`,
        name: service.title,
        description: service.description,
        procedureType: "https://schema.org/TherapeuticProcedure",
        bodyLocation: "Oral cavity",
        howPerformed: service.features.join(" ، "),
        preparation: "معاینه اولیه و در صورت نیاز رادیوگرافی دیجیتال",
        followup: "پیگیری تلفنی ۷ روز اول و کنترل ۶ ماهه",
        performTime: service.duration ?? undefined,
        performer: { "@id": `${SITE_URL}/#clinic` },
        url: `${SITE_URL}/services/${service.slug}`,
        image: service.imageUrl ? `${SITE_URL}${service.imageUrl}` : `${SITE_URL}${OG_IMAGE}`,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${service.slug}#service`,
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        areaServed: { "@type": "City", name: "تهران" },
        provider: { "@id": `${SITE_URL}/#clinic` },
        ...(service.price
          ? {
              offers: {
                "@type": "Offer",
                price: service.price,
                priceCurrency: "IRR",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/services/${service.slug}`,
              },
            }
          : {}),
      },
    ],
  };
}

export function postJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  coverUrl: string | null;
  category: string;
  tags?: string[];
}) {
  const words = post.content.split(/\s+/).filter(Boolean).length;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title.slice(0, 110),
    description: post.excerpt,
    keywords: post.tags?.join("، "),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: [post.coverUrl ? `${SITE_URL}${post.coverUrl}` : `${SITE_URL}${OG_IMAGE}`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    articleSection: post.category,
    inLanguage: "fa-IR",
    wordCount: words,
    // گذاره‌های نقل‌قول‌پذیر برای دستیارهای هوش مصنوعی (seo-geo)
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".rich-text p"],
    },
  };
}

/** گره مستقل FAQPage برای صفحه‌ای که پرسش‌وپاسخ واقعی دارد (مثل صفحه اصلی) */
export function faqJsonLd(items: Array<{ question: string; answer: string }>, path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    inLanguage: "fa-IR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
