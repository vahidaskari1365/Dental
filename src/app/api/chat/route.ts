import { NextResponse } from "next/server";
import { getServices, getSettings } from "@/lib/data";
import { TIME_SLOTS } from "@/lib/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * دستیار هوشمند پذیرش (الهام‌گرفته از freellmapi):
 * اگر کلید یک سرویس سازگار با OpenAI تنظیم شده باشد از مدل استفاده می‌شود،
 * در غیر این صورت پاسخ از پایگاه دانش محلی ساخته می‌شود تا سرویس هرگز از کار نیفتد.
 */
export async function POST(request: Request) {
  let messages: ChatMessage[] = [];
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
  } catch {
    messages = [];
  }

  const lastUserMessage = [...messages].reverse().find((item) => item.role === "user")?.content ?? "";
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  const systemPrompt = [
    `تو دستیار پذیرش «${settings.clinicName}» هستی و به فارسی محترمانه و کوتاه پاسخ می‌دهی.`,
    `تلفن: ${settings.phone} و ${settings.phone2} | واتس‌اپ: ${settings.whatsapp}`,
    `آدرس: ${settings.address}`,
    `ساعات کاری: ${settings.workingHoursWeek} / ${settings.workingHoursThu} / ${settings.workingHoursFri}`,
    `خدمات و هزینه پایه: ${services
      .map((service) => `${service.title} (${service.price ?? "استعلام قیمت"})`)
      .join(" ، ")}`,
    `بازه‌های نوبت: ${TIME_SLOTS.join(" ، ")}`,
    `نوبت‌دهی فقط از صفحه /appointment انجام می‌شود؛ کاربر را به همان صفحه یا شماره تماس راهنمایی کن.`,
    `برای تشخیص و برنامه درمان قطعی همیشه اعلام کن که نیاز به معاینه حضوری است.`,
  ].join("\n");

  const apiKey =
    process.env.FREELLM_API_KEY ?? process.env.LLM_API_KEY ?? process.env.OPENAI_API_KEY ?? "";
  const baseUrl = (process.env.LLM_BASE_URL ?? process.env.FREELLM_BASE_URL ?? "").replace(/\/$/, "");
  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

  if (apiKey && baseUrl) {
    try {
      const upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          max_tokens: 400,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
        }),
      });
      if (upstream.ok) {
        const data = (await upstream.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply, provider: "llm" });
      }
    } catch (error) {
      console.error("[chat] upstream failed, using local knowledge base", error);
    }
  }

  return NextResponse.json({ reply: localReply(lastUserMessage, settings, services) });
}

function localReply(
  question: string,
  settings: Awaited<ReturnType<typeof getSettings>>,
  services: Awaited<ReturnType<typeof getServices>>,
) {
  const q = question.replace(/\u200c/g, " ");

  const matched = services.find((service) => {
    const keywords = service.title.split(/\s+/).filter((word) => word.length > 2);
    return keywords.some((word) => q.includes(word));
  });

  if (/هزینه|قیمت|تعرفه|چقدر|چند|نرخ/.test(q)) {
    if (matched?.price) {
      return `${matched.title}: هزینه پایه ${matched.price} است. برآورد دقیق پس از معاینه و رادیوگرافی انجام می‌شود. برای هماهنگی با شماره ${settings.phone} تماس بگیرید یا از صفحه رزرو نوبت درخواست بدهید.`;
    }
    return `تعرفه هر خدمت به نوع درمان و مواد مصرفی بستگی دارد. برای دریافت برآورد دقیق، معاینه اولیه (رایگان) لازم است. با پذیرش ${settings.phone} تماس بگیرید.`;
  }

  if (/نوبت|رزرو|وقت|نوبت دهی| appointment/.test(q)) {
    return `رزرو نوبت آنلاین از صفحه «رزرو نوبت» سایت انجام می‌شود: نام، شماره تماس، نوع خدمت، تاریخ و بازه ساعتی. همکاران پذیرش تا ۲ ساعت کاری بعد برای تأیید تماس می‌گیرند. تماس مستقیم: ${settings.phone}`;
  }

  if (/آدرس|کجا|مسیر|لوکیشن|نقشه|نشانی/.test(q)) {
    return `آدرس ما: ${settings.address} نکته: در صفحه «تماس با ما» نقشه گوگل تعبیه شده و مسیریابی مستقیم دارد.`;
  }

  if (/ساعت|ساعات|زمان کاری|باز|شیفت|شب/.test(q)) {
    return `ساعات کاری: ${settings.workingHoursWeek} | ${settings.workingHoursThu} | ${settings.workingHoursFri}. ${settings.emergencyNote}`;
  }

  if (/اورژانس|درد|فوری|دندان درد|تورم/.test(q)) {
    return `برای درد شدید، تورم یا ضربه به دندان، اورژانس ما در اولین بازه خالی همان روز پذیرش می‌کند. همین حالا با ${settings.phone2} تماس بگیرید و بگویید موضوع اورژانس است.`;
  }

  if (/ایمپلنت/.test(q)) {
    return `ایمپلنت در دو جلسه انجام می‌شود: جراحی کاشت فیکسچر (۳۰ تا ۶۰ دقیقه) و ساخت روکش پس از ۳ تا ۴ ماه. برند فیکسچر و سی‌تی‌اسکن در هزینه مؤثر است. برای پلن درمان دقیق، جلسه مشاوره با دکتر رضایی رزرو کنید.`;
  }

  if (/ارتودنسی|الاینر|نامرئی|براکت/.test(q)) {
    return `در ارتودنسی نامرئی هر ۲ هفته یک ست الاینر تعویض می‌شود و باید ۲۲ ساعت در روز استفاده شود. مدت درمان ۸ تا ۱۸ ماه است. با اسکن سه‌بعدی، نتیجه نهایی را قبل از شروع می‌بینید.`;
  }

  if (/کودک|بچه|کودکان|شیری/.test(q)) {
    return `بخش کودکان ما با رویکرد بدون ترس طراحی شده: معاینه بازی‌محور، فلوراید ورنیش، سیلانت شیارها و در صورت نیاز سدیشن آگاهانه. اولین معاینه بهتر است پایان سال اول زندگی انجام شود.`;
  }

  if (/لمینت|ونیر|کامپوزیت/.test(q)) {
    return `لمینت سرامیکی (E-max) در ۲ تا ۳ جلسه و کامپوزیت ونیر در یک جلسه انجام می‌شود. پیش از تراش، ماکاپ تشخیصی روی دندان‌های شما قرار می‌گیرد تا نتیجه را ببینید و تأیید کنید.`;
  }

  if (/سلام|درود|خوبید/.test(q) && q.length < 20) {
    return `سلام! چطور می‌توانم کمکتان کنم؟ می‌توانید درباره هزینه خدمات، ساعات کاری یا رزرو نوبت بپرسید.`;
  }

  const serviceList = services
    .slice(0, 6)
    .map((service) => `• ${service.title}`)
    .join("\n");
  return `متوجه سؤال شما نشدم 🙂 خدمات اصلی کلینیک:\n${serviceList}\n\nبرای راهنمایی دقیق‌تر با پذیرش ${settings.phone} تماس بگیرید یا از صفحه رزرو نوبت استفاده کنید.`;
}
