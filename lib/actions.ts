"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { providers, serviceRequests, complaints } from "./db/schema";
import type {
  VerificationStatus,
  RequestStatus,
  Provider,
} from "./types";

export interface RegisterProviderInput {
  name: string;
  category: string;
  categorySlug: string;
  experienceYears: number;
  contact: string;
  skills: string[];
}

export async function registerProvider(
  input: RegisterProviderInput,
): Promise<Provider> {
  const provider: Provider = {
    id: `p-${Date.now()}`,
    name: input.name,
    category: input.category,
    categorySlug: input.categorySlug,
    title: input.category,
    experienceYears: input.experienceYears,
    rating: 0,
    reviewCount: 0,
    jobsCompleted: 0,
    availability: "Available",
    serviceArea: "Bahria Town Karachi",
    precincts: [],
    verification: "Pending Verification",
    skills: input.skills,
    servicesOffered: [],
    bio: "",
    registeredDate: "Just now",
    languages: ["Urdu"],
    responseRate: 0,
  };

  await db.insert(providers).values(provider);
  revalidatePath("/management/providers");
  revalidatePath("/services");
  revalidatePath("/");

  return provider;
}

export async function setProviderVerification(
  id: string,
  verification: VerificationStatus,
) {
  await db
    .update(providers)
    .set({ verification })
    .where(eq(providers.id, id));
  revalidatePath("/management/providers");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function advanceRequest(id: string, status: RequestStatus) {
  await db
    .update(serviceRequests)
    .set({ status })
    .where(eq(serviceRequests.id, id));
  revalidatePath("/management/requests");
}

export async function setComplaintStatus(
  id: string,
  status: "Open" | "Under Review" | "Resolved" | "Dismissed",
) {
  await db
    .update(complaints)
    .set({ status })
    .where(eq(complaints.id, id));
  revalidatePath("/management/complaints");
}

export interface SubmitRequestInput {
  providerId: string;
  providerName: string;
  service: string;
  categorySlug: string;
  date: string;
  time: string;
  description: string;
  resident: string;
  precinct: string;
}

export async function submitRequest(input: SubmitRequestInput) {
  const id = `${Date.now()}`;
  await db.insert(serviceRequests).values({
    id,
    providerId: input.providerId,
    providerName: input.providerName,
    service: input.service,
    categorySlug: input.categorySlug,
    status: "Pending",
    date: input.date,
    time: input.time,
    description: input.description,
    resident: input.resident,
    precinct: input.precinct,
  });
  revalidatePath("/dashboard");
  revalidatePath("/management/requests");
}

function todayLabel(): string {
  const now = new Date();
  return `${now.getDate()} ${now.toLocaleString("en", { month: "short" })} ${now.getFullYear()}`;
}

export interface FileComplaintInput {
  providerName: string;
  reason: string;
  details: string;
}

export async function fileComplaint(input: FileComplaintInput) {
  const id = `C-${Date.now()}`;
  await db.insert(complaints).values({
    id,
    providerId: "",
    providerName: input.providerName.trim() || "General",
    reason: input.reason,
    details: input.details,
    reportedBy: "Resident",
    date: todayLabel(),
    status: "Open",
    reply: "",
    replyDate: "",
  });
  revalidatePath("/management/complaints");
  revalidatePath("/dashboard");
}

export async function replyToComplaint(id: string, reply: string) {
  await db
    .update(complaints)
    .set({ reply: reply.trim(), replyDate: todayLabel() })
    .where(eq(complaints.id, id));
  revalidatePath("/management/complaints");
}
