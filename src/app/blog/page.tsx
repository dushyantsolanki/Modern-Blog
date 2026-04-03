import * as React from "react"
import { Navbar } from "@/components/navbar"
import { PostCard } from "@/components/post-card"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"

const posts = [
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
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        cat === "All"
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
