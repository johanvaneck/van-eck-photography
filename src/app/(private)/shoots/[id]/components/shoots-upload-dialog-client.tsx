"use client";
import { Picture } from "@/lib/db/types"
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
import { Result, tryCatch } from "@/lib/types/result"
import { useRef, useState } from "react";

export function ShootsUploadDialogClient({
	createPictureAction,
	getPresignedUploadUrlAction,
	updatePictureS3PathAction,
}: {
	createPictureAction: (params: { fileType: string }) => Promise<Result<Picture>>,
	getPresignedUploadUrlAction: (params: { pictureId: string, fileType: string, isLowRes?: boolean }) => Promise<Result<string>>,
	updatePictureS3PathAction: (params: { pictureId: string, lowResS3Path?: string }) => Promise<Result<string>>
}) {
	const fileCountRef = useRef(0);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [status, setStatus] = useState({
		text: "Waiting for upload",
		type: "info" as "info" | "error" | "success",
		step: 0,
		totalSteps: 0,
		progress: 0,
		files: 0,
	});

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
					if (!blob) {
						return reject("Failed to create blob");
					}
					resolve(new File([blob], file.name.replace(/(\.[^.]+)?$/, "_lowres$1"), { type: "image/jpeg" }));
				}, "image/jpeg", 0.7);
			};
			img.onerror = (err) => {
				reject(err);
			};
			img.src = URL.createObjectURL(file);
		});
	}

	const handleSubmit = async (formData: FormData) => {
		const pictures = formData.getAll("pictures");
		fileCountRef.current = pictures.length;
		setStatus(s => ({ ...s, totalSteps: pictures.length * 5, step: 0, files: pictures.length, progress: 0, text: "Preparing upload...", type: "info" }));
		for (const [i, file] of pictures.entries()) {
			if (!(file instanceof File)) continue;
			setStatus(s => ({ ...s, text: `Creating picture record (${i + 1}/${pictures.length})...`, step: s.step + 1 }));
			const { data: picture, error: pictureError } = await createPictureAction({ fileType: file.type });
			if (pictureError || !picture) {
				setStatus(s => ({ ...s, text: "Error creating picture record", type: "error" }));
				return;
			}
			setStatus(s => ({ ...s, text: `Generating low-res image (${i + 1}/${pictures.length})...`, step: s.step + 1 }));
			const { data: lowResFile, error: lowResError } = await tryCatch(generateLowResImage(file));
			if (lowResError) {
				setStatus(s => ({ ...s, text: "Error generating low-res image", type: "error" }));
				return;
			}
			setStatus(s => ({ ...s, text: `Requesting presigned URLs (${i + 1}/${pictures.length})...`, step: s.step + 1 }));
			const { data: presignedUrl, error: presignedError } = await getPresignedUploadUrlAction({ pictureId: picture.id, fileType: file.type });
			if (presignedError) {
				setStatus(s => ({ ...s, text: "Error getting presigned URLs", type: "error" }));
				return;
			}
			const { data: lowResPresignedUrl, error: lowResPresignedError } = await getPresignedUploadUrlAction({ pictureId: picture.id, fileType: lowResFile.type, isLowRes: true });
			if (lowResPresignedError) {
				setStatus(s => ({ ...s, text: "Error getting low-res presigned URLs", type: "error" }));
				return;
			}
			setStatus(s => ({ ...s, text: `Uploading original (${i + 1}/${pictures.length})...`, step: s.step + 1 }));
			try {
				await fetch(presignedUrl, {
					method: "PUT",
					headers: { "Content-Type": file.type },
					body: file,
				});
			} catch {
				setStatus(s => ({ ...s, text: "Error uploading original to S3", type: "error" }));
				return;
			}
			setStatus(s => ({ ...s, text: `Uploading low-res (${i + 1}/${pictures.length})...`, step: s.step + 1 }));
			try {
				await fetch(lowResPresignedUrl, {
					method: "PUT",
					headers: { "Content-Type": lowResFile.type },
					body: lowResFile,
				});
			} catch {
				setStatus(s => ({ ...s, text: "Error uploading low-res to S3", type: "error" }));
				return;
			}
			setStatus(s => ({ ...s, text: `Updating database (${i + 1}/${pictures.length})...`, step: s.step + 1 }));
			const { error: updateError } = await updatePictureS3PathAction({ pictureId: picture.id, lowResS3Path: `pictures/${picture.id}_lowres` });
			if (updateError) {
				setStatus(s => ({ ...s, text: "Error updating database", type: "error" }));
				return;
			}
			setStatus(s => ({ ...s, progress: i + 1 }));
		}
		setStatus(s => ({ ...s, text: "Upload complete!", type: "success", progress: pictures.length }));
	}

	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		if (e.dataTransfer.files && fileInputRef.current) {
			const files = Array.from(e.dataTransfer.files);
			setSelectedFiles(files);
			fileInputRef.current.files = e.dataTransfer.files;
		}
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (files) {
			const fileArray = Array.from(files);
			setSelectedFiles(fileArray);
			setStatus(s => ({ ...s, files: fileArray.length }));
		}
	}

	// Calculate progress percentage based on pictures uploaded
	const progressPercent = status.files > 0 ? Math.min(Math.round((status.progress / status.files) * 100), 100) : 0;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg shadow">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 inline-block"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 10l-4-4m0 0l-4 4m4-4v12" /></svg>
					Upload
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl p-10 rounded-2xl bg-background shadow-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-foreground">Upload Pictures</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Select or drag images to upload. Low-res previews will be generated automatically.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<div className={status.type === "error" ? "text-red-500 font-medium" : status.type === "success" ? "text-green-600 font-medium" : "text-primary font-medium"}>{status.text}</div>
						<div className="flex flex-col w-full">
							<div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
								<div
									className="h-2 bg-primary transition-all duration-300"
									style={{ width: `${progressPercent}%` }}
								></div>
							</div>
							<div className="text-xs text-muted-foreground mt-1">{status.progress} of {status.files || 0} pictures uploaded</div>
						</div>
					</div>

					<Form className="flex flex-col gap-8" action={handleSubmit}>
						<div className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="pictures" className="font-semibold text-foreground">Pictures</Label>
								<div
									className="border-2 border-dashed border-primary rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-secondary/30 hover:bg-secondary transition-all w-full min-h-[160px]"
									onDrop={handleDrop}
									onDragOver={handleDragOver}
									role="button"
									aria-label="Drop files here or click to select"
									onClick={() => fileInputRef.current?.click()}
								>
									<span className="text-muted-foreground text-lg mb-2">Drag & drop files here</span>
									<span className="text-xs text-muted-foreground mb-2">or click to select</span>
									<Input ref={fileInputRef} type="file" name="pictures" multiple className="hidden" onChange={handleFileChange} />
									{selectedFiles.length > 0 && (
										<div className="mt-4 w-full max-h-40 overflow-y-auto">
											<div className="text-sm font-medium text-foreground mb-2">Selected files ({selectedFiles.length}):</div>
											<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
												{selectedFiles.map((file, idx) => (
													<div key={idx} className="bg-background border border-secondary rounded-lg px-2 py-1 text-xs text-foreground truncate flex items-center">
														{file.name}
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<DialogFooter className="flex flex-row gap-2 justify-end mt-6">
							<DialogClose asChild>
								<Button variant="outline" className="rounded-lg">Cancel</Button>
							</DialogClose>
							<FormButton
								text={<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 inline-block"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 10l-4-4m0 0l-4 4m4-4v12" /></svg>Start</>}
								className="bg-primary text-primary-foreground font-semibold rounded-lg px-6 py-2 shadow"
							/>
						</DialogFooter>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
