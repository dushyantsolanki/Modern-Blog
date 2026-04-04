import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { AuthorContent } from "./AuthorContent"
import { posts, authors } from "@/lib/data"

export async function generateStaticParams() {
  return authors.map((author) => ({
    id: author.id,
  }))
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const author = authors.find(a => a.id === id) || authors[0]
  const authorPosts = posts.filter(p => p.author.name === author.name)
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <AuthorContent 
        author={author} 
        posts={authorPosts} 
      />
      <Newsletter />
      <Footer />
    </div>
  )
}
