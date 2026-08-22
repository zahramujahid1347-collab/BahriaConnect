import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </Base>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l1.8 4.8L18.5 9.6l-4.7 1.8L12 16.2l-1.8-4.8L5.5 9.6l4.7-1.8L12 3Z" />
      <path d="M18.5 14.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z" />
    </Base>
  );
}

export function ChefIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 11a4 4 0 0 1 4-4 4.5 4.5 0 0 1 8.5 1.5V9" />
      <path d="M4 12v3a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-3" />
      <path d="M4 14h16" />
    </Base>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.5 6.5a4.5 4.5 0 0 0-6 6L3 18l3 3 5.5-5.5a4.5 4.5 0 0 0 6-6L13.5 13.5 10.5 10.5l4-4Z" />
    </Base>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </Base>
  );
}

export function HammerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 4 4 13l3 3 9-9" />
      <path d="M14 7 3 18" />
      <path d="M14 7l3 3 4-1-1-4-3-3-1 4Z" />
    </Base>
  );
}

export function RollerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="12" height="8" rx="1.5" />
      <path d="M9 12v2h3v3" />
      <rect x="7" y="17" width="7" height="4" rx="1.5" />
    </Base>
  );
}

export function SnowflakeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="M12 3l-2.2 2M12 3l2.2 2M12 21l-2.2-2M12 21l2.2-2" />
    </Base>
  );
}

export function WasherIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 9.5v5M9.8 11.3l4.4 1.4" />
    </Base>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20c0-8 4-14 16-15-.5 11-6 15-11 15" />
      <path d="M4 20c2-5 6-8 11-9" />
    </Base>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.5 6.5a4.5 4.5 0 0 0-6 6L3 18l3 3 5.5-5.5a4.5 4.5 0 0 0 6-6L13.5 13.5 10.5 10.5l4-4Z" />
      <path d="M17 3l4 4-1.5 1.5a2 2 0 0 1-3 0L17 3Z" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12.5 9.5 18 20 6" />
    </Base>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </Base>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Base>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </Base>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20.5s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.5-7.5 10-7.5 10Z" />
    </Base>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9 5 7 7-7 7" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </Base>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4h3l1.5 4L7.5 9.5a12 12 0 0 0 7 7L16 14.5l4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Base>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5S14.5 18.2 12 20.5C9.5 18.2 8.2 15.3 8.2 12S9.5 5.8 12 3.5Z" />
    </Base>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 5h16M7 12h10M10 19h4" />
    </Base>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </Base>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.5Z" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </Base>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.5a3.5 3.5 0 0 1 0 6.5M17.5 15.2c2 .6 3 2.2 3 4.8" />
    </Base>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6M20 16v-2" />
    </Base>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 21V4" />
      <path d="M5 5h11l-2 3.5L16 12H5" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Base>
  );
}

const serviceIconMap = {
  home: HomeIcon,
  sparkle: SparkleIcon,
  chef: ChefIcon,
  wrench: WrenchIcon,
  bolt: BoltIcon,
  hammer: HammerIcon,
  roller: RollerIcon,
  snowflake: SnowflakeIcon,
  washer: WasherIcon,
  leaf: LeafIcon,
  tools: ToolsIcon,
} as const;

export type ServiceIconKey = keyof typeof serviceIconMap;

export function ServiceIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  const Cmp = serviceIconMap[name as ServiceIconKey] ?? ToolsIcon;
  return <Cmp {...props} />;
}
