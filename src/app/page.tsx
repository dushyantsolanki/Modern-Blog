"use client"
import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { PostCard } from "@/components/post-card"
import { CategoryCarousel } from "@/components/category-carousel"

import { Newsletter } from "@/components/newsletter"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { posts } from "@/lib/data"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"
import { motion } from "framer-motion"


const featuredSectionPosts = posts.slice(0, 3)
const remainingPosts = posts.slice(3)


const categories = [
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
]

export default function Home() {
  return (
    <DirectionalTransition>
      <div className="flex flex-col min-h-screen">

      <Navbar />
      <main>
        <HeroCarousel posts={posts.slice(0, 4)} />

        {/* Featured Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-24"
        >
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Featured Article</h2>
              <p className="text-muted-foreground">Hand-picked stories we think you'll love</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PostCard {...featuredSectionPosts[0]} featured />
              {featuredSectionPosts.slice(1).map((post, i) => (
                <PostCard key={i} {...post} />
              ))}
            </div>
          </div>
        </motion.section>

        <section className="py-24 bg-surface-alt/50 border-y border-border overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Explore by Category</h2>
                <p className="text-muted-foreground text-lg">
                  Dive into the topics that matter most to you and discover fresh perspectives.
                </p>
              </div>
            </div>

            <CategoryCarousel categories={categories} />
          </div>
        </section>

        {/* Latest Articles */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-24"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Latest Articles</h2>
                <p className="text-muted-foreground">Fresh perspectives, published weekly</p>
              </div>
              <Link
                href="/blog"
                // transitionTypes is experimental
                // @ts-ignore
                transitionTypes={['nav-forward']}
                className="text-primary font-bold hover:underline mb-1"
              >
                View All Articles →
              </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post, i) => (
                <PostCard key={i} {...post} />
              ))}
            </div>
          </div>
        </motion.section>

        <FAQ />

        <Newsletter />
      </main>
      <Footer />
    </div>
    </DirectionalTransition>
  )
}

