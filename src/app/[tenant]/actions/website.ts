import { Metadata } from "next";
import { headers } from "next/headers";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { picturesTable, categoriesTable, user as userTable, shootsTable, priceListTable } from "@/lib/db/schema";
import { getS3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getUserWebsiteData(userName: string) {
    console.log("Fetching website data for user:", userName);
    // Find user by name
    const userArr = await db.select().from(userTable).where(eq(sql`lower(${userTable.name})`, userName));
    const user = userArr[0];

    console.log("User found:", user);

    if (!user) return null;

    // Get categories for user
    const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, user.id));

    // Get price list for user
    const priceList = await db.select().from(priceListTable).where(eq(priceListTable.userId, user.id));

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
        priceList,
    };
}

export async function generateMetadata({ params }: { params: { userName: string } }): Promise<Metadata> {
    const hdrs = await headers();
    const host = hdrs.get("host");
    const data = await getUserWebsiteData(params.userName);
    if (!data) return {};
    return {
        title: `${data.user.displayName} | Portfolio`,
        description: `Photography portfolio for ${data.user.displayName}`,
        openGraph: {
            title: `${data.user.displayName} | Portfolio`,
            description: `Photography portfolio for ${data.user.displayName}`,
            url: `https://${host}/website/${params.userName}`,
            images: data.featuredPictures.length > 0 ? [{ url: data.featuredPictures[0].lowResUrl }] : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.user.displayName} | Portfolio`,
            description: `Photography portfolio for ${data.user.displayName}`,
            images: data.featuredPictures.length > 0 ? [data.featuredPictures[0].lowResUrl] : [],
        },
    };
}
