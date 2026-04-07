"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CategoryCardSkeletonProps {
  className?: string
}

export function CategoryCardSkeleton({ className }: CategoryCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] rounded-[32px] overflow-hidden group shadow-md animate-pulse bg-muted/20 border border-border/50",
        className
      )}
    >
      {/* Content Placholder */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Count placeholder */}
        <div className="h-3 w-16 bg-muted/40 rounded-full mb-4" />
        {/* Title placeholder */}
        <div className="h-8 w-3/4 bg-muted/50 rounded-lg" />
      </div>
    </div>
  )
}
