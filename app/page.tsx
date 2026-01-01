"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

type Testimonial = {
  id: number
  name: string
  message: string
  rating: number
}



export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    fetch("/api/public/testimonials")
      .then((r) => (r.ok ? r.json() : []))
      .then(setTestimonials)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-accent/20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 lg:gap-10 items-center z-10">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 max-w-xl mx-auto md:mx-0 md:pl-20">
            <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight">Join Kalindi's Yoga</h1>
            <p className="uppercase tracking-widest text-muted-foreground text-sm">For</p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-primary">A Healthy Body</h2>
            <h2 className="text-3xl md:text-5xl font-serif italic text-primary">And Peaceful Mind</h2>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">Discover perfect balance in life</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/book-a-class">
              <Button size="lg" className="rounded-full px-8 bg-primary text-white">Book a Class</Button> 
              </Link>
              <Link href="/about">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary bg-transparent">Learn More</Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000 flex justify-center md:justify-start md:pl-6">
            <div className="w-72 h-96 md:w-[420px] md:h-[540px] rounded-full overflow-hidden border-[12px] border-white/60 shadow-2xl relative">
              <img src="/Hero.jpg" alt="Kalindi Yoga Teacher" className="w-full h-full object-cover object-center"/>
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>

            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30" />
          </div>

        </div>
      </section>
      {/* ABOUT  */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif text-center">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            Kalindi is a trained Yoga Teacher following traditional Patanjali Yog
            Sutra. She completed her Master of Arts (M.A.) in Yogashastra from The
            Kavikulaguru Kalidas Sanskrit University, Ramtek and Diploma in
            Yogashikshika from The Yashwantrao Chavan Maharashtra Open University
            (YCMOU).
          </p>
          <p className="text-muted-foreground leading-relaxed">She has been practicing Yoga for more than 15 years and teaching it.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center space-y-10">
      <h2 className="text-4xl font-serif">
      Who Can Join Kalindi’s Yoga?
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
      {[
        "Beginners",
        "Working Professionals",
        "Women Seeking Mental Peace",
        "Personal Healing & Counselling",
      ].map((item) => (
        <div
          key={item}
          className="p-6 rounded-2xl bg-accent/20 font-medium"
        >
          {item}
        </div>
      ))}
      </div>
      </div>
      </section>


      {/* CLASSES */}
      <section className="py-24 bg-accent/10">
        <div className="container mx-auto px-4 text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-serif">
            Yoga Classes
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Online Classes",
              "Online Counselling Sessions",
              "Offline In Person Sessions",
            ].map((title) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-primary/5"
              >
                <p className="font-serif text-lg">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">
            Testimonials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="bg-accent/20 rounded-3xl p-6 space-y-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="italic text-muted-foreground">“{t.message}”</p>
                <p className="font-medium text-primary">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-accent/20 text-center">
  <h3 className="text-3xl font-serif mb-4">
    Ready to Begin Your Yoga Journey?
  </h3>
  <Button
    size="lg"
    className="rounded-full px-10"
    onClick={() => (window.location.href = "/book-a-class")}
  >
    Book a Class
  </Button>
</section>
      <Footer />
    </main>
  )
}
