import Link from "next/link";
import type { Provider } from "@/lib/types";
import { InitialsAvatar } from "./avatar";
import { RatingStars, VerificationBadge } from "./badges";
import { MapPinIcon, ArrowRightIcon } from "./icons";

export function ProviderCard({ provider }: { provider: Provider }) {
  const unavailable = provider.verification !== "Verified";
  return (
    <div className="card bg-white shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
      <div className="card-body gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <InitialsAvatar name={provider.name} className="h-14 w-14" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-ink">
                {provider.name}
              </h3>
              <VerificationBadge status={provider.verification} />
            </div>
            <p className="text-sm text-slate-gray">{provider.title}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <RatingStars rating={provider.rating} />
              <span className="text-sm font-semibold text-charcoal">
                {provider.rating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-gray">
                ({provider.reviewCount})
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-slate-gray">Experience</span>
            <strong>{provider.experienceYears} yrs</strong>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-slate-gray">Jobs</span>
            <strong>{provider.jobsCompleted}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-gray">
          <MapPinIcon className="h-4 w-4" />
          {provider.serviceArea}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link
            href={`/request/${provider.id}`}
            className={`btn flex-1 border-0 bg-amber text-warning-content hover:bg-amber/90 ${
              unavailable ? "btn-disabled" : ""
            }`}
            aria-disabled={unavailable}
          >
            Request Service
          </Link>
          <Link
            href={`/providers/${provider.id}`}
            className="btn btn-outline border-ink text-ink hover:bg-ink-tint hover:border-ink"
          >
            View Profile
          </Link>
        </div>

        {!unavailable && (
          <Link
            href={`/providers/${provider.id}`}
            className="link link-hover link-primary inline-flex items-center gap-1 text-sm font-semibold"
          >
            See full profile <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
