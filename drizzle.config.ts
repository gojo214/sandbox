import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Connection strings live in .env.local for this Next.js app.
config({ path: ".env.local" });

if (!process.env.DATABASE_URL_UNPOOLED) {
  throw new Error(
    "DATABASE_URL_UNPOOLED is not set. Add it to .env.local — it should be the direct (non-pooled) Neon connection string."
  );
}

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // Direct connection: DDL (db:push) must not run through the PgBouncer pooler.
    url: process.env.DATABASE_URL_UNPOOLED,
  },
});
