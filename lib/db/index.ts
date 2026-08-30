import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const raw =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

const connectionString = raw ? raw.split("?")[0] : "";

const globalForDb = globalThis as unknown as { pool?: Pool };

export function getPool(): Pool {
  if (!globalForDb.pool) {
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Add it to your .env file (local) " +
          "or Vercel environment variables (production).",
      );
    }
    globalForDb.pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return globalForDb.pool;
}

export const db = drizzle(getPool(), { schema });

// Back-compat getter for scripts (e.g. reset.ts) - throws if DB not configured
export const pool = new Proxy({} as Pool, {
  get(_target, prop: keyof Pool) {
    return getPool()[prop];
  },
});