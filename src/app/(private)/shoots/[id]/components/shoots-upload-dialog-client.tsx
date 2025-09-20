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

export function ShootsUploadDialogClient({
	createPhotoAction,
	getPresignedUploadUrlAction,
	updatePhotoS3PathAction,
}: {
	createPhotoAction: (params: { fileType: string }) => Promise<Result<Photo>>,
	getPresignedUploadUrlAction: (params: { photoId: string, fileType: string }) => Promise<Result<string>>,
	updatePhotoS3PathAction: (params: { photoId: string }) => Promise<Result<string>>
}) {
	const [status, setStatus] = useState("Waiting for upload");

	const handleSubmit = async (formData: FormData) => {
		const photos = formData.getAll("photos");
		setStatus("Preparing upload...");
		for (const file of photos) {
			if (!(file instanceof File)) continue;
			setStatus("Creating photo record...");
			const { data: photo, error: photoError } = await createPhotoAction({ fileType: file.type });
			if (photoError || !photo) {
				setStatus("Error creating photo record");
				return;
			}
			setStatus("Requesting presigned URL...");
			const { data: presignedUrl, error: presignedError } = await getPresignedUploadUrlAction({ photoId: photo.id, fileType: file.type });
			if (presignedError || !presignedUrl) {
				setStatus("Error getting presigned URL");
				return;
			}
			setStatus("Uploading to S3...");
			try {
				await fetch(presignedUrl, {
					method: "PUT",
					headers: {
						"Content-Type": file.type,
					},
					body: file,
				});
			} catch {
				setStatus("Error uploading to S3");
				return;
			}
			setStatus("Updating database...");
			const { error: updateError } = await updatePhotoS3PathAction({ photoId: photo.id });
			if (updateError) {
				setStatus("Error updating database");
				return;
			}
			setStatus("Upload complete!");
		}
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
					<div className="flex flex-col gap-2">
						<div className="text-green-500">{status}</div>
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
