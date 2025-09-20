import { db } from "@/lib/db"
import { photosTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { ShootsUploadDialog } from "./components/shoots-upload-dialog"
import { getS3Client } from "@/lib/s3"
import GalleryClient from "./components/gallery-client"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: shootId } = await params

  const photos = await db
    .select()
    .from(photosTable)
    .where(eq(photosTable.shootId, shootId))

  const { data: s3Client, error: errorS3Client } = await getS3Client()
  if (errorS3Client) {
    console.error(errorS3Client)
    return <div className="text-red-500 text-center py-8">Error loading images</div>
  }

  // Generate presigned URLs for all images (low-res and high-res)
  const presignedPhotos = await Promise.all(
    photos.filter(p => !!p.s3Path).map(async (photo) => {
      const lowResKey = photo.lowResS3Path || photo.s3Path
      const lowResUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: "vep", Key: lowResKey }), { expiresIn: 60 * 60 })
      const highResUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: "vep", Key: photo.s3Path }), { expiresIn: 60 * 60 })
      return {
        ...photo,
        lowResUrl,
        highResUrl,
      }
    })
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex flex-col items-center justify-center py-6 gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">Shoot Gallery</h1>
        <span className="text-sm text-gray-500">ID: {shootId}</span>
        <ShootsUploadDialog shootId={shootId} />
      </header>
      <main className="flex-1 w-full px-2 sm:px-4 md:px-8">
        <GalleryClient photos={presignedPhotos} />
      </main>
    </div>
  )
}
