import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "../post-form";
import { AdminCard } from "@/components/admin/ui";
import { getPostById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminEditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  return (
    <AdminCard
      title={`ویرایش: ${post.title}`}
      description="تغییرات بلافاصله پس از ذخیره در سایت منتشر می‌شود."
      action={
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          className="text-xs font-bold text-brand-700 hover:underline"
        >
          مشاهده در سایت →
        </Link>
      }
    >
      <PostForm post={post} />
    </AdminCard>
  );
}
