"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  appointments,
  galleryCases,
  posts,
  services,
  settings,
  tasks,
  teamMembers,
} from "@/db/schema";
import { checkPassword, endAdminSession, isAdminAuthenticated, startAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

function str(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

function num(data: FormData, key: string): number {
  const value = Number(str(data, key));
  return Number.isFinite(value) ? value : 0;
}

function bool(data: FormData, key: string): boolean {
  return str(data, key) === "on" || str(data, key) === "true";
}

function list(data: FormData, key: string): string[] {
  return str(data, key)
    .split(/\n|،|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function guard() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin");
}

function refreshPublic(paths: string[]) {
  for (const path of paths) revalidatePath(path);
}

/* ---------------------------------- auth ---------------------------------- */

export async function loginAction(
  _state: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  const password = str(formData, "password");
  if (!checkPassword(password)) {
    return { error: "رمز عبور نادرست است. دوباره تلاش کنید." };
  }
  await startAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endAdminSession();
  redirect("/admin");
}

/* ---------------------------------- posts --------------------------------- */

export async function savePostAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const title = str(formData, "title");
  if (!title) redirect("/admin/posts?error=title");

  const slug = str(formData, "slug") || slugify(title) || `post-${Date.now()}`;
  const values = {
    title,
    slug,
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    coverUrl: str(formData, "coverUrl") || null,
    category: str(formData, "category") || "سلامت دهان",
    author: str(formData, "author") || "تیم تحریریه",
    tags: list(formData, "tags"),
    readMinutes: num(formData, "readMinutes") || 4,
    isPublished: bool(formData, "isPublished"),
    seoTitle: str(formData, "seoTitle") || null,
    seoDescription: str(formData, "seoDescription") || null,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(posts).set(values).where(eq(posts.id, id));
  } else {
    await db.insert(posts).values({ ...values, publishedAt: new Date() });
  }

  refreshPublic(["/blog", `/blog/${slug}`, "/admin/posts", "/sitemap.xml"]);
  redirect("/admin/posts?saved=1");
}

export async function deletePostAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) await db.delete(posts).where(eq(posts.id, id));
  refreshPublic(["/blog", "/admin/posts"]);
  redirect("/admin/posts?deleted=1");
}

/* -------------------------------- services -------------------------------- */

export async function saveServiceAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const title = str(formData, "title");
  if (!title) redirect("/admin/services?error=title");
  const slug = str(formData, "slug") || slugify(title) || `service-${Date.now()}`;

  const values = {
    title,
    slug,
    summary: str(formData, "summary"),
    description: str(formData, "description"),
    icon: str(formData, "icon") || "smile",
    price: str(formData, "price") || null,
    duration: str(formData, "duration") || null,
    features: list(formData, "features"),
    imageUrl: str(formData, "imageUrl") || null,
    sortOrder: num(formData, "sortOrder"),
    isActive: bool(formData, "isActive"),
    seoTitle: str(formData, "seoTitle") || null,
    seoDescription: str(formData, "seoDescription") || null,
  };

  if (id) {
    await db.update(services).set(values).where(eq(services.id, id));
  } else {
    await db.insert(services).values(values);
  }

  refreshPublic(["/", "/services", `/services/${slug}`, "/admin/services"]);
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) await db.delete(services).where(eq(services.id, id));
  refreshPublic(["/", "/services", "/admin/services"]);
  redirect("/admin/services?deleted=1");
}

/* ---------------------------------- team ---------------------------------- */

export async function saveTeamAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const name = str(formData, "name");
  if (!name) redirect("/admin/team?error=name");
  const slug = str(formData, "slug") || slugify(name) || `member-${Date.now()}`;

  const values = {
    name,
    slug,
    role: str(formData, "role"),
    specialty: str(formData, "specialty") || null,
    bio: str(formData, "bio"),
    imageUrl: str(formData, "imageUrl") || null,
    experienceYears: num(formData, "experienceYears"),
    sortOrder: num(formData, "sortOrder"),
    isActive: bool(formData, "isActive"),
  };

  if (id) {
    await db.update(teamMembers).set(values).where(eq(teamMembers.id, id));
  } else {
    await db.insert(teamMembers).values(values);
  }

  refreshPublic(["/team", "/", "/admin/team"]);
  redirect("/admin/team?saved=1");
}

