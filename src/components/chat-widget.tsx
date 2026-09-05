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
        className="chat-launcher fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-[0_18px_36px_-16px_rgba(13,132,85,0.95)] transition hover:-translate-y-1 hover:brightness-110"
        aria-label={open ? "بستن گفتگوی آنلاین" : "گفتگوی آنلاین با پذیرش"}
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>

      {open ? (
        <div className="fixed bottom-24 left-5 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-mint-200 bg-white shadow-mint-lg">
          <div className="relative overflow-hidden bg-gradient-to-l from-brand-700 to-night-900 px-4 py-3 text-white">
            <span className="dots-pattern-light absolute inset-0 opacity-20" aria-hidden />
            <p className="relative text-sm font-extrabold">پشتیبانی آنلاین</p>
            <p className="relative text-xs text-mint-200/80">پاسخ فوری · بدون انتظار روی خط</p>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-mint-25 p-4">
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
              <div className="me-auto rounded-2xl border border-mint-200 bg-white px-3.5 py-2.5 text-sm text-ink-500 shadow-mint-sm">
                در حال نوشتن...
              </div>
            ) : null}
          </div>

          <div className="border-t border-mint-200 bg-white p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => send(item)}
                  className="rounded-full border border-mint-200 bg-mint-25 px-3 py-1 text-xs font-bold text-brand-700 transition hover:border-brand-300 hover:bg-mint-50"
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
                className="field !rounded-full !py-2 text-sm"
              />
              <button type="submit" className="btn-primary !px-5 !py-2 text-sm">
                ارسال
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
