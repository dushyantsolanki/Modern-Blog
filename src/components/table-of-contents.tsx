"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -35% 0%", threshold: 1.0 }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Navbar height + buffer
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        ease: [0.23, 1, 0.32, 1] as any
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 bg-surface border border-border rounded-2xl relative overflow-hidden"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 pb-3 border-b border-border/50">
        Contents
      </h3>

      <nav className="relative">
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              style={{ paddingLeft: `${Math.max(0, (item.level - 2) * 1)}rem` }}
            >
              <motion.a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative block py-2 px-3 text-sm font-medium transition-all duration-300 rounded-lg",
                  activeId === item.id
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
                )}
              >
                {activeId === item.id && (
                  <motion.div
                    layoutId="toc-indicator"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}
