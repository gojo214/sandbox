import { db, games } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

import("server-only");

export const listGames = async () => {
    const { orgId } = await auth();

    if (!orgId) {
        throw []
    }

    const list = await db.select().from(games).where(eq(games.orgId, orgId)).orderBy(desc(games.createdAt));

    return list;
}