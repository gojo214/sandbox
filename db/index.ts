import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

/**
 * Pooled connection — used for normal application queries.
 * Do NOT use this for migrations; use DATABASE_URL_UNPOOLED instead.
 */
export const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

export * from "./schema";