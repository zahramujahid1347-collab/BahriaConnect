import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ResidentDashboard from "@/components/resident-dashboard";
import { SearchIcon } from "@/components/icons";
import { getAllComplaints } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Resident dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const complaints = await getAllComplaints();
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink">
              Resident dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">
              Welcome back
            </h1>
            <p className="mt-1 text-slate-gray">
              Here’s what’s happening with your home services.
            </p>
          </div>
          <Link
            href="/services"
            className="btn border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
          >
            <SearchIcon className="h-5 w-5" />
            Find a service
          </Link>
        </div>

        <div className="mt-8">
          <ResidentDashboard
            requests={[]}
            favorites={[]}
            notifications={[]}
            complaints={complaints}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
