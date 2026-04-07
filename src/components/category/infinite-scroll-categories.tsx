"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CategoryCard } from "@/components/category-card"
import { CategoryCardSkeleton } from "@/components/category-card-skeleton"
import { cn } from "@/lib/utils"

export interface CategoryItem {
  title: string
  count: number
  image: string
  color: string
}

interface InfiniteScrollCategoriesProps {
  categories: CategoryItem[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function InfiniteScrollCategories({ categories }: InfiniteScrollCategoriesProps) {
  const [visibleCount, setVisibleCount] = React.useState(8) // Initial grid is usually 8
  const [isLoading, setIsLoading] = React.useState(false)
  const loaderRef = React.useRef<HTMLDivElement>(null)

  const BATCH_SIZE = 4

  const hasMore = visibleCount < categories.length

  React.useEffect(() => {
    setVisibleCount(8)
  }, [categories])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          // Simulate network delay for smooth UX
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, categories.length))
            setIsLoading(false)
          }, 800)
        }
      },
      {
        root: null,
        rootMargin: "100px",
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
  }, [hasMore, isLoading, categories.length])

  const visibleCategories = categories.slice(0, visibleCount)

  return (
    <div className="flex flex-col w-full h-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((cat, i) => (
            <motion.div
              key={cat.title + i}
              variants={itemVariant}
              layout
            >
              <CategoryCard {...cat} />
            </motion.div>
          ))}

          {/* Render Skeletons when loading */}
          {isLoading && Array.from({ length: Math.min(BATCH_SIZE, categories.length - visibleCount) }).map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              layout
            >
              <CategoryCardSkeleton />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Sentinel / End State */}
      {categories.length > 0 && (
        <div ref={loaderRef} className="w-full flex justify-center items-center py-12 mt-8">
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
                    End of categories
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
