import type { Metadata } from "next";
import ProviderManagement from "@/components/provider-management";
import { getAllProviders } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Provider management",
};

export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
  const providers = await getAllProviders();

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Providers
      </h1>
      <p className="mt-1 text-slate-gray">
        Register, verify, and manage the service providers in your community.
      </p>

      <div className="mt-8">
        <ProviderManagement providers={providers} />
      </div>
    </div>
  );
}
