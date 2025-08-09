import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = process.env.S3_ACCESS_KEY_ID
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

if (!accessKeyId) {
  throw new Error("S3_ACCESS_KEY_ID is not set")
}

if (!secretAccessKey) {
  throw new Error("S3_SECRET_ACCESS_KEY is not set")
}

export const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export const s3Bucket = "van-eck-photography"

