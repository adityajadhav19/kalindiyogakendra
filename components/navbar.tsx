"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-bold text-primary italic tracking-tight"
        >
          Kalinda Yoga
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Button
  onClick={() => {
    window.location.href = "/book-a-class"
  }}
  className="rounded-full bg-primary text-white hover:bg-primary/90"
>
  Book a Class
</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-primary/10 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/book-a-class">
            <Button className="w-full rounded-full">
              Book a Class
            </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
