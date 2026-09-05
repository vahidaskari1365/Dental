import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, CheckIcon } from "@/components/icons";
import {JsonLd, PageHero, Section, SectionHeading, Breadcrumb } from "@/components/ui";
import { getTeamMembers } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { toFaDigits } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "تیم پزشکی | متخصصان دندانپزشکی مهرادنت",
  description:
    "آشنایی با پزشکان کلینیک دندانپزشکی مهرادنت: متخصص ایمپلنت و جراحی فک و صورت، متخصص ارتودنسی، اندودنتیست و دندانپزشک زیبایی با سابقه درمان بالا.",
  path: "/team",
  keywords: ["دکتر دندانپزشکی تهران", "متخصص ایمپلنت", "متخصص ارتودنسی", "اندودنتیست"],
});

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", path: "/" },
          { name: "تیم پزشکی", path: "/team" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "تیم پزشکی کلینیک دندانپزشکی مهرادنت",
          itemListElement: members.map((member, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Physician",
              name: member.name,
              medicalSpecialty: "Dentistry",
              jobTitle: member.role,
              description: member.bio,
              image: member.imageUrl,
            },
          })),
        }}
      />

      <PageHero
        eyebrow={`${toFaDigits(members.length)} متخصص بورد‌دار`}
        title="تیم پزشکی مهرادنت"
        description="هر تخصص، یک متخصص مسئول؛ تا درمان شما بدون ارجاع بین مطب‌های مختلف کامل شود."
        breadcrumb={<Breadcrumb current="تیم پزشکی" />}
      />

      <Section tone="gradient">
        <div className="grid gap-8 md:grid-cols-2">
          {members.map((member) => (
            <article key={member.slug} className="surface-card grid overflow-hidden sm:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-64">
                <Image
                  src={member.imageUrl ?? "/images/team/doctor-1.jpg"}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-extrabold text-brand-950">{member.name}</h2>
                <p className="mt-1 text-sm font-bold text-brand-700">{member.role}</p>
                {member.specialty ? (
                  <p className="mt-3 rounded-xl bg-brand-50 p-3 text-xs font-bold text-brand-800">
                    {member.specialty}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-7 text-ink-700">{member.bio}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-sand-600">
                  <CheckIcon className="h-4 w-4" />
                  {toFaDigits(member.experienceYears)} سال سابقه بالینی
                </div>
                <Link
                  href={`/appointment?note=${encodeURIComponent(`درخواست مشاوره با ${member.name}`)}`}
                  className="btn-ghost mt-5 !px-5 !py-2.5 text-sm"
                >
                  <CalendarIcon className="h-4 w-4" />
                  رزرو وقت مشاوره
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="mint">
        <SectionHeading
          eyebrow="استانداردهای کلینیک"
          title="چرا درمان در مهرادنت امن‌تر است؟"
          description="پروتکل‌های ایمنی و کنترل عفونت ما هر سه ماه بازبینی و مستندسازی می‌شود."
        />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { title: "اتوکلاو کلاس B", text: "چرخه استریل با ثبت دما و فشار برای هر بچ." },
            { title: "پک اختصاصی بیمار", text: "ابزار مهر و موم‌شده که فقط مقابل شما باز می‌شود." },
            { title: "مواد با اصالت", text: "فاکتور و شماره بچ ایمپلنت و سرامیک تحویل بیمار." },
            { title: "پرونده دیجیتال", text: "رادیوگرافی، عکس و پلن درمان در پرونده شما بایگانی می‌شود." },
          ].map((item) => (
            <div key={item.title} className="surface-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <CheckIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-extrabold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-700">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
