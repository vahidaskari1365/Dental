import { DEFAULT_SETTINGS, type SiteSettings } from "./site";

/**
 * نسخه فرانت‌اَند: همه محتوای سایت به صورت ثابت (استاتیک) در همین فایل نگه‌داری می‌شود
 * و هیچ اتصالی به دیتابیس یا بک‌اند لازم نیست. برای ویرایش محتوا کافی است آرایه‌های
 * همین فایل را تغییر دهید.
 */

export type Service = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  price: string | null;
  duration: string | null;
  features: string[];
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
};

export type TeamMember = {
  id: number;
  slug: string;
  name: string;
  role: string;
  specialty: string | null;
  bio: string;
  imageUrl: string | null;
  experienceYears: number;
  sortOrder: number;
  isActive: boolean;
};

export type GalleryCase = {
  id: number;
  title: string;
  category: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  doctorName: string | null;
  durationText: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  category: string;
  author: string;
  tags: string[];
  readMinutes: number;
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: Date;
  updatedAt: Date;
};

export type Testimonial = {
  id: number;
  name: string;
  treatment: string | null;
  rating: number;
  comment: string;
  sortOrder: number;
  isActive: boolean;
};

const LAUNCH_DATE = new Date("2026-06-01T09:00:00+03:30");

const SERVICES: Service[] = [
  {
    id: 1,
    slug: "implant",
    title: "ایمپلنت دندان",
    summary: "جایگزینی دندان از دست رفته با ایمپلنت کره‌ای/سوئیسی و گارانتی مادام‌العمر فیکسچر.",
    description:
      "ایمپلنت دندان مطمئن‌ترین روش بازسازی دندان از دست رفته است. در کلینیک مهرادنت پس از سی‌تی‌اسکن سه‌بعدی و راه‌اندازی راهنمای جراحی دیجیتال، فیکسچر با زاویه و عمق دقیق در استخوان قرار می‌گیرد. کاشت ایمپلنت در جلسه‌ای ۳۰ تا ۶۰ دقیقه‌ای و اغلب بدون درد انجام می‌شود و روکش نهایی پس از ۳ تا ۴ ماه تحکیم استخوان ساخته می‌شود.",
    icon: "implant",
    price: "از ۲۴,۰۰۰,۰۰۰ تومان",
    duration: "۲ جلسه + پیگیری ۳ ماهه",
    features: [
      "سی‌تی‌اسکن سه‌بعدی و پلن درمان رایگان",
      "برندهای معتبر Osstem، Straumann و MegaGen",
      "جراحی فلپلس با خونریزی حداقلی",
      "بی‌حسی موضعی یا آرام‌بخشی (سدیشن)",
      "گارانتی مادام‌العمر فیکسچر",
    ],
    imageUrl: "/images/clinic-room.jpg",
    sortOrder: 1,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 2,
    slug: "orthodontics",
    title: "ارتودنسی ثابت و نامرئی",
    summary: "رتینر شفاف، براکت سرامیکی و لینگوال با پلن دیجیتال و شبیه‌سازی نتیجه نهایی.",
    description:
      "ارتودنسی فقط یک درمان زیبایی نیست؛ اصلاح ناهنجاری فک و ردیف نامرتب دندان، جویدن را بهبود می‌دهد، فشار از مفصل TMJ می‌گیرد و از پوسیدگی‌های بین دندانی جلوگیری می‌کند. با اسکن سه‌بعدی و شبیه‌سازی دیجیتال، نتیجه نهایی لبخند را قبل از شروع درمان می‌بینید.",
    icon: "aligner",
    price: "از ۵۵,۰۰۰,۰۰۰ تومان (تسویه اقساطی)",
    duration: "۶ تا ۲۴ ماه",
    features: [
      "ارتودنسی نامرئی با الاینر شفاف",
      "براکت سرامیکی هم‌رنگ دندان",
      "ارتودنسی لینگوال (پشت دندان)",
      "شبیه‌سازی دیجیتال نتیجه درمان",
      "پرداخت اقساطی بدون بهره",
    ],
    imageUrl: "/images/gallery/case-2-after.jpg",
    sortOrder: 2,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 3,
    slug: "laminate-veneer",
    title: "لمینت سرامیکی و کامپوزیت",
    summary: "طراحی لبخند هالیوودی با لمینت E-max، لمینت یک‌روزه و کامپوزیت ونیر.",
    description:
      "لمینت پوسته‌ای نازک از سرامیک است که روی سطح جلویی دندان قرار می‌گیرد و شکل، رنگ و طول دندان‌ها را اصلاح می‌کند. در مهرادنت قبل از تراش دندان، ماکاپ تشخیصی روی مدل دیجیتال ساخته می‌شود تا نتیجه را در دهان خودتان ببینید و بعد تصمیم بگیرید.",
    icon: "smile",
    price: "از ۹,۵۰۰,۰۰۰ تومان هر واحد",
    duration: "۲ تا ۳ جلسه",
    features: [
      "لمینت E-max با تراش مینیمال",
      "ماکاپ تشخیصی و پیش‌نمایش لبخند",
      "کامپوزیت ونیر در یک جلسه",
      "انتخاب رنگ با اسکنر دیجیتال",
      "پیگیری و پالیش سالانه رایگان",
    ],
    imageUrl: "/images/gallery/case-1-after.jpg",
    sortOrder: 3,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 4,
    slug: "teeth-whitening",
    title: "بلیچینگ و سفید کردن دندان",
    summary: "سفیدسازی حرفه‌ای با لیزر و ژل دفیس‌آفیس تا ۶ تا ۸ درجه روشن‌تر.",
    description:
      "بلیچینگ آفیس با ژل حرفه‌ای و لامپ LED در یک جلسه ۴۵ دقیقه‌ای انجام می‌شود. برای حساسیت کمتر از دسنه‌سیزایزر و فلوراید تراپی استفاده می‌کنیم. اگر دندان‌های شما دچار تغییر رنگ عمیق (تتراسایکلین یا فلوروزیس) هستند، پلن جایگزین لمینت یا کامپوزیت پیشنهاد می‌شود.",
    icon: "sparkle",
    price: "۴,۵۰۰,۰۰۰ تومان",
    duration: "یک جلسه ۴۵ دقیقه‌ای",
    features: [
      "سفیدسازی تا ۸ درجه روشن‌تر",
      "محافظت لثه با دسنه‌سیزایزر",
      "ژل خانگی و نگهدارنده اختصاصی",
      "بدون حساسیت با فلوراید تراپی",
    ],
    imageUrl: "/images/gallery/case-1-after.jpg",
    sortOrder: 4,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 5,
    slug: "pediatric-dentistry",
    title: "دندانپزشکی کودکان",
    summary: "معاینه، فلوراید ورنیش، فیسیوراپی و درمان بدون ترس با رویکرد کودک‌پسند.",
    description:
      "اولین معاینه دندانپزشکی کودک بهتر است تا پایان سال اول زندگی انجام شود. فضای کودکان ما با بازی و تکنیک «به من بگو، نشانم بده، انجام بده» طراحی شده تا کودک ترس دندانپزشکی پیدا نکند. در موارد لازم درمان با سدیشن آگاهانه و در همکاری با متخصص کودکان انجام می‌شود.",
    icon: "kids",
    price: "معاینه اولیه رایگان",
    duration: "۳۰ دقیقه",
    features: [
      "فلوراید ورنیش هر ۶ ماه",
      "فیسیوراپی و سیلانت شیارها",
      "درمان پوسیدگی شیری و فضانگهدارنده",
      "سدیشن آگاهانه برای کودکان بی‌قرار",
      "آموزش مسواک‌زدن به والدین",
    ],
    imageUrl: "/images/hero-clinic.jpg",
    sortOrder: 5,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 6,
    slug: "root-canal",
    title: "درمان ریشه (اندودنتیکس)",
    summary: "درمان ریشه با روتاری و میکروسکوپ در یک تا دو جلسه، بدون درد.",
    description:
      "درمان ریشه دندانِ درد گرفته یا عصب‌گرفته را نجات می‌دهد. با فایل‌های روتاری و دستگاه اپکس‌لوکیتور، طول کانال با دقت ۰/۵ میلی‌متر تعیین می‌شود و کانال‌ها در یک جلسه پاک‌سازی و آب‌بندی می‌شوند. درد پس از درمان با مسکن ساده کنترل می‌شود.",
    icon: "root",
    price: "از ۶,۰۰۰,۰۰۰ تومان",
    duration: "۱ تا ۲ جلسه",
    features: [
      "درمان با فایل روتاری و مگنیتیک",
      "تعیین طول کانال با اپکس‌لوکیتور",
      "یک‌سشن در اکثر موارد",
      "روکش یا Onlay حفاظتی پس از درمان",
    ],
    imageUrl: "/images/clinic-room.jpg",
    sortOrder: 6,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 7,
    slug: "gum-treatment",
    title: "جراحی لثه و پریودانتیکس",
    summary: "جرم‌گیری عمیق، درمان تحلیل لثه و جراحی پلاستیک خط لبخند.",
    description:
      "لثه سالم پایه لبخند سالم است. خونریزی لثه، بوی بد دهان و تحلیل لثه نشانه پریودنتیت است که با جرم‌گیری عمیق، کورتاژ و در موارد پیشرفته با جراحی فلپ و پیوند بافت نرم کنترل می‌شود. ژنژیوکتومی و اصلاح خط لبخند (Gummy Smile) نیز در همین بخش انجام می‌گیرد.",
    icon: "gum",
    price: "از ۳,۵۰۰,۰۰۰ تومان",
    duration: "۱ تا ۳ جلسه",
    features: [
      "جرم‌گیری و بروساژ با دستگاه سونیک",
      "پیوستگی لثه و پیوند بافت نرم",
      "اصلاح لبخند لثه‌ای (Gummy Smile)",
      "پلن نگهداری سه‌ماهه",
    ],
    imageUrl: "/images/clinic-room.jpg",
    sortOrder: 7,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
  {
    id: 8,
    slug: "digital-smile-design",
    title: "طراحی دیجیتال لبخند (DSD)",
    summary: "شبیه‌سازی سه‌بعدی لبخند شما قبل از هر تراش و درمانی.",
    description:
      "در طراحی دیجیتال لبخند، عکس و اسکن سه‌بعدی دندان‌های شما با فرم صورت، خط لب و نسبت‌های طلایی ترکیب می‌شود. خروجی، پیش‌نمایش دقیق نتیجه نهایی است که روی آن تصمیم می‌گیرید: لمینت، کامپوزیت، ارتودنسی یا فقط سفیدسازی.",
    icon: "design",
    price: "۲,۵۰۰,۰۰۰ تومان (در صورت درمان رایگان)",
    duration: "یک جلسه طراحی",
    features: [
      "اسکنر اینترااورال بدون قالب‌گیری",
      "پیش‌نمایش سه‌بعدی چهره و لبخند",
      "ماکاپ قابل تست در دهان",
      "پلن مالی شفاف پیش از شروع",
    ],
    imageUrl: "/images/hero-clinic.jpg",
    sortOrder: 8,
    isActive: true,
    seoTitle: null,
    seoDescription: null,
    createdAt: LAUNCH_DATE,
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    slug: "dr-sara-mohammadi",
    name: "دکتر سارا محمدی",
    role: "دندانپزشک عمومی و زیبایی",
    specialty: "کارشناس ارشد طراحی دیجیتال لبخند",
    bio: "فارغ‌التحصیل دانشگاه شهید بهشتی با ۱۲ سال تجربه در لمینت، کامپوزیت و بازسازی کامل دهان. بیش از ۲٬۵۰۰ مورد لبخند طراحی‌شده.",
    imageUrl: "/images/team/doctor-1.jpg",
    experienceYears: 12,
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    slug: "dr-amir-rezaei",
    name: "دکتر امیر رضایی",
    role: "متخصص ایمپلنت و جراحی فک و صورت",
    specialty: "ایمپلنت فوری، آنکیلوز و سینوس‌لیفت",
    bio: "بورد تخصصی جراحی فک و صورت از دانشگاه تهران، عضو انجمن ایمپلنت ایران. انجام بیش از ۴٬۰۰۰ جراحی ایمپلنت با گاید دیجیتال.",
    imageUrl: "/images/team/doctor-2.jpg",
    experienceYears: 18,
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    slug: "dr-maryam-hosseini",
    name: "دکتر مریم حسینی",
    role: "متخصص ارتودنسی",
    specialty: "ارتودنسی نامرئی، لینگوال و ارتودنسی کودکان",
    bio: "متخصص ارتودنسی و فک و صورت، مدرس دوره الاینر شفاف. طراحی پلن دیجیتال ارتودنسی با شبیه‌سازی نتیجه نهایی.",
    imageUrl: "/images/team/doctor-3.jpg",
    experienceYears: 10,
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    slug: "dr-kaveh-naderi",
    name: "دکتر کاوه نادری",
    role: "متخصص درمان ریشه (اندودنتیست)",
    specialty: "درمان ریشه با میکروسکوپ و اندودنتیکس مجدد",
    bio: "فلوشیپ اندودنتیکس میکروسکوپی، درمان ریشه‌های دشوار و شکستگی‌های ابزار داخل کانال با موفقیت بالای ۹۵٪.",
    imageUrl: "/images/team/doctor-4.jpg",
    experienceYears: 22,
    sortOrder: 4,
    isActive: true,
  },
];

const GALLERY_CASES: GalleryCase[] = [
  {
    id: 1,
    title: "سفیدسازی حرفه‌ای + بلیچینگ آفیس",
    category: "زیبایی",
    description: "پس از ۴۵ دقیقه بلیچینگ آفیس، رنگ دندان‌ها ۷ درجه روشن‌تر شد.",
    beforeUrl: "/images/gallery/case-1-before.jpg",
    afterUrl: "/images/gallery/case-1-after.jpg",
    doctorName: "دکتر سارا محمدی",
    durationText: "یک جلسه",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "ارتودنسی نامرئی با الاینر شفاف",
    category: "ارتودنسی",
    description: "رفع شلوغی دندان‌های جلو در ۱۴ ماه با ۲۲ ست الاینر.",
    beforeUrl: "/images/gallery/case-2-before.jpg",
    afterUrl: "/images/gallery/case-2-after.jpg",
    doctorName: "دکتر مریم حسینی",
    durationText: "۱۴ ماه",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    title: "بازسازی کامپوزیتی دندان‌های جلو",
    category: "ترمیمی",
    description: "ترمیم کامپوزیت مستقیم در یک جلسه بدون تراش قابل توجه.",
    beforeUrl: "/images/gallery/case-1-before.jpg",
    afterUrl: "/images/gallery/case-1-after.jpg",
    doctorName: "دکتر سارا محمدی",
    durationText: "یک جلسه",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    title: "اصلاح نامرتبی شدید با براکت سرامیکی",
    category: "ارتودنسی",
    description: "درمان نامرتبی شدید و اصلاح اوربایت با براکت سرامیکی هم‌رنگ دندان.",
    beforeUrl: "/images/gallery/case-2-before.jpg",
    afterUrl: "/images/gallery/case-2-after.jpg",
    doctorName: "دکتر مریم حسینی",
    durationText: "۲۰ ماه",
    sortOrder: 4,
    isActive: true,
  },
];

const POST_BASE_DATE = new Date("2026-08-20T10:00:00+03:30").getTime();

function postDate(index: number): Date {
  return new Date(POST_BASE_DATE - index * 86400000 * 3);
}

const POSTS: Post[] = [
  {
    id: 1,
    slug: "after-implant-care",
    title: "مراقبت بعد از ایمپلنت دندان؛ راهنمای ۷ روز اول",
    excerpt:
      "هفته اول پس از جراحی ایمپلنت، تعیین‌کننده‌ترین دوره در موفقیت درمان است. این راهنما چک‌لیست دقیق مراقبت، غذاهای مجاز و علائم هشدار را توضیح می‌دهد.",
    category: "مراقبت پس از درمان",
    author: "دکتر امیر رضایی",
    tags: ["ایمپلنت", "مراقبت", "جراحی"],
    readMinutes: 6,
    coverUrl: "/images/clinic-room.jpg",
    content: `## چرا ۷ روز اول مهم‌ترین دوره است؟
در هفته اول، لخته خون روی محل جراحی شکل می‌گیرد و اولین مرحله‌ی استخوان‌سازی آغاز می‌شود. هر فشار، سیگار یا دهان‌شویه نامناسب می‌تواند این لخته را از بین ببرد و موجب شکست ایمپلنت شود.

## چک‌لیست روز اول
- کمپرس سرد به صورت، ۲۰ دقیقه روشن و ۲۰ دقیقه استراحت
- خوردن یخ و غذای سرد نرم در ۶ ساعت اول
- تف کردن ممنوع؛ جایگزین آن، آب‌دهان آرام با آب نمک ولرم از روز دوم
- استراحت با سر بالا (دو بالش) در شب اول

## غذاهای مجاز و ممنوع
**مجاز:** سوپ ولرم، پوره سیب‌زمینی، ماست، املت نرم، آب‌میوه بدون نی، برنج نرم.
**ممنوع:** غذای داغ، آجیل و غذای سخت، نوشیدنی گازدار، الکل، قهوه داغ در ۴۸ ساعت اول.

## داروها
آنتی‌بیوتیک دقیقاً تا پایان دوره مصرف شود؛ قطع زودهنگام آن خطر عفونت را چند برابر می‌کند. مسکن‌ها با معده پر مصرف شوند.

## علائم هشدار؛ کی تماس بگیرم؟
- خونریزی مستمر بیش از ۴ ساعت
- تورم که بعد از روز سوم بیشتر شود
- تب بالای ۳۸ درجه
- درد شدیدی که با مسکن کنترل نشود
- بیرون‌زدگی یا شل شدن فیکسچر

## نکته پایانی
موبایل یادتان نرود: ما در کلینیک مهرادنت برای هر بیمار ایمپلنت، پکیج مراقبت و شماره پیگیری مستقیم ارائه می‌کنیم تا در صورت بروز هر علامتی در همان ساعت پاسخ بگیرید.`,
    isPublished: true,
    seoTitle: null,
    seoDescription: null,
    publishedAt: postDate(0),
    updatedAt: postDate(0),
  },
  {
    id: 2,
    slug: "invisible-braces-vs-fixed",
    title: "ارتودنسی نامرئی یا براکت ثابت؟ مقایسه صادقانه",
    excerpt:
      "الاینر شفاف برای همه مناسب نیست. در این مقاله تفاوت ارتودنسی نامرئی، براکت فلزی و سرامیکی را از نظر سرعت، هزینه، راحتی و نتیجه نهایی مقایسه کرده‌ایم.",
    category: "ارتودنسی",
    author: "دکتر مریم حسینی",
    tags: ["ارتودنسی", "الاینر", "براکت"],
    readMinutes: 7,
    coverUrl: "/images/gallery/case-2-after.jpg",
    content: `## سه گزینه اصلی
**براکت فلزی:** سریع‌ترین و اقتصادی‌ترین گزینه برای اصلاح نامرتبی شدید. ظاهرش جزئی است اما کنترل دندان‌ها حداکثری است.
**براکت سرامیکی:** همان کارایی با ظاهر هم‌رنگ دندان؛ کمی شکننده‌تر و گران‌تر.
**الاینر شفاف:** تقریباً نامرئی، قابل جدا کردن برای غذا خوردن و مسواک زدن.

## چه زمانی الاینر جواب می‌دهد؟
- شلوغی خفیف تا متوسط دندان
- فضای کم در فک
- بیمار با همکاری بالا (۲۲ ساعت در شبانه‌روز)
- اصلاح جزئی پس از درمان قبلی

## چه زمانی براکت بهتر است؟
جابجایی ریشه‌های شدید، کشیدن دندان، اصلاح اسکلتتی فک و مواردی که نیاز به کنترل نیروی پیچیده دارند.

## جدول مقایسه
- سرعت: براکت ثابت ۱۲ تا ۲۴ ماه، الاینر ۸ تا ۱۸ ماه
- ظاهر: الاینر برنده است
- بهداشت دهان: الاینر برنده است (مسواک راحت)
- هزینه: براکت فلزی اقتصادی‌ترین
- همکاری بیمار: الاینر به انضباط زیاد نیاز دارد

## جمع‌بندی
انتخاب درست به اسکن سه‌بعدی و تشخیص متخصص بستگی دارد. جلسه مشاوره در مهرادنت با شبیه‌سازی دیجیتال انجام می‌شود تا نتیجه را قبل از شروع ببینید.`,
    isPublished: true,
    seoTitle: null,
    seoDescription: null,
    publishedAt: postDate(1),
    updatedAt: postDate(1),
  },
  {
    id: 3,
    slug: "bleeding-gums",
    title: "خونریزی لثه را نادیده نگیرید؛ اولین زنگ خطر پریودنتیت",
    excerpt:
      "خونریزی لثه هنگام مسواک‌زدن طبیعی نیست. در این مقاله علت‌ها، درمان خانگی موقت و زمان مراجعه به متخصص لثه را بررسی می‌کنیم.",
    category: "سلامت لثه",
    author: "دکتر سارا محمدی",
    tags: ["لثه", "پریودنتیت", "جرم‌گیری"],
    readMinutes: 5,
    coverUrl: "/images/clinic-room.jpg",
    content: `## علت اصلی: التهاب لثه
پلاک میکروبی روی خط لثه جمع می‌شود و بدن با افزایش خون‌رسانی پاسخ می‌دهد؛ نتیجه‌اش تورم و خونریزی است. اگر پلاک سخت شود و به جرم تبدیل شود، دیگر با مسواک برداشته نمی‌شود.

## علائم هشدار پریودنتیت
- خونریزی مکرر هنگام مسواک یا نخ دندان
- بوی بد مزمن دهان
- تحلیل لثه و دراز شدن دندان‌ها
- لقی خفیف دندان
- چرک بین دندان و لثه

## چه کارهایی در خانه کمک می‌کند؟
- مسواک نرم دو بار در روز، حداقل دو دقیقه
- نخ دندان یا آب‌پاش روزانه
- دهان‌شویه کلرهگزیدین در دوره کوتاه (حداکثر ۲ هفته)
- ترک سیگار و مدیریت دیابت

## درمان در کلینیک
جرم‌گیری و بروساژ در موارد خفیف کافی است. در پریودنتیت متوسط تا شدید، کورتاژ عمیق و در موارد پیشرفته جراحی فلپ یا پیوند بافت نرم لازم می‌شود.

## نکته مهم
پریودنتیت پیشرفته نه‌تنها دندان را از دست می‌دهد، بلکه با بیماری‌های قلبی و کنترل قند خون هم مرتبط است. جرم‌گیری هر ۶ ماه بهترین سرمایه‌گذاری است.`,
    isPublished: true,
    seoTitle: null,
    seoDescription: null,
    publishedAt: postDate(2),
    updatedAt: postDate(2),
  },
  {
    id: 4,
    slug: "kids-first-dental-visit",
    title: "اولین ملاقات کودک با دندانپزشک؛ راهنمای والدین",
    excerpt:
      "بهترین زمان اولین معاینه، ظهور اولین دندان است. با این چند ترفند ساده، ترس دندانپزشکی کودک را از ابتدا از بین ببرید.",
    category: "دندانپزشکی کودکان",
    author: "دکتر سارا محمدی",
    tags: ["کودکان", "پیشگیری", "فلوراید"],
    readMinutes: 4,
    coverUrl: "/images/hero-clinic.jpg",
    content: `## بهترین زمان
انجمن دندانپزشکی کودکان توصیه می‌کند اولین معاینه در پایان سال اول زندگی یا حداکثر ۶ ماه پس از رویش اولین دندان انجام شود.

## قبل از مراجعه چه بگوییم؟
- از کلمات «درد»، «سوزن» و «ترس» استفاده نکنید.
- قرار را «بازی با دندان‌پزشک» معرفی کنید، نه درمان.
- ساعت قرار را در ساعتی بگذارید که کودک خواب‌آلود یا گرسنه نباشد.

## در جلسه چه می‌گذرد؟
معاینه بازی‌محور، شمارش دندان‌ها با آینه، فلوراید ورنیش و آموزش مسواک‌زدن به والدین. در صورت نیاز سیلانت شیارها برای دندان‌های آسیای شش‌ساله انجام می‌شود.

## پیشگیری در خانه
مسواک با خمیردندان فلوراید به اندازه یک ناخن از لحظه رویش اولین دندان، دو بار در روز. تا ۶ سالگی مسواک‌زدن باید توسط والدین تکمیل شود.`,
    isPublished: true,
    seoTitle: null,
    seoDescription: null,
    publishedAt: postDate(3),
    updatedAt: postDate(3),
  },
  {
    id: 5,
    slug: "ramadan-dental-care",
    title: "بهداشت دهان در ماه‌های پرفشار کاری و سفر",
    excerpt:
      "تغییر ساعت غذا خوردن، خشکی دهان را افزایش می‌دهد و خطر پوسیدگی را بالا می‌برد. چند راهکار عملی برای حفظ سلامت دهان در روزهای شلوغ.",
    category: "سلامت دهان",
    author: "تیم تحریریه مهرادنت",
    tags: ["بهداشت دهان", "پوسیدگی", "زندگی روزمره"],
    readMinutes: 4,
    coverUrl: "/images/clinic-room.jpg",
    content: `## خشکی دهان؛ دشمن پنهان
کاهش بزاق، اسید دهان را خنثی نمی‌کند. مصرف کافی آب، جویدن آدامس بدون شکر و پرهیز از مصرف مداوم قهوه، خشکی دهان را کاهش می‌دهد.

## میان‌وعده چسبنده
خرما، شکلات و چیپس مدت طولانی روی دندان می‌مانند. اگر امکان مسواک نیست، آب دهان را با آب ولرم بشویید و یک عدس پنیر یا مغز گردو بخورید تا pH دهان برگردد.

## مسواک سفر
یک مسواک کوچک و نخ دندان در کیف کار، احتمال مسواک‌زدن را چند برابر می‌کند. دهان‌شویه بدون الکل جایگزین موقت خوبی است، نه دائمی.

## زمان مراجعه
معاینه هر ۶ ماه، پیش از آنکه پوسیدگی به عصب برسد، هم درد را حذف می‌کند و هم هزینه درمان را تا ۸۰٪ کاهش می‌دهد.`,
    isPublished: true,
    seoTitle: null,
    seoDescription: null,
    publishedAt: postDate(4),
    updatedAt: postDate(4),
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "نگار احمدی",
    treatment: "لمینت سرامیکی",
    rating: 5,
    comment:
      "دقیقاً همان چیزی شد که در شبیه‌سازی دیده بودم. دکتر محمدی قبل از تراش مکاپ گذاشت و نتیجه را تأیید کردم.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "مهدی کاظمی",
    treatment: "ایمپلنت",
    rating: 5,
    comment: "بعد از ۱۵ سال بی‌دندانی، دو ایمپلنت گذاشتم. جراحی بدون درد بود و روز بعد سر کار بودم.",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "الهام رستمی",
    treatment: "ارتودنسی نامرئی",
    rating: 5,
    comment: "کسی متوجه الاینرها نشد. نوبت‌دهی آنلاین خیلی کمک کرد که با کارم هماهنگ باشم.",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    name: "سعید مقدم",
    treatment: "درمان ریشه",
    rating: 5,
    comment: "درد شدید داشتیم و در همان روز پذیرش شدم. درمان ریشه در یک جلسه تمام شد.",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 5,
    name: "پریسا نوری",
    treatment: "بلیچینگ",
    rating: 4,
    comment: "دندان‌ها ۶ درجه روشن شد. حساسیت جزئی داشت که با ژل فلوراید کنترل شد.",
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 6,
    name: "رضا شریفی",
    treatment: "جرم‌گیری",
    rating: 5,
    comment:
      "کلینیک تمیز و منظم، وقت‌ها دقیق رعایت می‌شود و پذیرش خیلی محترمانه برخورد می‌کند.",
    sortOrder: 6,
    isActive: true,
  },
];

/* ---------------------------------- API خواندنی ---------------------------------- */

export async function getSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS;
}

