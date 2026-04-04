import * as React from "react"
import { Navbar } from "@/components/navbar"
import { PostCard } from "@/components/post-card"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"

import { posts } from "@/lib/data"

export async function generateStaticParams() {
  const categories = Array.from(new Set(posts.map((post) => post.category.toLowerCase())))
  return categories.map((slug) => ({
    slug,
  }))
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)
  const categoryPosts = posts.filter(p => p.category.toLowerCase() === slug.toLowerCase())
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
              <span className="text-foreground font-medium">{categoryName}</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">{categoryName}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Exploring the latest in {categoryName}, software development, web technologies, and the tools that shape how we build the future. {categoryPosts.length} articles and counting.
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
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${sort === "Latest"
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
