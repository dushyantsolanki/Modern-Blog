"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { PostCard } from "@/components/post-card"
import { PostCardSkeleton } from "@/components/post-card-skeleton"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { BlogFilterBar } from "@/components/blog/blog-filter-bar"
import { InfiniteScrollPosts } from "@/components/blog/infinite-scroll-posts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"
import { Post } from "@/lib/types"
import { getPosts, PaginatedPosts } from "@/lib/api"

interface BlogListViewProps {
  initialData: PaginatedPosts
}

export function BlogListView({ initialData }: BlogListViewProps) {
  const [posts, setPosts] = React.useState<Post[]>(initialData.posts)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFetchingMore, setIsFetchingMore] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState('latest')
  const [view, setView] = React.useState<'grid' | 'list'>('grid')
  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(initialData.pagination.hasMore)

  const fetchPosts = React.useCallback(async (pageNum: number, isNewSearch: boolean = false) => {
    if (pageNum > 1) setIsFetchingMore(true)
    else setIsLoading(true)

    try {
      const response = await getPosts({
        page: pageNum,
        limit: 10,
        search: searchQuery,
        sort: sortBy
      })

      if (isNewSearch) {
        setPosts(response.posts)
      } else {
        setPosts(prev => [...prev, ...response.posts])
      }

      setHasMore(response.pagination.hasMore)
      setPage(pageNum)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setIsLoading(false)
      setIsFetchingMore(false)
    }
  }, [searchQuery, sortBy])

  // Only run when searchQuery or sortBy changes, but skip the initial mount if it's the first time
  const isInitialMount = React.useRef(true)
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timer = setTimeout(() => {
      fetchPosts(1, true)
    }, searchQuery ? 500 : 0)

    return () => clearTimeout(timer)
  }, [searchQuery, sortBy, fetchPosts])

  const handleLoadMore = () => {
    if (!isFetchingMore && hasMore) {
      fetchPosts(page + 1)
    }
  }

  return (
    <DirectionalTransition>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 pb-24">
          <section className="pt-32 mb-8">
            <div className="container mx-auto px-6 text-center">
              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl lg:text-8xl font-black tracking-tight mb-8"
              >
                Stories. <span className="text-muted-foreground/30">Expertly Told.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-xl mx-auto text-lg text-muted-foreground/80 font-medium leading-relaxed"
              >
                Curated perspectives on technology, design, and the future of work.
              </motion.p>
            </div>
          </section>

          <BlogFilterBar
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
            onViewChange={setView}
            currentView={view}
          />

          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:flex-1">
                {isLoading && page === 1 ? (
                  <div className={cn(
                    "grid gap-8",
                    view === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  )}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <PostCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <InfiniteScrollPosts
                    posts={posts}
                    view={view}
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                    isLoading={isFetchingMore}
                  />
                )}
              </div>

              <div className="lg:w-80">
                <Sidebar />
              </div>
            </div>
          </div>
        </main>

        <Newsletter />
        <Footer />
      </div>
    </DirectionalTransition>
  )
}
