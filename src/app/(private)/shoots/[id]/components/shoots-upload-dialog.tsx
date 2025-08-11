import { db } from "@/lib/db"
import { photoChunksTable, photosTable } from "@/lib/db/schema"
import { getS3Client } from "@/lib/s3"
import { Result, tryCatch } from "@/lib/types/result"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid"
import { ShootsUploadDialogClient } from "./shoots-upload-dialog-client";
import { Photo } from "@/lib/db/types";

export function ShootsUploadDialog({
	shootId,
}: {
	shootId: string
}) {
	const createPhotoAction = async (): Promise<Result<Photo>> => {
		"use server";
		const photoId = "photo_" + nanoid()
		const { data, error } = await tryCatch(db
			.insert(photosTable)
			.values({
				id: photoId,
				s3Path: "",
				shootId,
			})
			.returning()
		)
		if (error) {
			console.error(error)
			return {
				data: null,
				error,
			}
		}
		const [photo] = data
		return {
			data: photo,
			error: null,
		};
	}

	const uploadChunkAction = async (formData: FormData): Promise<Result<string>> => {
		"use server";
		const formPhotoId = formData.get("photoId")
		if (!formPhotoId) {
			return {
				data: null,
				error: new Error("Missing photoId"),
			}
		}
		const photoId = formPhotoId.toString()

		const formChunkIndex = formData.get("chunkIndex")
		if (!formChunkIndex) {
			return {
				data: null,
				error: new Error("Missing chunkIndex"),
			}
		}
		const chunkIndex = parseInt(formChunkIndex.toString())

		const formChunk = formData.get("chunk")
		if (!formChunk) {
			return {
				data: null,
				error: new Error("Invalid chunkIndex"),
			}
		}
		const chunkBlob = new Blob([formChunk])
		const arrayBuffer = await chunkBlob.arrayBuffer()
		const chunk = Buffer.from(arrayBuffer)
		console.log("chunk size: ", chunk.length)

		const { data, error } = await tryCatch(
			db
				.insert(photoChunksTable)
				.values({
					id: `photo_chunk_${photoId}_${chunkIndex}`,
					photoId,
					chunkIndex,
					chunk,
				})
				.returning()
		)
		if (error) {
			console.error(error)
			return {
				data: null,
				error,
			}
		}
		const [photoChunk] = data
		console.log("photoChunk size: ", photoChunk.chunk.length)
		return {
			data: photoChunk.id,
			error: null,
		}
	}

	const submitPhotoChunksAction = async (photoId: string): Promise<Result<string>> => {
		"use server";

		const chunks = await db
			.select()
			.from(photoChunksTable)
			.where(eq(photoChunksTable.photoId, photoId))
			.orderBy(photoChunksTable.chunkIndex)

		// Validate that all chunks are there
		const missingChunks = chunks
			.filter((chunk, i) => chunk.chunkIndex !== i)
			.map((chunk) => chunk.chunkIndex)

		if (missingChunks.length > 0) {
			return {
				data: null,
				error: new Error("Missing chunks: " + missingChunks.toString()),
			}
		}

		const mergedChunks = Buffer.concat(chunks.map((chunk) => chunk.chunk))

		const { data: s3Client, error: errorClient } = await getS3Client()
		if (errorClient) {
			console.error(errorClient)
			return {
				data: null,
				error: errorClient,
			}
		}

		const s3Path = "photos/" + photoId
		const { error: errorSend } = await tryCatch(
			s3Client.send(
				new PutObjectCommand({
					Bucket: "van-eck-photography",
					Key: s3Path,
					Body: mergedChunks,
				})
			))

		if (errorSend) {
			console.error(errorSend)
			return {
				data: null,
				error: errorSend,
			}
		}

		const { error: errorUpdate } = await tryCatch(
			db
				.update(photosTable)
				.set({
					s3Path,
				})
				.where(
					eq(photosTable.id, photoId)
				));
		if (errorUpdate) {
			console.error(errorUpdate)
			return {
				data: null,
				error: errorUpdate,
			}
		}
		return {
			data: photoId,
			error: null,
		}
	}

	return (
		<ShootsUploadDialogClient
			uploadChunkAction={uploadChunkAction}
			createPhotoAction={createPhotoAction}
			submitPhotoChunksAction={submitPhotoChunksAction}
		/>
	)
}
