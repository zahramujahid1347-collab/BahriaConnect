import type { RequestStatus, VerificationStatus } from "@/lib/types";
import { ShieldCheckIcon, StarIcon } from "./icons";

/** The single reusable "Verified" badge. */
export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-seal/10 px-2.5 py-1 text-[11px] font-medium text-seal-dark">
      <ShieldCheckIcon className="h-3 w-3" />
      {label}
    </span>
  );
}

export function VerificationBadge({
  status,
}: {
  status: VerificationStatus;
}) {
  switch (status) {
    case "Verified":
      return <VerifiedBadge />;
    case "Pending Verification":
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-full bg-brass/15 px-2.5 py-1 text-[11px] font-medium text-brass-dark">
          Pending Verification
        </span>
      );
    case "Suspended":
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-full bg-clay/10 px-2.5 py-1 text-[11px] font-medium text-clay">
          Suspended
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-full bg-ink/10 px-2.5 py-1 text-[11px] font-medium text-ink/60">
          Temporarily Unavailable
        </span>
      );
  }
}

const statusStyles: Record<
  RequestStatus,
  { className: string; dot: string }
> = {
  Requested: { className: "bg-ink/10 text-ink/60", dot: "bg-ink/40" },
  Pending: { className: "bg-brass/15 text-brass-dark", dot: "bg-brass" },
  Accepted: { className: "bg-seal/10 text-seal-dark", dot: "bg-seal-light" },
  Scheduled: { className: "bg-seal/10 text-seal-dark", dot: "bg-seal-light" },
  "In Progress": { className: "bg-seal/10 text-seal-dark", dot: "bg-seal-light" },
  Completed: { className: "bg-seal/10 text-seal-dark", dot: "bg-seal" },
  Declined: { className: "bg-clay/10 text-clay", dot: "bg-clay" },
  Cancelled: { className: "bg-clay/10 text-clay", dot: "bg-clay" },
  Disputed: { className: "bg-clay/10 text-clay", dot: "bg-clay" },
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const s = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${s.className}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export function RatingStars({
  rating,
  className = "h-4 w-4",
}: {
  rating: number;
  className?: string;
}) {
  const full = Math.round(rating);
  return (
    <span
      className="inline-flex items-center gap-0.5 text-brass"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`${className} ${i <= full ? "text-brass" : "text-ink/20"}`}
        />
      ))}
    </span>
  );
}
