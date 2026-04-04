"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogFilterBarProps {
  onSearchChange: (query: string) => void
  onSortChange: (sort: string) => void
  onViewChange: (view: 'grid' | 'list') => void
  currentView: 'grid' | 'list'
}

/**
 * Emil-Inspired Design Engineering principles:
 * - Spring-based animations for physical weight.
 * - whileTap scale feedback for tactile responsiveness.
 * - Layered shadows and inner glows for perceived depth.
 * - Specific property transitions (no transition: all).
 */

const SPRING_CONFIG = { type: "spring", stiffness: 400, damping: 30 } as const
const EASE_OUT = [0.23, 1, 0.32, 1] as const

export function BlogFilterBar({
  onSearchChange,
  onSortChange,
  onViewChange,
  currentView
}: BlogFilterBarProps) {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange(query)
  }

  return (
    <div className="sticky top-[72px] z-40 px-4 md:px-6 mb-16 pt-6 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <motion.div
          layout

          transition={SPRING_CONFIG}
          className={cn(
            "relative rounded-[1rem] backdrop-blur-md border transition-[border-color,background-color] duration-500 p-1.5 flex items-center",
            isSearchFocused
              ? "bg-surface dark:bg-surface/80 border-primary/60 "
              : "bg-surface/80 dark:bg-surface/80 border-border/40 hover:border-border/80"
          )}
        >
          {/* Subtle Inner Glow Shadow - Compounding Detail */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.05)] opacity-50" />

          {/* Filter Action (Tactile Feedback) */}
          <div className="relative z-10 flex items-center pl-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.1 }}
              className="p-3 rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-muted-foreground/40 hover:text-foreground transition-colors group"
            >
              <SlidersHorizontal className="w-4 h-4 group-hover:text-foreground transition-colors" />
            </motion.button>
          </div>

          {/* Centered Premium Search */}
          <div className="relative z-10 flex-1 group">
            <motion.div
              animate={{
                x: isSearchFocused ? 4 : 0,
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-20"
            >
              <Search className={cn(
                "w-4 h-4 transition-colors duration-300",
                isSearchFocused ? "text-primary" : "text-muted-foreground/40 group-hover:text-foreground/60"
              )} />
            </motion.div>
            <input
              type="text"
              placeholder="Search Insight..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={handleSearchChange}
              value={searchQuery}
              className="w-full h-12 bg-transparent pl-12 pr-10 text-sm outline-none placeholder:text-muted-foreground/80 transition-all font-medium selection:bg-primary/20"
            />

            {/* Clear Button - Non-jarring Entrance */}
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, x: 5 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setSearchQuery(""); onSearchChange(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.1] text-muted-foreground/40 hover:text-foreground transition-colors z-20"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Functional View Toggles (Snappy Responses) */}
          <div className="relative z-10 flex items-center gap-1.5 pr-1.5 border-l border-border/50 dark:border-white/5 ml-2 pl-3">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onViewChange('grid')}
              className={cn(
                "p-3 rounded-full transition-[background-color,color] duration-300",
                currentView === 'grid' ? "bg-black/10 dark:bg-white/10 text-foreground" : "text-muted-foreground/30 hover:text-foreground/60"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onViewChange('list')}
              className={cn(
                "p-3 rounded-full transition-[background-color,color] duration-300",
                currentView === 'list' ? "bg-black/10 dark:bg-white/10 text-foreground" : "text-muted-foreground/30 hover:text-foreground/60"
              )}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
