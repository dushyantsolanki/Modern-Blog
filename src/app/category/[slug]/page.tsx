import * as React from "react"
import { Navbar } from "@/components/navbar"
import { PostCard } from "@/components/post-card"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"

const categoryPosts = [
  {
    title: "The Future of AI in Creative Work",
    excerpt: "AI is reshaping how we approach design, writing, and art. A practical look at what's changing.",
    category: "Technology",
    date: "Mar 28, 2026",
    readTime: "8 min",
    author: { name: "Sarah Chen", avatar: "" },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
  },
  {
    title: "Design Systems That Scale: A Practical Guide",
    excerpt: "Building design systems that grow with your team without becoming a burden.",
    category: "Technology",
    date: "Mar 15, 2026",
    readTime: "6 min",
    author: { name: "Sarah Chen", avatar: "" },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1455&auto=format&fit=crop",
  },
  {
    title: "Web Performance in 2026: What's Changed",
    excerpt: "Core Web Vitals, edge computing, and the new standards shaping fast websites.",
    category: "Technology",
    date: "Mar 10, 2026",
    readTime: "7 min",
    author: { name: "David Kim", avatar: "" },
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1374&auto=format&fit=crop",
  },
  {
    title: "The Rise of Edge-First Architecture",
    excerpt: "Why more teams are moving compute closer to users and what it means for development.",
    category: "Technology",
    date: "Mar 5, 2026",
    readTime: "10 min",
    author: { name: "Marcus Lee", avatar: "" },
    image: "https://images.unsplash.com/photo-1451187530220-cf00172bf43b?q=80&w=1471&auto=format&fit=crop",
  },
]

export default function CategoryDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-surface-alt/50 border-b border-border">
          <div className="container mx-auto px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
              <span>/</span>
              <span className="text-foreground font-medium">Technology</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Technology</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Exploring the latest in AI, software development, web technologies, and the tools that shape how we build the future. 42 articles and counting.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:flex-1">
                {/* Sort Bar */}
                <div className="flex items-center gap-2 mb-12">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mr-2">Sort:</span>
                  {["Latest", "Most Popular", "Oldest"].map((sort) => (
                    <button
                      key={sort}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        sort === "Latest"
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-surface-alt text-muted-foreground border border-border hover:bg-muted"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categoryPosts.map((post, i) => (
                    <PostCard key={i} {...post} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30" disabled>&larr; Prev</button>
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold">1</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-alt font-medium">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-alt font-medium">3</button>
                  <button className="p-2 text-muted-foreground hover:text-foreground">Next &rarr;</button>
                </div>
              </div>

              <div className="lg:w-80">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
