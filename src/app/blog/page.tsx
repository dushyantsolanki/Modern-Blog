import * as React from "react"
import { getPosts } from "@/lib/api"
import { BlogListView } from "@/components/blog/blog-list-view"

export const revalidate = 60;

export default async function BlogPage() {
  // Fetch initial posts on the server
  const initialData = await getPosts({
    page: 1,
    limit: 10,
    sort: 'latest'
  })

  return <BlogListView initialData={initialData} />
}
