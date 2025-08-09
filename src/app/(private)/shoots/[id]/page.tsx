import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { photosTable, shootsTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { s3Client } from "@/lib/s3"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: shootId } = await params
  const shoot = await db
    .select()
    .from(shootsTable)
    .where(eq(shootsTable.id, shootId))

  const photos = await db
    .select()
    .from(photosTable)
    .where(eq(photosTable.shootId, shootId))

  const addPhoto = async () => {
    "use server";
    const photoId = "photo_" + nanoid()
    const s3Path = "photos/" + photoId

    try {
      const command = await s3Client.send(
        new PutObjectCommand({
          Bucket: "van-eck-photography",
          Key: s3Path,
          Body: new Uint8Array([1, 2, 3, 4, 5]), // TODO: Replace with actual image data
        })
      )
    } catch (e) {
      console.error(e)
      return
    }

    await db.insert(photosTable).values({
      id: photoId,
      s3Path,
      shootId: shootId,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>Shoots Id: {shootId}</div>
      <div>
        <Button onClick={addPhoto}>Add Photo</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id}>{photo.id}</div>
        ))}
      </div>
    </div>
  )
}
