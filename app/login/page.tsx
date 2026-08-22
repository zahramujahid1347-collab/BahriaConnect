"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Logo from "@/components/logo";
import { CheckIcon, HomeIcon, ShieldCheckIcon } from "@/components/icons";

type Role = "resident" | "management";

const roles: {
  id: Role;
  title: string;
  description: string;
  icon: typeof HomeIcon;
}[] = [
  {
    id: "resident",
    title: "I’m a Resident",
    description: "I need to find and request home services.",
    icon: HomeIcon,
  },
  {
    id: "management",
    title: "I’m Management",
    description: "I verify providers and oversee platform activity.",
    icon: ShieldCheckIcon,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("resident");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(role === "resident" ? "/dashboard" : "/management");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <div className="text-center">
          <Logo className="justify-center" />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">
            Welcome back
          </h1>
          <p className="mt-1 text-slate-gray">
            Choose how you’re signing in to continue.
          </p>
        </div>

        {/* Role selection */}
        <div
          role="radiogroup"
          aria-label="Choose your role"
          className="mt-8 grid gap-3"
        >
          {roles.map((r) => {
            const Icon = r.icon;
            const selected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setRole(r.id)}
                className={`flex w-full items-start gap-4 rounded-box border-2 bg-card p-4 text-left transition-all ${
                  selected
                    ? "border-ink shadow-[0_2px_8px_rgba(30,77,92,0.12)]"
                    : "border-fog hover:border-ink/40"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-box ${
                    selected
                      ? "bg-ink text-paper"
                      : "bg-ink-tint text-ink"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-bold text-charcoal">
                    {r.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-gray">
                    {r.description}
                  </span>
                </span>
                <span
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected
                      ? "border-ink bg-ink"
                      : "border-fog bg-card"
                  }`}
                >
                  {selected && (
                    <CheckIcon className="h-3 w-3 text-paper" strokeWidth={3} />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <form className="card mt-6 bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]" onSubmit={handleSubmit}>
          <div className="card-body gap-4 p-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Email
              </legend>
              <input
                type="email"
                className="input w-full border-fog bg-cream"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Password
              </legend>
              <input
                type="password"
                className="input w-full border-fog bg-cream"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </fieldset>

            <button
              type="submit"
              className="btn w-full border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
            >
              Sign in as {role === "resident" ? "Resident" : "Management"}
            </button>

            <p className="text-center text-sm text-slate-gray">
              New to BahriaConnect?{" "}
              <Link
                href="/register"
                className="link link-hover link-primary font-semibold"
              >
                Create a resident account
              </Link>{" "}
              or{" "}
              <Link
                href="/register?role=management"
                className="link link-hover link-primary font-semibold"
              >
                create a management account
              </Link>
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
