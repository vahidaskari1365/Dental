import Link from "next/link";
import { deletePostAction } from "../actions";
import { PostForm } from "./post-form";
import { AdminButton, AdminCard, Notice, StatusPill } from "@/components/admin/ui";
import { getPosts } from "@/lib/data";
import { formatFaDate, toFaDigits } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
}) {
  const { saved, deleted, error } = await searchParams;
  const posts = await getPosts({ includeDrafts: true });

  return (
    <div className="grid gap-6">
      {saved ? <Notice kind="success">مقاله با موفقیت ذخیره شد.</Notice> : null}
      {deleted ? <Notice kind="success">مقاله حذف شد.</Notice> : null}
      {error ? <Notice kind="error">عنوان مقاله الزامی است.</Notice> : null}

      <AdminCard title="مقالات بلاگ" description={`${toFaDigits(posts.length)} مقاله در سایت ثبت شده است.`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="p-2 text-start">عنوان</th>
                <th className="p-2 text-start">دسته</th>
                <th className="p-2 text-start">نویسنده</th>
                <th className="p-2 text-start">تاریخ انتشار</th>
                <th className="p-2 text-start">وضعیت</th>
                <th className="p-2 text-start">اقدام</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-slate-100">
                  <td className="p-2">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="font-bold text-slate-800 hover:text-brand-700">
                      {post.title}
                    </Link>
                    <span className="mt-1 block font-mono text-xs text-slate-400" dir="ltr">
                      /blog/{post.slug}
                    </span>
                  </td>
                  <td className="p-2 text-slate-600">{post.category}</td>
                  <td className="p-2 text-slate-600">{post.author}</td>
                  <td className="p-2 text-xs text-slate-500">{formatFaDate(post.publishedAt)}</td>
                  <td className="p-2">
                    <StatusPill status={post.isPublished ? "done" : "todo"} />
                  </td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800 transition hover:bg-brand-100"
                      >
                        ویرایش
                      </Link>
                      <form action={deletePostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <AdminButton tone="danger" size="sm">
                          حذف
                        </AdminButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminCard title="افزودن مقاله جدید" description="محتوای سئوشده با ساختار تیتر و فهرست، نتیجه بهتری در گوگل می‌گیرد.">
        <details className="group">
          <summary className="mb-4 w-fit cursor-pointer rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700">
            نمایش فرم مقاله جدید
          </summary>
          <PostForm />
        </details>
      </AdminCard>
    </div>
  );
}
