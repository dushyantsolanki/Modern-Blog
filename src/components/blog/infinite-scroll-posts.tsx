"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PostCard } from "@/components/post-card"
import { PostCardSkeleton } from "@/components/post-card-skeleton"
import { Post } from "@/lib/types"
import { cn } from "@/lib/utils"

interface InfiniteScrollPostsProps {
  posts: Post[]
  view: 'grid' | 'list'
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
}

export function InfiniteScrollPosts({
  posts,
  view,
  onLoadMore,
  hasMore,
  isLoading
}: InfiniteScrollPostsProps) {
  const loaderRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      {
        root: null,
        rootMargin: "400px", // Increased margin for smoother loading
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
  }, [hasMore, isLoading, onLoadMore])

  return (
    <div className="flex flex-col w-full h-full">
      <AnimatePresence mode="popLayout">
        {posts.length > 0 ? (
          <motion.div
            layout
            className={cn(
              "grid gap-8 transition-all duration-500",
              view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
            )}
          >
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (Math.min(i % 10, 5)) * 0.05, ease: [0.23, 1, 0.32, 1] }}
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
              {isLoading && Array.from({ length: 2 }).map((_, i) => (
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
      <div
        ref={loaderRef}
        className="w-full flex justify-center items-center py-12 mt-8"
      >
        <AnimatePresence mode="wait">
          {!hasMore && posts.length > 0 && (
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
    </div>
  )
}

