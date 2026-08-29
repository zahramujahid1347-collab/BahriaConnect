import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const raw =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

// Strip query params (e.g. ?sslmode=require) and configure SSL explicitly.
const connectionString = raw ? raw.split("?")[0] : "";

const globalForDb = globalThis as unknown as { pool?: Pool };

function makePool(): Pool {
  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });
}

export const pool = (globalForDb.pool ??= makePool());
export const db = drizzle(pool, { schema });
