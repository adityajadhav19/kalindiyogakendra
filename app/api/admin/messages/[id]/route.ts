import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  if (!id) {
    return NextResponse.json(
      { error: "Message ID is required" },
      { status: 400 }
    )
  }

  await prisma.contactMessage.delete({
    where: {
      id: Number(id),
    },
  })

  return NextResponse.json({ success: true })
}