export async function getServices(activeOnly = true): Promise<Service[]> {
  const rows = [...SERVICES].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return SERVICES.find((row) => row.slug === slug) ?? null;
}

export async function getTeamMembers(activeOnly = true): Promise<TeamMember[]> {
  const rows = [...TEAM_MEMBERS].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getGalleryCases(activeOnly = true): Promise<GalleryCase[]> {
  const rows = [...GALLERY_CASES].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getPosts(
  options: { limit?: number; includeDrafts?: boolean } = {},
): Promise<Post[]> {
  const { limit, includeDrafts = false } = options;
  const rows = [...POSTS]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit ?? POSTS.length);
  return includeDrafts ? rows : rows.filter((row) => row.isPublished);
}

export async function getPostBySlug(slug: string, includeDrafts = false): Promise<Post | null> {
  const post = POSTS.find((row) => row.slug === slug) ?? null;
  if (!post) return null;
  return includeDrafts || post.isPublished ? post : null;
}

export async function getTestimonials(activeOnly = true): Promise<Testimonial[]> {
  const rows = [...TESTIMONIALS].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

/** دسترسی همگام به داده‌های ثابت — برای استفاده در کامپوننت‌های کلاینت (مثل ویجت چت) */
export function getChatContext() {
  return { settings: DEFAULT_SETTINGS, services: SERVICES };
}
