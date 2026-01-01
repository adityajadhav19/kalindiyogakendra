"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Navbar} from "@/components/navbar"
import {Footer} from "@/components/footer"

export default function ContactPage() { 
    const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [message, setMessage] = useState("")
      const [loading, setLoading] = useState(false)
      const [success, setSuccess] = useState(false)
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
    
        const res = await fetch("/api/public/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        })
    
        setLoading(false)
    
        if (res.ok) {
          setName("")
          setEmail("")
          setMessage("")
          setSuccess(true)
        } else {
          alert("Failed to send message. Please try again.")
        }
      }
    
    

    return (

        <><Navbar/>
    <section id="contact" className="py-24 bg-secondary/10">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-primary/5 grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif">Get in Touch</h2>
                    <p className="text-muted-foreground mt-4">
                      We'd love to hear from you. Whether you have a question about classes or just want to say hello.
                    </p>
                  </div>
    
                  <div className="space-y-6">
                    <ContactItem icon={<Mail size={20} />} title="Email Us" value="kalindiyogakendra@gmail.com" />
                    <ContactItem icon={<Phone size={20} />} title="Call Us" value="+91 " />
                    <ContactItem icon={<MapPin size={20} />} title="Visit Us" value="123 Serene Path, Wellness Valley" />
                  </div>
                </div>
    
                {/* FORM */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-accent/20 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary/20 outline-none"
                    />
                  </div>
    
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-accent/20 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary/20 outline-none"
                    />
                  </div>
    
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full bg-accent/20 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary/20 outline-none resize-none"
                    />
                  </div>
    
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 rounded-2xl text-lg"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
    
                  {success && (
                    <p className="text-green-600 text-center font-medium">
                      Thank you. Your message has been received.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>
          <Footer/>
    </>

)
}

function ContactItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <p className="text-lg">{value}</p>
      </div>
    </div>
  )
}
