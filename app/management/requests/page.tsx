import type { Metadata } from "next";
import RequestManagement from "@/components/request-management";
import { getAllRequests } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Request management",
};

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const requests = await getAllRequests();

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
