import * as React from "react"
import { posts } from "@/lib/data"
import { notFound } from "next/navigation"
import PostClientContent from "@/components/blog/post-client-content"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const categoryColors: Record<string, string> = {
  "Technology": "#2563EB",
  "Design": "#F97316",
  "Productivity": "#10B981",
  "Creativity": "#EC4899",
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) return {}

  const themeColor = categoryColors[post.category] || "#000000"

  return {
    title: `${post.title} | Insight`,
    description: post.excerpt,
    themeColor: themeColor,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return <PostClientContent post={post} slug={slug} />
}
