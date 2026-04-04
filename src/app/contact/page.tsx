"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Globe, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const contactMethods = [
  {
    title: "General",
    handle: "hello@insight.blog",
    description: "For general inquiries and story ideas.",
    icon: Mail,
    className: "md:col-span-2 bg-gradient-to-br from-blue-500/5 to-transparent",
  },
  {
    title: "Press",
    handle: "press@insight.blog",
    description: "Media and interview requests.",
    icon: Globe,
    className: "md:col-span-1 bg-surface-alt/50",
  },
  {
    title: "Partnerships",
    handle: "partners@insight.blog",
    description: "Sponsorship and collaboration.",
    icon: MessageSquare,
    className: "md:col-span-1 bg-surface-alt/50",
  },
]

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
} as const

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        
        {/* Editorial Hero (Apple Style) */}
        <section className="pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] } as const}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-surface-alt text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
                Get in Touch
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12">
                Connect. <br />
                <span className="text-muted-foreground/30">Start a Conversation.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Contact Bento Grid */}
        <section className="py-24 border-y border-border/50 bg-surface-alt/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
              {contactMethods.map((method, i) => (
                <motion.div
                  key={i}
                  {...FADE_UP}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={cn(
                    "relative group p-8 rounded-[2.5rem] border border-border/50 flex flex-col justify-end overflow-hidden glass-morphism",
                    method.className
                  )}
                >
                  <div className="absolute top-8 left-8 p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm">
                    <method.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">{method.title}</h3>
                    <p className="text-xl font-bold mb-1">{method.handle}</p>
                    <p className="text-muted-foreground/60 text-xs">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Refined Form Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-24">
              <div className="lg:w-1/3">
                <motion.h2 {...FADE_UP} className="text-4xl font-bold tracking-tight mb-8">Send a Message.</motion.h2>
                <motion.p {...FADE_UP} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground font-medium leading-relaxed mb-8">
                  Whether you have a story pitch, feedback, or a partnership inquiry—we'd love to hear from you.
                </motion.p>
                <motion.div {...FADE_UP} transition={{ delay: 0.2 }} className="p-8 rounded-[2rem] bg-surface-alt/50 border border-border/50">
                  <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest mb-4">Response Time</p>
                  <p className="text-lg font-bold">Within 24 Hours.</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">During business days.</p>
                </motion.div>
              </div>

              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-12 bg-primary/5 rounded-[3rem] border border-primary/20 border-dashed"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                        <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">Message Received.</h3>
                      <p className="text-lg text-muted-foreground max-w-sm mx-auto mb-8 font-medium">
                        Thank you for reaching out. A member of our team will get back to you shortly.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2"
                      >
                        Send another message <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-4">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            required
                            placeholder="John Doe"
                            className="w-full px-6 py-5 rounded-[1.5rem] bg-surface-alt/50 border border-border/50 focus:border-primary focus:bg-background outline-none transition-all font-medium selection:bg-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-4">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="john@example.com"
                            className="w-full px-6 py-5 rounded-[1.5rem] bg-surface-alt/50 border border-border/50 focus:border-primary focus:bg-background outline-none transition-all font-medium selection:bg-primary/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-4">Topic</label>
                        <select
                          id="subject"
                          className="w-full px-6 py-5 rounded-[1.5rem] bg-surface-alt/50 border border-border/50 focus:border-primary focus:bg-background outline-none transition-all font-medium cursor-pointer appearance-none"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="story">Story Idea / Pitch</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-4">Message</label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          placeholder="Tell us what's on your mind..."
                          className="w-full px-6 py-5 rounded-[1.5rem] bg-surface-alt/50 border border-border/50 focus:border-primary focus:bg-background outline-none transition-all font-medium resize-none selection:bg-primary/20"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className={cn(
                          "w-full py-6 rounded-[1.5rem] font-bold text-lg transition-all",
                          isSubmitting ? "bg-muted text-muted-foreground" : "bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
                        )}
                      >
                        {isSubmitting ? "Sending..." : "Send Message."}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
