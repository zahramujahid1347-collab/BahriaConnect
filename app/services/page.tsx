import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Eyebrow } from "@/components/section-heading";
import { ProviderCard } from "@/components/provider-card";
import { ServiceIcon, SearchIcon, ArrowRightIcon } from "@/components/icons";
import { categories, categoryGroups, providers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Browse all verified home services in Bahria Town Karachi — maids, plumbers, electricians, AC technicians, and more.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";

  const results = query
    ? providers.filter((p) =>
        [
          p.name,
          p.category,
          p.title,
          ...p.skills,
          ...p.servicesOffered,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : [];

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-fog/60 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <Eyebrow>Browse services</Eyebrow>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
              All home services
            </h1>
            <p className="mt-3 max-w-xl text-lg text-slate-gray">
              Every category is staffed by management-vetted providers across
              Bahria Town Karachi.
            </p>

            <form action="/services" method="get" className="mt-6 flex w-full max-w-lg">
              <label className="input join-item flex w-full items-center gap-2 border-fog bg-cream">
                <SearchIcon className="h-5 w-5 text-slate-gray" />
                <input
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Search providers, skills, or services"
                  className="grow"
                />
              </label>
              <button
                type="submit"
                className="btn join-item border-0 bg-ink font-display font-semibold text-white hover:bg-ink-deep"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          {query && (
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-ink">
                {results.length} result{results.length === 1 ? "" : "s"} for
                “{q}”
              </h2>
              {results.length > 0 ? (
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <ProviderCard key={p.id} provider={p} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 max-w-md text-slate-gray">
                  No providers matched that search. Try a service name like
                  “plumber”, “maid”, or “AC repair”.
                </p>
              )}
            </div>
          )}

          <div className="space-y-12">
            {categoryGroups.map((group) => {
              const items = categories.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group}>
                  <h2 className="font-display text-xl font-bold text-ink">
                    {group}
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/services/${c.slug}`}
                        className="group flex items-start gap-4 rounded-box border border-fog bg-white p-5 transition-all hover:border-ink/40 hover:shadow-[0_2px_8px_rgba(30,77,92,0.08)]"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-box bg-ink-tint text-ink transition-colors group-hover:bg-ink group-hover:text-white">
                          <ServiceIcon name={c.icon} className="h-6 w-6" />
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center justify-between">
                            <span className="font-display font-bold text-charcoal">
                              {c.name}
                            </span>
                            <ArrowRightIcon className="h-4 w-4 text-slate-gray transition-transform group-hover:translate-x-1" />
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-slate-gray">
                            {c.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
