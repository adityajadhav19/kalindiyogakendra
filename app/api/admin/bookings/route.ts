import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    )
  }

  const booking = await prisma.bookingRequest.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      classType: body.classType || null,
      message: body.message || null,
    },
  })

  return NextResponse.json(booking)
}

export async function GET() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(bookings)
}