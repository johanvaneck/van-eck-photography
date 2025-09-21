"use server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function getFeaturedPicturesWithPresignedLowResUrls(userId: string) {
    const pictures = await db
        .select()
        .from(picturesTable)
        .where(
            and(
                eq(picturesTable.userId, userId),
                eq(picturesTable.featured, true)
            )
        );
    const { data: s3Client, error } = await getS3Client();
    if (error) throw error;
    const bucket = process.env.S3_BUCKET || "vep";
    // Map each picture to include a presigned low-res URL
    const withUrls = await Promise.all(
        pictures.map(async (pic) => {
            const url = pic.lowResS3Path
                ? await getSignedUrl(
                    s3Client as S3Client,
                    new GetObjectCommand({
                        Bucket: bucket,
                        Key: pic.lowResS3Path,
                    }),
                    { expiresIn: 60 * 10 }
                )
                : "";
            return { ...pic, lowResUrl: url };
        })
    );
    return withUrls;
}

import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { picturesTable, categoriesTable, user as userTable, shootsTable } from "@/lib/db/schema";
import { getS3Client } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
// Get all data needed for the public website for a user
export async function getUserWebsiteData(userName: string) {
    // Find user by name
    const userArr = await db.select().from(userTable).where(eq(userTable.name, userName));
    const user = userArr[0];
    if (!user) return null;

    // Get categories for user
    const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, user.id));

    // Get featured pictures for user, join shoots and categories for category name
    const pictures = await db
        .select({
            id: picturesTable.id,
            lowResS3Path: picturesTable.lowResS3Path,
            featured: picturesTable.featured,
            s3Path: picturesTable.s3Path,
            shootId: picturesTable.shootId,
        })
        .from(picturesTable)
        .where(and(eq(picturesTable.userId, user.id), eq(picturesTable.featured, true)));

    // For each picture, get shoot and category name
    type ShootType = { id: string; categoryId: string | null };
    type CategoryType = { id: string; name: string };
    const shootIds = Array.from(new Set(pictures.map(p => p.shootId)));
    const shoots: ShootType[] = shootIds.length
        ? await db.select().from(shootsTable).where(inArray(shootsTable.id, shootIds))
        : [];
    const shootCategoryMap = new Map(shoots.map((shoot) => [shoot.id, shoot.categoryId]));
    const categoryMap = new Map((categories as CategoryType[]).map((cat) => [cat.id, cat.name]));

    // S3 client
    const { data: s3Client, error } = await getS3Client();
    if (error) throw error;
    const bucket = process.env.S3_BUCKET || "vep";

    // Map each picture to include presigned low-res URL and category name
    const featuredPictures = await Promise.all(
        pictures.map(async (pic) => {
            const lowResUrl = pic.lowResS3Path
                ? await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({ Bucket: bucket, Key: pic.lowResS3Path }),
                    { expiresIn: 60 * 10 }
                )
                : "";
            const shootCategoryId = shootCategoryMap.get(pic.shootId);
            const categoryName = shootCategoryId ? categoryMap.get(shootCategoryId) || "" : "";
            return {
                id: pic.id as string,
                lowResUrl,
                categoryName,
                featured: pic.featured as boolean,
                s3Path: pic.s3Path as string,
            };
        })
    );

    return {
        user: {
            id: user.id,
            displayName: user.name,
        },
        categories,
        featuredPictures,
    };
}

export async function getFeaturedPicturesForUser(userId: string) {
    return db
        .select()
        .from(picturesTable)
        .where(
            and(
                eq(picturesTable.userId, userId),
                eq(picturesTable.featured, true)
            )
        );
}

export async function markPictureFeatured({
    pictureId,
    featured,
}: {
    pictureId: string;
    featured: boolean;
}) {
    await db
        .update(picturesTable)
        .set({ featured })
        .where(eq(picturesTable.id, pictureId));
    return { success: true };
}

export async function deletePicture({ pictureId }: { pictureId: string }) {
    // Get picture info from DB
    const picture = await db
        .select()
        .from(picturesTable)
        .where(eq(picturesTable.id, pictureId))
        .then((arr) => arr[0]);
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
