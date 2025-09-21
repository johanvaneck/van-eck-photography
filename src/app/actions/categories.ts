"use server";
import { db } from "@/lib/db";
import { categoriesTable } from "@/lib/db/schema";
import { tryCatch } from "@/lib/types/result";

export async function getCategories() {
  return await tryCatch(db.select().from(categoriesTable));
}
