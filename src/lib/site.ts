export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mehrdent.ir"
).replace(/\/$/, "");

export type NavItem = { href: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/gallery", label: "قبل و بعد" },
  { href: "/team", label: "تیم پزشکی" },
  { href: "/blog", label: "بلاگ" },
  { href: "/about", label: "درباره کلینیک" },
  { href: "/contact", label: "تماس" },
];

export const DEFAULT_SETTINGS = {
  clinicName: "کلینیک دندانپزشکی مهرادنت",
  clinicShortName: "مهرادنت",
  tagline: "لبخند شما، امضای حرفه‌ای ما",
  phone: "021-88776655",
  phone2: "0912-345-6789",
  whatsapp: "989123456789",
  email: "info@mehrdent.ir",
  address:
    "تهران، سعادت‌آباد، بلوار دریا، نبش خیابان صراف‌ها، برج پزشکان مهر، طبقه ۴، واحد ۴۰۲",
  postalCode: "1998734512",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Tehran%20Saadat%20Abad%20Darya%20Boulevard&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLink: "https://maps.google.com/?q=Tehran+Saadat+Abad+Darya+Boulevard",
  workingHoursWeek: "شنبه تا چهارشنبه: ۹:۰۰ تا ۲۰:۰۰",
  workingHoursThu: "پنجشنبه: ۹:۰۰ تا ۱۴:۰۰",
  workingHoursFri: "جمعه: فقط اورژانس دندانپزشکی",
  instagram: "https://instagram.com/mehrdent.clinic",
  telegram: "https://t.me/mehrdent",
  siteUrl: SITE_URL,
  googleVerification: "",
  emergencyNote:
    "اورژانس دندانپزشکی در تمام روزهای هفته از ۸ صبح تا ۱۱ شب پاسخگویی دارد.",
};

export type SiteSettings = typeof DEFAULT_SETTINGS;

// مختصات با ۵+ رقم اعشار (الزام چک‌لیست seo-local برای GeoCoordinates)
export const GEO = { lat: 35.78472, lng: 51.37134 };

export const TIME_SLOTS = [
  "۹:۰۰ - ۱۰:۰۰",
  "۱۰:۰۰ - ۱۱:۰۰",
  "۱۱:۰۰ - ۱۲:۰۰",
  "۱۲:۰۰ - ۱۳:۰۰",
  "۱۶:۰۰ - ۱۷:۰۰",
  "۱۷:۰۰ - ۱۸:۰۰",
  "۱۸:۰۰ - ۱۹:۰۰",
  "۱۹:۰۰ - ۲۰:۰۰",
];
