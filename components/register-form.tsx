"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckIcon, HomeIcon, ShieldCheckIcon } from "./icons";
import { residentPrecincts } from "@/lib/data";
import { registerResident } from "@/lib/actions";

type Role = "resident" | "management";

const roles: {
  id: Role;
  title: string;
  description: string;
  icon: typeof HomeIcon;
}[] = [
  {
    id: "resident",
    title: "I'm a Resident",
    description: "I need to find and request home services.",
    icon: HomeIcon,
  },
  {
    id: "management",
    title: "I'm Management",
    description: "I verify providers and oversee platform activity.",
    icon: ShieldCheckIcon,
  },
];

export default function RegisterForm({ initialRole }: { initialRole: Role }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/dashboard";
  const [role, setRole] = useState<Role>(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [precinct, setPrecinct] = useState(
    residentPrecincts[0] ?? "Bahria Town Karachi",
  );
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (role !== "resident") {
      router.push(redirectTo);
      return;
    }
    if (!password.trim()) {
      setPasswordError("Please create a password to continue.");
      return;
    }
    setPasswordError("");
    setFormError("");
    setLoading(true);
    try {
      await registerResident({ name, email, precinct });
      // Set a temporary session cookie so middleware allows the portal
      document.cookie = "session_token=resident_" + Date.now() + "; path=/; max-age=86400; SameSite=Lax";
      router.push(redirectTo);
    } catch (err) {
      console.error("Registration error:", err);
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <form
      className="card mt-8 bg-card shadow-[0_2px_8px_rgba(27,36,32,0.08)]"
      onSubmit={handleSubmit}
    >
      <div className="card-body gap-5 p-6">
        {/* Role selection */}
        <div
          role="radiogroup"
          aria-label="Choose your role"
          className="grid gap-3"
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
                className={`flex w-full items-start gap-4 rounded-lg border-2 bg-card p-4 text-left transition-all ${
                  selected
                    ? "border-seal shadow-[0_2px_8px_rgba(47,93,58,0.12)]"
                    : "border-ink/10 hover:border-seal/40"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    selected ? "bg-seal text-paper" : "bg-sage text-seal-dark"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-bold text-ink">
                    {r.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink/60">
                    {r.description}
                  </span>
                </span>
                <span
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-seal bg-seal" : "border-ink/20 bg-card"
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

        {role === "resident" ? (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-ink">
                Full name
              </legend>
              <input
                type="text"
                className="input w-full border-ink/15 bg-cream"
                placeholder="Ayesha"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </fieldset>

            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-ink">
                  Precinct
                </legend>
                <select
                  className="select w-full border-ink/15 bg-cream"
                  value={precinct}
                  onChange={(e) => setPrecinct(e.target.value)}
                >
                  {residentPrecincts.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-ink">
                  House / apartment
                </legend>
                <input
                  type="text"
                  className="input w-full border-ink/15 bg-cream"
                  placeholder="House 12"
                />
              </fieldset>
            </div>
          </>
        ) : (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-ink">
                Full name
              </legend>
              <input
                type="text"
                className="input w-full border-ink/15 bg-cream"
                placeholder="Management staff name"
                autoComplete="name"
              />
            </fieldset>

            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-ink">
                  Designation
                </legend>
                <input
                  type="text"
                  className="input w-full border-ink/15 bg-cream"
                  placeholder="Verification Officer"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-ink">
                  Department
                </legend>
                <select className="select w-full border-ink/15 bg-cream">
                  <option>Verification</option>
                  <option>Operations</option>
                  <option>Complaints</option>
                  <option>Administration</option>
                </select>
              </fieldset>
            </div>
          </>
        )}

        <fieldset className="fieldset">
          <legend className="fieldset-legend font-display font-semibold text-ink">
            Phone number
          </legend>
          <input
            type="tel"
            className="input w-full border-ink/15 bg-cream"
            placeholder="+92 300 0000000"
            autoComplete="tel"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend font-display font-semibold text-ink">
            Email
          </legend>
          <input
            type="email"
            className="input w-full border-ink/15 bg-cream"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend font-display font-semibold text-ink">
            Password <span className="text-clay">*</span>
          </legend>
          <input
            type="password"
            className={`input w-full border-ink/15 bg-cream ${
              passwordError ? "border-clay" : ""
            }`}
            placeholder="Create a secure password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            required
          />
          {passwordError && (
            <p className="mt-1 text-xs text-clay">{passwordError}</p>
          )}
        </fieldset>

        {/* Form-level error */}
        {formError && (
          <div className="rounded-lg border border-clay/40 bg-clay/10 px-4 py-3 text-sm text-clay">
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </div>
    </form>
  );
}
