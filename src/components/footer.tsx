"use client";

import * as React from "react"
import Link from "next/link"
import { Globe, Share2, MessageSquare, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCategories } from "@/lib/api"

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/category" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "Website", icon: Globe, href: "#" },
    { name: "Share", icon: Share2, href: "#" },
    { name: "Chat", icon: MessageSquare, href: "#" },
    { name: "RSS Feed", icon: Rss, href: "#" },
  ],
}

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = React.useState("")
  const [hasSubscribed, setHasSubscribed] = React.useState(false)
  const [categories, setCategories] = React.useState<{ name: string; slug: string; totalPost?: number }[]>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const subscribed = localStorage.getItem("pubpulse_subscribed")
      if (subscribed) {
        setHasSubscribed(true)
      }
    }
  }, [])

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategories({ limit: 8, status: "active", sort: "popular" })
        setCategories(res.categories || [])
      } catch (e) {
        console.error("Footer: failed to fetch categories", e)
      }
    }
    fetchCategories()
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
        body: JSON.stringify({ email, source: "footer_input" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setStatus("success")
      localStorage.setItem("pubpulse_subscribed", "true")
      setHasSubscribed(true)
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message || "Failed to subscribe.")
    }
  }

  return (
    <footer
      style={{ viewTransitionName: "site-footer" }}
      className="bg-[#000000] text-[#CBD5E1] pt-20 border-t border-border"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-[#F8FAFC]">
              Pubpulse<span className="text-primary-light">.</span>
            </Link>
            <p className="mt-4 text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              A modern blog for curious minds. Exploring ideas at the intersection of technology, design, and human creativity.
            </p>
            <div className="flex gap-3 mt-6">
              {footerLinks.social.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="w-10 h-10 rounded-xl bg-white/5 text-[#94A3B8] hover:bg-primary-light hover:text-white hover:-translate-y-1 transition-all p-0"
                >
                  <a href={item.href} aria-label={item.name}>
                    <item.icon className="w-4.5 h-4.5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#F8FAFC] text-sm font-semibold uppercase tracking-wider mb-6 font-sans">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    // @ts-ignore
                    transitionTypes={['nav-forward']}
                    className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                  >
                    {link.name}
                  </Link>

                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#F8FAFC] text-sm font-semibold uppercase tracking-wider mb-6 font-sans">
              Categories
            </h4>
            <ul className="flex w-6 flex-col gap-3">
              {categories.length > 0
                ? categories.map((cat) => (
                  <li key={cat.slug} className="flex items-center justify-between gap-2">
                    <Link
                      href={`/category/${cat.slug}`}

                      transitionTypes={['nav-forward']}
                      className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                    >
                      {cat.name}
                    </Link>
                    {cat.totalPost !== undefined && (
                      <span className="text-xs text-[#475569] font-medium tabular-nums">{cat.totalPost}</span>
                    )}
                  </li>
                ))
                : // Skeleton placeholders while loading
                Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                ))}
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-[#F8FAFC] text-sm font-semibold uppercase tracking-wider mb-6 font-sans">
              Newsletter
            </h4>
            {hasSubscribed ? (
              <p className="text-sm text-emerald-400 font-medium">
                ✓ Subscribed to newsletter!
              </p>
            ) : (
              <>
                <p className="text-sm text-[#94A3B8] mb-4">
                  Get weekly insights delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#F8FAFC] text-sm focus:border-primary-light transition-colors outline-none disabled:opacity-60"
                    aria-label="Email for newsletter"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={status === "loading"}
                    className="w-20 rounded-lg h-9 font-semibold"
                  >
                    {status === "loading" ? "..." : "Go"}
                  </Button>
                  {message && (
                    <p className="text-xs text-rose-400 mt-1">{message}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between py-8 text-xs text-[#64748B]">
          <p>© 2026 Pubpulse. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-[#CBD5E1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#CBD5E1] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
