"use client";

import { useEffect, useRef, useState } from "react";
import { localReply } from "@/lib/chat";
import { ChatIcon, CloseIcon } from "./icons";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "هزینه ایمپلنت چقدر است؟",
  "ساعات کاری کلینیک",
  "چطور نوبت بگیرم؟",
  "آدرس و مسیر مطب",
];

export function ChatWidget({ clinicName }: { clinicName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `سلام 👋 من دستیار هوشمند ${clinicName} هستم. درباره خدمات، هزینه‌ها یا نوبت‌دهی بپرسید.`,
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    const reply = localReply(question);
    // تاخیر کوتاه برای حفظ حس «در حال نوشتن»
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 600);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-700"
        aria-label={open ? "بستن گفتگوی آنلاین" : "گفتگوی آنلاین با پذیرش"}
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>

      {open ? (
        <div className="fixed bottom-24 left-5 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-2xl">
          <div className="bg-brand-600 px-4 py-3 text-white">
            <p className="text-sm font-extrabold">پشتیبانی آنلاین</p>
            <p className="text-xs text-white/80">پاسخ فوری · بدون انتظار روی خط</p>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-brand-50/40 p-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.role === "user"
                    ? "ms-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-brand-600 px-3 py-2 text-sm text-white"
                    : "me-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-2 text-sm text-ink-700 shadow-sm"
                }
              >
                {item.content}
              </div>
            ))}
            {loading ? (
              <div className="me-auto rounded-2xl bg-white px-3 py-2 text-sm text-ink-500 shadow-sm">
                در حال نوشتن...
              </div>
            ) : null}
          </div>

          <div className="border-t border-brand-100 p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => send(item)}
                  className="rounded-full border border-brand-100 px-3 py-1 text-xs font-bold text-brand-700 transition hover:bg-brand-50"
                >
                  {item}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="سؤال خود را بنویسید..."
                className="flex-1 rounded-full border border-brand-100 bg-brand-50/40 px-4 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white"
              />
              <button type="submit" className="btn-primary !px-4 !py-2 text-sm">
                ارسال
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
