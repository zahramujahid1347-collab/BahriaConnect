"use client";

import { useMemo, useState } from "react";
import type { Provider, ServiceCategory } from "@/lib/types";
import { ProviderCard } from "./provider-card";
import { FilterIcon, SearchIcon } from "./icons";

export default function CategoryBrowser({
  category,
  providers,
}: {
  category: ServiceCategory;
  providers: Provider[];
}) {
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("Any");
  const [minRating, setMinRating] = useState("Any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useMemo(() => {
    return providers
      .filter((p) => {
        if (verifiedOnly && p.verification !== "Verified") return false;
        if (availability !== "Any" && p.availability !== availability)
          return false;
        if (minRating !== "Any" && p.rating < Number(minRating)) return false;
        if (query.trim()) {
          const hay = [
            p.name,
            p.title,
            ...p.skills,
            ...p.servicesOffered,
          ]
            .join(" ")
            .toLowerCase();
          if (!hay.includes(query.trim().toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [providers, query, availability, minRating, verifiedOnly]);

  return (
    <div>
      {/* Filters */}
      <div className="rounded-box border border-fog bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="input join-item flex min-w-56 flex-1 items-center gap-2 border-fog bg-cream">
            <SearchIcon className="h-4 w-4 text-slate-gray" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category.name.toLowerCase()}…`}
              className="grow"
            />
          </label>

          <select
            className="select border-fog bg-cream font-sans"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            aria-label="Filter by availability"
          >
            <option>Any</option>
            <option>Available</option>
            <option>Busy</option>
            <option>Off Duty</option>
          </select>

          <select
            className="select border-fog bg-cream font-sans"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            aria-label="Filter by minimum rating"
          >
            <option>Any</option>
            <option>4.5</option>
            <option>4.8</option>
          </select>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-charcoal">
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
            />
            Verified only
          </label>

          <span className="inline-flex items-center gap-1.5 text-sm text-slate-gray">
            <FilterIcon className="h-4 w-4" />
            {filtered.length} provider{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-box border border-dashed border-fog bg-white p-12 text-center">
          <p className="font-display text-lg font-bold text-ink">
            No providers match those filters.
          </p>
          <p className="mt-1 text-slate-gray">
            Try widening your filters — or check back soon while management vets
            more providers in this category.
          </p>
        </div>
      )}
    </div>
  );
}
