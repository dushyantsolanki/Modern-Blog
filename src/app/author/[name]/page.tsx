import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { AuthorContent } from "./AuthorContent"
import { getAuthorByName, getPosts, getAuthors } from "@/lib/api"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    name: author.name.toLowerCase().replace(/ /g, "-"),
  }));
}

export default async function AuthorPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const decodedName = decodeURIComponent(name);

  // 1. Fetch Author Data by Name
  const author = await getAuthorByName(decodedName);
  if (!author) {
    notFound();
  }

  // 2. Fetch Author's Posts (using author's stored _id)
  const { posts } = await getPosts({
    authorId: author._id,
    limit: 50
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <AuthorContent
        author={author}
        posts={posts}
      />
      <Newsletter />
      <Footer />
    </div>
  )
}
