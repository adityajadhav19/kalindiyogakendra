"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background">
      <div className="container mx-auto px-4 py-14 space-y-10">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl italic text-primary">
              Kalindi Yoga
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Guiding you towards a healthy body and a peaceful mind through
              traditional yoga practices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/book-a-class" className="hover:text-primary">
                  Book a Class
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + CTA */}
          <div className="space-y-4">
            <h4 className="font-medium">Get in Touch</h4>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail size={16} />
              <span>kalindiyogakendra@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone size={16} />
              <span>+91 XXXXX XXXXX</span>
            </div>

            <div className="pt-4">
              <Link href="/book-a-class">
                <Button className="rounded-full px-6">
                  Book a Class
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Kalindi Yoga. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms
            </Link>
            <a
              href="#"
              className="hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="hover:text-primary"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
