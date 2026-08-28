"use client";

import { useState } from "react";
import type { RequestStatus, ServiceRequest } from "@/lib/types";
import { StatusBadge } from "./badges";
import { FilterIcon } from "./icons";
import { advanceRequest } from "@/lib/actions";

const statuses: ("All" | RequestStatus)[] = [
  "All",
  "Requested",
  "Pending",
  "Accepted",
  "Scheduled",
  "In Progress",
  "Completed",
  "Declined",
  "Cancelled",
  "Disputed",
];

export default function RequestManagement({
  requests,
}: {
  requests: ServiceRequest[];
}) {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [overrides, setOverrides] = useState<Record<string, RequestStatus>>({});

  const categories = ["All", ...new Set(requests.map((r) => r.service))];

  const rows = requests
    .map((r) => ({ ...r, status: overrides[r.id] ?? r.status }))
    .filter((r) => {
      if (status !== "All" && r.status !== status) return false;
      if (category !== "All" && r.service !== category) return false;
      return true;
    });

  async function advance(r: ServiceRequest) {
    const flow: RequestStatus[] = [
      "Requested",
      "Pending",
      "Accepted",
      "Scheduled",
      "In Progress",
      "Completed",
    ];
    const idx = flow.indexOf(r.status);
    if (idx >= 0 && idx < flow.length - 1) {
      const next = flow[idx + 1];
      setOverrides((o) => ({ ...o, [r.id]: next }));
      await advanceRequest(r.id, next);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 rounded-box border border-fog bg-card p-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal">
          <FilterIcon className="h-4 w-4" /> Filters
        </span>
        <select
          className="select border-fog bg-cream font-sans"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          className="select border-fog bg-cream font-sans"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by service"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-slate-gray">
          {rows.length} request{rows.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-5 overflow-x-auto rounded-box border border-fog bg-card">
        <table className="table">
          <thead>
            <tr className="text-slate-gray">
              <th>ID</th>
              <th>Resident</th>
              <th>Service</th>
              <th>Provider</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-cream/50">
                <td className="font-mono text-xs text-slate-gray">#{r.id}</td>
                <td>
                  <p className="font-semibold text-charcoal">{r.resident}</p>
                  <p className="text-xs text-slate-gray">{r.precinct}</p>
                </td>
                <td className="text-charcoal">{r.service}</td>
                <td className="text-charcoal">{r.providerName}</td>
                <td className="text-charcoal">
                  {r.date}
                  <p className="text-xs text-slate-gray">{r.time}</p>
                </td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td className="text-right">
                  {r.status !== "Completed" &&
                    r.status !== "Cancelled" &&
                    r.status !== "Declined" && (
                      <button
                        className="btn btn-xs btn-outline border-ink text-ink hover:bg-ink-tint hover:border-ink"
                        onClick={() => advance(r)}
                      >
                        Advance
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="p-6 text-center text-slate-gray">
            No requests match the current filters.
          </p>
        )}
      </div>
    </div>
  );
}
