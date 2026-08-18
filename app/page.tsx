import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SectionHeading, { Eyebrow } from "@/components/section-heading";
import { ProviderCard } from "@/components/provider-card";
import { VerifiedBadge, RatingStars } from "@/components/badges";
import { InitialsAvatar } from "@/components/avatar";
import {
  ServiceIcon,
  ShieldCheckIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/icons";
import { categories, providers } from "@/lib/data";

export default function Home() {
  const featured = [providers[0], providers[2], providers[3]];

  return (
    <>
      <Navbar />
      <main>
        {/* ------------------------------------------------------------ */}
        {/* Hero                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="relative overflow-hidden border-b border-fog/60">
          <div className="bg-dots pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Eyebrow>Bahria Town Karachi · Verified Services</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                One Community. Every Service.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-gray">
                Connecting Bahria Town residents with verified and reliable
                home-service providers.
              </p>

              <form
                action="/services"
                method="get"
                className="mt-8 flex w-full max-w-lg"
              >
                <label className="input join-item flex w-full items-center gap-2 border-fog bg-white">
                  <SearchIcon className="h-5 w-5 text-slate-gray" />
                  <input
                    type="search"
                    name="q"
                    placeholder="Try “leaking kitchen sink”"
                    className="grow"
                  />
                </label>
                <button
                  type="submit"
                  className="btn join-item border-0 bg-amber font-display font-semibold text-warning-content hover:bg-amber/90"
                >
                  Search
                </button>
              </form>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-verified" />
                  <strong>Management-vetted</strong> providers
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-verified" />
                  Verified badges on every profile
                </span>
              </div>
            </div>

            {/* Signature: the "trusted ID profile" card */}
            <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
              <div className="card relative bg-white shadow-[0_16px_40px_rgba(30,77,92,0.14)]">
                <div className="card-body gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <InitialsAvatar name="Ahmed Khan" className="h-16 w-16" textClassName="text-lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl font-bold text-ink">
                          Ahmed Khan
                        </h3>
                        <VerifiedBadge />
                      </div>
                      <p className="text-sm text-slate-gray">
                        Plumber · 7 years experience
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <RatingStars rating={4.8} />
                        <span className="text-sm font-semibold">4.8</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      ["640", "jobs done"],
                      ["98%", "response"],
                      ["7 yrs", "experience"],
                    ].map(([v, l]) => (
                      <div
                        key={l}
                        className="rounded-box bg-cream px-2 py-3"
                      >
                        <p className="font-display text-lg font-bold text-ink">
                          {v}
                        </p>
                        <p className="text-xs text-slate-gray">{l}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-box bg-green-tint px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-verified">
                      <CheckIcon className="h-4 w-4" />
                      Background-checked by management
                    </span>
                  </div>

                  <button className="btn w-full border-0 bg-amber font-display font-semibold text-warning-content hover:bg-amber/90">
                    Request Service
                  </button>
                </div>

                {/* Verification stamp */}
                <div className="pointer-events-none absolute -right-4 -top-4 rotate-12 rounded-full border-2 border-verified px-3 py-1.5 font-badge text-[10px] font-bold uppercase tracking-[0.18em] text-verified">
                  Management
                  <br />
                  Verified
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Popular services                                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Popular services"
            title="What do you need done today?"
            description="Browse trusted providers organised by the work they do."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="group flex items-center gap-3 rounded-box border border-fog bg-white p-4 transition-all hover:border-ink/40 hover:shadow-[0_2px_8px_rgba(30,77,92,0.08)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-box bg-ink-tint text-ink transition-colors group-hover:bg-ink group-hover:text-white">
                  <ServiceIcon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-sm font-semibold leading-tight text-charcoal">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services"
              className="link link-hover link-primary inline-flex items-center gap-1 font-display font-semibold"
            >
              View all services <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* How it works                                                 */}
        {/* ------------------------------------------------------------ */}
        <section
          id="how-it-works"
          className="border-y border-fog/60 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps to trusted help"
            />
            <ul className="steps steps-vertical mt-10 w-full sm:steps-horizontal">
              <li className="step step-primary text-left sm:text-center">
                <div className="max-w-xs">
                  <p className="font-display font-bold text-ink">Find a provider</p>
                  <p className="mt-1 text-sm text-slate-gray">
                    Search a service and compare verified profiles, ratings, and
                    availability.
                  </p>
                </div>
              </li>
              <li className="step step-primary text-left sm:text-center">
                <div className="max-w-xs">
                  <p className="font-display font-bold text-ink">Request service</p>
                  <p className="mt-1 text-sm text-slate-gray">
                    Describe what you need and pick a time. Management confirms
                    with the provider.
                  </p>
                </div>
              </li>
              <li className="step step-primary text-left sm:text-center">
                <div className="max-w-xs">
                  <p className="font-display font-bold text-ink">Track &amp; review</p>
                  <p className="mt-1 text-sm text-slate-gray">
                    Follow your request to completion, then rate the provider for
                    the community.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Trust & Safety                                               */}
        {/* ------------------------------------------------------------ */}
        <section id="trust" className="relative overflow-hidden bg-ink text-white">
          <div className="bg-dots-light pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>
                <span className="text-amber">Trust &amp; Safety</span>
              </Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                You should always know who is coming into your home.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">
                Every provider on BahriaConnect is registered, background-checked,
                and approved by Bahria Town management before they can accept a
                single request.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  "Identity & reference checks before approval",
                  "Standardised profiles with ratings and job history",
                  "Structured complaints and accountability process",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verified">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["318", "Verified providers"],
                ["287", "Completed this month"],
                ["4.7", "Average rating"],
                ["46", "Active requests"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-box border border-white/10 bg-white/5 p-6"
                >
                  <p className="font-display text-3xl font-extrabold text-amber">
                    {v}
                  </p>
                  <p className="mt-1 text-sm text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Featured verified providers                                  */}
        {/* ------------------------------------------------------------ */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Recommended providers"
              title="Trusted by your neighbours"
              description="Verified professionals with a proven record across Bahria Town."
            />
            <Link
              href="/services"
              className="link link-hover link-primary hidden shrink-0 items-center gap-1 font-display font-semibold sm:inline-flex"
            >
              Browse all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* CTA band                                                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-box bg-primary px-6 py-12 text-center text-white sm:px-12">
            <div className="bg-dots-light pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Need help today?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Find a verified provider and have your request tracked from
                start to finish.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/services"
                  className="btn border-0 bg-amber font-display font-semibold text-warning-content hover:bg-amber/90"
                >
                  Request a service
                </Link>
                <Link
                  href="/register"
                  className="btn btn-outline border-white/40 text-white hover:border-white hover:bg-white/10"
                >
                  Join as a resident
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
