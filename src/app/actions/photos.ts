"use server";
import { db } from "@/lib/db";
import { photosTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getS3Client } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function markPhotoFeatured({ photoId, featured }: { photoId: string, featured: boolean }) {
    await db.update(photosTable)
        .set({ featured })
        .where(eq(photosTable.id, photoId));
    return { success: true };
}

export async function deletePhoto({ photoId }: { photoId: string }) {
    // Get photo info from DB
    const photo = await db.select().from(photosTable).where(eq(photosTable.id, photoId)).then(arr => arr[0]);
    if (!photo) return { success: false, error: "Photo not found" };

    // Delete from S3
    const { data: s3Client, error } = await getS3Client();
    if (error) return { success: false, error: error.message };
    const bucket = process.env.S3_BUCKET || "vep";
    const deleteKeys = [photo.s3Path];
    if (photo.lowResS3Path) deleteKeys.push(photo.lowResS3Path);
    for (const Key of deleteKeys) {
        try {
            await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key }));
        } catch (err) {
            // Log error but continue
            console.error("Error deleting S3 object", Key, err);
        }
    }

    // Delete from DB
    await db.delete(photosTable).where(eq(photosTable.id, photoId));
    return { success: true };
}