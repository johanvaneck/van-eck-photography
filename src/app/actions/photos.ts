"use server";
import { db } from "@/lib/db";
import { photosTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function markPhotoFeatured({ photoId, featured }: { photoId: string, featured: boolean }) {
    await db.update(photosTable)
        .set({ featured })
        .where(eq(photosTable.id, photoId));
    return { success: true };
}
