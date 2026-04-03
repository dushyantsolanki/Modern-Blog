import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { PostCard } from "@/components/post-card"
import { CategoryCard } from "@/components/category-card"
import { Newsletter } from "@/components/newsletter"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Monitor, Palette, Zap, Lightbulb } from "lucide-react"

const featuredPost = {
  title: "The Future of AI in Creative Work: What Every Designer Should Know",
  excerpt: "Artificial intelligence is reshaping how we approach design, writing, and art. Here's a practical look at what's changing and how to stay ahead of the curve.",
  category: "Technology",
  date: "Mar 28, 2026",
  readTime: "8 min read",
  author: { name: "Sarah Chen", avatar: "" },
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
}

const latestPosts = [
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

const categories = [
  { title: "Technology", count: 42, icon: Monitor, color: "#2563EB" },
  { title: "Design", count: 38, icon: Palette, color: "#F97316" },
  { title: "Productivity", count: 29, icon: Zap, color: "#10B981" },
  { title: "Creativity", count: 24, icon: Lightbulb, color: "#EC4899" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />

        {/* Featured Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Featured Article</h2>
              <p className="text-muted-foreground">Hand-picked stories we think you'll love</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PostCard {...featuredPost} featured />
              {latestPosts.slice(0, 2).map((post, i) => (
                <PostCard key={i} {...post} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-surface-alt/50 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Explore by Category</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dive into the topics that matter most to you and discover fresh perspectives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <CategoryCard key={i} {...cat} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Latest Articles</h2>
                <p className="text-muted-foreground">Fresh perspectives, published weekly</p>
              </div>
              <Link href="/blog" className="text-primary font-bold hover:underline mb-1">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post, i) => (
                <PostCard key={i} {...post} />
              ))}
            </div>
          </div>
        </section>

        <FAQ />
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
