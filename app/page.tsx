import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
  UsersIcon,
  WrenchIcon,
  SearchIcon,
  MessageIcon,
  CalendarIcon,
  BriefcaseIcon,
  CheckIcon,
  HammerIcon,
  WasherIcon,
  LeafIcon,
  BoltIcon,
  SnowflakeIcon,
  RollerIcon,
} from "@/components/icons";

const categoryPills = [
  { slug: "plumbers", label: "Plumbing", icon: WrenchIcon },
  { slug: "electricians", label: "Electrical", icon: BoltIcon },
  { slug: "carpenters", label: "Carpentry", icon: HammerIcon },
  { slug: "ac-technicians", label: "AC Service", icon: SnowflakeIcon },
  { slug: "painters", label: "Painting", icon: RollerIcon },
  { slug: "gardeners", label: "Gardening", icon: LeafIcon },
];

const categoryGroups = [
  {
    name: "Domestic",
    icon: UsersIcon,
    items: ["Maids", "Domestic helpers", "Cooks", "Cleaning services"],
  },
  {
    name: "Maintenance",
    icon: HammerIcon,
    items: ["Plumbers", "Electricians", "Carpenters", "Painters", "Handymen"],
  },
  {
    name: "Technical",
    icon: WasherIcon,
    items: ["AC technicians", "Appliance repair", "Internet & network"],
  },
  {
    name: "Outdoor",
    icon: LeafIcon,
    items: ["Gardeners", "Landscaping"],
  },
];

