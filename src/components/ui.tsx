import type { ReactNode } from "react";
import { StarIcon } from "./icons";
import { cn } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "soft" | "night" | "brand";
}) {
  const tones: Record<string, string> = {
    light: "bg-white",
    soft: "bg-cream-100",
    night: "bg-brand-950 text-white",
    brand: "bg-brand-900 text-white",
  };
  const isDark = tone === "night" || tone === "brand";

  return (
    <section id={id} className={cn("relative overflow-hidden py-16 md:py-24", tones[tone], className)}>
      {isDark ? (
        <>
          <span className="aurora start-[-8%] top-[-10%] h-72 w-72 bg-brand-400/25" aria-hidden />
          <span
            className="aurora end-[-10%] bottom-[-12%] h-80 w-80 bg-sand-400/15"
            style={{ animationDelay: "6s" }}
            aria-hidden
          />
          <span className="dots-pattern-light absolute inset-0 opacity-30" aria-hidden />
        </>
      ) : tone === "soft" ? (
        <>
          <span className="wash -start-24 top-10 h-72 w-72 bg-brand-100/70" aria-hidden />
          <span
            className="wash -end-24 bottom-0 h-72 w-72 bg-sand-200/50"
            style={{ animationDelay: "7s" }}
            aria-hidden
          />
        </>
      ) : null}
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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  invert?: boolean;
}) {
  return (
    <div className={cn("mb-12 max-w-3xl", align === "center" ? "mx-auto text-center" : "text-start")}>
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow-line mb-4",
            align === "center" && "justify-center",
            invert ? "text-brand-200" : "text-brand-600",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className={cn("display-1", invert ? "text-white" : "text-ink-900")}>{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-8 md:text-lg", invert ? "text-white/70" : "text-ink-500")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 text-sand-400", className)} aria-label={`امتیاز ${rating} از ۵`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className={cn("h-4 w-4", index < rating ? "opacity-100" : "opacity-25")} />
      ))}
    </div>
  );
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "sand" | "muted" | "glass";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 border-brand-100",
    sand: "bg-sand-50 text-sand-600 border-sand-200",
    muted: "bg-cream-100 text-ink-700 border-cream-200",
    glass: "bg-white/10 text-white border-white/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold", tones[tone])}>
      {children}
    </span>
  );
}

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
    <header className="relative overflow-hidden bg-cream-50 pt-14 pb-14 md:pt-20 md:pb-20">
      <span className="wash -start-24 -top-16 h-80 w-80 bg-brand-100/80" aria-hidden />
      <span
        className="wash -end-24 top-10 h-72 w-72 bg-sand-200/60"
        style={{ animationDelay: "5s" }}
        aria-hidden
      />
      <span className="dots-pattern absolute inset-x-0 bottom-0 h-40 opacity-40" aria-hidden />
      <div className="page-shell relative">
        <nav className="text-sm font-bold text-ink-500" aria-label="مسیر صفحه">
          {breadcrumb}
        </nav>
        {eyebrow ? <span className="chip-light mt-6">{eyebrow}</span> : null}
        <h1 className="display-hero mt-5 max-w-4xl text-ink-900">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-9 text-ink-700 md:text-lg">{description}</p>
        ) : null}
      </div>
    </header>
  );
}

export function Accordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="surface-card group overflow-hidden px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-start text-base font-extrabold text-ink-900 md:text-lg">
            {item.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition duration-500 group-open:rotate-45 group-open:bg-brand-700 group-open:text-white">
              +
            </span>
          </summary>
          <p className="mt-4 leading-8 text-ink-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Stat({ value, label, invert = false }: { value: string; label: string; invert?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 text-center transition duration-500 hover:-translate-y-1",
        invert ? "card-dark" : "border border-cream-200 bg-white",
      )}
    >
      <div className={cn("text-2xl font-black md:text-3xl", invert ? "text-white" : "text-brand-700")}>
        {value}
      </div>
      <div className={cn("mt-1 text-xs", invert ? "text-white/60" : "text-ink-500")}>{label}</div>
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
