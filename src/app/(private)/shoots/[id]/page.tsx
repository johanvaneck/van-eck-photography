import { db } from "@/lib/db"
import { photosTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
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

  return (
    <div className="flex flex-col gap-4">
      <div>Shoots Id: {shootId}</div>
      <div>
        <ShootsUploadDialog shootId={shootId} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id}>{photo.id}</div>
        ))}
      </div>
    </div>
  )
}
