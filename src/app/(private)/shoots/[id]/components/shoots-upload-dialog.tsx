import { ShootsUploadDialogClient } from "./shoots-upload-dialog-client";
import {
  createPictureAction as serverCreatePictureAction,
  getPresignedUploadUrlAction as serverGetPresignedUploadUrlAction,
  updatePictureS3PathAction as serverUpdatePictureS3PathAction,
} from "@/app/actions/shoots";

export function ShootsUploadDialog({ shootId }: { shootId: string }) {
  async function createPictureAction(params: { fileType: string }) {
    "use server";
    return await serverCreatePictureAction({ ...params, shootId });
  }
  async function getPresignedUploadUrlAction(params: {
    pictureId: string;
    fileType: string;
  }) {
    "use server";
    return await serverGetPresignedUploadUrlAction(params);
  }
  async function updatePictureS3PathAction(params: { pictureId: string }) {
    "use server";
    return await serverUpdatePictureS3PathAction(params);
  }
  return (
    <ShootsUploadDialogClient
      createPictureAction={createPictureAction}
      getPresignedUploadUrlAction={getPresignedUploadUrlAction}
      updatePictureS3PathAction={updatePictureS3PathAction}
    />
  );
}
