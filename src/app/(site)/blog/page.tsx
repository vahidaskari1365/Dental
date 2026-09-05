import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import {EmptyState, JsonLd, PageHero, Section, Breadcrumb } from "@/components/ui";
import { getPosts } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatFaDate, toFaDigits } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "بلاگ سلامت دهان و دندان | مقالات دندانپزشکی مهرادنت",
  description:
    "مقالات کاربردی دندانپزشکی به قلم پزشکان کلینیک مهرادنت: مراقبت بعد از ایمپلنت، مقایسه ارتودنسی نامرئی و براکت، خونریزی لثه، بهداشت دهان کودکان و بلیچینگ.",
  path: "/blog",
  keywords: ["بلاگ دندانپزشکی", "مقالات سلامت دهان", "مراقبت بعد از ایمپلنت", "ارتودنسی نامرئی یا براکت"],
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const posts = await getPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const activeCategory = cat && categories.includes(cat) ? cat : "";
  const filtered = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts;
  const [featured, ...rest] = filtered;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "بلاگ", path: "/blog" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "بلاگ سلامت دهان مهرادنت",
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt.toISOString(),
            author: { "@type": "Person", name: post.author },
            url: `/blog/${post.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow={`${toFaDigits(posts.length)} مقاله تخصصی`}
        title="بلاگ سلامت دهان و دندان"
        description="مقالات کوتاه و کاربردی، نوشته‌شده توسط پزشکان کلینیک؛ بدون اغراق تبلیغاتی."
        breadcrumb={<Breadcrumb current="بلاگ" />}
      />

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
              activeCategory === ""
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-brand-100 bg-white text-ink-700 hover:border-brand-300"
            }`}
          >
            همه مقالات
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog?cat=${encodeURIComponent(category)}`}
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

        {filtered.length === 0 ? (
          <EmptyState title="مقاله‌ای یافت نشد" description="به‌زودی مقالات این دسته منتشر می‌شود." />
        ) : (
          <div className="grid gap-10">
            {featured ? (
              <article className="surface-card grid overflow-hidden lg:grid-cols-2">
                <div className="relative min-h-64">
                  <Image
                    src={featured.coverUrl ?? "/images/clinic-room.jpg"}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-brand-600 px-3 py-1 font-bold text-white">مقاله ویژه</span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-700">{featured.category}</span>
                    <span className="text-ink-500">{formatFaDate(featured.publishedAt)}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold leading-9 text-brand-950">
                    <Link href={`/blog/${featured.slug}`} className="transition hover:text-brand-600">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-4 leading-8 text-ink-700">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="font-bold text-brand-700">{featured.author}</span>
                    <Link href={`/blog/${featured.slug}`} className="btn-ghost !px-5 !py-2.5 text-sm">
                      مطالعه مقاله
                      <ArrowIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}

            {rest.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <article key={post.slug} className="surface-card overflow-hidden">
                    <div className="relative aspect-16/9">
                      <Image
                        src={post.coverUrl ?? "/images/clinic-room.jpg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-ink-500">
                        <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-700">{post.category}</span>
                        <span>{toFaDigits(post.readMinutes)} دقیقه مطالعه</span>
                      </div>
                      <h3 className="mt-3 text-lg font-extrabold leading-8 text-brand-950">
                        <Link href={`/blog/${post.slug}`} className="transition hover:text-brand-600">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-7 text-ink-700">{post.excerpt}</p>
                      <p className="mt-4 text-xs text-ink-500">
                        {post.author} · {formatFaDate(post.publishedAt)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </Section>
    </>
  );
}
