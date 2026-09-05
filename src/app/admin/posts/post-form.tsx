import { savePostAction } from "../actions";
import { AdminButton, Field, SelectField, ToggleField } from "@/components/admin/ui";
import type { Post } from "@/db/schema";

const CATEGORIES = [
  "سلامت دهان",
  "مراقبت پس از درمان",
  "ارتودنسی",
  "زیبایی دندان",
  "ایمپلنت",
  "دندانپزشکی کودکان",
  "سلامت لثه",
];

export function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePostAction} className="grid gap-4">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="عنوان مقاله" name="title" defaultValue={post?.title} required placeholder="مثال: مراقبت بعد از ایمپلنت" />
        <Field
          label="نامک (slug) در آدرس"
          name="slug"
          defaultValue={post?.slug}
          dir="ltr"
          placeholder="after-implant-care"
          hint="در صورت خالی بودن، از عنوان ساخته می‌شود."
        />
        <SelectField label="دسته‌بندی" name="category" defaultValue={post?.category} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
        <Field label="نویسنده" name="author" defaultValue={post?.author ?? "تیم تحریریه"} />
        <Field label="زمان مطالعه (دقیقه)" name="readMinutes" type="number" defaultValue={post?.readMinutes ?? 4} />
        <Field
          label="آدرس تصویر شاخص"
          name="coverUrl"
          defaultValue={post?.coverUrl ?? "/images/clinic-room.jpg"}
          dir="ltr"
          hint="نمونه: /images/hero-clinic.jpg"
        />
      </div>

      <Field label="خلاصه (توضیح متا)" name="excerpt" defaultValue={post?.excerpt} rows={3} hint="۱۵۰ تا ۱۶۰ کاراکتر برای سئو بهترین نتیجه را می‌دهد." />
      <Field
        label="متن مقاله"
        name="content"
        defaultValue={post?.content}
        rows={14}
        hint="## برای تیتر، ### برای زیرتیتر و - برای فهرست استفاده کنید. **متن** برای پررنگ."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="برچسب‌ها (با کاما جدا کنید)" name="tags" defaultValue={post?.tags.join("، ")} />
        <ToggleField label="انتشار در سایت" name="isPublished" defaultChecked={post?.isPublished ?? true} />
        <Field label="عنوان سئو" name="seoTitle" defaultValue={post?.seoTitle ?? ""} hint="در صورت خالی بودن از عنوان مقاله استفاده می‌شود." />
        <Field label="توضیح سئو" name="seoDescription" defaultValue={post?.seoDescription ?? ""} rows={2} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <AdminButton>{post ? "ذخیره تغییرات" : "انتشار مقاله"}</AdminButton>
        <p className="text-xs text-slate-400">پس از ذخیره، صفحه مقاله و نقشه سایت به‌روزرسانی می‌شود.</p>
      </div>
    </form>
  );
}
