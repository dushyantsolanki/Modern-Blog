"use client"

import * as React from "react"
import { PostCard } from "@/components/post-card"
import { Sidebar } from "@/components/sidebar"
import { Newsletter } from "@/components/newsletter"
import { BlogFilterBar } from "@/components/blog/blog-filter-bar"
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
      {/* Page Header */}
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
            Curated perspectives on {categoryName.toLowerCase()}, design, and the future of work.
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
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                <motion.div
                  layout
                  className={cn(
                    "grid gap-8 transition-all duration-500",
                    view === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  )}
                >
                  {filteredPosts.map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <PostCard
                        {...post}
                        className={view === 'list' ? "md:flex-row gap-8 py-8 border-b border-border/50 bg-transparent hover:bg-muted/5 shadow-none hover:shadow-none translate-y-0 hover:translate-y-0" : ""}
                        featured={view === 'list'}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-surface-alt rounded-[3rem] border border-dashed border-border/60"
                >
                  <p className="text-3xl font-bold mb-4">No stories found.</p>
                  <p className="text-muted-foreground text-lg">Try adjusting your search for {categoryName}.</p>
                </motion.div>
              )}
            </AnimatePresence>
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
