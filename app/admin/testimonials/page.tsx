"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

type Testimonial = {
  id: number
  name: string
  message: string
  rating?: number
  order: number
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const loadTestimonials = async () => {
    const res = await fetch("/api/admin/testimonials")
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const addTestimonial = async () => {
    if (!name || !message) return alert("Name & message required")

    setLoading(true)

    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        message,
        rating
      })
    })

    setName("")
    setMessage("")
    setRating(5)
    setLoading(false)

    loadTestimonials()
  }

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-serif">Testimonials</h1>

      {/* ADD FORM */}
      <div className="admin-card space-y-4">
        <input
          className="admin-input"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="admin-input min-h-[120px]"
          placeholder="Client feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="admin-input w-24"
          />
          <Star className="text-primary fill-primary" />
        </div>

        <Button
          onClick={addTestimonial}
          disabled={loading}
          className="rounded-xl"
        >
          {loading ? "Saving..." : "Add Testimonial"}
        </Button>
      </div>

      {/* LIST WITH NUMBERING */}
      <div className="space-y-4">
        {items.map((t, index) => (
          <div key={t.id} className="admin-card flex gap-6 items-start">
            <div className="text-2xl font-serif text-primary">
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium">{t.name}</h3>
              <p className="italic text-muted-foreground">
                “{t.message}”
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Order value: {t.order}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
