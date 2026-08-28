import "dotenv/config";
import { db, pool } from "../lib/db";
import {
  providers,
  serviceRequests,
  complaints,
  reviews,
} from "../lib/db/schema";
import {
  providers as seedProviders,
  requests as seedRequests,
  complaints as seedComplaints,
  reviews as seedReviews,
} from "../lib/data";

async function main() {
  // Clear in dependency order
  await db.delete(reviews);
  await db.delete(complaints);
  await db.delete(serviceRequests);
  await db.delete(providers);

  await db.insert(providers).values(seedProviders);
  await db.insert(serviceRequests).values(seedRequests);
  await db.insert(complaints).values(seedComplaints);
  await db.insert(reviews).values(seedReviews);

  console.log(
    `Seeded ${seedProviders.length} providers, ${seedRequests.length} requests, ${seedComplaints.length} complaints, ${seedReviews.length} reviews.`,
  );

  await pool.end();
}

main().catch(async (e) => {
  console.error("Seed failed:", e);
  await pool.end();
  process.exit(1);
});
