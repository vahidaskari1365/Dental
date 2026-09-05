import type { Metadata } from "next";
import { DEFAULT_SETTINGS, SITE_URL } from "./site";

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

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = "/images/hero-clinic.jpg",
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/" ? `${title} | ${DEFAULT_SETTINGS.clinicName}` : `${title} | ${DEFAULT_SETTINGS.clinicShortName}`;
  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
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
};

export function clinicJsonLd({ settings, services = [], faq = [] }: JsonLdInput) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_URL}/#clinic`,
    name: settings.clinicName,
    description: settings.tagline,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    image: `${SITE_URL}/images/hero-clinic.jpg`,
    logo: `${SITE_URL}/images/hero-clinic.jpg`,
    priceRange: "$$",
    currenciesAccepted: "IRR",
    paymentAccepted: "Cash, Credit Card",
    medicalSpecialty: "Dentistry",
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "تهران",
      addressRegion: "تهران",
      postalCode: settings.postalCode,
      addressCountry: "IR",
    },
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
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/appointment`,
        inLanguage: "fa-IR",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "رزرو نوبت دندانپزشکی" },
    },
  };

  if (faq.length) {
    data.hasPart = {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
  }

  return data;
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

export function postJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  coverUrl: string | null;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: DEFAULT_SETTINGS.clinicName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/hero-clinic.jpg` },
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.coverUrl ? `${SITE_URL}${post.coverUrl}` : `${SITE_URL}/images/hero-clinic.jpg`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    articleSection: post.category,
    inLanguage: "fa-IR",
    wordCount: post.excerpt.length,
  };
}
