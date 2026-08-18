import Link from "next/link";
import Logo from "./logo";
import { MenuIcon } from "./icons";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#trust", label: "Trust & Safety" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-fog/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-sm font-semibold text-charcoal transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/management"
            className="font-display text-sm font-semibold text-slate-gray transition-colors hover:text-ink"
          >
            Management
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="btn btn-ghost font-display text-sm font-semibold text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/services"
            className="btn border-0 bg-amber font-display text-sm font-semibold text-warning-content hover:bg-amber/90"
          >
            Request Service
          </Link>
        </div>

        {/* Mobile menu */}
        <details className="dropdown dropdown-end md:hidden">
          <summary
            className="btn btn-ghost btn-square"
            aria-label="Open menu"
            tabIndex={0}
          >
            <MenuIcon className="h-6 w-6" />
          </summary>
          <ul className="menu dropdown-content z-50 mt-3 w-64 rounded-box border border-fog bg-white p-2 shadow-lg">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-display font-semibold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/management" className="font-display font-semibold">
                Management
              </Link>
            </li>
            <li>
              <Link href="/login" className="font-display font-semibold">
                Sign in
              </Link>
            </li>
            <li className="mt-1 border-t border-fog pt-1">
              <Link
                href="/services"
                className="font-display font-semibold text-ink"
              >
                Request Service
              </Link>
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
}
