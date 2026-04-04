"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogFilterBarProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  onSearchChange: (query: string) => void
}

export function BlogFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  onSearchChange,
}: BlogFilterBarProps) {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showLeftFade, setShowLeftFade] = React.useState(false)
  const [showRightFade, setShowRightFade] = React.useState(true)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange(query)
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftFade(scrollLeft > 10)
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    handleScroll()
  }, [])

  return (
    <div className="sticky top-[73px] z-40 px-4 md:px-6 mb-12">
      <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-surface/80 backdrop-blur-xl border border-border/50 p-1.5 flex items-center justify-between gap-2 md:gap-4 shadow-sm hover:shadow-md transition-shadow">
        
        {/* Categories with Horizontal Scroll & Masks */}
        <div className="relative flex-1 min-w-0 overflow-hidden">
          {/* Edge Masks */}
          <AnimatePresence>
            {showLeftFade && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface z-20 pointer-events-none" 
              />
            )}
            {showRightFade && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface z-20 pointer-events-none" 
              />
            )}
          </AnimatePresence>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-2 py-1"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "relative px-4 md:px-6 py-2.5 rounded-2xl text-sm font-semibold transition-colors whitespace-nowrap",
                  activeCategory === cat ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Search & Sort */}
        <div className="flex items-center gap-2 pr-1">
          {/* Responsive Search Input */}
          <div className={cn(
            "relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isSearchFocused 
              ? "absolute inset-1.5 md:relative md:inset-0 md:w-64 z-30" 
              : "w-10 md:w-48"
          )}>
            <div className={cn(
              "absolute left-3 transition-colors z-10",
              isSearchFocused ? "text-primary" : "text-muted-foreground"
            )}>
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={isSearchFocused ? "Search articles..." : "Search"}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={handleSearchChange}
              value={searchQuery}
              className={cn(
                "w-full h-10 md:h-11 bg-surface-alt rounded-[1.25rem] pl-10 pr-4 py-2 text-sm outline-none border transition-all",
                isSearchFocused 
                  ? "border-primary bg-background shadow-lg shadow-primary/5" 
                  : "border-transparent cursor-pointer md:cursor-text text-transparent md:text-muted-foreground placeholder:text-transparent md:placeholder:text-muted-foreground"
              )}
            />
            {isSearchFocused && (
              <button 
                onClick={() => setIsSearchFocused(false)}
                className="md:hidden absolute right-3 text-xs font-bold text-primary"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Sort Button (Hidden on very small screens) */}
          <button className="hidden sm:flex items-center gap-2 px-4 h-10 md:h-11 rounded-2xl bg-surface-alt border border-transparent hover:border-border transition-all text-sm font-medium text-muted-foreground hover:text-foreground">
            Sort <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
