"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PostCard } from "@/components/post-card"
import { Newsletter } from "@/components/newsletter"
import { Search, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const allPosts = [
  {
    title: "The Future of AI in Creative Work: What Every Designer Should Know",
    excerpt: "Artificial intelligence is reshaping how we approach design, writing, and art. Here's a practical look at what's changing and how to stay ahead of the curve.",
    category: "Technology",
    date: "Mar 28, 2026",
    readTime: "8 min read",
    author: { name: "Sarah Chen", avatar: "" },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
  },
  {
    title: "10 Productivity Frameworks That Actually Work in 2026",
    excerpt: "Forget hustle culture. These evidence-based methods genuinely help you do meaningful work without burning out.",
    category: "Productivity",
    date: "Mar 25, 2026",
    readTime: "6 min read",
    author: { name: "Marcus Lee", avatar: "" },
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1472&auto=format&fit=crop",
  },
  {
    title: "Building a Sustainable Tech Stack for Startups",
    excerpt: "Why choosing the right technologies early can reduce your carbon footprint and save millions in infrastructure costs.",
    category: "Sustainability",
    date: "Mar 22, 2026",
    readTime: "5 min read",
    author: { name: "Priya Sharma", avatar: "" },
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "The Art of Creative Constraints: Less is More",
    excerpt: "How embracing limitations can unlock your most innovative work. Lessons from artists, engineers, and entrepreneurs.",
    category: "Creativity",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    author: { name: "Alex Rivera", avatar: "" },
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop",
  },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [isLoading, setIsLoading] = React.useState(true)
  const [results, setResults] = React.useState<typeof allPosts>([])

  React.useEffect(() => {
    setIsLoading(true)
    // Simulate a brief API call delay
    const timer = setTimeout(() => {
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          post.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <Search size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
                Search Results
              </h1>
              <p className="text-xl text-muted-foreground">
                {query ? (
                  <>
                    Showing results for <span className="text-foreground font-semibold">"{query}"</span>
                  </>
                ) : (
                  "Browse all our articles and discover fresh insights."
                )}
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-muted-foreground animate-pulse">Searching our archives...</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {results.length > 0 ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {results.map((post, i) => (
                        <PostCard key={i} {...post} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 border-2 border-dashed border-border rounded-3xl"
                    >
                      <p className="text-6xl mb-6">🔍</p>
                      <h3 className="text-2xl font-bold mb-2">No results found</h3>
                      <p className="text-muted-foreground mb-8">
                        We couldn't find anything matching your search. Try different keywords.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                        <span className="px-4 py-2 bg-surface-alt rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">AI Technology</span>
                        <span className="px-4 py-2 bg-surface-alt rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">Productivity</span>
                        <span className="px-4 py-2 bg-surface-alt rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">Design</span>
                        <span className="px-4 py-2 bg-surface-alt rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">Sustainability</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <SearchContent />
    </React.Suspense>
  )
}

