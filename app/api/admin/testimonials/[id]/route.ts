import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  if (!id) {
    return NextResponse.json(
      { error: "Testimonial ID is missing" },
      { status: 400 }
    )
  }

  const updated = await prisma.testimonial.update({
    where: {
      id: Number(id),
    },
    data: body,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await prisma.testimonial.delete({
    where: { id: Number(id) },
  })
}
