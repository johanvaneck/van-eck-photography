import { ShootsUploadDialogClient } from "./shoots-upload-dialog-client";
import { createPhotoAction as serverCreatePhotoAction, getPresignedUploadUrlAction as serverGetPresignedUploadUrlAction, updatePhotoS3PathAction as serverUpdatePhotoS3PathAction } from "@/app/actions/shoots";

export function ShootsUploadDialog({ shootId }: { shootId: string }) {
	async function createPhotoAction(params: { fileType: string }) {
		"use server";
		return await serverCreatePhotoAction({ ...params, shootId });
	}
	async function getPresignedUploadUrlAction(params: { photoId: string, fileType: string }) {
		"use server";
		return await serverGetPresignedUploadUrlAction(params);
	}
	async function updatePhotoS3PathAction(params: { photoId: string }) {
		"use server";
		return await serverUpdatePhotoS3PathAction(params);
	}
	return (
		<ShootsUploadDialogClient
			createPhotoAction={createPhotoAction}
			getPresignedUploadUrlAction={getPresignedUploadUrlAction}
			updatePhotoS3PathAction={updatePhotoS3PathAction}
		/>
	);
}