const steps = [
  {
    icon: SearchIcon,
    title: "Search & compare",
    text: "Pick a category, filter by rating, availability, or area, and compare verified profiles.",
  },
  {
    icon: MessageIcon,
    title: "Describe the job",
    text: '"Kitchen sink is leaking" — plain language, no formal appointment needed.',
  },
  {
    icon: CalendarIcon,
    title: "Pick a time & submit",
    text: "Choose your preferred date and time, then send the request.",
  },
  {
    icon: BriefcaseIcon,
    title: "Management routes it",
    text: "The provider is notified and accepts — you get a confirmation.",
  },
  {
    icon: CheckIcon,
    title: "Service done, rated",
    text: "Job completed, marked done, and you leave a rating for the next resident.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ------------------------------------------------------------ */}
        {/* Hero                                                         */}
        {/* ------------------------------------------------------------ */}
        <section
          id="top"
          className="mx-auto w-full max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20"
        >
          <div className="max-w-2xl">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
                Bahria Town Karachi · Verified Services
              </p>
              <h1 className="font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06] tracking-tight text-ink">
                One Community. Every Service.
              </h1>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink/70">
                Connecting Bahria Town residents with verified and reliable
                home-service providers — every maid, electrician, and technician
                is registered and checked by community management before you
                ever see their profile.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-ink/85"
                >
                  Find a Service
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/management/providers"
                  className="text-[15px] font-medium text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
                >
                  Register as a Provider
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-2 text-sm text-ink/55">
                <ShieldCheckIcon className="h-4 w-4 shrink-0 text-seal" />
                Every provider on this page is Management Verified — that&apos;s a
                real status, not a marketing badge.
              </div>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Old way vs With BahriaConnect                                */}
        {/* ------------------------------------------------------------ */}
        <section className="border-y border-ink/10 bg-sage/60">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2">
              <div className="bg-paper p-8 sm:p-10">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
                  The old way
                </p>
                <h3 className="mb-4 font-display text-2xl text-ink">
                  Ask around and hope.
                </h3>
                <ul className="space-y-3 text-[15px] text-ink/65">
                  <li>Scrolling three different Facebook groups for a recommendation</li>
                  <li>No way to tell if a number someone shared is even still active</li>
                  <li>No record of who you hired last time, or how it went</li>
                  <li>Workers relying on word-of-mouth for their next job</li>
                </ul>
              </div>
              <div className="bg-paper p-8 sm:p-10">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
                  With BahriaConnect
                </p>
                <h3 className="mb-4 font-display text-2xl text-ink">
                  One verified directory.
                </h3>
                <ul className="space-y-3 text-[15px] text-ink/65">
                  <li>Search a category, see who&apos;s verified and available now</li>
                  <li>Real profiles: experience, ratings, completed jobs, service area</li>
                  <li>Every request tracked from &ldquo;requested&rdquo; to &ldquo;completed&rdquo;</li>
                  <li>Management keeps oversight, so accountability doesn&apos;t disappear</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Trust → Convenience → Accountability                         */}
        {/* ------------------------------------------------------------ */}
        <section
          id="how-it-works"
          className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mb-14 max-w-xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
              Trust → Convenience → Accountability
            </p>
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Built to answer three questions at once.
            </h2>
          </div>

          <Reveal className="grid gap-8 md:grid-cols-3 md:gap-10">
            <div>
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-seal/10 text-seal-dark">
                <UsersIcon className="h-5 w-5" />
              </div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
                Residents
              </p>
              <p className="mb-3 font-display text-xl leading-snug text-ink">
                &ldquo;Who can I trust to do this job?&rdquo;
              </p>
              <p className="text-[15px] leading-relaxed text-ink/65">
                Browse verified providers by category, compare real profiles,
                and submit a request in minutes.
              </p>
            </div>
            <div className="md:border-l md:border-ink/10 md:pl-10">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-seal/10 text-seal-dark">
                <WrenchIcon className="h-5 w-5" />
              </div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
                Workers
              </p>
              <p className="mb-3 font-display text-xl leading-snug text-ink">
                &ldquo;Where can I find more opportunities?&rdquo;
              </p>
              <p className="text-[15px] leading-relaxed text-ink/65">
                A digital profile registered through management puts your work
                in front of residents actively looking.
              </p>
            </div>
            <div className="md:border-l md:border-ink/10 md:pl-10">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-seal/10 text-seal-dark">
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
                Management
              </p>
              <p className="mb-3 font-display text-xl leading-snug text-ink">
                &ldquo;Are services being delivered responsibly?&rdquo;
              </p>
              <p className="text-[15px] leading-relaxed text-ink/65">
                Centralized registration, verification, complaint handling, and
                oversight across the community.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Service categories (dark)                                    */}
        {/* ------------------------------------------------------------ */}
        <section id="services" className="bg-seal-dark text-paper">
          <Reveal className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mb-12 max-w-xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass-light">
                Service categories
              </p>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                Whatever the house needs, organized clearly.
              </h2>
            </div>

            <div className="mb-14 flex flex-wrap gap-3">
              {categoryPills.map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/${c.slug}`}
                  className="flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/10 py-2 pl-3 pr-4 text-sm transition-colors hover:bg-paper/20"
                >
                  <span className="text-brass-light">
                    <c.icon className="h-5 w-5" />
                  </span>
                  {c.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
              {categoryGroups.map((g) => (
                <div key={g.name} className="bg-seal-dark p-7">
                  <div className="mb-4 flex items-center gap-2 text-brass-light">
                    <g.icon className="h-[18px] w-[18px]" />
                    <h3 className="font-display text-lg text-paper">{g.name}</h3>
                  </div>
                  <ul className="space-y-2 text-[14px] text-paper/60">
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Requesting a service — 5 steps                               */}
        {/* ------------------------------------------------------------ */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-14 max-w-xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
              Requesting a service
            </p>
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              From &ldquo;I need a plumber&rdquo; to done, in five steps.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} className="relative" delay={i * 80}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-brass">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-ink/10" />
                  <span className="text-seal-dark">
                    <s.icon className="h-[18px] w-[18px]" />
                  </span>
                </div>
                <h3 className="mb-2 font-display text-[17px] text-ink">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/60">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Verification badge                                           */}
        {/* ------------------------------------------------------------ */}
        <section
          id="verification"
          className="border-y border-ink/10 bg-sage/60"
        >
          <Reveal className="mx-auto grid w-full max-w-6xl items-start gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
                The verification badge
              </p>
              <h2 className="mb-5 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                &ldquo;Management Verified&rdquo; means someone actually checked.
              </h2>
              <p className="max-w-md text-[15px] leading-relaxed text-ink/65">
                Only authorized management staff can change a provider&apos;s
                status. Residents never see private identity documents — just
                what&apos;s needed to make a good decision.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-4 rounded-lg border border-ink/10 bg-paper p-5">
                <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-seal/10 px-2.5 py-1 text-xs font-medium text-seal-dark">
                  Verified
                </span>
                <p className="text-sm leading-relaxed text-ink/60">
                  Registered and checked through the official management process.
                </p>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-ink/10 bg-paper p-5">
                <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-brass/15 px-2.5 py-1 text-xs font-medium text-brass-dark">
                  Pending Verification
                </span>
                <p className="text-sm leading-relaxed text-ink/60">
                  Application received; management review in progress.
                </p>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-ink/10 bg-paper p-5">
                <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-ink/10 px-2.5 py-1 text-xs font-medium text-ink/60">
                  Temporarily Unavailable
                </span>
                <p className="text-sm leading-relaxed text-ink/60">
                  Verified, but not accepting new requests right now.
                </p>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-ink/10 bg-paper p-5">
                <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-clay/10 px-2.5 py-1 text-xs font-medium text-clay">
                  Suspended
                </span>
                <p className="text-sm leading-relaxed text-ink/60">
                  Access restricted by management pending a complaint review.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* For Management                                               */}
        {/* ------------------------------------------------------------ */}
        <section
          id="management"
          className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
        >
          <Reveal className="max-w-2xl">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
                For Bahria Town management
              </p>
              <h2 className="mb-5 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Oversight without the spreadsheets.
              </h2>
              <p className="mb-8 max-w-md text-[15px] leading-relaxed text-ink/65">
                Workers are registered and verified through a dedicated
                management interface — giving the community one accountable
                system instead of scattered contact lists.
              </p>
              <ul className="space-y-3.5">
                {[
                  "Register and verify providers, one central roster",
                  "Route and monitor every service request",
                  "Handle complaints with a clear audit trail",
                  "See demand by category and precinct",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-ink/75"
                  >
                    <CheckIcon className="mt-0.5 h-[17px] w-[17px] shrink-0 text-seal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/management"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-ink/85"
              >
                Open Management Portal
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>

          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Get started                                                  */}
        {/* ------------------------------------------------------------ */}
        <section id="get-started" className="border-y border-ink/10 bg-sage/60">
          <Reveal className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
                Get started
              </p>
              <h2 className="mb-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Find trusted help in your community.
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-ink/65">
                Browse verified providers, request a service, and track it from
                request to completion.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-seal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-seal-dark"
              >
                Browse services
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper"
              >
                Join as a resident
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
