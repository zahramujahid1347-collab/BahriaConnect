import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Logo from "@/components/logo";
import RegisterForm from "@/components/register-form";

export const metadata: Metadata = {
  title: "Create your account",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialRole = role === "management" ? "management" : "resident";

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-md px-5 py-16 sm:px-8">
        <div className="text-center">
          <Logo className="justify-center" />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">
            Create your account
          </h1>
          <p className="mt-1 text-ink/60">
            Choose whether you’re joining as a resident or as management.
          </p>
        </div>

        <Suspense fallback={<div className="card mt-8 h-64 animate-pulse rounded-box bg-card" />}>
          <RegisterForm initialRole={initialRole} />
        </Suspense>

        <p className="mt-6 text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="underline decoration-ink/25 underline-offset-4 hover:text-ink">
            Sign in
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
