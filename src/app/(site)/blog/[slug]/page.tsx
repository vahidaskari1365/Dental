import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, CalendarIcon } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { JsonLd, Section } from "@/components/ui";
import { getPostBySlug, getPosts } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata, postJsonLd } from "@/lib/seo";
import { formatFaDate, toFaDigits } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return buildMetadata({ title: "مقاله یافت نشد", description: "این مقاله موجود نیست.", path: "/blog", noIndex: true });
  }
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverUrl ?? "/images/hero-clinic.jpg",
    type: "article",
    publishedTime: post.publishedAt.toISOString(),
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const others = (await getPosts({ limit: 4 })).filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "بلاگ", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={postJsonLd(post)} />

      <article>
        <header className="relative overflow-hidden bg-brand-950 pt-12 pb-40 text-white">
          <Image
            src={post.coverUrl ?? "/images/clinic-room.jpg"}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-950/40" aria-hidden />
          <div className="page-shell relative">
            <nav className="text-sm text-brand-200" aria-label="مسیر صفحه">
              <Link href="/" className="transition hover:text-white">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="transition hover:text-white">
                بلاگ
              </Link>
            </nav>
            <span className="mt-6 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-bold text-brand-100">
              {post.category}
            </span>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight md:text-4xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-brand-100/90">
              <span className="font-bold text-white">{post.author}</span>
              <span>· {formatFaDate(post.publishedAt)}</span>
              <span>· {toFaDigits(post.readMinutes)} دقیقه مطالعه</span>
            </div>
          </div>
        </header>

        <Section className="-mt-32">
          <div className="surface-card relative overflow-hidden">
            <div className="relative aspect-16/9">
              <Image
                src={post.coverUrl ?? "/images/clinic-room.jpg"}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="rounded-2xl bg-brand-50 p-5 text-lg font-bold leading-9 text-brand-900">{post.excerpt}</p>
              <Markdown content={post.content} />

              {post.tags.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-ink-50 px-4 py-1.5 text-sm font-bold text-ink-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-600 p-6 text-white">
                <div>
                  <p className="text-lg font-extrabold">برای درمان این مشکل نوبت بگیرید</p>
                  <p className="mt-1 text-sm text-white/85">معاینه اولیه و مشاوره درمان در مهرادنت رایگان است.</p>
                </div>
                <Link href="/appointment" className="btn-primary !bg-white !text-brand-800 hover:!bg-brand-50">
                  <CalendarIcon className="h-5 w-5" />
                  رزرو نوبت
                </Link>
              </div>
            </div>
          </div>
        </Section>

        {others.length ? (
          <Section tone="soft">
            <h2 className="mb-8 text-2xl font-extrabold text-brand-950">مقالات مرتبط</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((item) => (
                <article key={item.slug} className="surface-card p-6">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold leading-8 text-brand-950">
                    <Link href={`/blog/${item.slug}`} className="transition hover:text-brand-600">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-7 text-ink-700">{item.excerpt}</p>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700"
                  >
                    ادامه مطلب
                    <ArrowIcon className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
      </article>
    </>
  );
}
