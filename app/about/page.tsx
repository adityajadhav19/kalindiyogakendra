"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Footer } from "@/components/footer"



export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 bg-accent/10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="text-primary uppercase tracking-widest text-xs font-medium">
            About the Teacher
          </span>
          <h1 className="text-4xl md:text-6xl font-serif mt-4">
            A Journey Rooted in <span className="italic text-primary">Traditional Yoga</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Yoga is not just a practice, it is a way of living — one that brings balance,
            clarity, and inner peace to everyday life.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl space-y-20">

          {/* About Kalindi */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif">
              About Kalindi
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Kalindi is a trained Yoga Teacher who follows the traditional teachings of the
              <strong className="font-medium text-foreground"> Patanjali Yog Sutra</strong>.
              Her approach to yoga is rooted in discipline, awareness, and holistic well-being,
              blending ancient wisdom with practical guidance for modern life.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              She holds a <strong className="font-medium text-foreground">
              Master of Arts (M.A.) in Yogashastra</strong> from
              Kavikulaguru Kalidas Sanskrit University, Ramtek, and a
              <strong className="font-medium text-foreground">
              Diploma in Yogashikshika</strong> from Yashwantrao Chavan Maharashtra Open University (YCMOU).
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With over <strong className="font-medium text-foreground">15 years of personal practice</strong>
              and extensive teaching experience, Kalindi has guided students of all age groups
              toward better health, mental clarity, and emotional balance.
            </p>
          </div>

          {/* Philosophy */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif">
                Teaching Philosophy
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                The teachings focus on more than physical postures. Each session integrates
                breath control, mindful movement, and inner awareness to create a safe and
                nurturing space for growth.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Classes are designed to respect individual limitations while gently encouraging
                progress — making yoga accessible, meaningful, and sustainable.
              </p>
            </div>

            <div className="rounded-3xl bg-accent/20 p-8 border border-primary/10">
              <ul className="space-y-4 text-muted-foreground">
                <li>• Traditional yoga rooted in Patanjali Yog Sutra</li>
                <li>• Suitable for beginners to advanced practitioners</li>
                <li>• Focus on physical, mental, and emotional balance</li>
                <li>• Calm, respectful, and inclusive teaching style</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-serif">
              Begin Your Practice
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you are seeking physical wellness, mental peace, or a deeper connection
              with yourself, yoga offers a gentle yet powerful path forward.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button className="rounded-full px-8 py-6 text-lg">
                  Get in Touch
                </Button>
              </Link>

              <Link href="/gallery">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-primary text-primary"
                >
                  Explore the Studio
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 border-t border-primary/10 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Guided with patience, practiced with devotion, and taught with care.
        </div>
      </section>
      <Footer />
    </main>
  )
}
