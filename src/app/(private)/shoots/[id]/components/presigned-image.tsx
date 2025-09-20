/* eslint-disable @next/next/no-img-element */
import { Photo } from "@/lib/db/types";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function PresignedImage({
	s3Client,
	photo,
}: {
	s3Client: S3Client
	photo: Photo
}) {
	const s3Path = photo.s3Path
	const command = new GetObjectCommand({
		Bucket: "vep",
		Key: s3Path,
	})
	const presignedUrl = await getSignedUrl(s3Client, command, {
		expiresIn: 60 * 60 * 3 // 3 hours
	})

	return (
		<img
			className="rounded-lg"
			src={presignedUrl}
			alt={photo.id}
			width={100}
			height={100}
		/>
	)
}
