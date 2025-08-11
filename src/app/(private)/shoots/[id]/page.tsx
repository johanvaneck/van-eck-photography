import { db } from "@/lib/db"
import { photosTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { ShootsUploadDialog } from "./components/shoots-upload-dialog"
import { getS3Client } from "@/lib/s3"
import { PresignedImage } from "./components/presigned-image"
import { Suspense } from "react"

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
    return <div>Error getting S3 client</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div>Shoots Id: {shootId}</div>
      <div>
        <ShootsUploadDialog shootId={shootId} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {photos
          .filter(p => !!p.s3Path)
          .map((photo) => (
            <Suspense
              key={photo.id}
              fallback={<div className="animate-pulse bg-gray-100 rounded-lg w-full h-full" />}
            >
              <PresignedImage s3Client={s3Client} photo={photo} />
            </Suspense>
          ))}
      </div>
    </div >
  )
}
