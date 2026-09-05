"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  title: string;
  category: string;
  description?: string;
  beforeUrl: string;
  afterUrl: string;
  doctorName?: string | null;
  durationText?: string | null;
};

export function BeforeAfterCard({
  title,
  category,
  description,
  beforeUrl,
  afterUrl,
  doctorName,
  durationText,
}: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  return (
    <article className="surface-card overflow-hidden">
      <div
        ref={containerRef}
        dir="ltr"
        className="relative aspect-4/3 w-full cursor-ew-resize select-none overflow-hidden"
        onPointerDown={(event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) updateFromClientX(event.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <Image
          src={beforeUrl}
          alt={`${title} - تصویر قبل از درمان`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={afterUrl}
            alt={`${title} - تصویر بعد از درمان`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <span
          dir="rtl"
          className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/20 bg-night-950/85 px-3 py-1 text-xs font-bold text-white backdrop-blur"
        >
          بعد از درمان
        </span>
        <span
          dir="rtl"
          className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-mint-200 bg-white/92 px-3 py-1 text-xs font-bold text-brand-800 backdrop-blur"
        >
          قبل از درمان
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_14px_rgba(9,68,48,0.5)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-mint-md">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 7 5 12l4 5M15 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <label className="sr-only" htmlFor={`slider-${title}`}>
          مقایسه قبل و بعد
        </label>
        <input
          id={`slider-${title}`}
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize opacity-0"
          aria-label="اسلایدر مقایسه قبل و بعد"
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="rounded-full bg-mint-100 px-3 py-1 text-brand-800">{category}</span>
          {durationText ? (
            <span className="rounded-full bg-sand-100 px-3 py-1 text-sand-600">مدت درمان: {durationText}</span>
          ) : null}
        </div>
        <h3 className="display-2 mt-3 text-ink-900">{title}</h3>
        {description ? <p className="mt-2 text-sm text-ink-700">{description}</p> : null}
        {doctorName ? <p className="mt-3 text-sm font-bold text-brand-700">{doctorName}</p> : null}
      </div>
    </article>
  );
}