export async function deleteTeamAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) await db.delete(teamMembers).where(eq(teamMembers.id, id));
  refreshPublic(["/team", "/admin/team"]);
  redirect("/admin/team?deleted=1");
}

/* -------------------------------- gallery --------------------------------- */

export async function saveGalleryAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const title = str(formData, "title");
  if (!title) redirect("/admin/gallery?error=title");

  const values = {
    title,
    category: str(formData, "category") || "عمومی",
    description: str(formData, "description"),
    beforeUrl: str(formData, "beforeUrl") || "/images/gallery/case-1-before.jpg",
    afterUrl: str(formData, "afterUrl") || "/images/gallery/case-1-after.jpg",
    doctorName: str(formData, "doctorName") || null,
    durationText: str(formData, "durationText") || null,
    sortOrder: num(formData, "sortOrder"),
    isActive: bool(formData, "isActive"),
  };

  if (id) {
    await db.update(galleryCases).set(values).where(eq(galleryCases.id, id));
  } else {
    await db.insert(galleryCases).values(values);
  }

  refreshPublic(["/gallery", "/", "/admin/gallery"]);
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) await db.delete(galleryCases).where(eq(galleryCases.id, id));
  refreshPublic(["/gallery", "/admin/gallery"]);
  redirect("/admin/gallery?deleted=1");
}

/* ------------------------------ appointments ------------------------------ */

export async function updateAppointmentStatusAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const status = str(formData, "status");
  if (id && status) {
    await db.update(appointments).set({ status }).where(eq(appointments.id, id));
  }
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  redirect("/admin/appointments?updated=1");
}

export async function deleteAppointmentAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) await db.delete(appointments).where(eq(appointments.id, id));
  revalidatePath("/admin/appointments");
  redirect("/admin/appointments?deleted=1");
}

/* -------------------------------- settings -------------------------------- */

const SETTING_KEYS = [
  "clinicName",
  "clinicShortName",
  "tagline",
  "phone",
  "phone2",
  "whatsapp",
  "email",
  "address",
  "postalCode",
  "mapEmbedUrl",
  "mapLink",
  "workingHoursWeek",
  "workingHoursThu",
  "workingHoursFri",
  "instagram",
  "telegram",
  "siteUrl",
  "googleVerification",
  "emergencyNote",
] as const;

export async function saveSettingsAction(formData: FormData) {
  await guard();
  for (const key of SETTING_KEYS) {
    const value = str(formData, key);
    await db
      .insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value } });
  }
  refreshPublic(["/", "/contact", "/about", "/appointment", "/admin/settings"]);
  redirect("/admin/settings?saved=1");
}

/* ---------------------------------- tasks --------------------------------- */

export async function saveTaskAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const title = str(formData, "title");
  if (!title) redirect("/admin/flow?error=title");

  const values = {
    title,
    phase: str(formData, "phase") || "فاز ۱ · راه‌اندازی",
    description: str(formData, "description"),
    owner: str(formData, "owner") || "تیم فنی",
    status: str(formData, "status") || "todo",
    sortOrder: num(formData, "sortOrder"),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(tasks).set(values).where(eq(tasks.id, id));
  } else {
    await db.insert(tasks).values(values);
  }
  revalidatePath("/admin/flow");
  redirect("/admin/flow?saved=1");
}

export async function updateTaskStatusAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const status = str(formData, "status");
  if (id && status) {
    await db.update(tasks).set({ status, updatedAt: new Date() }).where(eq(tasks.id, id));
  }
  revalidatePath("/admin/flow");
  redirect("/admin/flow?updated=1");
}

export async function deleteTaskAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) await db.delete(tasks).where(eq(tasks.id, id));
  revalidatePath("/admin/flow");
  redirect("/admin/flow?deleted=1");
}
