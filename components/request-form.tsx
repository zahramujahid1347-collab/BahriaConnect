"use client";

import { useState } from "react";
import Link from "next/link";
import type { Provider } from "@/lib/types";
import { InitialsAvatar } from "./avatar";
import { VerifiedBadge } from "./badges";
import { CheckIcon, ArrowRightIcon } from "./icons";
import { residentPrecincts } from "@/lib/data";

const times = [
  "8:00 – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 – 2:00 PM",
  "2:00 – 4:00 PM",
  "4:00 – 6:00 PM",
  "6:00 – 8:00 PM",
];

export default function RequestForm({ provider }: { provider: Provider }) {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(times[0]);
  const [precinct, setPrecinct] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="card bg-card text-center shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
          <div className="card-body items-center gap-4 p-8">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success">
              <CheckIcon className="h-8 w-8 text-paper" strokeWidth={2.4} />
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">
              Request submitted
            </h2>
            <p className="max-w-md text-slate-gray">
              Management has received your request and will notify{" "}
              <strong className="text-charcoal">{provider.name}</strong>. You’ll
              be updated once they accept.
            </p>

            <div className="mt-2 w-full rounded-box bg-cream p-4 text-left text-sm">
              <div className="flex items-center gap-3 border-b border-fog pb-3">
                <InitialsAvatar name={provider.name} className="h-10 w-10" />
                <div>
                  <p className="font-display font-bold text-charcoal">
                    {provider.name}
                  </p>
                  <p className="text-slate-gray">
                    {provider.title} · {provider.serviceArea}
                  </p>
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-slate-gray">Service</dt>
                  <dd className="font-semibold text-charcoal">{provider.category}</dd>
                </div>
                <div>
                  <dt className="text-slate-gray">Date &amp; time</dt>
                  <dd className="font-semibold text-charcoal">
                    {date || "Flexible"} · {time}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-gray">Description</dt>
                  <dd className="font-semibold text-charcoal">
                    {description || "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/dashboard"
                className="btn border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
              >
                Track in dashboard
              </Link>
              <Link
                href="/services"
                className="btn btn-outline border-ink text-ink hover:bg-ink-tint hover:border-ink"
              >
                Browse more services
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ul className="steps steps-horizontal w-full">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Describe</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Schedule</li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Confirm</li>
      </ul>

      <div className="mt-8">
        {step === 1 && (
          <div className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
            <div className="card-body gap-5 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <InitialsAvatar name={provider.name} className="h-14 w-14" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg font-bold text-ink">
                      {provider.name}
                    </h2>
                    <VerifiedBadge />
                  </div>
                  <p className="text-sm text-slate-gray">
                    {provider.title} · {provider.experienceYears} years experience
                  </p>
                </div>
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  What do you need done?
                </legend>
                <textarea
                  className="textarea w-full border-fog bg-cream"
                  rows={4}
                  placeholder="e.g. The kitchen sink is leaking. I need assistance today between 4–6 PM."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="label text-slate-gray">
                  Be as specific as you can — it helps the provider come prepared.
                </p>
              </fieldset>

              <div className="card-actions justify-end">
                <button
                  className="btn border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
                  onClick={() => setStep(2)}
                >
                  Continue <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
            <div className="card-body gap-5 p-6 sm:p-8">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Preferred date
                </legend>
                <input
                  type="date"
                  className="input w-full border-fog bg-cream"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Preferred time
                </legend>
                <select
                  className="select w-full border-fog bg-cream"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {times.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-display font-semibold text-charcoal">
                  Your precinct
                </legend>
                <select
                  className="select w-full border-fog bg-cream"
                  value={precinct}
                  onChange={(e) => setPrecinct(e.target.value)}
                >
                  <option value="">Select precinct…</option>
                  {residentPrecincts.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </fieldset>

              <div className="card-actions justify-between">
                <button
                  className="btn btn-ghost font-display font-semibold text-slate-gray"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="btn border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
                  onClick={() => setStep(3)}
                >
                  Review request <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card bg-card shadow-[0_2px_8px_rgba(30,77,92,0.08)]">
            <div className="card-body gap-5 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Review your request
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-fog pb-3">
                  <dt className="text-slate-gray">Provider</dt>
                  <dd className="text-right font-semibold text-charcoal">
                    {provider.name} ({provider.category})
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-fog pb-3">
                  <dt className="text-slate-gray">Date &amp; time</dt>
                  <dd className="text-right font-semibold text-charcoal">
                    {date || "Flexible"} · {time}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-fog pb-3">
                  <dt className="text-slate-gray">Precinct</dt>
                  <dd className="text-right font-semibold text-charcoal">
                    {precinct || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-gray">Description</dt>
                  <dd className="text-right font-semibold text-charcoal">
                    {description || "—"}
                  </dd>
                </div>
              </dl>

              <div className="card-actions justify-between">
                <button
                  className="btn btn-ghost font-display font-semibold text-slate-gray"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="btn border-0 bg-seal font-display font-semibold text-paper hover:bg-seal-dark"
                  onClick={() => setSubmitted(true)}
                >
                  Submit request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
