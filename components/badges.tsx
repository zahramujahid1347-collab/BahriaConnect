import type { RequestStatus, VerificationStatus } from "@/lib/types";
import { CheckIcon, StarIcon } from "./icons";

/** The single reusable "Verified" badge — never restyled per screen. */
export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="badge badge-success gap-1 border-0 font-badge text-[11px] tracking-wide text-success-content">
      <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.6} />
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
        <span className="badge badge-warning gap-1 border-0 font-badge text-[11px] tracking-wide text-warning-content">
          Pending Verification
        </span>
      );
    case "Suspended":
      return (
        <span className="badge badge-error gap-1 border-0 font-badge text-[11px] tracking-wide text-error-content">
          Suspended
        </span>
      );
    default:
      return (
        <span className="badge badge-ghost gap-1 font-badge text-[11px] tracking-wide text-slate-gray">
          Temporarily Unavailable
        </span>
      );
  }
}

const statusStyles: Record<
  RequestStatus,
  { className: string; dot: string }
> = {
  Requested: { className: "badge-ghost text-slate-gray", dot: "bg-fog" },
  Pending: { className: "badge-warning text-warning-content", dot: "bg-amber" },
  Accepted: { className: "badge-info text-info-content", dot: "bg-sky" },
  Scheduled: { className: "badge-info text-info-content", dot: "bg-sky" },
  "In Progress": { className: "badge-info text-info-content", dot: "bg-sky" },
  Completed: { className: "badge-success text-success-content", dot: "bg-success" },
  Declined: { className: "badge-error text-error-content", dot: "bg-error" },
  Cancelled: { className: "badge-error text-error-content", dot: "bg-error" },
  Disputed: { className: "badge-error text-error-content", dot: "bg-error" },
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const s = statusStyles[status];
  return (
    <span
      className={`badge gap-1.5 border-0 font-badge text-[11px] tracking-wide ${s.className}`}
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
      className="inline-flex items-center gap-0.5 text-amber"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`${className} ${i <= full ? "text-amber" : "text-fog"}`}
        />
      ))}
    </span>
  );
}
