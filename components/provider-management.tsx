"use client";

import { useRef, useState } from "react";
import type { Provider, VerificationStatus } from "@/lib/types";
import { InitialsAvatar } from "./avatar";
import { RatingStars, VerificationBadge } from "./badges";
import { SearchIcon, XIcon } from "./icons";

const filterOptions: ("All" | VerificationStatus)[] = [
  "All",
  "Verified",
  "Pending Verification",
  "Temporarily Unavailable",
  "Suspended",
];

export default function ProviderManagement({
  providers,
}: {
  providers: Provider[];
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [overrides, setOverrides] = useState<
    Record<string, VerificationStatus>
  >({});
  const dialogRef = useRef<HTMLDialogElement>(null);

  const rows = providers
    .map((p) => ({ ...p, verification: overrides[p.id] ?? p.verification }))
    .filter((p) => {
      if (status !== "All" && p.verification !== status) return false;
      if (query.trim()) {
        const hay = `${p.name} ${p.category} ${p.title}`.toLowerCase();
        if (!hay.includes(query.trim().toLowerCase())) return false;
      }
      return true;
    });

  function setStatusFor(id: string, next: VerificationStatus) {
    setOverrides((o) => ({ ...o, [id]: next }));
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
          className="btn btn-sm border-0 bg-ink text-white hover:bg-ink-deep"
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
      <div className="flex flex-wrap items-center gap-3 rounded-box border border-fog bg-white p-4">
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
          className="btn border-0 bg-ink font-display font-semibold text-white hover:bg-ink-deep"
          onClick={() => dialogRef.current?.showModal()}
        >
          Register provider
        </button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-box border border-fog bg-white">
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
        <div className="modal-box max-w-lg bg-white">
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
            Record the worker’s basic and professional information.
          </p>

          <div className="mt-5 space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Full name
              </legend>
              <input
                type="text"
                className="input w-full border-fog bg-cream"
                placeholder="Worker full name"
              />
            </fieldset>
            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Service category
                </legend>
                <select className="select w-full border-fog bg-cream">
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>AC &amp; Cooling</option>
                  <option>Maids &amp; Domestic Help</option>
                  <option>Carpentry</option>
                  <option>Cleaning</option>
                  <option>Gardening</option>
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
              />
            </fieldset>

            <div className="modal-action">
              <form method="dialog" className="flex gap-3">
                <button className="btn btn-ghost font-display font-semibold text-slate-gray">
                  Cancel
                </button>
                <button className="btn border-0 bg-ink font-display font-semibold text-white hover:bg-ink-deep">
                  Save &amp; mark for verification
                </button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
