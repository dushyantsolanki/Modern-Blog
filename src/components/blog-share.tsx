"use client"

import React, { useState, useEffect } from "react"
import { Share2, Link as LinkIcon, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Custom Brand Icons (Apple-style minimalism)
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
}

export const BlogShare = ({ url, title, className }: BlogShareProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(!!navigator.share)
  }, [])

  const shareLinks = [
    {
      name: "Twitter",
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-[#1DA1F2]",
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
    <div className={cn("flex items-center gap-4 py-6", className)}>
      <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Share</span>
      
      <div className="flex items-center gap-2 p-1.5 glass rounded-full border border-white/20 shadow-lg shadow-black/5">
        {/* Desktop Custom Links (hidden on native-share heavy devices but selectable) */}
        <div className="flex items-center gap-1">
          {shareLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full transition-colors text-muted-foreground",
                link.color,
                "hover:bg-white dark:hover:bg-white/10"
              )}
              title={`Share on ${link.name}`}
            >
              <link.icon className="w-4.5 h-4.5" />
            </motion.a>
          ))}
        </div>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Copy Link Button */}
        <motion.button
          onClick={handleCopyLink}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full transition-all text-muted-foreground relative",
            isCopied ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-white dark:hover:bg-white/10"
          )}
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
                <Check className="w-4.5 h-4.5" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <LinkIcon className="w-4.5 h-4.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Native Share Button (High Visibility on Mobile) */}
        {canNativeShare && (
          <motion.button
            onClick={handleNativeShare}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full text-primary bg-primary/10 hover:bg-primary/20 transition-all ml-1"
            title="System Share"
          >
            <Share2 className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </div>
      
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
    </div>
  )
}
