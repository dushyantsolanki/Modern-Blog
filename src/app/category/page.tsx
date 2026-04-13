"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { InfiniteScrollCategories } from "@/components/category/infinite-scroll-categories"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"

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
              <InfiniteScrollCategories />
            </div>
          </section>

          <Newsletter />
        </main>
        <Footer />
      </div>
    </DirectionalTransition>
  )
}
