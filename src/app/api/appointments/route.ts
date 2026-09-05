import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/auth";
import { ensureSeeded } from "@/lib/data";
import { isValidIranPhone, normalizePhone } from "@/lib/utils";

type Payload = {
  fullName?: string;
  phone?: string;
  serviceSlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  note?: string;
};

export async function POST(request: Request) {
  await ensureSeeded();
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const fullName = (body.fullName ?? "").trim();
  const phone = normalizePhone(body.phone ?? "");
  const preferredDate = (body.preferredDate ?? "").trim();

  if (fullName.length < 3) {
    return NextResponse.json({ ok: false, error: "نام و نام خانوادگی را کامل وارد کنید." }, { status: 400 });
  }
  if (!isValidIranPhone(phone)) {
    return NextResponse.json({ ok: false, error: "شماره تماس معتبر نیست." }, { status: 400 });
  }
  if (!preferredDate) {
    return NextResponse.json({ ok: false, error: "تاریخ مراجعه را انتخاب کنید." }, { status: 400 });
  }

  try {
    const [row] = await db
      .insert(appointments)
      .values({
        fullName,
        phone,
        serviceSlug: body.serviceSlug?.trim() || null,
        preferredDate,
        preferredTime: body.preferredTime?.trim() || null,
        note: body.note?.trim() || null,
      })
      .returning({ id: appointments.id });

    return NextResponse.json({
      ok: true,
      trackingCode: String(row?.id ?? 0).padStart(5, "0"),
    });
  } catch (error) {
    console.error("[appointments] insert failed", error);
    return NextResponse.json(
      { ok: false, error: "ثبت درخواست با خطا مواجه شد. لطفاً تماس بگیرید." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ ok: false, error: "دسترسی مجاز نیست." }, { status: 401 });
  }
  await ensureSeeded();
  const rows = await db.select().from(appointments).orderBy(appointments.id);
  return NextResponse.json({ ok: true, count: rows.length, appointments: rows.reverse() });
}
