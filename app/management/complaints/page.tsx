import type { Metadata } from "next";
import ComplaintManagement from "@/components/complaint-management";
import { complaints } from "@/lib/data";

export const metadata: Metadata = {
  title: "Complaints",
};

export default function ComplaintsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Complaints &amp; disputes
      </h1>
      <p className="mt-1 text-slate-gray">
        Review reported issues and take appropriate action.
      </p>

      <div className="mt-8">
        <ComplaintManagement complaints={complaints} />
      </div>
    </div>
  );
}
