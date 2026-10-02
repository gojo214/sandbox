<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Database: Drizzle ORM

This project is in active development and requires **no backwards compatibility**.
Schema changes are destructive by design — there are no historical deployments to
keep compatible with.

## Rules

- **Do NOT run `drizzle-kit migrate`, `bun run db:migrate`, or `drizzle-kit generate`.**
  Migration files are not used in this project. Never create or apply them.
- **Use `bun run db:push` to apply the schema.** It diffs `db/schema.ts` against the
  live database and applies the result directly.
- **Treat `db:push` as the only supported path for schema changes.** Edit
  `db/schema.ts`, then push. Do not hand-write `ALTER TABLE` / `CREATE TABLE` SQL
  against the database either.
- `drizzle.config.ts` points `dbCredentials.url` at `DATABASE_URL_UNPOOLED` (the direct
  connection) because `push` performs DDL, which cannot run through the PgBouncer
  pooler. `DATABASE_URL` (pooled) is for application queries only.

## Before pushing

`db:push` diffs the schema file against the **live database**, so any table that exists
in the database but is missing from `db/schema.ts` is treated as a table to drop. That
includes tables with real data and columns holding credentials.

Always run `db:push` against a development branch first, and confirm nothing valuable
is about to be dropped. Never let `push` run against the production branch as a
side effect of a routine change.
