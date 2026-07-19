
import { notFound } from "next/navigation"
import PostClientContent from "@/components/blog/post-client-content"
import { Metadata, ResolvingMetadata, Viewport } from "next"
import { getPostBySlug, getAllPosts } from "@/lib/api"

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

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateViewport(
  { params }: Props
): Promise<Viewport> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    themeColor: post.categoryColor,
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  console.log(post)
  if (!post) return {
    title: "Post Not Found | Xenon",
    description: "The requested blog post could not be found."
  }

  return {
    title: `${post.title} | Xenon`,
    description: post.excerpt,
    keywords: post.seo?.focusKeyword ? post.seo.focusKeyword.split(',').map((k: string) => k.trim()) : (post.category ? [post.category] : []),
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
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <PostClientContent post={post} slug={slug} />
}
