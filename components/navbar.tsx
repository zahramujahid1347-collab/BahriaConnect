"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { MenuIcon, XIcon } from "./icons";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#trust", label: "Trust & Safety" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the menu with the Escape key for keyboard users.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

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

        {/* Mobile menu — state-driven so it reliably opens/closes */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="btn btn-ghost btn-square relative z-50 touch-manipulation select-none"
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
              {/* Overlay sits below the header so the logo + toggle stay usable */}
              <div
                className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/30"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div
                id="mobile-nav"
                className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-box border border-fog bg-white shadow-lg"
              >
                <ul className="menu w-full p-2">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="font-display font-semibold"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/management"
                      onClick={() => setOpen(false)}
                      className="font-display font-semibold"
                    >
                      Management
                    </Link>
                  </li>
                </ul>

                <div className="space-y-2 border-t border-fog bg-cream/70 p-3">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn btn-outline w-full border-ink font-display font-semibold text-ink hover:border-ink hover:bg-ink-tint"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="btn btn-ghost w-full font-display font-semibold text-slate-gray"
                  >
                    Create a resident account
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setOpen(false)}
                    className="btn w-full border-0 bg-amber font-display font-semibold text-warning-content hover:bg-amber/90"
                  >
                    Request Service
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
