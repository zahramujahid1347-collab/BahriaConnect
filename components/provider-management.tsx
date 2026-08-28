"use client";

import { useRef, useState } from "react";
import type { Provider, VerificationStatus } from "@/lib/types";
import { InitialsAvatar } from "./avatar";
import { RatingStars, VerificationBadge } from "./badges";
import { CheckIcon, SearchIcon, XIcon } from "./icons";
import { registerProvider, setProviderVerification } from "@/lib/actions";

const filterOptions: ("All" | VerificationStatus)[] = [
  "All",
  "Verified",
  "Pending Verification",
  "Temporarily Unavailable",
  "Suspended",
];

const categoryOptions = [
  { label: "Plumbing", slug: "plumbers" },
  { label: "Electrical", slug: "electricians" },
  { label: "AC & Cooling", slug: "ac-technicians" },
  { label: "Maids & Domestic Help", slug: "maids" },
  { label: "Carpentry", slug: "carpenters" },
  { label: "Cleaning", slug: "cleaning" },
  { label: "Gardening", slug: "gardeners" },
];

const emptyForm = {
  name: "",
  category: "Plumbing",
  experience: "",
  contact: "",
  skills: "",
};

export default function ProviderManagement({
  providers,
}: {
  providers: Provider[];
}) {
  const [list, setList] = useState<Provider[]>(providers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [overrides, setOverrides] = useState<
    Record<string, VerificationStatus>
  >({});
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const rows = list
    .map((p) => ({ ...p, verification: overrides[p.id] ?? p.verification }))
    .filter((p) => {
      if (status !== "All" && p.verification !== status) return false;
      if (query.trim()) {
        const hay = `${p.name} ${p.category} ${p.title}`.toLowerCase();
        if (!hay.includes(query.trim().toLowerCase())) return false;
      }
      return true;
    });

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    const option = categoryOptions.find((c) => c.label === form.category);
    const saved = await registerProvider({
      name,
      category: form.category,
      categorySlug: option?.slug ?? "handymen",
      experienceYears: Number(form.experience) || 0,
      contact: form.contact,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    setList((l) => [saved, ...l]);
    setForm(emptyForm);
    setNotice(`${saved.name} saved — pending verification.`);
    dialogRef.current?.close();
  }

  async function setStatusFor(id: string, next: VerificationStatus) {
    setOverrides((o) => ({ ...o, [id]: next }));
    await setProviderVerification(id, next);
  }

  function actionFor(p: Provider) {
    if (p.verification === "Pending Verification") {
      return (
        <button
          className="btn btn-sm border-0 bg-success text-success-content hover:bg-success/90"
          onClick={() => setStatusFor(p.id, "Verified")}
        >
          Approve
        </button>
      );
    }
    if (p.verification === "Verified") {
      return (
        <button
          className="btn btn-sm btn-outline border-error text-error hover:bg-error/10 hover:border-error"
          onClick={() => setStatusFor(p.id, "Suspended")}
        >
          Suspend
        </button>
      );
    }
    if (p.verification === "Suspended") {
      return (
        <button
          className="btn btn-sm border-0 bg-ink text-paper hover:bg-ink-deep"
          onClick={() => setStatusFor(p.id, "Verified")}
        >
          Reactivate
        </button>
      );
    }
    return null;
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-box border border-fog bg-card p-4">
        <label className="input join-item flex min-w-56 flex-1 items-center gap-2 border-fog bg-cream">
          <SearchIcon className="h-4 w-4 text-slate-gray" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search providers…"
            className="grow"
          />
        </label>
        <select
          className="select border-fog bg-cream font-sans"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by verification status"
        >
          {filterOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <button
          className="btn border-0 bg-ink font-display font-semibold text-paper hover:bg-ink-deep"
          onClick={() => dialogRef.current?.showModal()}
        >
          Register provider
        </button>
      </div>

      {notice && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-box border border-seal/30 bg-green-tint p-3 text-sm text-seal-dark">
          <span className="inline-flex items-center gap-2">
            <CheckIcon className="h-4 w-4" />
            {notice}
          </span>
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setNotice(null)}
            aria-label="Dismiss"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-box border border-fog bg-card">
        <table className="table">
          <thead>
            <tr className="text-slate-gray">
              <th>Provider</th>
              <th>Category</th>
              <th>Experience</th>
              <th>Rating</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-cream/50">
                <td>
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={p.name} className="h-10 w-10" textClassName="text-sm" />
                    <div>
                      <p className="font-display font-bold text-charcoal">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-gray">{p.title}</p>
                    </div>
                  </div>
                </td>
                <td className="text-charcoal">{p.category}</td>
                <td className="text-charcoal">{p.experienceYears} yrs</td>
                <td>
                  <span className="flex items-center gap-1.5">
                    <RatingStars rating={p.rating} className="h-3.5 w-3.5" />
                    <span className="text-sm font-semibold text-charcoal">
                      {p.rating.toFixed(1)}
                    </span>
                  </span>
                </td>
                <td>
                  <VerificationBadge status={p.verification} />
                </td>
                <td className="text-right">{actionFor(p)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="p-6 text-center text-slate-gray">
            No providers match the current filters.
          </p>
        )}
      </div>

      {/* Register modal */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-lg bg-card">
          <form method="dialog">
            <button
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
              aria-label="Close"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </form>
          <h3 className="font-display text-xl font-bold text-ink">
            Register a provider
          </h3>
          <p className="mt-1 text-sm text-slate-gray">
            Record the worker&apos;s basic and professional information.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Full name
              </legend>
              <input
                type="text"
                className="input w-full border-fog bg-cream"
                placeholder="Worker full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </fieldset>
            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Service category
                </legend>
                <select
                  className="select w-full border-fog bg-cream"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {categoryOptions.map((c) => (
                    <option key={c.slug}>{c.label}</option>
                  ))}
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Experience (years)
                </legend>
                <input
                  type="number"
                  className="input w-full border-fog bg-cream"
                  placeholder="5"
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                />
              </fieldset>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Contact number
              </legend>
              <input
                type="tel"
                className="input w-full border-fog bg-cream"
                placeholder="+92 300 0000000"
                value={form.contact}
                onChange={(e) => update("contact", e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Skills
              </legend>
              <textarea
                className="textarea w-full border-fog bg-cream"
                rows={2}
                placeholder="e.g. Leak repair, pipe installation"
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
              />
            </fieldset>

            <div className="modal-action flex gap-3">
              <button
                type="button"
                className="btn btn-ghost font-display font-semibold text-slate-gray"
                onClick={() => dialogRef.current?.close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn border-0 bg-ink font-display font-semibold text-paper hover:bg-ink-deep"
              >
                Save &amp; mark for verification
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
