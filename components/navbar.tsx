"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { MenuIcon, XIcon } from "./icons";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/#verification", label: "Verification" },
  { href: "/management", label: "For Management" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/services"
            className="rounded-md bg-seal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-seal-dark"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>

          {open && (
            <>
              <div
                className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/30"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div
                id="mobile-nav"
                className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-lg"
              >
                <ul className="menu w-full p-2">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="text-[15px] font-medium text-ink/80"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 border-t border-ink/10 p-3">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn btn-outline w-full border-ink/20 text-ink hover:border-ink/40 hover:bg-paper"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="btn btn-ghost w-full font-medium text-ink/70"
                  >
                    Create a resident account
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setOpen(false)}
                    className="btn w-full border-0 bg-seal font-medium text-paper hover:bg-seal-dark"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
