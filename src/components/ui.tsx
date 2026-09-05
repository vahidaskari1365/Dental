import Link from "next/link";
import type { ReactNode } from "react";
import { StarIcon } from "./icons";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   مهرادنت — کامپوننت‌های پایه دیزاین‌سیستم «باغ نعنایی»
--------------------------------------------------------------------------- */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export type SectionTone =
  | "light"
  | "soft"
  | "mint"
  | "gradient"
  | "warm"
  | "sand"
  | "aurora"
  | "night"
  | "brand";

export function Section({
  children,
  className,
  id,
  tone = "light",
  divided = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
  /** خط جداکننده موجی بالای بخش */
  divided?: boolean;
}) {
  const tones: Record<SectionTone, string> = {
    light: "bg-transparent",
    soft: "bg-mint-100/75 backdrop-blur-sm",
    mint: "bg-mint-200/65",
    gradient: "bg-gradient-to-b from-mint-50/85 via-mint-100/80 to-mint-200/70",
    warm: "bg-gradient-to-br from-mint-100/85 via-mint-50/80 to-mint-200/75",
    sand: "bg-gradient-to-br from-sprout-100/55 via-mint-50/80 to-mint-200/70",
    aurora: "bg-gradient-to-br from-mint-200/85 via-mint-100/85 to-mint-50/85",
    night: "bg-night-950 text-white",
    brand: "bg-gradient-to-b from-brand-900 via-night-900 to-night-950 text-white",
  };
  const isDark = tone === "night" || tone === "brand";

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-16 md:py-24", tones[tone], className)}
    >
      {divided ? (
        <span className="pointer-events-none absolute inset-x-0 top-0" aria-hidden>
          <svg
            className="wave-divider h-10 w-full md:h-14"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={
                isDark
                  ? "M0 0h1440v36c-240 24-480 24-720 4S240-16 0 8Z"
                  : "M0 0h1440v44c-240-24-480-24-720-4S240 60 0 36Z"
              }
              fill={isDark ? "var(--color-mint-100)" : "var(--color-night-950)"}
            />
          </svg>
        </span>
      ) : null}

      {isDark ? (
        <>
          <span className="aurora start-[-8%] top-[-12%] h-80 w-80 bg-brand-400/30" aria-hidden />
          <span
            className="aurora end-[-10%] bottom-[-14%] h-96 w-96 bg-sprout-400/15"
            style={{ animationDelay: "6s" }}
            aria-hidden
          />
          <span
            className="aurora start-[45%] top-[30%] h-64 w-64 bg-sand-400/10"
            style={{ animationDelay: "11s" }}
            aria-hidden
          />
          <span className="dots-pattern-light absolute inset-0 opacity-25" aria-hidden />
          <span className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        </>
      ) : (
        <>
          <span className="leaf-pattern pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          <span className="wash -start-28 -top-24 h-96 w-96 bg-mint-200/70" aria-hidden />
          <span
            className="wash -end-28 bottom-[-10%] h-80 w-80 bg-sand-200/45"
            style={{ animationDelay: "7s" }}
            aria-hidden
          />
          <span
            className="wash start-1/3 top-1/2 h-72 w-72 bg-brand-100/60"
            style={{ animationDelay: "3s" }}
            aria-hidden
          />
        </>
      )}

      <div className="page-shell relative">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow-line mb-4",
            align === "center" && "justify-center",
            invert ? "text-mint-300" : "text-brand-600",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "display-1 text-balance",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("lede mt-5", invert ? "text-mint-200/80" : "text-ink-600")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-1 text-sand-400", className)}
      role="img"
      aria-label={`امتیاز ${rating} از ۵`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn("h-4 w-4", index < rating ? "opacity-100" : "opacity-25")}
        />
      ))}
    </div>
  );
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "sand" | "muted" | "glass" | "mint";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 border-brand-100",
    mint: "bg-mint-50 text-brand-700 border-mint-200",
    sand: "bg-sand-50 text-sand-600 border-sand-200",
    muted: "bg-mint-50 text-ink-700 border-mint-200",
    glass: "bg-white/10 text-white border-white/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- PageHero */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
      {/* بوم سبز با عکس کم‌رنگ مرتبط با کلینیک + لایه‌های نور */}
      <span className="hero-photo hero-photo-soft" aria-hidden />
      <span className="hero-photo-tint" aria-hidden />
      <span className="leaf-pattern pointer-events-none absolute inset-0" aria-hidden />
      <span className="wash -start-28 -top-24 h-96 w-96 bg-mint-200/80" aria-hidden />
      <span
        className="wash -end-24 -top-10 h-80 w-80 bg-sand-200/50"
        style={{ animationDelay: "5s" }}
        aria-hidden
      />
      <span
        className="wash start-[30%] bottom-[-30%] h-80 w-80 bg-brand-200/50"
        style={{ animationDelay: "9s" }}
        aria-hidden
      />
      <span className="dots-pattern absolute inset-x-0 bottom-0 h-40 opacity-50" aria-hidden />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-brand-300/70 to-transparent"
        aria-hidden
      />

      <div className="page-shell relative">
        <nav className="text-xs font-bold text-ink-500" aria-label="مسیر صفحه">
          {breadcrumb}
        </nav>
        {eyebrow ? (
          <span className="chip-light mt-7">
            <span className="anim-dot h-2 w-2 rounded-full bg-brand-500" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="display-hero mt-5 max-w-4xl text-balance text-ink-900 md:mt-6">{title}</h1>
        {description ? (
          <p className="lede mt-6 max-w-2xl text-balance md:text-lg">{description}</p>
        ) : null}
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- Accordion */
export function Accordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="surface-card group overflow-hidden px-6 py-5 transition-all [&_summary::-webkit-details-marker]:hidden"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start text-base font-extrabold text-ink-900 md:text-lg">
            {item.question}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-100 text-brand-700 transition duration-500 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
              +
            </span>
          </summary>
          <p className="mt-4 leading-8 text-ink-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- Stat */
export function Stat({
  value,
  label,
  invert = false,
}: {
  value: string;
  label: string;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 text-center transition duration-500 hover:-translate-y-1.5",
        invert ? "card-dark" : "border border-mint-200 bg-mint-50/92 shadow-mint-sm",
      )}
    >
      <div
        className={cn(
          "text-2xl font-black md:text-3xl",
          invert ? "text-white" : "text-brand-700",
        )}
      >
        {value}
      </div>
      <div className={cn("mt-1 text-xs font-bold", invert ? "text-mint-200/70" : "text-ink-500")}>
        {label}
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="surface-card p-12 text-center">
      <p className="text-lg font-extrabold text-ink-900">{title}</p>
      {description ? <p className="mt-2 text-ink-500">{description}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------- نوار اعلانات بالا */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x relative overflow-hidden py-1" aria-hidden>
      <div className="marquee-track gap-3">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-mint-200 bg-mint-50/85 px-4 py-1.5 text-xs font-bold text-brand-800"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------ بنر دعوت به اقدام */
export function CtaBanner({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: ReactNode;
  secondary?: ReactNode;
}) {
  return (
    <div className="ring-gradient relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-night-900 to-night-950 p-8 text-white shadow-mint-lg md:p-12">
      <span className="aurora -start-20 -top-24 h-72 w-72 bg-brand-400/30" aria-hidden />
      <span
        className="aurora -end-16 bottom-[-30%] h-72 w-72 bg-sand-400/15"
        style={{ animationDelay: "5s" }}
        aria-hidden
      />
      <span className="dots-pattern-light absolute inset-0 opacity-20" aria-hidden />
      <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="display-1 text-balance text-white">{title}</h2>
          <p className="mt-4 max-w-xl leading-8 text-mint-200/80">{text}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {primary}
          {secondary}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- برچسب مسیر صفحه */
export function Breadcrumb({ current }: { current: string }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      <li>
        <Link href="/" className="transition hover:text-brand-700">
          خانه
        </Link>
      </li>
      <li aria-hidden className="text-mint-400">
        /
      </li>
      <li aria-current="page" className="font-black text-brand-800">
        {current}
      </li>
    </ol>
  );
}
