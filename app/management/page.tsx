import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/badges";
import { ArrowRightIcon } from "@/components/icons";
import { requests } from "@/lib/data";

export const metadata: Metadata = {
  title: "Management dashboard",
};

const stats = [
  { label: "Registered providers", value: "342", hint: "All time" },
  { label: "Verified providers", value: "318", hint: "Approved & visible" },
  { label: "Pending verification", value: "24", hint: "Awaiting review" },
  { label: "Active requests", value: "46", hint: "Open now" },
  { label: "Completed this month", value: "287", hint: "August 2026" },
  { label: "Open complaints", value: "7", hint: "Needs attention" },
];

const mostRequested = [
  "Plumbing",
  "Electrical",
  "AC Repair",
  "Domestic Helpers",
  "Carpentry",
];

export default function ManagementPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
            Dashboard
          </h1>
          <p className="mt-1 text-slate-gray">
            Platform activity across Bahria Town Karachi.
          </p>
        </div>
        <Link
          href="/management/providers"
          className="btn border-0 bg-ink font-display font-semibold text-white hover:bg-ink-deep"
        >
          Register a provider
        </Link>
      </div>

      <div className="stats stats-vertical mt-8 w-full rounded-box border border-fog bg-white shadow-[0_2px_8px_rgba(30,77,92,0.06)] sm:stats-horizontal">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-title text-slate-gray">{s.label}</div>
            <div className="stat-value font-display text-ink">{s.value}</div>
            <div className="stat-desc text-slate-gray">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Recent requests */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">
              Recent requests
            </h2>
            <Link
              href="/management/requests"
              className="link link-hover link-primary inline-flex items-center gap-1 text-sm font-semibold"
            >
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto rounded-box border border-fog bg-white">
            <table className="table table-sm">
              <thead>
                <tr className="text-slate-gray">
                  <th>ID</th>
                  <th>Service</th>
                  <th>Provider</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 5).map((r) => (
                  <tr key={r.id} className="hover:bg-cream/50">
                    <td className="font-badge text-xs text-slate-gray">#{r.id}</td>
                    <td className="font-semibold text-charcoal">{r.service}</td>
                    <td className="text-charcoal">{r.providerName}</td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most requested services */}
        <div>
          <h2 className="font-display text-xl font-bold text-ink">
            Most requested services
          </h2>
          <ol className="mt-4 overflow-hidden rounded-box border border-fog bg-white">
            {mostRequested.map((s, i) => (
              <li
                key={s}
                className="flex items-center gap-4 border-b border-fog px-5 py-4 last:border-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-tint font-display text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <span className="font-display font-semibold text-charcoal">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
