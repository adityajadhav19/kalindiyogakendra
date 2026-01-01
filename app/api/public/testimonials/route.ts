import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      message: true,
      rating: true,
    },
  })

  return NextResponse.json(testimonials)
}
