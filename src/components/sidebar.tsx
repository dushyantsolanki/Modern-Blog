import * as React from "react"
import Link from "next/link"
import { GoogleAd } from "@/components/google-ad"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Technology", count: 42, href: "/category/technology" },
  { name: "Design", count: 38, href: "/category/design" },
  { name: "Productivity", count: 29, href: "/category/productivity" },
  { name: "Creativity", count: 24, href: "/category/creativity" },
  { name: "Business", count: 18, href: "/category/business" },
  { name: "Sustainability", count: 12, href: "/category/sustainability" },
]

const recentPosts = [
  { title: "The Future of AI in Creative Work", date: "Mar 28, 2026", href: "/blog/post-1" },
  { title: "10 Productivity Frameworks", date: "Mar 25, 2026", href: "/blog/post-2" },
  { title: "Building a Sustainable Tech Stack", date: "Mar 22, 2026", href: "/blog/post-3" },
]

const tags = [
  "AI", "Design Systems", "Remote Work", "Startups", "UX", "JavaScript", "Figma", "Leadership", "Wellness"
]

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-8">
      {/* Categories Widget */}
      <div className="p-6 bg-surface border border-border rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 pb-3 border-b border-border/50">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
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
          ))}
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="p-6 bg-surface border border-border rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 pb-3 border-b border-border/50">
          Recent Posts
        </h3>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post, i) => (
            <Link key={i} href={post.href} className="group flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-light/20 to-accent-light/20 border border-border/50 flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <h4 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <time className="text-[10px] text-muted-foreground mt-1 block uppercase tracking-wider">
                  {post.date}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="p-8 bg-gradient-to-br from-primary to-primary-dark rounded-2xl text-white shadow-lg shadow-primary/20">
        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          Join 12,000+ readers. Get the best articles delivered weekly.
        </p>
        <form className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:bg-white/20 outline-none transition-all"
            required
          />
          <Button 
            className="w-full h-12 bg-white text-primary hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-none"
          >
            Subscribe Free
          </Button>
        </form>
      </div>

      {/* Tags Widget */}
      <div className="p-6 bg-surface border border-border rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 pb-3 border-b border-border/50">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase()}`}
              className="px-3 py-1 bg-surface-alt text-xs font-medium rounded-full text-muted-foreground hover:bg-primary hover:text-white transition-all"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Google Ad Slot */}
      <GoogleAd slotId="1234567890" format="vertical" className="my-0" />
    </aside>
  )
}
