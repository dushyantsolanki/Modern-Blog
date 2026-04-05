import * as React from "react"
import Link from "next/link"
import { Globe, Share2, MessageSquare, Rss } from "lucide-react"

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/category" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  categories: [
    { name: "Technology", href: "/category/technology" },
    { name: "Design", href: "/category/design" },
    { name: "Productivity", href: "/category/productivity" },
    { name: "Creativity", href: "/category/creativity" },
    { name: "Business", href: "/category/business" },
  ],
  social: [
    { name: "Website", icon: Globe, href: "#" },
    { name: "Share", icon: Share2, href: "#" },
    { name: "Chat", icon: MessageSquare, href: "#" },
    { name: "RSS Feed", icon: Rss, href: "#" },
  ],
}

export function Footer() {
  return (
    <footer
      style={{ viewTransitionName: "site-footer" }}
      className="bg-[#000000] text-[#CBD5E1] pt-20 border-t border-border"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-[#F8FAFC]">
              Insight<span className="text-primary-light">.</span>
            </Link>
            <p className="mt-4 text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              A modern blog for curious minds. Exploring ideas at the intersection of technology, design, and human creativity.
            </p>
            <div className="flex gap-3 mt-6">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-[#94A3B8] hover:bg-primary-light hover:text-white hover:-translate-y-1 transition-all"
                  aria-label={item.name}
                >
                  <item.icon className="w-4.5 h-4.5" />
                </a>
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
            <ul className="flex flex-col gap-3">
              {footerLinks.categories.map((link) => (
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

          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-[#F8FAFC] text-sm font-semibold uppercase tracking-wider mb-6 font-sans">
              Newsletter
            </h4>
            <p className="text-sm text-[#94A3B8] mb-4">
              Get weekly insights delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#F8FAFC] text-sm focus:border-primary-light transition-colors outline-none"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-primary text-white w-20 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between py-8 text-xs text-[#64748B]">
          <p>© 2026 Insight. All rights reserved.</p>
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
