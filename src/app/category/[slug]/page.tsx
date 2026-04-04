import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryContent } from "./CategoryContent"
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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <CategoryContent 
        initialPosts={categoryPosts} 
        categoryName={categoryName} 
      />
      <Footer />
    </div>
  )
}
