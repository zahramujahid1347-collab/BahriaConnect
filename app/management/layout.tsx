import Link from "next/link";
import { LogoMark } from "@/components/logo";
import {
  ChartIcon,
  UsersIcon,
  FlagIcon,
  BriefcaseIcon,
  MenuIcon,
  ArrowRightIcon,
} from "@/components/icons";

const nav = [
  { href: "/management", label: "Dashboard", icon: ChartIcon },
  { href: "/management/providers", label: "Providers", icon: UsersIcon },
  { href: "/management/requests", label: "Requests", icon: BriefcaseIcon },
  { href: "/management/complaints", label: "Complaints", icon: FlagIcon },
];

export default function ManagementLayout({
  children,
}: LayoutProps<"/management">) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="mgmt-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-screen flex-col bg-cream">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-fog/60 bg-white px-4 sm:px-6">
          <label
            htmlFor="mgmt-drawer"
            className="btn btn-ghost btn-square drawer-button lg:hidden"
            aria-label="Open management menu"
          >
            <MenuIcon className="h-6 w-6" />
          </label>
          <span className="font-badge text-xs font-bold uppercase tracking-[0.16em] text-ink">
            Management Portal
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-slate-gray sm:inline">
              Signed in as Management
            </span>
            <Link
              href="/"
              className="link link-hover link-primary inline-flex items-center gap-1 text-sm font-semibold"
            >
              Back to site <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label
          htmlFor="mgmt-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <aside className="flex min-h-full w-72 flex-col bg-ink text-white">
          <div className="flex items-center gap-2.5 px-5 py-5">
            <LogoMark variant="dark" className="h-8 w-8" />
            <div>
              <p className="font-display text-base font-extrabold leading-tight">
                Bahria<span className="text-amber">Connect</span>
              </p>
              <p className="text-[11px] text-white/60">Management Portal</p>
            </div>
          </div>

          <ul className="menu w-full grow gap-1 px-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-box font-display font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <item.icon className="h-5 w-5 text-amber" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 px-5 py-4">
            <p className="text-xs text-white/50">
              Role-based access · Audit logs enabled
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
