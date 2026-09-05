import Link from "next/link";
import { BeforeAfterCard } from "@/components/before-after";
import { CalendarIcon } from "@/components/icons";
import { JsonLd, PageHero, Section, SectionHeading } from "@/components/ui";
import { getGalleryCases } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { toFaDigits } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "گالری قبل و بعد درمان | نمونه کارهای واقعی",
  description:
    "گالری نتایج واقعی درمان در کلینیک دندانپزشکی مهرادنت: بلیچینگ، ارتودنسی نامرئی، کامپوزیت و لمینت. تصاویر قبل و بعد را با اسلایدر مقایسه کنید.",
  path: "/gallery",
  keywords: ["قبل و بعد دندان", "نمونه کار لمینت", "نتیجه ارتودنسی", "گالری دندانپزشکی"],
});

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const cases = await getGalleryCases();
  const categories = Array.from(new Set(cases.map((item) => item.category)));
  const activeCategory = cat && categories.includes(cat) ? cat : "";
  const filtered = activeCategory ? cases.filter((item) => item.category === activeCategory) : cases;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "قبل و بعد", path: "/gallery" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "گالری قبل و بعد درمان‌های دندانپزشکی",
          image: cases.map((item) => item.afterUrl),
        }}
      />

      <PageHero
        eyebrow={`${toFaDigits(cases.length)} مورد منتشرشده`}
        title="گالری قبل و بعد درمان"
        description="دستگیره میانی تصاویر را بکشید و تفاوت را ببینید. تمام تصاویر با رضایت بیماران و بدون روتوش منتشر شده است."
        breadcrumb={
          <nav className="text-sm text-brand-200" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">قبل و بعد</span>
          </nav>
        }
      />

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/gallery"
            className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
              activeCategory === ""
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-brand-100 bg-white text-ink-700 hover:border-brand-300"
            }`}
          >
            همه موارد
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/gallery?cat=${encodeURIComponent(category)}`}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                activeCategory === category
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-brand-100 bg-white text-ink-700 hover:border-brand-300"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <BeforeAfterCard key={item.id} {...item} />
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="نتیجه خودتان را ببینید"
          title="پیش‌نمایش دیجیتال لبخند، قبل از شروع درمان"
          description="با اسکن سه‌بعدی و طراحی دیجیتال لبخند، نتیجه نهایی روی چهره خودتان شبیه‌سازی می‌شود."
        />
        <div className="text-center">
          <Link href="/appointment?service=digital-smile-design" className="btn-primary">
            <CalendarIcon className="h-5 w-5" />
            درخواست پیش‌نمایش لبخند
          </Link>
        </div>
      </Section>
    </>
  );
}
