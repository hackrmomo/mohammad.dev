import { Client } from "minio"

export const s3 = new Client({
  endPoint: (process.env.S3_URL ?? "").replace("https://", "")!,
  useSSL: true,
  port: 443,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
})

export const makeUrlFromFileName = (bucket: string, fileName: string) =>
  `${process.env.S3_URL!}/${bucket}/${fileName}`

export const writeStaticFile = async (
  url: string,
  data: string | Buffer,
  type: StaticFileType
) => {
  const bucket = url.split("/")[3]
  const fileName = url.split("/")[4]
  console.log(bucket, fileName)
  await s3.putObject(bucket, fileName, data)
}

export const removeStaticFile = async (url: string) => {
  const bucket = url.split("/")[3]
  const fileName = url.split("/")[4]
  await s3.removeObject(bucket, fileName)
}

export enum StaticFileType {
  IMAGE = "image/png",
  PDF = "application/pdf",
}