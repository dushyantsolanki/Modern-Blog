"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { OmniSearch } from "./blog/omni-search"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Categories", href: "/category" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b border-border/40",
        isScrolled ? "bg-background/70 backdrop-blur-md" : "bg-background"
      )}
    >
      <div className="h-14 flex items-center">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70">
            Insight
          </Link>


          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // @ts-ignore
                transitionTypes={['nav-forward']}
                className={cn(
                  "text-[13px] font-medium tracking-tight transition-colors hover:text-foreground/80 relative py-1",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>


          <div className="flex items-center gap-4">
            <OmniSearch />
            <ThemeToggle />
            <Link href="/#newsletter" className="hidden md:flex bg-foreground text-background dark:bg-white dark:text-black px-4 py-1.5 rounded-full text-[13px] font-medium hover:opacity-80 transition-opacity">
              Subscribe
            </Link>


            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground relative z-[110]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col items-center justify-center pt-14 h-dvh"
          >

            <div className="flex flex-col items-center gap-8 p-12 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-4xl font-bold tracking-tight transition-all active:scale-95 block",
                      pathname === link.href ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.4 }}
                className="w-full pt-8"
              >
                <Link
                  href="/#newsletter"
                  className="w-full flex justify-center bg-foreground text-background dark:bg-white dark:text-black py-4 rounded-2xl font-bold text-lg active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Subscribe
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}
