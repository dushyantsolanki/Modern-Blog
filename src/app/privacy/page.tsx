"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, ArrowRight, CheckCircle2 } from "lucide-react"

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
} as const

const summaryPoints = [
  {
    icon: Shield,
    title: "Data Safety",
    description: "Industry-standard encryption used throughout.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: Lock,
    title: "No Selling",
    description: "We never sell your data to third parties.",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear insights into how we use your data.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
]

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        
        {/* Editorial Hero (Apple Style) */}
        <section className="pt-32 pb-24 border-b border-border/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] } as const}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-3 mb-10">
                <span className="px-4 py-1.5 rounded-full bg-surface-alt border border-border/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Last Updated: April 2024
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-12">
                Privacy Policy. <br />
                <span className="text-muted-foreground/30">Your Trust. Our Priority.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Executive Summary (Glassmorphism) */}
        <section className="py-24 bg-surface-alt/10">
          <div className="container mx-auto px-6">
            <motion.div {...FADE_UP} className="max-w-5xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-12 flex items-center gap-4">
                <span className="w-12 h-px bg-border/50" /> Executive Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {summaryPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    {...FADE_UP}
                    transition={{ delay: 0.1 * i, duration: 0.6 } as const}
                    className="p-8 rounded-[2.5rem] bg-surface/50 border border-border/40 backdrop-blur-3xl"
                  >
                    <div className={`w-12 h-12 ${point.bg} ${point.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <point.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{point.title}.</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                      {point.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Policy Content */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-16 lg:space-y-32 text-lg">
              
              <motion.div {...FADE_UP} id="introduction">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">01.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Introduction.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>Welcome to Insight ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us.</p>
                      <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seeking to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP} id="data-collection">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">02.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Information We Collect.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on our website, or otherwise contacting us.</p>
                      <ul className="space-y-4 pt-4">
                        {[
                          { label: "Personal Data", text: "Name, email address, and other contact information you provide." },
                          { label: "Usage Data", text: "IP addresses, browser types, and interaction patterns tracked safely." },
                          { label: "Cookies", text: "Used exclusively to enhance your experience and remember preferences." }
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                            <span><strong className="text-foreground">{item.label}:</strong> {item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP} id="how-we-use">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">03.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">How We Use Your Data.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                      <p>Specifically, we use the information we collect or receive to send administrative information, fulfill requests, and maintain the security of our platform.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP} id="your-rights">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">04.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Your Privacy Rights.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>In some regions (like the European Economic Area), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
                      <p>If you are a resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Call-to-Action */}
              <motion.div {...FADE_UP} id="contact" className="pt-16 border-t border-border/50">
                <div className="p-12 md:p-16 rounded-[3rem] bg-surface-alt/50 border border-border/50 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-110" />
                  <div className="relative z-10 max-w-xl mx-auto">
                    <h3 className="text-4xl font-black tracking-tight mb-6">Still have questions?</h3>
                    <p className="text-lg text-muted-foreground font-medium mb-10 leading-relaxed">
                      We're here to explain our policies and ensure you feel comfortable with how your data is handled.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                        Contact Support <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
