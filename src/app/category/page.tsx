"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { InfiniteScrollCategories } from "@/components/category/infinite-scroll-categories"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"

const allCategories = [
  {
    title: "Technology",
    count: 42,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    color: "#2563EB"
  },
  {
    title: "Design",
    count: 38,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    color: "#F97316"
  },
  {
    title: "Productivity",
    count: 29,
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=800&auto=format&fit=crop",
    color: "#10B981"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },

  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },
  {
    title: "Creativity",
    count: 24,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899"
  },

  {
    title: "Wellness",
    count: 18,
    image: "https://images.unsplash.com/photo-1506126610608-01490bd04e0e?q=80&w=800&auto=format&fit=crop",
    color: "#F43F5E"
  },
  {
    title: "Business",
    count: 15,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    color: "#6366F1"
  },
  {
    title: "Sustainability",
    count: 12,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    color: "#059669"
  },
  {
    title: "Global",
    count: 9,
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=800&auto=format&fit=crop",
    color: "#0891B2"
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function CategoriesPage() {
  return (
    <DirectionalTransition>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {/* Page Header - Minimalist Editorial Style */}
          <section className="pt-32 mb-8 text-center">
            <div className="container mx-auto px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl lg:text-8xl font-black tracking-tight mb-8"
              >
                Stories. <span className="text-muted-foreground/30">Expertly Told.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-xl mx-auto text-lg text-muted-foreground/80 font-medium leading-relaxed"
              >
                Curated perspectives on technology, design, and the future of work.
              </motion.p>
            </div>
          </section>

          <section className="py-10">
            <div className="container mx-auto px-6 lg:px-12">
              <InfiniteScrollCategories categories={allCategories} />
            </div>
          </section>

          <Newsletter />
        </main>
        <Footer />
      </div>
    </DirectionalTransition>
  )
}
