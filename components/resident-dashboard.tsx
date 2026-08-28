"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  Notification,
  Provider,
  ServiceRequest,
  Complaint,
} from "@/lib/types";
import { StatusBadge, RatingStars } from "./badges";
import { InitialsAvatar } from "./avatar";
import { fileComplaint } from "@/lib/actions";
import {
  BellIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  FlagIcon,
} from "./icons";

type Tab = "active" | "previous" | "favorites" | "notifications" | "complaints";

const statusOrder: Record<string, number> = {
  Requested: 0,
  Pending: 1,
  Accepted: 2,
  Scheduled: 3,
  "In Progress": 4,
  Completed: 5,
};

function isActive(r: ServiceRequest) {
  return (
    r.status !== "Completed" &&
    r.status !== "Cancelled" &&
    r.status !== "Declined"
  );
}

export default function ResidentDashboard({
  requests,
  favorites,
  notifications,
  complaints,
}: {
  requests: ServiceRequest[];
  favorites: Provider[];
  notifications: Notification[];
  complaints: Complaint[];
}) {
  const [tab, setTab] = useState<Tab>("active");

  const active = requests.filter(isActive);
  const previous = requests.filter((r) => !isActive(r));

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "active", label: "Active requests", count: active.length },
    { id: "previous", label: "Previous", count: previous.length },
    { id: "favorites", label: "Favorites", count: favorites.length },
    {
      id: "notifications",
      label: "Notifications",
      count: notifications.filter((n) => n.unread).length,
    },
    { id: "complaints", label: "Complaints", count: complaints.length },
  ];

  return (
    <div>
      <div role="tablist" className="tabs tabs-box bg-card">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            className={`tab font-display font-semibold ${
              tab === t.id ? "tab-active" : ""
            }`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="badge badge-sm badge-primary ml-1 text-primary-content">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "active" && (
          <RequestList requests={active} empty="No active requests." />
        )}

        {tab === "previous" && (
          <RequestList requests={previous} empty="No previous requests yet." />
        )}

        {tab === "favorites" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((p) => (
              <div
                key={p.id}
                className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]"
              >
                <div className="card-body gap-3 p-5">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={p.name} className="h-12 w-12" />
                    <div className="min-w-0">
                      <p className="truncate font-display font-bold text-charcoal">
                        {p.name}
                      </p>
                      <p className="text-sm text-slate-gray">{p.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={p.rating} className="h-3.5 w-3.5" />
                    <span className="text-sm font-semibold text-charcoal">
                      {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="card-actions">
                    <Link
                      href={`/request/${p.id}`}
                      className="btn btn-sm flex-1 border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
                    >
                      Request again
                    </Link>
                    <Link
                      href={`/providers/${p.id}`}
                      className="btn btn-sm btn-outline border-ink text-ink hover:bg-ink-tint hover:border-ink"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "notifications" && (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-start gap-3 rounded-box border bg-card p-4 ${
                  n.unread ? "border-ink/40" : "border-fog"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    n.kind === "success"
                      ? "bg-green-tint text-verified"
                      : n.kind === "warning"
                        ? "bg-amber/20 text-amber"
                        : "bg-ink-tint text-ink"
                  }`}
                >
                  {n.kind === "success" ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : n.kind === "warning" ? (
                    <BellIcon className="h-4 w-4" />
                  ) : (
                    <ClockIcon className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display font-bold text-charcoal">
                      {n.title}
                    </p>
                    <span className="shrink-0 text-xs text-slate-gray">
                      {n.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-gray">{n.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === "complaints" && (
          <ComplaintsPanel complaints={complaints} />
        )}
      </div>
    </div>
  );
}

function ComplaintsPanel({ complaints }: { complaints: Complaint[] }) {
  const [list, setList] = useState<Complaint[]>(complaints);
  const [providerName, setProviderName] = useState("");
  const [reason, setReason] = useState("Poor service");
  const [details, setDetails] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reasons = [
    "Poor service",
    "No-show",
    "Misconduct",
    "Incorrect service",
    "Repeated cancellations",
    "Other",
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!details.trim()) return;
    setSaving(true);
    try {
      const d = new Date();
      const date = `${d.getDate()} ${d.toLocaleString("en", { month: "short" })} ${d.getFullYear()}`;
      const newComplaint: Complaint = {
        id: `C-${Date.now()}`,
        providerId: "",
        providerName: providerName.trim() || "General",
        reason,
        details: details.trim(),
        reportedBy: "Resident",
        date,
        status: "Open",
      };
      setList((l) => [newComplaint, ...l]);
      setProviderName("");
      setDetails("");
      setReason("Poor service");
      setNotice("Complaint filed — management will review it.");
      await fileComplaint({ providerName, reason, details });
    } finally {
      setSaving(false);
    }
  }

  const statusStyles: Record<Complaint["status"], string> = {
    Open: "bg-clay/10 text-clay",
    "Under Review": "bg-brass/15 text-brass-dark",
    Resolved: "bg-seal/10 text-seal-dark",
    Dismissed: "bg-ink/10 text-ink/60",
  };

  return (
    <div className="space-y-6">
      {/* File a complaint */}
      <form
        onSubmit={handleSubmit}
        className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]"
      >
        <div className="card-body gap-4 p-6">
          <div className="flex items-center gap-2">
            <FlagIcon className="h-5 w-5 text-clay" />
            <h2 className="font-display text-lg font-bold text-ink">
              File a complaint
            </h2>
          </div>
          <p className="text-sm text-slate-gray">
            Report poor service, a no-show, misconduct, or any other issue.
          </p>

          {notice && (
            <div className="flex items-center gap-2 rounded-lg bg-green-tint p-3 text-sm text-seal-dark">
              <CheckIcon className="h-4 w-4" />
              {notice}
            </div>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-display font-semibold text-ink">
              Provider name (optional)
            </legend>
            <input
              type="text"
              className="input w-full border-ink/15 bg-cream"
              placeholder="e.g. Ahmed Khan"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-display font-semibold text-ink">
              Reason
            </legend>
            <select
              className="select w-full border-ink/15 bg-cream"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-display font-semibold text-ink">
              Details
            </legend>
            <textarea
              className="textarea w-full border-ink/15 bg-cream"
              rows={3}
              placeholder="Describe what happened…"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </fieldset>

          <button
            type="submit"
            disabled={saving}
            className="btn w-full border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
          >
            {saving ? "Submitting…" : "Submit complaint"}
          </button>
        </div>
      </form>

      {/* My complaints */}
      <div>
        <h2 className="font-display text-lg font-bold text-ink">
          My complaints
        </h2>
        {list.length === 0 ? (
          <div className="mt-3 rounded-box border border-dashed border-fog bg-card p-10 text-center">
            <p className="font-display font-bold text-ink">
              No complaints filed yet.
            </p>
            <p className="mt-1 text-sm text-slate-gray">
              Issues you report will appear here, along with management replies.
            </p>
          </div>
        ) : (
          <ul className="mt-3 space-y-4">
            {list.map((c) => (
              <li
                key={c.id}
                className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.06)]"
              >
                <div className="card-body gap-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-charcoal">
                        {c.reason}
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-gray">{c.date}</span>
                  </div>
                  {c.providerName && c.providerName !== "General" && (
                    <p className="text-sm text-slate-gray">
                      Provider: {c.providerName}
                    </p>
                  )}
                  <p className="rounded-lg bg-cream p-3 text-sm leading-relaxed text-charcoal">
                    {c.details}
                  </p>
                  {c.reply && (
                    <div className="rounded-lg border border-seal/30 bg-green-tint p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-seal-dark">
                        Management reply{c.replyDate ? ` · ${c.replyDate}` : ""}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal">
                        {c.reply}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RequestList({
  requests,
  empty,
}: {
  requests: ServiceRequest[];
  empty: string;
}) {
  if (requests.length === 0) {
    return (
      <div className="rounded-box border border-dashed border-fog bg-card p-12 text-center">
        <p className="font-display text-lg font-bold text-ink">{empty}</p>
        <Link
          href="/services"
          className="btn mt-4 border-0 bg-ink font-display font-semibold text-paper"
        >
          Find a provider
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {requests
        .slice()
        .sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9))
        .map((r) => (
          <li key={r.id}>
            <div className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
              <div className="card-body flex-row flex-wrap items-center gap-4 p-5">
                <span className="badge badge-neutral font-mono text-[11px] tracking-wide text-paper">
                  #{r.id}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-charcoal">
                    {r.service}
                  </p>
                  <p className="text-sm text-slate-gray">
                    {r.providerName} · {r.date} · {r.time}
                  </p>
                </div>
                <StatusBadge status={r.status} />
                <Link
                  href={`/providers/${r.providerId}`}
                  className="link link-hover link-primary inline-flex items-center gap-1 text-sm font-semibold"
                >
                  Details <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
