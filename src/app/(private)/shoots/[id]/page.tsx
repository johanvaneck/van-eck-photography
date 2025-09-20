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
    return <div className="text-red-500 text-center py-8">Error loading images</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex flex-col items-center justify-center py-6 gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">Shoot Gallery</h1>
        <span className="text-sm text-gray-500">ID: {shootId}</span>
        <ShootsUploadDialog shootId={shootId} />
      </header>
      <main className="flex-1 w-full px-2 sm:px-4 md:px-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
          {photos.filter(p => !!p.s3Path).map((photo) => (
            <Suspense key={photo.id} fallback={<div className="animate-pulse bg-gray-200 rounded-lg w-full aspect-[4/3] mb-2" />}>
              <div className="mb-2 break-inside-avoid rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group">
                <PresignedImage
                  s3Client={s3Client}
                  photo={photo}
                  useLowRes={true}
                />
              </div>
            </Suspense>
          ))}
        </div>
      </main>
    </div>
  )
}
