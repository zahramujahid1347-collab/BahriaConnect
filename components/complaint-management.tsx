"use client";

import { useState } from "react";
import type { Complaint } from "@/lib/types";
import { FlagIcon } from "./icons";

const statusStyles: Record<Complaint["status"], string> = {
  Open: "badge-error text-error-content",
  "Under Review": "badge-warning text-warning-content",
  Resolved: "badge-success text-success-content",
  Dismissed: "badge-ghost text-slate-gray",
};

export default function ComplaintManagement({
  complaints,
}: {
  complaints: Complaint[];
}) {
  const [overrides, setOverrides] = useState<
    Record<string, Complaint["status"]>
  >({});

  const rows = complaints.map((c) => ({
    ...c,
    status: overrides[c.id] ?? c.status,
  }));

  function setStatus(id: string, next: Complaint["status"]) {
    setOverrides((o) => ({ ...o, [id]: next }));
  }

  return (
    <div className="space-y-4">
      {rows.map((c) => (
        <div
          key={c.id}
          className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.06)]"
        >
          <div className="card-body gap-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-box bg-error/10 text-error">
                  <FlagIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display font-bold text-charcoal">
                      {c.reason}
                    </h2>
                    <span
                      className={`badge border-0 font-mono text-[11px] tracking-wide ${statusStyles[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-gray">
                    {c.id} · {c.providerName} · {c.reportedBy} · {c.date}
                  </p>
                </div>
              </div>
            </div>

            <p className="rounded-box bg-cream p-4 text-sm leading-relaxed text-charcoal">
              {c.details}
            </p>

            <div className="card-actions justify-end">
              {c.status === "Open" && (
                <button
                  className="btn btn-sm border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
                  onClick={() => setStatus(c.id, "Under Review")}
                >
                  Start review
                </button>
              )}
              {c.status === "Under Review" && (
                <>
                  <button
                    className="btn btn-sm btn-outline border-error text-error hover:bg-error/10 hover:border-error"
                    onClick={() => setStatus(c.id, "Dismissed")}
                  >
                    Dismiss
                  </button>
                  <button
                    className="btn btn-sm border-0 bg-success text-success-content hover:bg-success/90"
                    onClick={() => setStatus(c.id, "Resolved")}
                  >
                    Resolve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {rows.length === 0 && (
        <div className="rounded-box border border-dashed border-fog bg-card p-12 text-center">
          <p className="font-display text-lg font-bold text-ink">
            No complaints to review.
          </p>
        </div>
      )}
    </div>
  );
}
