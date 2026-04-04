import * as React from "react"
import { Navbar } from "@/components/navbar"
import { PostCard } from "@/components/post-card"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"

import { posts } from "@/lib/data"

export default function BlogPage() {
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
              <span className="text-foreground font-medium">Blog</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">All Articles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our collection of 340+ articles across technology, design, productivity and more.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Blog Grid */}
              <div className="lg:flex-1">
                {/* Filter Bar */}
                <div className="flex flex-wrap gap-2 mb-12">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mr-2 self-center">Filter:</span>
                  {["All", "Technology", "Design", "Productivity", "Creativity", "Business"].map((cat) => (
                    <button
                      key={cat}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${cat === "All"
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-surface-alt text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post, i) => (
                    <PostCard key={i} {...post} />
                  ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30" disabled>
                    &larr; Prev
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20">
                    1
                  </span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-alt transition-colors font-medium">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-alt transition-colors font-medium">
                    3
                  </button>
                  <span className="px-2 text-muted-foreground">...</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-alt transition-colors font-medium">
                    12
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    Next &rarr;
                  </button>
                </div>
              </div>

              {/* Sidebar */}
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
