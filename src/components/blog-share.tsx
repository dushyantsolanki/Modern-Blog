"use client"

import React, { useState, useEffect } from "react"
import { Share2, Link as LinkIcon, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { getButtonClasses } from "@/components/ui/button"

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

import { useTheme } from "next-themes"

interface BlogShareProps {
  url: string
  title: string
  className?: string
  variant?: "horizontal" | "floating" | "sticky-bottom"
  isVisible?: boolean
}

export const BlogShare = ({
  url,
  title,
  className,
  variant = "horizontal",
  isVisible = true,
}: BlogShareProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setCanNativeShare(!!navigator.share)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : false

  const getUtmUrl = (source: string) => {
    try {
      const u = new URL(url)
      u.searchParams.set("utm_source", source)
      u.searchParams.set("utm_medium", "social")
      u.searchParams.set("utm_campaign", "share_button")
      return u.toString()
    } catch {
      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}utm_source=${source}&utm_medium=social&utm_campaign=share_button`
    }
  }

  const shareLinks = [
    {
      name: "X",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUtmUrl("twitter"))}`,
      color: "hover:bg-foreground/10 hover:text-foreground",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUtmUrl("linkedin"))}`,
      color: "hover:bg-[#0A66C2]/15 hover:text-[#0A66C2]",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUtmUrl("facebook"))}`,
      color: "hover:bg-[#1877F2]/15 hover:text-[#1877F2]",
    },
    {
      name: "WhatsApp",
      icon: WhatsappIcon,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${getUtmUrl("whatsapp")}`)}`,
      color: "hover:bg-[#25D366]/15 hover:text-[#25D366]",
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUtmUrl("copy_link"))
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: getUtmUrl("native_share"),
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
        }
      }
    }
  }

  if (variant === "sticky-bottom") {
    return (
      <motion.div
        initial={false}
        animate={{
          y: isVisible ? 0 : 120,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        className={cn("fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 select-none max-w-[calc(100vw-1.5rem)]", className)}
      >
        {/* Liquid Glass Capsule Container */}
        <div
          className={cn(
            "relative flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-3xl",
            isDark
              ? "bg-zinc-950/95 text-white border-zinc-800/80 shadow-black/80 hover:border-zinc-700"
              : "bg-white text-slate-900 border-slate-200/90 shadow-slate-900/10 hover:border-slate-300"
          )}
        >
          {/* Top Liquid Specular Light Refraction */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent to-transparent",
              isDark ? "via-white/30" : "via-slate-300/80"
            )}
          />

          {/* Label / Icon */}
          <div
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-3 border-r",
              isDark ? "border-zinc-800" : "border-slate-200"
            )}
          >
            <div
              className={cn(
                "size-6 sm:size-7 rounded-full flex items-center justify-center shrink-0 shadow-inner",
                isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-800"
              )}
            >
              <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-xs font-extrabold tracking-tight hidden sm:inline-block">
              Share
            </span>
          </div>

          {/* Icons Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {shareLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors duration-200 shrink-0",
                  link.color
                )}
                title={`Share on ${link.name}`}
              >
                <link.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.a>
            ))}

            {/* Copy Link Button with Animated Check */}
            <motion.button
              onClick={handleCopyLink}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors duration-200 relative shrink-0",
                isCopied
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-emerald-500/15 hover:text-emerald-600 dark:hover:text-emerald-400"
              )}
              title="Copy Link"
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="link"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                  >
                    <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Floating Copied Tooltip Badge */}
          <AnimatePresence>
            {isCopied && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white px-3 py-1 rounded-full shadow-xl whitespace-nowrap"
              >
                ✓ Link Copied! ✨
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-6",
        variant === "floating" && "flex-col py-0 gap-2",
        className
      )}
    >
      {variant === "horizontal" && (
        <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Share</span>
      )}

      <div
        className={cn(
          "flex items-center gap-2 p-1.5 glass rounded-full border border-white/20 shadow-lg shadow-black/5",
          variant === "floating" && "flex-col py-3 px-1.5"
        )}
      >
        <div className={cn("flex items-center", variant === "floating" && "flex-col")}>
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClasses({
                variant: "ghost",
                size: "icon",
                className: cn(
                  "w-10 h-10 text-muted-foreground",
                  link.color,
                  "hover:bg-foreground/5 dark:hover:bg-white/10"
                ),
              })}
              title={`Share on ${link.name}`}
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div
          className={cn(
            "bg-border/50",
            variant === "floating" ? "h-px w-6 my-1" : "w-px h-6 mx-1"
          )}
        />

        <button
          onClick={handleCopyLink}
          className={getButtonClasses({
            variant: "ghost",
            size: "icon",
            className: cn(
              "w-10 h-10 relative",
              isCopied
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:bg-foreground/5 dark:hover:bg-white/10"
            ),
          })}
          title="Copy Link"
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <LinkIcon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className={getButtonClasses({
              variant: "ghost",
              size: "icon",
              className: cn(
                "w-10 h-10 text-primary bg-primary/5 hover:bg-primary/10",
                variant === "horizontal" && "ml-1"
              ),
            })}
            title="System Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {variant === "horizontal" && (
        <AnimatePresence>
          {isCopied && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-[10px] font-bold text-primary uppercase tracking-widest"
            >
              Link Copied
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
