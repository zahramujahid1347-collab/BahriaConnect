import Link from "next/link";
import { LogoMark } from "./logo";
import { GlobeIcon, MailIcon, PhoneIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <LogoMark variant="dark" className="h-7 w-7" />
            <span className="font-display text-lg text-paper">BahriaConnect</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">
            A verified home-services directory for Bahria Town Karachi.
            Community management, not a random recommendation.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-4">
            Services
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/services/plumbers" className="transition-colors hover:text-paper">
                Plumbing
              </Link>
            </li>
            <li>
              <Link href="/services/electricians" className="transition-colors hover:text-paper">
                Electrical
              </Link>
            </li>
            <li>
              <Link href="/services/maids" className="transition-colors hover:text-paper">
                Domestic Help
              </Link>
            </li>
            <li>
              <Link href="/services" className="transition-colors hover:text-paper">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-4">
            Platform
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/#how-it-works" className="transition-colors hover:text-paper">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/#verification" className="transition-colors hover:text-paper">
                Verification
              </Link>
            </li>
            <li>
              <Link href="/management" className="transition-colors hover:text-paper">
                For Management
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition-colors hover:text-paper">
                Sign in
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-4">
            Contact
          </p>
          <ul className="space-y-2.5 text-sm">
            <li className="inline-flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-brass-light" /> +92 21 000 0000
            </li>
            <li className="inline-flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-brass-light" /> hello@bahriaconnect.com
            </li>
            <li className="inline-flex items-center gap-2">
              <GlobeIcon className="h-4 w-4 text-brass-light" /> Bahria Town Karachi
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-6 text-center text-xs text-paper/40">
        BahriaConnect · Bahria Town Karachi · A community services pilot
      </div>
    </footer>
  );
}
