import { asc, count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  appointments,
  galleryCases,
  posts,
  services,
  settings,
  tasks,
  teamMembers,
  testimonials,
} from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { DEFAULT_SETTINGS, type SiteSettings } from "./site";

let seedPromise: Promise<void> | null = null;

export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = seedDatabase().catch((error) => {
      seedPromise = null;
      console.error("[seed] failed", error);
    });
  }
  await seedPromise;
}

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (error) {
    console.error("[db] query failed", error);
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  await ensureSeeded();
  return safe(async () => {
    const rows = await db.select().from(settings);
    return { ...DEFAULT_SETTINGS, ...Object.fromEntries(rows.map((row) => [row.key, row.value])) } as SiteSettings;
  }, DEFAULT_SETTINGS);
}

export async function getServices(activeOnly = true) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id)),
    [] as typeof services.$inferSelect[],
  );
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getServiceBySlug(slug: string) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(services).where(eq(services.slug, slug)).limit(1),
    [] as typeof services.$inferSelect[],
  );
  return rows[0] ?? null;
}

export async function getTeamMembers(activeOnly = true) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id)),
    [] as typeof teamMembers.$inferSelect[],
  );
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getGalleryCases(activeOnly = true) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(galleryCases).orderBy(asc(galleryCases.sortOrder), asc(galleryCases.id)),
    [] as typeof galleryCases.$inferSelect[],
  );
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getPosts(options: { limit?: number; includeDrafts?: boolean } = {}) {
  await ensureSeeded();
  const { limit, includeDrafts = false } = options;
  const rows = await safe(
    async () => {
      const query = db.select().from(posts).orderBy(desc(posts.publishedAt));
      return limit ? await query.limit(limit) : await query;
    },
    [] as typeof posts.$inferSelect[],
  );
  return includeDrafts ? rows : rows.filter((row) => row.isPublished);
}

export async function getPostBySlug(slug: string, includeDrafts = false) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(posts).where(eq(posts.slug, slug)).limit(1),
    [] as typeof posts.$inferSelect[],
  );
  const post = rows[0] ?? null;
  if (!post) return null;
  return includeDrafts || post.isPublished ? post : null;
}

export async function getPostById(id: number) {
  const rows = await safe(
    () => db.select().from(posts).where(eq(posts.id, id)).limit(1),
    [] as typeof posts.$inferSelect[],
  );
  return rows[0] ?? null;
}

export async function getTestimonials(activeOnly = true) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(testimonials).orderBy(asc(testimonials.sortOrder), asc(testimonials.id)),
    [] as typeof testimonials.$inferSelect[],
  );
  return activeOnly ? rows.filter((row) => row.isActive) : rows;
}

export async function getTasks() {
  await ensureSeeded();
  return safe(
    () => db.select().from(tasks).orderBy(asc(tasks.sortOrder), asc(tasks.id)),
    [] as typeof tasks.$inferSelect[],
  );
}

export async function getAppointments(status?: string) {
  await ensureSeeded();
  const rows = await safe(
    () => db.select().from(appointments).orderBy(desc(appointments.createdAt)),
    [] as typeof appointments.$inferSelect[],
  );
  return status ? rows.filter((row) => row.status === status) : rows;
}

export async function getAppointmentStats() {
  await ensureSeeded();
  return safe(
    async () => {
      const [total] = await db.select({ value: count() }).from(appointments);
      const [pending] = await db
        .select({ value: count() })
        .from(appointments)
        .where(eq(appointments.status, "pending"));
      const [confirmed] = await db
        .select({ value: count() })
        .from(appointments)
        .where(eq(appointments.status, "confirmed"));
      return {
        total: Number(total?.value ?? 0),
        pending: Number(pending?.value ?? 0),
        confirmed: Number(confirmed?.value ?? 0),
      };
    },
    { total: 0, pending: 0, confirmed: 0 },
  );
}

export async function getPublicCounts() {
  await ensureSeeded();
  return safe(
    async () => {
      const [serviceCount] = await db.select({ value: count() }).from(services);
      const [teamCount] = await db.select({ value: count() }).from(teamMembers);
      const [postCount] = await db.select({ value: count() }).from(posts);
      const [caseCount] = await db.select({ value: count() }).from(galleryCases);
      return {
        services: Number(serviceCount?.value ?? 0),
        team: Number(teamCount?.value ?? 0),
        posts: Number(postCount?.value ?? 0),
        cases: Number(caseCount?.value ?? 0),
      };
    },
    { services: 0, team: 0, posts: 0, cases: 0 },
  );
}
