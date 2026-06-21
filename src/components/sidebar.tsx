"use client"

import * as React from "react"
import Link from "next/link"
import { GoogleAd } from "@/components/google-ad"
import { Button } from "@/components/ui/button"
import { getCategories, getPosts } from "@/lib/api"

export function Sidebar() {
  const [categories, setCategories] = React.useState<any[]>([])
  const [latestPosts, setLatestPosts] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isPostsLoading, setIsPostsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [catsRes, postsRes] = await Promise.all([
          getCategories({ limit: 10, status: 'active', sort: 'popular' }),
          getPosts({ limit: 3, sort: 'latest' })
        ]);

        const mappedCats = (catsRes.categories || []).map((cat: any) => ({
          name: cat.name,
          count: cat.totalPost || 0,
          href: `/category/${cat.slug}`
        }));
        
        const mappedPosts = (postsRes.posts || []).map((post: any) => ({
          title: post.title,
          date: post.date,
          href: `/blog/${post.slug}`,
          image: post.image
        }));

        setCategories(mappedCats);
        setLatestPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setIsLoading(false);
        setIsPostsLoading(false);
      }
    }
    fetchData();
  }, [])



  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = React.useState("")
  const [hasSubscribed, setHasSubscribed] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const subscribed = localStorage.getItem("insight_subscribed")
      if (subscribed) {
        setHasSubscribed(true)
      }
    }
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "sidebar" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setStatus("success")
      localStorage.setItem("insight_subscribed", "true")
      setHasSubscribed(true)
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message || "Failed to subscribe. Please try again.")
    }
  }

  return (
    <aside className="flex flex-col gap-8">
      {/* Categories Widget */}
      <div className="p-6 bg-surface border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 pb-3 border-b border-border/50">
          <span>Popular Categories</span>
        </h3>
        <div className="flex flex-col gap-1">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 animate-pulse">
                <div className="h-4 bg-muted/30 rounded w-24" />
                <div className="h-5 w-8 bg-muted/20 rounded-full" />
              </div>
            ))
          ) : (
            categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center justify-between p-2 rounded-lg text-sm text-muted-foreground hover:bg-surface-alt hover:text-foreground transition-all"
              >
                <span>{cat.name}</span>
                <span className="text-xs bg-surface-alt px-2 py-1 rounded-full text-muted-foreground font-medium">
                  {cat.count}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="p-6 bg-surface border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 pb-3 border-b border-border/50 flex items-center justify-between">
          <span>Recent Posts</span>
        </h3>
        <div className="flex flex-col gap-6">
          {isPostsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-xl bg-muted/20 flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3.5 bg-muted/30 rounded w-full" />
                  <div className="h-3.5 bg-muted/30 rounded w-2/3" />
                  <div className="h-2.5 bg-muted/20 rounded w-16 mt-2" />
                </div>
              </div>
            ))
          ) : (
            latestPosts.map((post, i) => (
              <Link key={i} href={post.href} className="group flex gap-4">
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center border border-border/50 flex-shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <time className="text-[10px] text-muted-foreground mt-1 block uppercase tracking-wider font-medium">
                    {post.date}
                  </time>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="p-8 bg-gradient-to-br from-primary to-primary-dark rounded-2xl text-white shadow-lg shadow-primary/20">
        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
        {hasSubscribed ? (
          <div className="py-4 text-center">
            <p className="text-sm font-medium text-white/95">✓ You are currently subscribed! ✨</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              Join 12,000+ readers. Get the best articles delivered weekly.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:bg-white/20 outline-none transition-all text-white disabled:opacity-60"
                required
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 bg-white text-primary hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-none font-semibold"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe Free"}
              </Button>
              {message && (
                <p className="text-xs text-rose-300 font-medium mt-1">{message}</p>
              )}
            </form>
          </>
        )}
      </div>



      {/* Google Ad Slot */}
      <GoogleAd slotId="1234567890" format="vertical" className="my-0" />
    </aside>
  )
}
