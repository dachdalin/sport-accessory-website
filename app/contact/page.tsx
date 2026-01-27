"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@sportgear.com",
    description: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Sport Avenue",
    description: "New York, NY 10001",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Monday - Friday",
    description: "9:00 AM - 6:00 PM EST",
  },
]

function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We are here to help. Reach out to our team and we will 
              get back to you as soon as possible.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 
                  className="text-2xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Send Us a Message
                </h2>
                
                {isSubmitted ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Thank you for reaching out. We will get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" required placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required placeholder="john@example.com" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" required placeholder="How can we help?" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            required 
                            placeholder="Tell us more about your inquiry..."
                            rows={5}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 
                  className="text-2xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <Card key={info.title}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                            <info.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{info.title}</h3>
                            <p className="text-foreground">{info.value}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* FAQ Link */}
                <Card className="mt-6 bg-secondary border-0">
                  <CardContent className="p-6">
                    <h3 
                      className="font-semibold text-foreground mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Frequently Asked Questions
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Find quick answers to common questions about orders, shipping, and returns.
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/faq">View FAQ</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function ContactPage() {
  return (
    <CartProvider>
      <ContactContent />
    </CartProvider>
  )
}
