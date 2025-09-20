import { S3Client } from "@aws-sdk/client-s3";
import { Result, tryCatch } from "./types/result";

const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
const region = process.env.S3_REGION
const endpoint = process.env.S3_ENDPOINT

export async function getS3Client(): Promise<Result<S3Client>> {
  console.log("Creating S3 client with config:", { region, endpoint });

  if (!accessKeyId) {
    console.warn("S3_ACCESS_KEY_ID is not set");
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
    region,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
  }))())
}
