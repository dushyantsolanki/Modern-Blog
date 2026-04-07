import * as React from "react"
import { cn } from "@/lib/utils"

interface PostCardSkeletonProps {
  featured?: boolean
  className?: string
}

export function PostCardSkeleton({ 
  featured = false,
  className 
}: PostCardSkeletonProps) {
  return (
    <article
      className={cn(
        "group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-sm animate-pulse",
        featured ? "md:flex-row md:col-span-2 lg:col-span-3" : "",
        className
      )}
    >
      <div className={cn("relative bg-muted/20", featured ? "md:w-1/2" : "h-64")}>
         <div className="absolute inset-0 bg-muted/40" />
         <div className="absolute top-4 left-4">
           <div className="h-5 bg-muted/50 rounded-full w-20" />
         </div>
      </div>

      <div className={cn("flex flex-col p-6 lg:p-8", featured ? "md:w-1/2 justify-center" : "flex-1")}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-16 bg-muted/40 rounded-full" />
          <span className="w-1 h-1 rounded-full bg-muted/40" />
          <div className="h-3 w-12 bg-muted/40 rounded-full" />
        </div>

        <div className="h-7 bg-muted/50 rounded-lg w-full mb-2" />
        <div className={cn("h-7 bg-muted/50 rounded-lg mb-4", featured ? "w-2/3" : "w-3/4")} />

        <div className="space-y-2 mb-6 flex-1 mt-2">
          <div className="h-4 bg-muted/30 rounded w-full" />
          <div className="h-4 bg-muted/30 rounded w-full" />
          <div className="h-4 bg-muted/30 rounded w-4/5" />
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted/50" />
            <div className="h-4 w-24 bg-muted/40 rounded-md" />
          </div>
          <div className="h-4 w-20 bg-muted/50 rounded-md" />
        </div>
      </div>
    </article>
  )
}
