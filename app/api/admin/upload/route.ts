import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "kalindi-yoga" },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })

  return NextResponse.json({
    url: uploadResult.secure_url,
  })
}
