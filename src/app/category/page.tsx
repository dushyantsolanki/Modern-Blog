import * as React from "react"
import { Navbar } from "@/components/navbar"
import { CategoryCard } from "@/components/category-card"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { Monitor, Palette, Zap, Lightbulb, Heart, Globe, Briefcase, Leaf } from "lucide-react"

const allCategories = [
  { title: "Technology", count: 42, icon: Monitor, color: "#2563EB" },
  { title: "Design", count: 38, icon: Palette, color: "#F97316" },
  { title: "Productivity", count: 29, icon: Zap, color: "#10B981" },
  { title: "Creativity", count: 24, icon: Lightbulb, color: "#EC4899" },
  { title: "Wellness", count: 18, icon: Heart, color: "#F43F5E" },
  { title: "Business", count: 15, icon: Briefcase, color: "#6366F1" },
  { title: "Sustainability", count: 12, icon: Leaf, color: "#059669" },
  { title: "Global", count: 9, icon: Globe, color: "#0891B2" },
]

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-surface-alt/50 border-b border-border text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Explore by Category</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete library of articles organized by topic. Find the insights that matter most to you.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allCategories.map((cat, i) => (
                <CategoryCard key={i} {...cat} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
