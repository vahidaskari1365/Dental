import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** خدمات کلینیک */
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("🦷"),
  price: text("price"),
  duration: text("duration"),
  features: text("features").array().notNull().default([]),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** تیم درمان */
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  specialty: text("specialty"),
  bio: text("bio").notNull().default(""),
  imageUrl: text("image_url"),
  experienceYears: integer("experience_years").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

/** گالری قبل و بعد */
export const galleryCases = pgTable("gallery_cases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("عمومی"),
  description: text("description").notNull().default(""),
  beforeUrl: text("before_url").notNull(),
  afterUrl: text("after_url").notNull(),
  doctorName: text("doctor_name"),
  durationText: text("duration_text"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

/** بلاگ / مقالات (CMS) */
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverUrl: text("cover_url"),
  category: text("category").notNull().default("سلامت دهان"),
  author: text("author").notNull().default("تیم تحریریه"),
  tags: text("tags").array().notNull().default([]),
  readMinutes: integer("read_minutes").notNull().default(4),
  isPublished: boolean("is_published").notNull().default(true),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** نوبت‌دهی آنلاین */
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  serviceSlug: text("service_slug"),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time"),
  note: text("note"),
  status: text("status").notNull().default("pending"),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** نظرات بیماران */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  treatment: text("treatment"),
  rating: integer("rating").notNull().default(5),
  comment: text("comment").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

/** تنظیمات سایت (key/value) */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});

/** جریان کاری پروژه (الهام‌گرفته از ruflo): وظایف، فازها و وابستگی‌ها */
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  phase: text("phase").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  owner: text("owner").notNull().default("تیم فنی"),
  status: text("status").notNull().default("todo"),
  dependsOn: text("depends_on"),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type GalleryCase = typeof galleryCases.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Task = typeof tasks.$inferSelect;
