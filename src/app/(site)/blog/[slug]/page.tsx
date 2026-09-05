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
        <header className="relative overflow-hidden bg-gradient-to-b from-night-900 via-night-950 to-night-950 pt-12 pb-40 text-white">
          <span className="aurora -start-24 -top-24 h-80 w-80 bg-brand-400/25" aria-hidden />
          <span className="aurora -end-20 top-10 h-72 w-72 bg-sand-400/12" style={{ animationDelay: "6s" }} aria-hidden />
          <span className="dots-pattern-light absolute inset-0 opacity-20" aria-hidden />
          <Image
            src={post.coverUrl ?? "/images/clinic-room.jpg"}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/80 to-night-950/30" aria-hidden />
          <div className="page-shell relative">
            <nav className="text-xs font-bold text-mint-200/70" aria-label="مسیر صفحه">
              <Link href="/" className="transition hover:text-mint-300">
                خانه
              </Link>
              <span className="mx-2 text-mint-400/60">/</span>
              <Link href="/blog" className="transition hover:text-mint-300">
                بلاگ
              </Link>
              <span className="mx-2 text-mint-400/60">/</span>
              <span aria-current="page" className="font-black text-mint-300">
                {post.category}
              </span>
            </nav>
            <span className="chip mt-6">
              {post.category}
            </span>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight md:text-4xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-mint-200/80">
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
              <p className="card-soft p-5 text-lg font-bold leading-9 text-brand-900">{post.excerpt}</p>
              <Markdown content={post.content} />

              {post.tags.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-mint-100 px-4 py-1.5 text-sm font-bold text-brand-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="ring-gradient relative mt-10 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[1.6rem] bg-gradient-to-l from-brand-800 to-night-900 p-6 text-white">
                <span className="dots-pattern-light absolute inset-0 opacity-15" aria-hidden />
                <div>
                  <p className="relative text-lg font-extrabold">برای درمان این مشکل نوبت بگیرید</p>
                  <p className="relative mt-1 text-sm text-mint-200/80">معاینه اولیه و مشاوره درمان در مهرادنت رایگان است.</p>
                </div>
                <Link href="/appointment" className="btn-gold relative">
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
                  <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-bold text-brand-700">
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
