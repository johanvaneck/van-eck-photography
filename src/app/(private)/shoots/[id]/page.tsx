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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos
          .filter(p => !!p.s3Path)
          .map((photo) => (
            <Suspense
              key={photo.id}
              fallback={<div className="animate-pulse bg-gray-100 rounded-lg w-full h-48" />}
            >
              <div className="group relative bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
                <PresignedImage s3Client={s3Client} photo={photo} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs bg-black/60 rounded px-2 py-1">Preview</span>
                </div>
              </div>
            </Suspense>
          ))}
      </div>
    </div >
  )
}
