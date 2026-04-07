"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PostCard } from "@/components/post-card"
import { PostCardSkeleton } from "@/components/post-card-skeleton"
import { Post } from "@/lib/data"
import { cn } from "@/lib/utils"

interface InfiniteScrollPostsProps {
  posts: Post[]
  view: 'grid' | 'list'
}

export function InfiniteScrollPosts({ posts, view }: InfiniteScrollPostsProps) {
  const [visibleCount, setVisibleCount] = React.useState(2)
  const [isLoading, setIsLoading] = React.useState(false)
  const loaderRef = React.useRef<HTMLDivElement>(null)

  const BATCH_SIZE = 2

  const hasMore = visibleCount < posts.length

  React.useEffect(() => {
    // Reset visible count if posts change (e.g. search or filter)
    setVisibleCount(2)
  }, [posts])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          // Simulate network delay for smooth UX
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, posts.length))
            setIsLoading(false)
          }, 800)
        }
      },
      {
        root: null,
        rootMargin: "100px", // Trigger slightly before the user reaches the very bottom
        threshold: 0,
      }
    )

    const currentLoaderNode = loaderRef.current
    if (currentLoaderNode) {
      observer.observe(currentLoaderNode)
    }

    return () => {
      if (currentLoaderNode) {
        observer.unobserve(currentLoaderNode)
      }
    }
  }, [hasMore, isLoading, posts.length])

  const visiblePosts = posts.slice(0, visibleCount)

  return (
    <div className="flex flex-col w-full h-full">
      <AnimatePresence mode="popLayout">
        {visiblePosts.length > 0 ? (
          <motion.div
            layout
            className={cn(
              "grid gap-8 transition-all duration-500",
              view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
            )}
          >
            {visiblePosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (Math.min(i, BATCH_SIZE)) * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <PostCard
                  {...post}
                  className={view === 'list' ? "md:flex-row gap-8 py-8 border-b border-border/50 bg-transparent hover:bg-muted/5 shadow-none hover:shadow-none translate-y-0 hover:translate-y-0" : ""}
                  featured={view === 'list'}
                  priority={i < 2}
                />
              </motion.div>
            ))}
            
            <AnimatePresence>
              {isLoading && Array.from({ length: Math.min(BATCH_SIZE, posts.length - visibleCount) }).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <PostCardSkeleton
                    className={view === 'list' ? "md:flex-row gap-8 py-8 border-b border-border/50 bg-transparent shadow-none" : ""}
                    featured={view === 'list'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-surface-alt rounded-[3rem] border border-dashed border-border/60"
          >
            <p className="text-3xl font-bold mb-4">No results found.</p>
            <p className="text-muted-foreground text-lg">Adjust your search to find what you're looking for.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Indicator and Sentinel */}
      {posts.length > 0 && (
        <div 
          ref={loaderRef} 
          className="w-full flex justify-center items-center py-12 mt-8"
        >
          <AnimatePresence mode="wait">
            {!hasMore && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center w-full"
              >
                <div className="inline-flex items-center justify-center gap-2">
                  <div className="w-12 h-px bg-border/50" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-4">
                    End of stories
                  </span>
                  <div className="w-12 h-px bg-border/50" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
