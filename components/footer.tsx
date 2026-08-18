import Link from "next/link";
import { LogoMark } from "./logo";
import { GlobeIcon, MailIcon, PhoneIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="footer footer-vertical gap-10 sm:footer-horizontal">
          <aside className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <LogoMark variant="dark" className="h-9 w-9" />
              <span className="font-display text-lg font-extrabold tracking-tight">
                Bahria<span className="text-amber">Connect</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              One Community. Every Service. Every provider is
              registered, background-checked, and approved by Bahria Town
              management.
            </p>
          </aside>

          <nav aria-label="Services">
            <h6 className="footer-title text-white/90">Services</h6>
            <Link className="link link-hover text-white/70" href="/services/plumbers">
              Plumbing
            </Link>
            <Link className="link link-hover text-white/70" href="/services/electricians">
              Electrical
            </Link>
            <Link className="link link-hover text-white/70" href="/services/ac-technicians">
              AC &amp; Cooling
            </Link>
            <Link className="link link-hover text-white/70" href="/services/maids">
              Maids &amp; Domestic Help
            </Link>
            <Link className="link link-hover text-white/70" href="/services">
              All services
            </Link>
          </nav>

          <nav aria-label="Platform">
            <h6 className="footer-title text-white/90">Platform</h6>
            <Link className="link link-hover text-white/70" href="/#how-it-works">
              How it works
            </Link>
            <Link className="link link-hover text-white/70" href="/#trust">
              Trust &amp; Safety
            </Link>
            <Link className="link link-hover text-white/70" href="/dashboard">
              Resident dashboard
            </Link>
            <Link className="link link-hover text-white/70" href="/management">
              Management portal
            </Link>
          </nav>

          <nav aria-label="Contact">
            <h6 className="footer-title text-white/90">Contact</h6>
            <span className="inline-flex items-center gap-2 text-white/70">
              <PhoneIcon className="h-4 w-4 text-amber" /> +92 21 000 0000
            </span>
            <span className="inline-flex items-center gap-2 text-white/70">
              <MailIcon className="h-4 w-4 text-amber" /> hello@bahriaconnect.com
            </span>
            <span className="inline-flex items-center gap-2 text-white/70">
              <GlobeIcon className="h-4 w-4 text-amber" /> Bahria Town Karachi
            </span>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© 2026 BahriaConnect. A verified home-services platform.</p>
          <p className="font-badge text-[11px] tracking-wide text-white/50">
            TRUSTED PEOPLE. SAFER HOMES.
          </p>
        </div>
      </div>
    </footer>
  );
}
