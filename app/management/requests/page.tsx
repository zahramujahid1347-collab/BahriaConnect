import type { Metadata } from "next";
import RequestManagement from "@/components/request-management";
import { requests } from "@/lib/data";

export const metadata: Metadata = {
  title: "Request management",
};

export default function RequestsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Service requests
      </h1>
      <p className="mt-1 text-slate-gray">
        Review and manage every request from submission to completion.
      </p>

      <div className="mt-8">
        <RequestManagement requests={requests} />
      </div>
    </div>
  );
}
