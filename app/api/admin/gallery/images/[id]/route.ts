import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  return NextResponse.json(
    await prisma.galleryImage.update({
      where: { id: Number(id) },
      data: body,
    })
  )
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await prisma.galleryImage.delete({
    where: { id: Number(id) },
  })

  return NextResponse.json({ success: true })
}
