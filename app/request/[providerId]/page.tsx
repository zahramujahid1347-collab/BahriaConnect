import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RequestForm from "@/components/request-form";
import { getProviderById } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Request service",
};

export default async function RequestPage({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const { providerId } = await params;
  const provider = await getProviderById(providerId);

  if (!provider) {
    return (
      <>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-3xl font-bold text-ink">
            Provider not found
          </h1>
          <Link
            href="/services"
            className="btn mt-6 border-0 bg-ink font-display font-semibold text-paper"
          >
            Browse services
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
            Request a service
          </h1>
          <p className="mt-2 text-lg text-slate-gray">
            Tell us what you need and when. Management confirms with the
            provider.
          </p>
        </div>
        <div className="mt-10">
          <RequestForm provider={provider} />
        </div>
      </main>
      <Footer />
    </>
  );
}
