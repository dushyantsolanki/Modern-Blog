"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Command, FileText, Tag, User, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { posts, Post } from "@/lib/data"
import Link from "next/link"

export function OmniSearch() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<Post[]>([])
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setQuery("")
    }
  }, [isOpen])

  React.useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered.slice(0, 5))
  }, [query])

  const handleSelect = (slug: string) => {
    setIsOpen(false)
    router.push(`/blog/${slug}`)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden"
            >
              <div className="relative flex items-center px-6 py-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground mr-4" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, categories, tags..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground"
                />
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-surface-alt text-[10px] font-medium text-muted-foreground">
                    <Command className="w-3 h-3" /> K
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-surface-alt rounded-md transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                {query.trim() === "" ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-3xl bg-surface-alt flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Search Everything</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      Search for articles, categories, or authors across the entire blog.
                    </p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Articles
                      </h4>
                      {results.map((post) => (
                        <button
                          key={post.slug}
                          onClick={() => handleSelect(post.slug)}
                          className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-primary/10 group transition-all text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-surface-alt overflow-hidden flex-shrink-0">
                              <img src={post.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h5 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {post.title}
                              </h5>
                              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">
                                {post.category}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-3xl bg-surface-alt flex items-center justify-center mb-6">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      We couldn't find anything matching "{query}". Try another search.
                    </p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-surface-alt border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-medium uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><Command className="w-3 h-3 rotate-180" /> Navigate</span>
                </div>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global toggle button (optional, but good for mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-alt border border-border hover:border-primary/50 transition-all text-sm text-muted-foreground group"
      >
        <Search className="w-4 h-4 group-hover:text-primary transition-colors" />
        <span className="hidden sm:inline">Search...</span>
        <span className="hidden sm:inline px-1 py-0.5 rounded border border-border bg-surface text-[10px] ml-1">⌘K</span>
      </button>
    </>
  )
}
