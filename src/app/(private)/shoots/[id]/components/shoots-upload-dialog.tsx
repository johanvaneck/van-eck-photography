import { FormButton } from "@/components/form-button"
import { Button } from "@/components/ui/button"
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
import Form from "next/form"

export function ShootsUploadDialog({
	uploadPhotosAction,
}: {
	uploadPhotosAction: (photos: Array<Blob>) => Promise<void>
}) {
	const handleSubmit = async (formData: FormData) => {
		"use server"
		const photos = formData.getAll("photos")
		const blobs = photos.map((photo) => new Blob([photo]))
		await uploadPhotosAction(blobs)
	}
	return (
		<Dialog>
			<Form action={handleSubmit}>
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
				</DialogContent>
			</Form>
		</Dialog>
	)
}
