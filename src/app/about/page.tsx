"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sparkles, Users, Target, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"

const values = [
  {
    title: "Craft Over Speed",
    description: "Every piece is researched and edited to meet a high bar of excellence, prioritizing depth over volume.",
    icon: Sparkles,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-500/5 to-transparent",
  },
  {
    title: "Reader First",
    description: "No pop-ups or dark patterns. We respect your attention above all else.",
    icon: Users,
    className: "md:col-span-1 md:row-span-1 bg-surface-alt/50",
  },
  {
    title: "Honest Perspective",
    description: "Real-world experience from people who actually do the work.",
    icon: Target,
    className: "md:col-span-1 md:row-span-1 bg-surface-alt/50",
  },
]

const stats = [
  { label: "Readers", value: "12K+", sub: "Monthly Subscribers" },
  { label: "Stories", value: "340+", sub: "Expert Articles" },
  { label: "Views", value: "2M+", sub: "Annual Engagement" },
  { label: "Minds", value: "50+", sub: "Global Contributors" },
]

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & Editor",
    bio: "Former tech journalist covering the intersection of code and craft.",
    accent: "bg-blue-500/10",
  },
  {
    name: "Marcus Lee",
    role: "Senior Writer",
    bio: "Productivity expert writing about the systems that shape our work.",
    accent: "bg-orange-500/10",
  },
  {
    name: "Priya Sharma",
    role: "Strategy",
    bio: "MBA focus on sustainable business models and future of tech.",
    accent: "bg-emerald-500/10",
  },
]

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
} as const

export default function AboutPage() {
  return (
    <DirectionalTransition>
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
                  Since 2025
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12">
                  About Insight. <br />
                  <span className="text-muted-foreground/30">The Craft.</span>
                </h1>
              </motion.div>
            </div>
          </section>

          {/* The Manifesto (Large Typo) */}
          <section className="py-24 border-y border-border/50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <motion.p
                  {...FADE_UP}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-none mb-16"
                >
                  In a world of noise, <br />
                  <span className="text-muted-foreground/30">we prioritize depth.</span>
                </motion.p>
                <motion.div
                  {...FADE_UP}
                  transition={{ ...FADE_UP.transition, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-muted-foreground/80 font-medium leading-relaxed"
                >
                  <p>
                    Insight was built on a simple observation: the internet is full of
                    SEO-optimized noise, but lacks true craft. We set out to change that
                    by treating every story like a design project.
                  </p>
                  <p>
                    We believe the container matters as much as the content. Typography,
                    whitespace, and visual rhythm isn't just "polish"—it's how we respect
                    your attention and make ideas clearer.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values (Bento Grid) */}
          <section className="py-32 bg-surface-alt/20">
            <div className="container mx-auto px-6">
              <motion.div {...FADE_UP} className="mb-20">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Our Values</h2>
                <p className="text-3xl font-bold">Uncompromising principles.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={cn(
                      "relative group p-8 rounded-[2.5rem] border border-border/50 flex flex-col justify-end overflow-hidden glass-morphism",
                      value.className
                    )}
                  >
                    <div className="absolute top-8 left-8 p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm">
                      <value.icon className="w-5 h-5" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground/80 text-sm max-w-xs">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats (Minimalist) */}
          <section className="py-40 bg-black text-white dark:bg-white dark:text-black">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    {...FADE_UP}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">{stat.label}</span>
                    <span className="text-7xl md:text-8xl font-black tracking-tighter">{stat.value}</span>
                    <span className="text-sm font-medium opacity-60 italic">{stat.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team (Editorial Typography) */}
          <section className="py-32">
            <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-20 items-start">
                <div className="lg:w-1/3 sticky top-32">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">The Team</h2>
                  <p className="text-4xl font-bold tracking-tight mb-8">The voices behind the vision.</p>
                  <div className="flex flex-col gap-4">
                    <a href="/contact" className="group flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                      Work with us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                  {team.map((member, i) => (
                    <motion.div
                      key={i}
                      {...FADE_UP}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className={cn("aspect-square rounded-[3rem] mb-8 transition-transform group-hover:scale-[0.98] duration-700", member.accent)} />
                      <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                      <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest mb-4">{member.role}</p>
                      <p className="text-lg text-muted-foreground font-medium leading-relaxed">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Newsletter />
        </main>
        <Footer />
      </div>
    </DirectionalTransition>
  )
}
