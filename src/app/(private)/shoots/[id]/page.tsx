import { db } from "@/lib/db"
import { photosTable, shootsTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { ShootsUploadDialog } from "./components/shoots-upload-dialog"
import { ShareButton } from "./components/share-button"
import { getS3Client } from "@/lib/s3"
import { GalleryClient } from "./components/gallery-client"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { deletePhoto, markPhotoFeatured } from "@/app/actions/photos"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: shootId } = await params

  // Get shoot details
  const shootArr = await db
    .select()
    .from(shootsTable)
    .where(eq(shootsTable.id, shootId));
  const shoot = shootArr[0];

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

  // Format shoot time
  const shootTime = shoot?.createdAt ? new Date(shoot.createdAt).toLocaleString() : null;

  return (
    <div className="flex flex-col min-h-screen bg-background rounded">
      <header className="flex flex-col items-center justify-center py-8 gap-2 border-b border-border bg-card shadow rounded mb-4 overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-2 text-foreground rounded">{shoot?.name || "Shoot"}</h1>
        <div className="flex flex-row items-center gap-4 text-sm text-muted-foreground rounded py-1">
          <span>ID: {shootId}</span>
          {shootTime && <span>• {shootTime}</span>}
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <ShootsUploadDialog shootId={shootId} />
          <ShareButton shootId={shootId} />
        </div>
      </header>
      <main className="flex-1 w-full">
        <GalleryClient
          photos={presignedPhotos}
          markPhotoFeaturedAction={markPhotoFeatured}
          deletePhotoAction={deletePhoto}
        />
      </main>
    </div>
  )
}
