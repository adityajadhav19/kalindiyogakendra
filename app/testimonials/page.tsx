import { headers } from "next/headers"
import { Star } from "lucide-react"
import {Navbar} from "@/components/navbar"
import {Footer} from "@/components/footer"

type Testimonial = {
  id: number
  name: string
  message: string
  rating?: number
}

async function getTestimonials(): Promise<Testimonial[]> {
  // ✅ headers() is async in your Next version
  const headersList = await headers()

  const host = headersList.get("host")
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  if (!host) return []

  const url = `${protocol}://${host}/api/public/testimonials`

  const res = await fetch(url, {
    cache: "no-store",
  })

  if (!res.ok) return []

  return res.json()
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <><Navbar />
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 bg-accent/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground">
            Words from Our Community
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Reflections shared by students who have experienced calm, balance,
            and inner growth through yoga practice.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          {testimonials.length === 0 && (
            <p className="text-center text-muted-foreground italic">
              Testimonials will be shared here soon.
            </p>
          )}

          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-primary/5"
            >
              {/* Number + Rating */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-primary font-serif text-3xl">
                  {index + 1}
                </span>

                {t.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <p className="text-lg md:text-xl font-serif italic text-foreground/80 leading-relaxed">
                “{t.message}”
              </p>

              {/* Name */}
              <div className="mt-8 text-right">
                <p className="text-primary font-medium text-lg">
                  — {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  </>
)
}
