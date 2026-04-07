"use client"

import * as React from "react"
import { PostCard } from "@/components/post-card"
import { Sidebar } from "@/components/sidebar"
import { Newsletter } from "@/components/newsletter"
import { BlogFilterBar } from "@/components/blog/blog-filter-bar"
import { InfiniteScrollPosts } from "@/components/blog/infinite-scroll-posts"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface CategoryContentProps {
  initialPosts: any[]
  categoryName: string
}

export function CategoryContent({ initialPosts, categoryName }: CategoryContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [view, setView] = React.useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = React.useState('latest')

  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <main className="flex-1 pb-24">
      {/* Page Header - Minimalist Editorial Style */}
      <section className="pt-32 mb-8">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-black tracking-tight mb-8"
          >
            {categoryName}. <span className="text-muted-foreground/30">Expertly Told.</span>
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

      {/* Premium Filter Bar */}
      <BlogFilterBar
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onViewChange={setView}
        currentView={view}
      />

      {/* Content Section */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:flex-1">
            <InfiniteScrollPosts posts={filteredPosts} view={view} />
          </div>

          <div className="lg:w-80">
            <Sidebar />
          </div>
        </div>
      </div>

      <Newsletter />
    </main>
  )
}
