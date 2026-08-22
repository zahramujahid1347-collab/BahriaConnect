import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Logo from "@/components/logo";
import { ShieldCheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Join as a resident",
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <div className="text-center">
          <Logo className="justify-center" />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">
            Join as a resident
          </h1>
          <p className="mt-1 text-slate-gray">
            We verify your address so only residents access trusted providers.
          </p>
        </div>

        <form className="card mt-8 bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
          <div className="card-body gap-4 p-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Full name
              </legend>
              <input
                type="text"
                className="input w-full border-fog bg-cream"
                placeholder="Zahra Mehmood"
                autoComplete="name"
              />
            </fieldset>

            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Precinct
                </legend>
                <select className="select w-full border-fog bg-cream">
                  <option>Precinct 1</option>
                  <option>Precinct 2</option>
                  <option>Precinct 3</option>
                  <option>Precinct 4</option>
                  <option>Precinct 5</option>
                  <option>Precinct 6</option>
                  <option>Precinct 7</option>
                  <option>Precinct 8</option>
                  <option>Precinct 9</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  House / apartment
                </legend>
                <input
                  type="text"
                  className="input w-full border-fog bg-cream"
                  placeholder="House 12"
                />
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Phone number
              </legend>
              <input
                type="tel"
                className="input w-full border-fog bg-cream"
                placeholder="+92 300 0000000"
                autoComplete="tel"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Email
              </legend>
              <input
                type="email"
                className="input w-full border-fog bg-cream"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend font-display font-semibold text-charcoal">
                Password
              </legend>
              <input
                type="password"
                className="input w-full border-fog bg-cream"
                placeholder="Create a secure password"
                autoComplete="new-password"
              />
            </fieldset>

            <button
              type="submit"
              className="btn w-full border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
            >
              Create account
            </button>

            <div className="flex items-start gap-2 rounded-box bg-green-tint p-3 text-sm text-charcoal">
              <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
              Your address is verified against Bahria Town management records.
            </div>

            <p className="text-center text-sm text-slate-gray">
              Already have an account?{" "}
              <Link href="/login" className="link link-hover link-primary font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
