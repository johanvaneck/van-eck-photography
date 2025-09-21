"use server";
import { db } from "@/lib/db";
import { picturesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getS3Client } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function markPictureFeatured({ pictureId, featured }: { pictureId: string, featured: boolean }) {
    await db.update(picturesTable)
        .set({ featured })
        .where(eq(picturesTable.id, pictureId));
    return { success: true };
}

export async function deletePicture({ pictureId }: { pictureId: string }) {
    // Get picture info from DB
    const picture = await db.select().from(picturesTable).where(eq(picturesTable.id, pictureId)).then(arr => arr[0]);
    if (!picture) return { success: false, error: "Picture not found" };

    // Delete from S3
    const { data: s3Client, error } = await getS3Client();
    if (error) return { success: false, error: error.message };
    const bucket = process.env.S3_BUCKET || "vep";
    const deleteKeys = [picture.s3Path];
    if (picture.lowResS3Path) deleteKeys.push(picture.lowResS3Path);
    for (const Key of deleteKeys) {
        try {
            await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key }));
        } catch (err) {
            // Log error but continue
            console.error("Error deleting S3 object", Key, err);
        }
    }

    // Delete from DB
    await db.delete(picturesTable).where(eq(picturesTable.id, pictureId));
    return { success: true };
}
