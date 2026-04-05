"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { motion } from "framer-motion"
import { Scale, Users, ShieldCheck, ScaleIcon, ArrowRight, CheckCircle2 } from "lucide-react"

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
} as const

const summaryPoints = [
  {
    icon: ShieldCheck,
    title: "Respectful Use",
    description: "No harassment or abusive behavior on our platform.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    icon: Scale,
    title: "IP Rights",
    description: "All original content is protected by copyright.",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    icon: Users,
    title: "User Conduct",
    description: "Clear guidelines on how to interact securely.",
    color: "text-primary",
    bg: "bg-primary/10"
  }
]

export default function TermsPage() {
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
                Terms of Service. <br />
                <span className="text-muted-foreground/30">Clear and Simple.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Executive Summary (Glassmorphism) */}
        <section className="py-24 bg-surface-alt/10">
          <div className="container mx-auto px-6">
            <motion.div {...FADE_UP} className="max-w-5xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-12 flex items-center gap-4">
                <span className="w-12 h-px bg-border/50" /> At a Glance
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

        {/* Detailed Detailed Terms Content */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-16 lg:space-y-32 text-lg">
              
              <motion.div {...FADE_UP} id="agreement">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">01.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Agreement to Terms.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>By accessing or using our website, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access or use the website.</p>
                      <p>Our website is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use our services without permission from a parent or legal guardian.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP} id="property">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">02.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Intellectual Property.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>Unless otherwise indicated, the website and its original content, features, and functionality are owned by Insight and are protected by international copyright, trademark, and patents.</p>
                      <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Insight.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP} id="conduct">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">03.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">User Conduct.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>As a user of our website, you agree not to pursue any behavior that would compromise the platform's security or integrity:</p>
                      <ul className="space-y-4 pt-4">
                        {[
                          "Illegal activities of any sort.",
                          "Harassment or abusive interactions.",
                          "Unauthorized scrapers or bots.",
                          "Phishing or malicious exploits."
                        ].map((point, i) => (
                          <li key={i} className="flex gap-4">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP} id="governing-law">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-black text-muted-foreground/30 pt-2 shrink-0">04.</span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Governing Law.</h2>
                    <div className="space-y-6 text-muted-foreground font-medium leading-[1.8]">
                      <p>These terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                      <p>Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Legal Discovery Box */}
              <motion.div {...FADE_UP} id="contact" className="pt-16 border-t border-border/50">
                <div className="p-12 md:p-16 rounded-[3rem] bg-surface-alt/50 border border-border/50 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-110" />
                  <div className="relative z-10 max-w-xl mx-auto">
                    <h3 className="text-4xl font-black tracking-tight mb-6">Need Clarification?</h3>
                    <p className="text-lg text-muted-foreground font-medium mb-10 leading-relaxed">
                      Legal documents can be dense. If you need help understanding our terms, our team is always ready to assist.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                        Contact Support <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                      <a href="/privacy" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-surface dark:bg-white/5 text-foreground rounded-2xl font-bold hover:bg-surface-alt transition-all border border-border/50">
                        Privacy Policy
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
