"use server";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { tryCatch } from "@/lib/types/result";
import { eq, sql } from "drizzle-orm";

import type { AsyncResult } from "@/lib/types/result";

export async function isNameAvailable(name: string): AsyncResult<boolean> {
    const { data, error } = await tryCatch(
        db
            .select()
            .from(user)
            .where(
                eq(sql`lower(${user.name})`, name.toLowerCase())
            ));
    if (error) {
        return { data: null, error };
    }
    if (data.length > 0) {
        return {
            data: null,
            error: new Error("This name is already taken.")
        }
    }
    return { data: true, error: null };
}
