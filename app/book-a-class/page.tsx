"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function BookAClassPage() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    preference: "Online",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const res = await fetch("/api/public/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.contact,          // ✅ required by Prisma
        phone: null,                  // optional
        classType: form.preference,   // Online / Offline / Personal
        message: form.message || null,
      }),
    })

    setLoading(false)

    if (!res.ok) {
      const text = await res.text()
      console.error("Booking failed:", text)
      alert("Failed to send booking request")
      return
    }

    setForm({
      name: "",
      contact: "",
      preference: "Online",
      message: "",
    })

    setSuccess(true)
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-2xl space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-serif">Book a Class</h1>
            <p className="text-muted-foreground">
              Share your details and we will get in touch with you shortly.
            </p>
          </div>

          <form onSubmit={submit} className="admin-card space-y-6">
            <input
              className="admin-input"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              className="admin-input"
              placeholder="Phone or Email"
              value={form.contact}
              onChange={(e) =>
                setForm({ ...form, contact: e.target.value })
              }
              required
            />

            <select
              className="admin-input"
              value={form.preference}
              onChange={(e) =>
                setForm({ ...form, preference: e.target.value })
              }
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Personal Session">Personal Session</option>
            </select>

            <textarea
              className="admin-input"
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <Button className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>

            {success && (
              <p className="text-center text-green-600 text-sm">
                Your request has been sent successfully.
              </p>
            )}
          </form>
        </div>
        <Footer />
      </main>
    </>
  )
}
