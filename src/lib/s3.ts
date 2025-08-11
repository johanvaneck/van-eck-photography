import { S3Client } from "@aws-sdk/client-s3";
import { Result, tryCatch } from "./types/result";

const accessKeyId = process.env.S3_ACCESS_KEY_ID
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

export async function getS3Client(): Promise<Result<S3Client>> {
  if (!accessKeyId) {
    return {
      data: null,
      error: new Error("S3_ACCESS_KEY_ID is not set")
    }
  }

  if (!secretAccessKey) {
    console.warn("S3_SECRET_ACCESS_KEY is not set")
    return {
      data: null,
      error: new Error("S3_SECRET_ACCESS_KEY is not set")
    }
  }

  return tryCatch((async () => new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  }))())
}


export const s3Bucket = "van-eck-photography"

