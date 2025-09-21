"use server";
import { db } from "@/lib/db";
import { shootsTable, picturesTable } from "@/lib/db/schema";
import { Result, tryCatch } from "@/lib/types/result";
import { getS3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getShoots() {
  return await tryCatch(db.select().from(shootsTable));
}

export async function createPictureAction({ shootId, fileType }: { shootId: string, fileType: string }): Promise<Result<typeof picturesTable.$inferSelect>> {
  const pictureId = "picture_" + nanoid();
  const { data, error } = await tryCatch(
    db.insert(picturesTable)
      .values({
        id: pictureId,
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
  const [picture] = data;
  return { data: picture, error: null };
}

export async function getPresignedUploadUrlAction({ pictureId, fileType, isLowRes }: { pictureId: string, fileType: string, isLowRes?: boolean }): Promise<Result<string>> {
  console.log("Getting presigned upload URL for:", { pictureId, fileType, isLowRes });
  const { data: s3Client, error: errorClient } = await getS3Client();
  if (errorClient) {
    console.error("Error getting S3 client:", errorClient);
    return { data: null, error: new Error("Error getting S3 client") };
  }
  const s3Path = isLowRes ? `pictures/${pictureId}_lowres` : `pictures/${pictureId}`;
  const command = new PutObjectCommand({
    Bucket: "vep",
    Key: s3Path,
    ContentType: fileType,
  });
  const { data: presignedUrl, error: presignedError } = await tryCatch(getSignedUrl(s3Client, command, { expiresIn: 60 * 10 }));
  if (presignedError) {
    console.error("Error getting presigned URL:", presignedError);
    return { data: null, error: new Error("Error getting presigned URL") };
  }
  return { data: presignedUrl, error: null };
}

export async function updatePictureS3PathAction({ pictureId, lowResS3Path }: { pictureId: string, lowResS3Path?: string }): Promise<Result<string>> {
  const s3Path = `pictures/${pictureId}`;
  const updateObj: Partial<typeof picturesTable.$inferInsert> = { s3Path };
  if (lowResS3Path) updateObj.lowResS3Path = lowResS3Path;
  const { error } = await tryCatch(
    db.update(picturesTable)
      .set(updateObj)
      .where(eq(picturesTable.id, pictureId))
  );
  if (error) {
    return { data: null, error };
  }
  return { data: pictureId, error: null };
}
