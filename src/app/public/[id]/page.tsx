import { db } from "@/lib/db";
import { picturesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getS3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";

export default async function PublicGalleryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: shootId } = await params;
    const pictures = await db
        .select()
        .from(picturesTable)
        .where(eq(picturesTable.shootId, shootId));

    const { data: s3Client, error: errorS3Client } = await getS3Client();
    if (errorS3Client) {
        return <div className="text-red-500 text-center py-8">Error loading images</div>;
    }

    // Generate presigned URLs for all images (low-res and high-res)
    const presignedPictures = await Promise.all(
        pictures.filter(p => !!p.s3Path).map(async (picture) => {
            const lowResKey = picture.lowResS3Path || picture.s3Path;
            const lowResUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: "vep", Key: lowResKey }), { expiresIn: 60 * 60 });
            const highResUrl = await getSignedUrl(
                s3Client,
                new GetObjectCommand({
                    Bucket: "vep",
                    Key: picture.s3Path,
                    ResponseContentDisposition: `attachment; filename="${picture.s3Path.split('/').pop()}"`
                }),
                { expiresIn: 60 * 60 }
            );
            return {
                ...picture,
                lowResUrl,
                highResUrl,
            };
        })
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="flex flex-col items-center justify-center py-6 gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">Your Pictures</h1>
                <span className="text-sm text-gray-500">Shoot ID: {shootId}</span>
            </header>
            <main className="flex-1 w-full px-2 sm:px-4 md:px-8">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
                    {presignedPictures.map((picture) => (
                        <div
                            key={picture.id}
                            className="mb-2 break-inside-avoid rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden group relative"
                        >
                            <Image
                                src={picture.lowResUrl}
                                alt={picture.id}
                                className="w-full h-auto object-cover rounded-lg"
                                width={300}
                                height={200}
                                unoptimized
                            />
                            <a
                                href={picture.highResUrl}
                                download
                                className="absolute top-2 right-2 p-2 rounded-md bg-white/80 text-gray-800 hover:bg-white transition cursor-pointer border border-gray-200 shadow-sm flex items-center justify-center"
                                aria-label="Download"
                                style={{ zIndex: 2 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
