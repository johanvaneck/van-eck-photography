"use client";
import { Photo } from "@/lib/db/types"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormButton } from "@/components/form-button"
import { Button } from "@/components/ui/button"
import Form from "next/form"
import { Result } from "@/lib/types/result"
import { useState } from "react"

const CHUNK_SIZE = 900000 // Next.js limits the size of a request to 1MB

export function ShootsUploadDialogClient({
	createPhotoAction,
	uploadChunkAction,
	submitPhotoChunksAction,
}: {
	createPhotoAction: (params: { fileType: string }) => Promise<Result<Photo>>,
	uploadChunkAction: (formData: FormData) => Promise<Result<string>>
	submitPhotoChunksAction: (photoId: string) => Promise<Result<string>>
}) {
	const [status, setStatus] = useState("Waiting for upload");
	const [errors, setErrors] = useState<Array<string>>([]);
	const [totalChunks, setTotalChunks] = useState(0);
	const [chunksDone, setChunksDone] = useState(0);

	const handleSubmit = async (formData: FormData) => {
		const photos = formData.getAll("photos")
		setStatus("Assembling chunks...");
		const filesChunked = photos.map((file) => {
			if (file instanceof File) {
				const chunks = Array.from({ length: Math.ceil(file.size / CHUNK_SIZE) }, (_, i) => {
					const start = i * CHUNK_SIZE
					const end = Math.min(file.size, start + CHUNK_SIZE)
					const chunk = file.slice(start, end)
					console.log(chunk.size)
					return chunk
				})
				return chunks
			} else {
				throw new Error("Invalid file type for photo")
			}
		})
		console.log(filesChunked)
		const countChunks = filesChunked.reduce((acc, chunks) => acc + chunks.length, 0)
		setTotalChunks(countChunks)

		setStatus(`Uploading ${countChunks} chunks...`);
		await Promise.all(
			filesChunked.map(async (chunks) => {
				const { data: photo, error: photoError } = await createPhotoAction({ fileType: chunks[0].type })
				if (photoError) {
					console.error(photoError)
					setErrors((prev) => [...prev, photoError.message])
					return
				}
				await Promise.all(
					chunks.map(async (chunk, index) => {
						setChunksDone((prev) => prev + 1)
						const formData = new FormData()
						formData.append("photoId", photo.id)
						formData.append("chunkIndex", index.toString())
						formData.append("chunk", chunk)
						const { data: photoChunkId, error: photoChunkError } = await uploadChunkAction(formData)
						if (photoChunkError) {
							console.error(photoChunkError)
							setErrors((prev) => [...prev, photoChunkError.message])
							return
						}
						return photoChunkId
					}))
				const { data: photoId, error: photoIdError } = await submitPhotoChunksAction(photo.id)
				if (photoIdError) {
					console.error(photoIdError)
					setErrors((prev) => [...prev, photoIdError.message])
					return
				}
				return photoId
			}))
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Open Dialog</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload Photos</DialogTitle>
					<DialogDescription>
						Upload photos to your Shoot.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					{errors.map((error, index) => (
						<div key={index} className="flex flex-col gap-2">
							<div className="text-red-500">{error}</div>
						</div>
					))}
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="text-green-500">{status}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-green-500">
							{chunksDone} of {totalChunks} chunks done
						</div>
					</div>
				</div>

				<Form className="flex flex-col gap-4" action={handleSubmit}>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="photos">Photos</Label>
							<Input type="file" name="photos" multiple />
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<FormButton text="Upload" />
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
