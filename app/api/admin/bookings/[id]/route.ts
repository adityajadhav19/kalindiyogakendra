import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  await prisma.bookingRequest.delete({
    where: { id: Number(id) },
  })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(bookings) // ✅ always JSON
}
