import { db } from "@/lib/db"
import { photosTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getS3Client } from "@/lib/s3"
import { tryCatch } from "@/lib/types/result"
import { ShootsUploadDialog } from "./components/shoots-upload-dialog"

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

  const uploadPhotos = async (photos: Array<Blob>) => {
    "use server";

    const { data: s3Client, error: errorClient } = await getS3Client()
    if (errorClient) {
      console.error(errorClient)
      return
    }

    const promises = photos.map(
      async (photo) => {
        const photoId = "photo_" + nanoid()
        const s3Path = "photos/" + photoId
        const { error: errorSend } = await tryCatch(
          s3Client.send(
            new PutObjectCommand({
              Bucket: "van-eck-photography",
              Key: s3Path,
              Body: photo,
            })
          ))

        if (errorSend) {
          console.error(errorSend)
          return
        }

        await db.insert(photosTable).values({
          id: photoId,
          s3Path,
          shootId: shootId,
        })
      })

    await Promise.all(promises)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>Shoots Id: {shootId}</div>
      <div>
        <ShootsUploadDialog uploadPhotosAction={uploadPhotos} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id}>{photo.id}</div>
        ))}
      </div>
    </div>
  )
}
