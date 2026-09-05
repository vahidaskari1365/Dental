import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const ServiceIconNames = [
  "implant",
  "aligner",
  "smile",
  "sparkle",
  "kids",
  "root",
  "gum",
  "design",
] as const;

export type ServiceIconName = (typeof ServiceIconNames)[number];

export function ServiceIcon({ name, ...props }: IconProps & { name: string }) {
  const paths: Record<string, ReactElement> = {
    implant: (
      <>
        <path d="M8.5 3.5h7l-1 3h-5l-1-3Z" />
        <path d="M9 6.5h6l-.8 3.2H9.8L9 6.5Z" />
        <path d="M10.2 9.7 11 15l1 5.5 1-5.5.8-5.3" />
      </>
    ),
    aligner: (
      <>
        <path d="M3.5 12c0-3.3 3.8-6.2 8.5-6.2s8.5 2.9 8.5 6.2-3.8 6.2-8.5 6.2S3.5 15.3 3.5 12Z" />
        <path d="M6.5 12c1.6-1.4 3.4-2.1 5.5-2.1s3.9.7 5.5 2.1" />
        <path d="M9 15.6c1-.5 2-.8 3-.8s2 .3 3 .8" />
      </>
    ),
    smile: (
      <>
        <path d="M12 3.5c4.7 0 8 3.1 8 7 0 5.2-3.6 10-8 10s-8-4.8-8-10c0-3.9 3.3-7 8-7Z" />
        <path d="M8.5 13.5c.9 1.4 2 2.1 3.5 2.1s2.6-.7 3.5-2.1" />
        <path d="M9 9.5h.01M15 9.5h.01" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
        <path d="M18 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
      </>
    ),
    kids: (
      <>
        <path d="M12 4c4.4 0 7.5 3 7.5 6.8 0 4.7-3.3 9.2-7.5 9.2s-7.5-4.5-7.5-9.2C4.5 7 7.6 4 12 4Z" />
        <path d="M9 11h.01M15 11h.01" />
        <path d="M9 15c.9.9 1.9 1.3 3 1.3s2.1-.4 3-1.3" />
        <path d="M6 6.5C7 4.5 9 3.5 12 3.5" />
      </>
    ),
    root: (
      <>
        <path d="M8 3.5h8v4.8c0 3.3-1.2 12.2-4 12.2S8 11.6 8 8.3V3.5Z" />
        <path d="M9.5 12.5c1 .6 2 .6 3 0s2-.6 3 0" />
        <path d="M10 16.2c.7.5 1.3.5 2 0s1.3-.5 2 0" />
      </>
    ),
    gum: (
      <>
        <path d="M3 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 3-2" />
        <path d="M3 13c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 3-2" />
        <path d="M3 18c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 3-2" />
      </>
    ),
    design: (
      <>
        <path d="M4 20l3.5-.8L19 7.7a2 2 0 0 0 0-2.8l-.9-.9a2 2 0 0 0-2.8 0L3.8 15.5 3 19l1 1Z" />
        <path d="M14.5 6.5 17.5 9.5" />
        <path d="M4.5 15.5h4v4" />
      </>
    ),
  };
  return <svg {...base(props)}>{paths[name] ?? paths.smile}</svg>;
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2A16.5 16.5 0 0 1 4.5 5.5c0-1.1.9-2 2-2Z" />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3.5V6M16 3.5V6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 19 6v6c0 4.4-3 7.7-7 8.5-4-.8-7-4.1-7-8.5V6l7-2.5Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12c0 4-3.6 7-8 7-1 0-2-.1-2.9-.4L5 20l1-3.4A6.7 6.7 0 0 1 4 12c0-4 3.6-7 8-7s8 3 8 7Z" />
      <path d="M9 11h6M9 14h3.5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20.2l1.3-4A8 8 0 1 1 20 12Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.7 0 1.2-.6 1-1.2l-.3-.8-1.6.4-1.6-1.6.4-1.6-.8-.3c-.6-.2-1.2.3-1.2 1" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.5h.01" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 4.5 3.5 11l4.5 1.8L21 4.5Z" />
      <path d="M8 12.8V18l2.8-2.6L21 4.5" />
    </svg>
  );
}

export function SpeedIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16 16 9" />
      <path d="M2.5 19.5h19" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function ToothIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c1.4 0 2 .7 3.2.7 2.4 0 3.8 1.8 3.8 4.3 0 3.4-1.3 12-3.9 12-1.6 0-1.6-3.6-3.1-3.6s-1.5 3.6-3.1 3.6C7.3 20.5 6 11.9 6 8.5c0-2.5 1.4-4.3 3.8-4.3 1.2 0 1.8-.7 3.2-.7Z" />
    </svg>
  );
}
