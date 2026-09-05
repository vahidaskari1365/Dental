import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "کلینیک دندانپزشکی مهرادنت",
    short_name: "مهرادنت",
    description:
      "نوبت‌دهی آنلاین، خدمات و گالری قبل/بعد کلینیک دندانپزشکی مهرادنت در سعادت‌آباد تهران.",
    lang: "fa-IR",
    dir: "rtl",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#cfeeda",
    theme_color: "#0d8455",
    categories: ["health", "medical"],
    icons: [
      {
        src: "/images/logo-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
