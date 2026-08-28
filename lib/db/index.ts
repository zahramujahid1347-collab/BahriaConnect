import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const raw =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!raw) {
  throw new Error("DATABASE_URL is not set. Add it to your .env file.");
}

// Strip query params (e.g. ?sslmode=require) and configure SSL explicitly.
const connectionString = raw.split("?")[0];

const globalForDb = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema });
