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
    authors: [{ name: settings.clinicName }],
    keywords: [
      "دندانپزشکی تهران",
      "ایمپلنت دندان",
      "ارتودنسی نامرئی",
      "لمینت دندان",
      "نوبت دندانپزشکی",
      "کلینیک دندانپزشکی سعادت‌آباد",
      "بلیچینگ دندان",
    ],
    alternates: { canonical: SITE_URL },
    ...(settings.googleVerification
      ? { verification: { google: settings.googleVerification } }
      : {}),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: settings.clinicName,
      url: SITE_URL,
      title: settings.clinicName,
      description: settings.tagline,
    },
    icons: { icon: "/icon.svg" },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1a8387" />
      </head>
      <body className="bg-white text-ink-900 antialiased">{children}</body>
    </html>
  );
}
