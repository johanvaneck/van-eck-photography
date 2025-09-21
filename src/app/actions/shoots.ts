

"use server";

import { and, desc, eq, gte, lt } from "drizzle-orm";
import { format, addMonths } from "date-fns";
import { shootsTable, picturesTable } from "@/lib/db/schema";
import { Result, tryCatch } from "@/lib/types/result";
import { nanoid } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { CreateShoot, Shoot } from "@/lib/db/types";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getS3Client } from "@/lib/s3";


export async function createShoot({
  name,
  userId,
  categoryId,
}: {
  name: string;
  userId: string;
  categoryId?: string;
}) {
  const id = "shoot_" + nanoid();
  const result = await tryCatch(
    db.insert(shootsTable).values({ id, name, userId, categoryId }),
  );
  revalidatePath(`/shoots/${id}`);
  return result;
}

export async function getShootsByMonth(
  start: Date,
  end: Date,
): Promise<Result<Shoot[]>> {
  return await tryCatch(
    db
      .select()
      .from(shootsTable)
      .where(
        and(
          gte(shootsTable.time, format(start, "yyyy-MM-dd")),
          lt(shootsTable.time, format(addMonths(end, 1), "yyyy-MM-dd")),
        ),
      ),
  );
}

export async function getRecentShoots(): Promise<Result<Shoot[]>> {
  return await tryCatch(
    db.select().from(shootsTable).orderBy(desc(shootsTable.updatedAt)).limit(5),
  );
}

export async function getShoots(userId: string) {
  return await tryCatch(
    db.select().from(shootsTable).where(eq(shootsTable.userId, userId)),
  );
}

export async function createPictureAction({
  shootId,
  fileType,
  userId,
}: {
  shootId: string;
  fileType: string;
  userId: string;
}): Promise<Result<typeof picturesTable.$inferSelect>> {
  const pictureId = "picture_" + nanoid();
  const { data, error } = await tryCatch(
    db
      .insert(picturesTable)
      .values({
        id: pictureId,
        shootId,
        userId,
        s3Path: "",
        lowResS3Path: "",
        fileType,
      })
      .returning(),
  );
  if (error) {
    return { data: null, error };
  }

  const picture = Array.isArray(data) ? data[0] : data;
  return { data: picture, error: null };
}

export async function getPresignedUploadUrlAction({
  pictureId,
  fileType,
  isLowRes,
}: {
  pictureId: string;
  fileType: string;
  isLowRes?: boolean;
}): Promise<Result<string>> {
  console.log("Getting presigned upload URL for:", {
    pictureId,
    fileType,
    isLowRes,
  });
  const { data: s3Client, error: errorClient } = await getS3Client();
  if (errorClient) {
    console.error("Error getting S3 client:", errorClient);
    return { data: null, error: new Error("Error getting S3 client") };
  }
  const s3Path = isLowRes
    ? `pictures/${pictureId}_lowres`
    : `pictures/${pictureId}`;
  const command = new PutObjectCommand({
    Bucket: "vep",
    Key: s3Path,
    ContentType: fileType,
  });
  const { data: presignedUrl, error: presignedError } = await tryCatch(
    getSignedUrl(s3Client, command, { expiresIn: 60 * 10 }),
  );
  if (presignedError) {
    console.error("Error getting presigned URL:", presignedError);
    return { data: null, error: new Error("Error getting presigned URL") };
  }
  return { data: presignedUrl, error: null };
}

export async function updatePictureS3PathAction({
  pictureId,
  lowResS3Path,
}: {
  pictureId: string;
  lowResS3Path?: string;
}): Promise<Result<string>> {
  const s3Path = `pictures/${pictureId}`;
  const updateObj: Partial<typeof picturesTable.$inferInsert> = { s3Path };
  if (lowResS3Path) updateObj.lowResS3Path = lowResS3Path;
  const { error } = await tryCatch(
    db
      .update(picturesTable)
      .set(updateObj)
      .where(eq(picturesTable.id, pictureId)),
  );
  if (error) {
    return { data: null, error };
  }
  return { data: pictureId, error: null };
}

export async function updateShoot(shoot: CreateShoot) {
  const result = await tryCatch(
    db
      .update(shootsTable)
      .set(shoot)
      .where(
        and(eq(shootsTable.id, shoot.id), eq(shootsTable.userId, shoot.userId)),
      )
      .returning(),
  );
  revalidatePath(`/shoots/${shoot.id}`);
  return result;
}
