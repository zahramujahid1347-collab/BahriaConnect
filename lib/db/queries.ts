import { eq } from "drizzle-orm";
import { db } from "./index";
import {
  providers,
  serviceRequests,
  complaints,
  reviews,
} from "./schema";
import type {
  Provider,
  ServiceRequest,
  Complaint,
  Review,
} from "@/lib/types";

export async function getAllProviders(): Promise<Provider[]> {
  const rows = await db.select().from(providers);
  return rows as unknown as Provider[];
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const rows = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id));
  return (rows[0] as unknown as Provider | undefined) ?? null;
}

export async function getProvidersByCategorySlug(
  slug: string,
): Promise<Provider[]> {
  const rows = await db
    .select()
    .from(providers)
    .where(eq(providers.categorySlug, slug));
  return rows as unknown as Provider[];
}

export async function getReviewsForProvider(
  providerId: string,
): Promise<Review[]> {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.providerId, providerId));
  return rows as unknown as Review[];
}

export async function getAllRequests(): Promise<ServiceRequest[]> {
  const rows = await db.select().from(serviceRequests);
  return rows as unknown as ServiceRequest[];
}

export async function getAllComplaints(): Promise<Complaint[]> {
  const rows = await db.select().from(complaints);
  return rows as unknown as Complaint[];
}
