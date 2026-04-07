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

interface BlogShareProps {
  url: string
  title: string
  className?: string
  variant?: "horizontal" | "floating"
}

export const BlogShare = ({ url, title, className, variant = "horizontal" }: BlogShareProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(!!navigator.share)
  }, [])

  const shareLinks = [
    {
      name: "X",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-foreground",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:text-[#0A66C2]",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:text-[#1877F2]",
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
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
          url,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
        }
      }
    }
  }

  return (
    <div className={cn(
      "flex items-center gap-4 py-6", 
      variant === "floating" && "flex-col py-0 gap-2",
      className
    )}>
      {variant === "horizontal" && (
        <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Share</span>
      )}
      
      <div className={cn(
        "flex items-center gap-2 p-1.5 glass rounded-full border border-white/20 shadow-lg shadow-black/5",
        variant === "floating" && "flex-col py-3 px-1.5"
      )}>
        {/* Desktop Custom Links (hidden on native-share heavy devices but selectable) */}
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
                )
              })}
              title={`Share on ${link.name}`}
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className={cn(
          "bg-border/50",
          variant === "floating" ? "h-px w-6 my-1" : "w-px h-6 mx-1"
        )} />

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={getButtonClasses({ 
            variant: "ghost", 
            size: "icon", 
            className: cn(
              "w-10 h-10 relative",
              isCopied ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-foreground/5 dark:hover:bg-white/10"
            )
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

        {/* Native Share Button (High Visibility on Mobile) */}
        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className={getButtonClasses({ 
              variant: "ghost", 
              size: "icon", 
              className: cn("w-10 h-10 text-primary bg-primary/5 hover:bg-primary/10", variant === "horizontal" && "ml-1") 
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
