"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CategoryCard } from "@/components/category-card"
import { CategoryCardSkeleton } from "@/components/category-card-skeleton"
import { cn } from "@/lib/utils"
import { getCategories } from "@/lib/api"
import { Loader2 } from "lucide-react"

export interface CategoryItem {
  title: string
  count: number
  image: string
  color: string
  slug: string
}

interface InfiniteScrollCategoriesProps {
  initialCategories?: CategoryItem[]
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

export function InfiniteScrollCategories({ initialCategories = [] }: InfiniteScrollCategoriesProps) {
  const [categories, setCategories] = React.useState<CategoryItem[]>(initialCategories)
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const loaderRef = React.useRef<HTMLDivElement>(null)

  // Track the current page we are fetching and if a request is in flight
  const lastFetchedPage = React.useRef(initialCategories.length > 0 ? 1 : 0)
  const isFetchingRef = React.useRef(false)

  const fetchPage = async (pageToFetch: number) => {
    if (isFetchingRef.current || !hasMore) return

    isFetchingRef.current = true
    setIsLoading(true)

    try {
      console.log(`[InfiniteScroll] Fetching page ${pageToFetch}...`)
      const result = await getCategories({ page: pageToFetch, limit: 12 })

      const newItems: CategoryItem[] = (result.categories || []).map((cat: any) => ({
        title: cat.name,
        count: cat.totalPost || 0,
        image: cat.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        color: cat.color || "#3b82f6",
        slug: cat.slug || 'not-found'
      }))

      if (newItems.length > 0) {
        setCategories((prev) => {
          const existingTitles = new Set(prev.map(c => c.title))
          const uniqueNew = newItems.filter(n => !existingTitles.has(n.title))
          return [...prev, ...uniqueNew]
        })
        lastFetchedPage.current = pageToFetch
      }

      const serverHasMore = result.pagination?.hasMore || false
      setHasMore(serverHasMore && newItems.length > 0)
    } catch (error) {
      console.error(`[InfiniteScroll] Error fetching page ${pageToFetch}:`, error)
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          fetchPage(lastFetchedPage.current + 1)
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
  }, [hasMore, isLoading])

  return (
    <div className="flex flex-col w-full h-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title + i}
              variants={itemVariant}
              layout
            >
              <CategoryCard {...cat} />
            </motion.div>
          ))}

          {/* Render Skeletons when loading more */}
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
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
      <div ref={loaderRef} className="w-full flex justify-center items-center py-12 mt-8 min-h-[100px]">
        <AnimatePresence mode="wait">
          {!hasMore && categories.length > 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Loader2 className="size-4 animate-spin" />
              <span className="text-sm font-medium">Loading more categories...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
