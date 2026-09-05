import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${settings.clinicName} | ${settings.tagline}`,
      template: "%s",
    },
    description:
      "کلینیک دندانپزشکی مهرادنت در سعادت‌آباد تهران: ایمپلنت، ارتودنسی نامرئی، لمینت، بلیچینگ، درمان ریشه و دندانپزشکی کودکان با نوبت‌دهی آنلاین و مشاوره رایگان.",
    applicationName: settings.clinicName,
    authors: [{ name: settings.clinicName, url: SITE_URL }],
    publisher: settings.clinicName,
    creator: settings.clinicName,
    generator: "Next.js",
    formatDetection: { telephone: true, address: true, email: true },
    keywords: [
      "دندانپزشکی تهران",
      "ایمپلنت دندان",
      "ارتودنسی نامرئی",
      "لمینت دندان",
      "نوبت دندانپزشکی",
      "کلینیک دندانپزشکی سعادت‌آباد",
      "بلیچینگ دندان",
      "دندانپزشک کودکان تهران",
    ],
    alternates: { canonical: SITE_URL },
    category: "health",
    ...(settings.googleVerification
      ? { verification: { google: settings.googleVerification } }
      : {}),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: settings.clinicName,
      url: SITE_URL,
      title: settings.clinicName,
      description: settings.tagline,
      images: [
        {
          url: "/images/og-cover.png",
          width: 1200,
          height: 630,
          alt: `${settings.clinicName} — کلینیک دندانپزشکی در تهران`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.clinicName,
      description: settings.tagline,
      images: ["/images/og-cover.png"],
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-64.png", type: "image/png", sizes: "64x64" },
      ],
      apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
      other: [{ rel: "mask-icon", url: "/icon.svg" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* فونت وزیرمتن به‌صورت self-host و پیش‌بارگذاری → حذف درخواست
            render-blocking ثالث و بهبود LCP/CLS (Core Web Vitals) */}
        <link
          rel="preload"
          href="/fonts/Vazirmatn-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#0d8455" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#061f17" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-mint-200 text-ink-900 antialiased">{children}</body>
    </html>
  );
}
