/**
 * تولید دارایی‌های برند (لوگو، آیکون‌ها، تصویر اشتراک اجتماعی) به‌صورت قابل‌بازتولید.
 * Run: node scripts/build-assets.mjs
 *
 * خروجی‌ها در public/ و public/images/ نوشته می‌شوند.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = resolve(ROOT, "public");

/* ------------------------------------------------------------ پالت برند */
const C = {
  brand950: "#03261b",
  brand900: "#094430",
  brand800: "#0b5339",
  brand700: "#0a6946",
  brand600: "#0d8455",
  brand500: "#1ca16a",
  brand400: "#3cbc84",
  brand300: "#6fd6a5",
  mint200: "#bfebd4",
  mint50: "#ecfaf2",
  gold200: "#f6e3a8",
  gold300: "#eecf70",
  gold400: "#e4b53f",
  white: "#ffffff",
};

/* ------------------------------------------------------------ مارک دندان + برگ */
const toothPath =
  "M32 11.5c4.4 0 6.2 2.3 9.9 2.3 7.4 0 11.6 5.6 11.6 13.2 0 10.4-4 36.4-11.9 36.4-4.9 0-4.9-11-9.6-11s-4.7 11-9.6 11C14.5 63.4 10.5 37.4 10.5 27 10.5 19.4 14.7 13.8 22.1 13.8c3.7 0 5.5-2.3 9.9-2.3Z";

function leafMark(x, y, size, fill) {
  return `<g transform="translate(${x} ${y}) scale(${size / 64})">
    <path d="M10 54C10 30 28 12 54 8c-2 26-16 42-44 46Z" fill="${fill}"/>
    <path d="M13 51C26 37 38 25 50 12" fill="none" stroke="${C.brand950}" stroke-opacity="0.28" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

/* ------------------------------------------------------------ لوگو (مربع) */
function logoSvg(size) {
  const r = Math.round(size * 0.22);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.brand500}"/>
      <stop offset="0.55" stop-color="${C.brand700}"/>
      <stop offset="1" stop-color="${C.brand950}"/>
    </linearGradient>
    <radialGradient id="sheen" cx="0.28" cy="0.18" r="0.85">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tooth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${C.mint200}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${Math.round((r / size) * 512)}" fill="url(#bg)"/>
  <rect width="512" height="512" rx="${Math.round((r / size) * 512)}" fill="url(#sheen)"/>
  <g opacity="0.14" fill="none" stroke="${C.mint200}" stroke-width="2">
    <circle cx="256" cy="256" r="196"/>
    <circle cx="256" cy="256" r="232"/>
  </g>
  <g transform="translate(116 108) scale(5.4)">
    <path d="${toothPath}" fill="url(#tooth)"/>
  </g>
  ${leafMark(312, 96, 120, C.gold400)}
</svg>`;
}

/* ------------------------------------------------------------ OG 1200x630 */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.brand800}"/>
      <stop offset="0.5" stop-color="${C.brand900}"/>
      <stop offset="1" stop-color="${C.brand950}"/>
    </linearGradient>
    <radialGradient id="a1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.brand400}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.brand400}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.gold400}" stop-opacity="0.38"/>
      <stop offset="1" stop-color="${C.gold400}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.04"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.gold300}"/>
      <stop offset="1" stop-color="${C.brand400}"/>
    </linearGradient>
    <linearGradient id="tooth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${C.mint200}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1010" cy="90" r="330" fill="url(#a1)"/>
  <circle cx="120" cy="560" r="300" fill="url(#a1)"/>
  <circle cx="640" cy="640" r="260" fill="url(#a2)"/>

  <g fill="${C.mint200}" opacity="0.12">
    ${Array.from({ length: 14 })
      .map(
        (_, i) =>
          `<circle cx="${40 + i * 88}" cy="${568}" r="2.4"/>`,
      )
      .join("")}
    ${Array.from({ length: 14 })
      .map((_, i) => `<circle cx="${40 + i * 88}" cy="${596}" r="2.4"/>`)
      .join("")}
  </g>

  <!-- کارت شیشه‌ای سمت راست: مارک -->
  <g>
    <rect x="828" y="128" width="284" height="284" rx="64" fill="url(#card)" stroke="${C.mint200}" stroke-opacity="0.35" stroke-width="2"/>
    <g transform="translate(878 166) scale(2.9)">
      <path d="${toothPath}" fill="url(#tooth)"/>
    </g>
    ${leafMark(1012, 168, 74, C.gold400)}
  </g>

  <!-- متن -->
  <g font-family="DejaVu Sans, Helvetica, Arial, sans-serif">
    <text x="72" y="118" font-size="24" letter-spacing="6" fill="${C.gold300}" font-weight="700">MEHRDENT DENTAL CLINIC</text>
    <rect x="72" y="146" width="168" height="8" rx="4" fill="url(#bar)"/>

    <text x="72" y="268" font-size="96" font-weight="700" fill="#ffffff">MEHRDENT</text>
    <text x="72" y="336" font-size="34" fill="${C.mint200}" font-weight="400">Modern dentistry in Sa'adat Abad, Tehran</text>

    <g font-size="22" font-weight="700">
      <rect x="72" y="392" width="154" height="46" rx="23" fill="#ffffff" fill-opacity="0.1" stroke="${C.mint200}" stroke-opacity="0.3"/>
      <text x="98" y="422" fill="#ffffff">IMPLANT</text>
      <rect x="242" y="392" width="227" height="46" rx="23" fill="#ffffff" fill-opacity="0.1" stroke="${C.mint200}" stroke-opacity="0.3"/>
      <text x="268" y="422" fill="#ffffff">ORTHODONTICS</text>
      <rect x="485" y="392" width="154" height="46" rx="23" fill="#ffffff" fill-opacity="0.1" stroke="${C.mint200}" stroke-opacity="0.3"/>
      <text x="511" y="422" fill="#ffffff">VENEERS</text>
      <rect x="655" y="392" width="184" height="46" rx="23" fill="#ffffff" fill-opacity="0.1" stroke="${C.mint200}" stroke-opacity="0.3"/>
      <text x="681" y="422" fill="#ffffff">WHITENING</text>
    </g>

    <text x="72" y="520" font-size="26" fill="#ffffff" font-weight="700">mehrdent.ir</text>
    <text x="252" y="520" font-size="26" fill="${C.mint200}" font-weight="400">·  +98 21 8877 6655</text>
  </g>
</svg>`;

/* ------------------------------------------------------------ اجرا */
mkdirSync(resolve(PUB, "images"), { recursive: true });

const jobs = [
  { svg: logoSvg(512), out: "images/logo-512.png", w: 512 },
  { svg: logoSvg(192), out: "images/logo-192.png", w: 192 },
  { svg: logoSvg(180), out: "images/apple-touch-icon.png", w: 180 },
  { svg: logoSvg(64), out: "icon-64.png", w: 64 },
  { svg: ogSvg, out: "images/og-cover.png", w: 1200 },
];

for (const job of jobs) {
  const file = resolve(PUB, job.out);
  await sharp(Buffer.from(job.svg)).resize(job.w).png().toFile(file);
  console.log("✔", job.out);
}

console.log("برند-است‌ها ساخته شدند.");
