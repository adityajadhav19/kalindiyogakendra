import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  return NextResponse.json(
    await prisma.galleryVideo.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    })
  )
}
