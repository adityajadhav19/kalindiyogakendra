"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Invalid credentials")
        return
      }

      // ✅ Login success → dashboard
      router.push("/admin/")
    } catch (error) {
      console.error("Login error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/10 px-4">
      <Card className="w-full max-w-md rounded-3xl border-none shadow-2xl bg-white">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-serif italic text-primary">
            Kalindi’s Yoga
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Admin access — enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-accent/20 border-none focus:ring-2 ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl bg-accent/20 border-none focus:ring-2 ring-primary/20"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 rounded-xl text-lg"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            This area is restricted to authorized administrators only.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
