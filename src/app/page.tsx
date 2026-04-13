'use client'

import { getButtonClasses } from "@/components/ui/button"
import { getHomePosts, getHomeCategories } from "@/lib/api"
import { Post } from "@/lib/types"
import { useState, useEffect } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { PostCard } from "@/components/post-card"
import { HeroCarousel } from "@/components/hero-carousel"
import { Navbar } from "@/components/navbar"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"
import { Footer } from "@/components/footer"
import { CategoryCarousel } from "@/components/category-carousel"
import Link from "next/link"
import { motion } from "framer-motion"
import { Newsletter } from "@/components/newsletter"
import { FAQ } from "@/components/faq"
import { HeroCarouselSkeleton } from "@/components/hero-carousel-skeleton"
import { CategoryCarouselSkeleton } from "@/components/category-carousel-skeleton"
import { PostCardSkeleton } from "@/components/post-card-skeleton"

export default function Home() {
  const [homeData, setHomeData] = useState<{
    heroPosts: Post[],
    featuredPosts: Post[],
    latestPosts: Post[]
  } | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(homeData)
  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        const [postsData, catsData] = await Promise.all([
          getHomePosts(),
          getHomeCategories()
        ]);
        setHomeData(postsData);
        setCategories(catsData);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1">
          {/* Hero Skeleton */}
          <HeroCarouselSkeleton />

          {/* Featured Section Skeleton */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="mb-12 space-y-4">
                <div className="h-10 w-64 bg-muted/20 animate-pulse rounded-lg" />
                <div className="h-4 w-48 bg-muted/10 animate-pulse rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PostCardSkeleton featured />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            </div>
          </section>

          {/* Category Section Skeleton */}
          <section className="py-24 bg-surface-alt/50 border-y border-border overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div className="max-w-2xl space-y-4">
                  <div className="h-10 w-72 bg-muted/20 animate-pulse rounded-lg" />
                  <div className="h-6 w-full max-w-lg bg-muted/10 animate-pulse rounded-md" />
                </div>
                <div className="h-10 w-40 bg-muted/20 animate-pulse rounded-full" />
              </div>
              <CategoryCarouselSkeleton />
            </div>
          </section>

          {/* Latest Articles Skeleton */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="flex items-end justify-between mb-16">
                <div className="space-y-4">
                  <div className="h-10 w-56 bg-muted/20 animate-pulse rounded-lg" />
                  <div className="h-4 w-40 bg-muted/10 animate-pulse rounded-full" />
                </div>
                <div className="h-10 w-36 bg-muted/20 animate-pulse rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const heroPosts = homeData?.heroPosts || [];
  const featuredPosts = homeData?.featuredPosts || [];
  const latestPosts = homeData?.latestPosts || [];
  return (
    <DirectionalTransition>
      <div className="flex flex-col min-h-screen">

        <Navbar />
        <main>
          {heroPosts.length > 0 && <HeroCarousel posts={heroPosts} />}

          {/* Featured Section */}
          {featuredPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="py-24"
            >
              <div className="container mx-auto px-6">
                <div className="mb-12">
                  <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Featured Articles</h2>
                  <p className="text-muted-foreground">Hand-picked stories we think you'll love</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <PostCard {...featuredPosts[0]} featured />
                  {featuredPosts.slice(1).map((post, i) => (
                    <PostCard key={i} {...post} />
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {categories.length > 0 && (
            <section className="py-24 bg-surface-alt/50 border-y border-border overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Explore by Category</h2>
                    <p className="text-muted-foreground text-lg">
                      Dive into the topics that matter most to you and discover fresh perspectives.
                    </p>
                  </div>
                  <Link
                    href="/category"
                    className={getButtonClasses({ variant: "secondary", size: "sm", className: "gap-2 group shadow-none border-none bg-surface-alt/80 hover:bg-surface-alt" })}
                  >
                    View All Categories
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <CategoryCarousel
                  categories={categories.map(cat => ({
                    title: cat.name,
                    count: cat.totalPost,
                    image: cat.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                    color: cat.color || "#2563EB",
                    slug: cat.slug
                  }))}
                />
              </div>
            </section>
          )}

          {/* Latest Articles */}
          {latestPosts.length > 0 && (
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
                    className={getButtonClasses({ variant: "secondary", size: "sm", className: "gap-2 group shadow-none border-none bg-surface-alt/80 hover:bg-surface-alt" })}
                  >
                    View All Articles
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {latestPosts.map((post, i) => (
                    <PostCard key={i} {...post} />
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          <FAQ />

          <Newsletter />
        </main>
        <Footer />
      </div>
    </DirectionalTransition>
  )
}

