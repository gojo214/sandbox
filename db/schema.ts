import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * `orgId` holds a Clerk organization ID — identity is owned by Clerk, which is
 * why there is no users table here.
 *
 * Note: this shape intentionally excludes chat history and sandbox metadata.
 * If those need to come back, add them here and run `bun run db:push`.
 */
export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  index("games_org_id_created_at_idx").on(
    table.orgId,
    table.createdAt.desc()
  )
]);



export type Game = typeof games.$inferSelect
export type NewGame = typeof games.$inferInsert