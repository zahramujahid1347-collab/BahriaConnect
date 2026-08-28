import {
  pgTable,
  text,
  integer,
  real,
  boolean,
} from "drizzle-orm/pg-core";

export const providers = pgTable("providers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  categorySlug: text("category_slug").notNull(),
  title: text("title").notNull(),
  experienceYears: integer("experience_years").notNull().default(0),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  jobsCompleted: integer("jobs_completed").notNull().default(0),
  availability: text("availability").notNull().default("Available"),
  serviceArea: text("service_area").notNull().default("Bahria Town Karachi"),
  precincts: text("precincts").array().notNull().default([]),
  verification: text("verification").notNull().default("Pending Verification"),
  skills: text("skills").array().notNull().default([]),
  servicesOffered: text("services_offered").array().notNull().default([]),
  bio: text("bio").notNull().default(""),
  registeredDate: text("registered_date").notNull().default(""),
  languages: text("languages").array().notNull().default([]),
  responseRate: integer("response_rate").notNull().default(0),
});

export const serviceRequests = pgTable("service_requests", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull(),
  providerName: text("provider_name").notNull(),
  service: text("service").notNull(),
  categorySlug: text("category_slug").notNull(),
  status: text("status").notNull().default("Pending"),
  date: text("date").notNull(),
  time: text("time").notNull(),
  description: text("description").notNull(),
  resident: text("resident").notNull(),
  precinct: text("precinct").notNull(),
});

export const complaints = pgTable("complaints", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull(),
  providerName: text("provider_name").notNull(),
  reason: text("reason").notNull(),
  details: text("details").notNull(),
  reportedBy: text("reported_by").notNull(),
  date: text("date").notNull(),
  status: text("status").notNull().default("Open"),
});

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull(),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  date: text("date").notNull(),
  text: text("text").notNull(),
  verifiedResident: boolean("verified_resident").notNull().default(false),
});
