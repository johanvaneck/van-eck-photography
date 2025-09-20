"use server";
import { db } from "@/lib/db";
import { shootsTable, photosTable } from "@/lib/db/schema";
import { Result, tryCatch } from "@/lib/types/result";
import { getS3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function getShoots() {
  return await tryCatch(db.select().from(shootsTable));
}

export async function createPhotoAction({ shootId, fileType }: { shootId: string, fileType: string }): Promise<Result<typeof photosTable.$inferSelect>> {
  const photoId = "photo_" + nanoid();
  const { data, error } = await tryCatch(
    db.insert(photosTable)
      .values({
        id: photoId,
        shootId,
        s3Path: "",
        lowResS3Path: "",
        fileType,
      })
      .returning()
  );
  if (error) {
    return { data: null, error };
  }
  const [photo] = data;
  return { data: photo, error: null };
}

export async function getPresignedUploadUrlAction({ photoId, fileType, isLowRes }: { photoId: string, fileType: string, isLowRes?: boolean }): Promise<Result<string>> {
  const { data: s3Client, error: errorClient } = await getS3Client();
  if (errorClient) {
    return { data: null, error: errorClient };
  }
  const s3Path = isLowRes ? `photos/${photoId}_lowres` : `photos/${photoId}`;
  const command = new PutObjectCommand({
    Bucket: "vep",
    Key: s3Path,
    ContentType: fileType,
  });
  try {
    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 10 });
    return { data: presignedUrl, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updatePhotoS3PathAction({ photoId, lowResS3Path }: { photoId: string, lowResS3Path?: string }): Promise<Result<string>> {
  const s3Path = `photos/${photoId}`;
  const updateObj: Partial<typeof photosTable.$inferInsert> = { s3Path };
  if (lowResS3Path) updateObj.lowResS3Path = lowResS3Path;
  const { error } = await tryCatch(
    db.update(photosTable)
      .set(updateObj)
      .where(eq(photosTable.id, photoId))
  );
  if (error) {
    return { data: null, error };
  }
  return { data: photoId, error: null };
}
