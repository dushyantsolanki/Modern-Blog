"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Premium Theme Toggle using Design Engineering principles:
 * - Spring-based transitions for physical interaction.
 * - AnimatePresence for smooth icon swapping.
 * - whileTap scale feedback for tactile response.
 * - Backdrop blur and refined borders for editorial look.
 */

const SPRING_CONFIG = { type: "spring", stiffness: 300, damping: 20 } as const

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-surface-alt/50 border border-border/40 animate-pulse" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500",
        "bg-surface-alt/80 backdrop-blur-md border border-border/40",
        "hover:bg-muted/80 hover:border-border/80 focus:outline-none"
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={SPRING_CONFIG}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-[1.1rem] w-[1.1rem] text-primary transition-colors duration-300" strokeWidth={1.5} />
          ) : (
            <Sun className="h-[1.1rem] w-[1.1rem] text-accent transition-colors duration-300" strokeWidth={1.5} />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative inner highlight for "physical" button feel */}
      <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] opacity-50" />
    </motion.button>
  )
}
