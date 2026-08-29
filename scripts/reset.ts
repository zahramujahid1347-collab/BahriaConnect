import "dotenv/config";
import { db, pool } from "../lib/db";
import {
  reviews,
  complaints,
  serviceRequests,
  providers,
  residents,
} from "../lib/db/schema";

async function main() {
  await db.delete(reviews);
  await db.delete(complaints);
  await db.delete(serviceRequests);
  await db.delete(providers);
  await db.delete(residents);
  console.log(
    "Cleared providers, service requests, complaints, reviews, and residents.",
  );
  await pool.end();
}

main().catch(async (e) => {
  console.error("Reset failed:", e);
  await pool.end();
  process.exit(1);
});
