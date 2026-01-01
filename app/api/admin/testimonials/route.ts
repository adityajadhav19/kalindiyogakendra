import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all testimonials (admin view)
export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" }
  })

  return NextResponse.json(testimonials)
}

// ADD new testimonial
export async function POST(req: Request) {
  const body = await req.json()
  const { name, message, rating, isVisible = true } = body

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and message are required" },
      { status: 400 }
    )
  }

  // 🔢 Get current highest order
  const last = await prisma.testimonial.findFirst({
    orderBy: { order: "desc" }
  })

  const nextOrder = last ? last.order + 1 : 1

  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      message,
      rating,
      order: nextOrder,
      isVisible
    }
  })

  return NextResponse.json(testimonial)
}
