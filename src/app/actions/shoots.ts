"use server";
import { db } from "@/lib/db";
import { shootsTable } from "@/lib/db/schema";
import { tryCatch } from "@/lib/types/result";

export async function getShoots() {
  return await tryCatch(db.select().from(shootsTable))
}
