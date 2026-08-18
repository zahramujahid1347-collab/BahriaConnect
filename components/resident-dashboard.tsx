"use client";

import { useState } from "react";
import Link from "next/link";
import type { Notification, Provider, ServiceRequest } from "@/lib/types";
import { StatusBadge, RatingStars } from "./badges";
import { InitialsAvatar } from "./avatar";
import {
  BellIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
} from "./icons";

type Tab = "active" | "previous" | "favorites" | "notifications";

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
}: {
  requests: ServiceRequest[];
  favorites: Provider[];
  notifications: Notification[];
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
  ];

  return (
    <div>
      <div role="tablist" className="tabs tabs-box bg-white">
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
                className="card bg-white shadow-[0_2px_8px_rgba(30,77,92,0.08)]"
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
                      className="btn btn-sm flex-1 border-0 bg-amber font-display font-semibold text-warning-content hover:bg-amber/90"
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
                className={`flex items-start gap-3 rounded-box border bg-white p-4 ${
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
      <div className="rounded-box border border-dashed border-fog bg-white p-12 text-center">
        <p className="font-display text-lg font-bold text-ink">{empty}</p>
        <Link
          href="/services"
          className="btn mt-4 border-0 bg-ink font-display font-semibold text-white"
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
            <div className="card bg-white shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
              <div className="card-body flex-row flex-wrap items-center gap-4 p-5">
                <span className="badge badge-neutral font-badge text-[11px] tracking-wide text-white">
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
