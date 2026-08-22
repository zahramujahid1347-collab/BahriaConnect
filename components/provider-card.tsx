import Link from "next/link";
import type { Provider } from "@/lib/types";
import { InitialsAvatar } from "./avatar";
import { VerificationBadge } from "./badges";

export function ProviderCard({ provider }: { provider: Provider }) {
  const unavailable = provider.verification !== "Verified";
  return (
    <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_20px_50px_-28px_rgba(27,36,32,0.35)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <InitialsAvatar
            name={provider.name}
            className="h-12 w-12 text-lg"
          />
          <div>
            <p className="font-display text-[17px] leading-tight text-ink">
              {provider.name}
            </p>
            <p className="font-mono text-xs uppercase tracking-wide text-ink/50">
              {provider.title}
            </p>
          </div>
        </div>
        <VerificationBadge status={provider.verification} />
      </div>

      <dl className="grid grid-cols-2 gap-y-3 border-t border-ink/10 pt-4 text-sm">
        <dt className="text-ink/45">Experience</dt>
        <dd className="text-right font-medium text-ink">
          {provider.experienceYears} years
        </dd>
        <dt className="text-ink/45">Rating</dt>
        <dd className="flex items-center justify-end gap-1 font-medium text-ink">
          {provider.rating.toFixed(1)}{" "}
          <StarIcon />
        </dd>
        <dt className="text-ink/45">Jobs completed</dt>
        <dd className="text-right font-medium text-ink">
          {provider.jobsCompleted}
        </dd>
        <dt className="text-ink/45">Area</dt>
        <dd className="truncate text-right font-medium text-ink">
          {provider.serviceArea}
        </dd>
      </dl>

      <div className="mt-5 flex gap-2">
        <Link
          href={`/request/${provider.id}`}
          className={`flex-1 rounded-md bg-seal py-2.5 text-center text-sm font-medium text-paper transition-colors hover:bg-seal-dark ${
            unavailable ? "pointer-events-none opacity-50" : ""
          }`}
          aria-disabled={unavailable}
        >
          Request Service
        </Link>
        <Link
          href={`/providers/${provider.id}`}
          className="rounded-md border border-ink/20 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper"
        >
          View
        </Link>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-brass text-brass"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.5Z" />
    </svg>
  );
}
