import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { InitialsAvatar } from "@/components/avatar";
import { RatingStars, VerificationBadge } from "@/components/badges";
import { ProviderCard } from "@/components/provider-card";
import {
  MapPinIcon,
  CheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { getProviderById, getReviewsForProvider, getProvidersByCategorySlug } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return { title: "Provider profile" };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getProviderById(id);

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

  const providerReviews = await getReviewsForProvider(provider.id);
  const related = (await getProvidersByCategorySlug(provider.categorySlug)).filter(
    (p) => p.id !== provider.id,
  );
  const available = provider.verification === "Verified";

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-fog/60 bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="breadcrumbs text-sm text-slate-gray">
              <ul>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href={`/services/${provider.categorySlug}`}>
                    {provider.category}
                  </Link>
                </li>
                <li>{provider.name}</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <InitialsAvatar
                  name={provider.name}
                  className="h-20 w-20"
                  textClassName="text-2xl"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
                      {provider.name}
                    </h1>
                    <VerificationBadge status={provider.verification} />
                  </div>
                  <p className="mt-1 text-lg text-slate-gray">
                    {provider.title} · {provider.experienceYears} years experience
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars rating={provider.rating} />
                    <span className="font-semibold text-charcoal">
                      {provider.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-gray">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/request/${provider.id}`}
                className={`btn shrink-0 border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark ${
                  available ? "" : "btn-disabled"
                }`}
                aria-disabled={!available}
              >
                Request Service
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main column */}
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  About
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-charcoal">
                  {provider.bio}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-gray">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon className="h-4 w-4 text-ink" />
                    {provider.serviceArea}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-ink" />
                    Registered {provider.registeredDate}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  Services offered
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {provider.servicesOffered.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-charcoal">
                      <CheckIcon className="h-4 w-4 text-verified" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-ink">Skills</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.skills.map((s) => (
                    <span key={s} className="badge badge-ghost border-fog font-sans font-medium text-charcoal">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  Reviews ({providerReviews.length})
                </h2>
                {providerReviews.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {providerReviews.map((r) => (
                      <div
                        key={r.id}
                        className="rounded-box border border-fog bg-card p-5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-charcoal">
                              {r.author}
                            </span>
                            {r.verifiedResident && (
                              <span className="badge badge-ghost gap-1 border-fog font-mono text-[10px] tracking-wide text-verified">
                                <CheckIcon className="h-3 w-3" /> Resident
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-slate-gray">{r.date}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5">
                          <RatingStars rating={r.rating} className="h-3.5 w-3.5" />
                          <span className="text-sm font-semibold text-charcoal">
                            {r.rating}
                          </span>
                        </div>
                        <p className="mt-2 leading-relaxed text-charcoal">
                          {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-slate-gray">
                    No reviews yet. Be the first to leave feedback.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
                <div className="card-body gap-4 p-5">
                  <h3 className="font-display text-base font-bold text-ink">
                    Request details
                  </h3>
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-slate-gray">Experience</dt>
                      <dd className="font-display text-lg font-bold text-charcoal">
                        {provider.experienceYears} yrs
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-gray">Jobs completed</dt>
                      <dd className="font-display text-lg font-bold text-charcoal">
                        {provider.jobsCompleted}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-gray">Response rate</dt>
                      <dd className="font-display text-lg font-bold text-charcoal">
                        {provider.responseRate}%
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-gray">Languages</dt>
                      <dd className="font-display text-lg font-bold text-charcoal">
                        {provider.languages.join(", ")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="rounded-box bg-green-tint p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="mt-0.5 h-6 w-6 shrink-0 text-verified" />
                  <div>
                    <p className="font-display font-bold text-ink">
                      Background-checked by management
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal">
                      This provider’s identity and references were reviewed and
                      approved by Bahria Town management.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Works in
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {provider.precincts.map((p) => (
                    <span key={p} className="badge badge-ghost border-fog font-sans text-charcoal">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-fog/60 pt-12">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-ink">
                  More {provider.category.toLowerCase()}
                </h2>
                <Link
                  href={`/services/${provider.categorySlug}`}
                  className="link link-hover link-primary inline-flex items-center gap-1 font-display font-semibold"
                >
                  View all <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {related.slice(0, 3).map((p) => (
                  <ProviderCard key={p.id} provider={p} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
