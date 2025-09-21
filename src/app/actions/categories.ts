"use server";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { categoriesTable } from "@/lib/db/schema";
import { tryCatch } from "@/lib/types/result";
import { eq } from "drizzle-orm";

export async function createCategory({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  const id = "category_" + nanoid();
  const result = await tryCatch(
    db.insert(categoriesTable).values({ id, name, userId }),
  );
  revalidatePath("/categories");
  return result;
}

// Accept userId as parameter and filter categories by user
export async function getCategories(userId: string) {
  return await tryCatch(
    db.select().from(categoriesTable).where(eq(categoriesTable.userId, userId)),
  );
}
