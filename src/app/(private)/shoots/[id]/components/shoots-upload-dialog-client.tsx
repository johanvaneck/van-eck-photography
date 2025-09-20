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
	getPresignedUploadUrlAction: (params: { photoId: string, fileType: string, isLowRes?: boolean }) => Promise<Result<string>>,
	updatePhotoS3PathAction: (params: { photoId: string, lowResS3Path?: string }) => Promise<Result<string>>
}) {
	const [status, setStatus] = useState("Waiting for upload");

	async function generateLowResImage(file: File): Promise<File> {
		return new Promise((resolve, reject) => {
			const img = new window.Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const maxDim = 600;
				const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
				canvas.width = Math.round(img.width * scale);
				canvas.height = Math.round(img.height * scale);
				const ctx = canvas.getContext("2d");
				ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
				canvas.toBlob(blob => {
					if (!blob) return reject("Failed to create blob");
					resolve(new File([blob], file.name.replace(/(\.[^.]+)?$/, "_lowres$1"), { type: "image/jpeg" }));
				}, "image/jpeg", 0.7);
			};
			img.onerror = reject;
			img.src = URL.createObjectURL(file);
		});
	}

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
			// Generate low-res image
			setStatus("Generating low-res image...");
			let lowResFile: File;
			try {
				lowResFile = await generateLowResImage(file);
			} catch {
				setStatus("Error generating low-res image");
				return;
			}
			// Get presigned URLs
			setStatus("Requesting presigned URLs...");
			const { data: presignedUrl, error: presignedError } = await getPresignedUploadUrlAction({ photoId: photo.id, fileType: file.type });
			const { data: lowResPresignedUrl, error: lowResPresignedError } = await getPresignedUploadUrlAction({ photoId: photo.id, fileType: lowResFile.type, isLowRes: true });
			if (presignedError || !presignedUrl || lowResPresignedError || !lowResPresignedUrl) {
				setStatus("Error getting presigned URLs");
				return;
			}
			// Upload both images
			setStatus("Uploading original to S3...");
			try {
				await fetch(presignedUrl, {
					method: "PUT",
					headers: { "Content-Type": file.type },
					body: file,
				});
			} catch {
				setStatus("Error uploading original to S3");
				return;
			}
			setStatus("Uploading low-res to S3...");
			try {
				await fetch(lowResPresignedUrl, {
					method: "PUT",
					headers: { "Content-Type": lowResFile.type },
					body: lowResFile,
				});
			} catch {
				setStatus("Error uploading low-res to S3");
				return;
			}
			// Update DB with both paths
			setStatus("Updating database...");
			const { error: updateError } = await updatePhotoS3PathAction({ photoId: photo.id, lowResS3Path: `photos/${photo.id}_lowres` });
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
