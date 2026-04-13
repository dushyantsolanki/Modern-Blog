"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function HeroCarouselSkeleton() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden py-10 animate-pulse">
      <div className="h-full px-4 md:px-8">
        <div className="relative h-full w-full rounded-[1rem] md:rounded-[2rem] bg-muted/20 overflow-hidden">
          {/* Background Placeholder */}
          <div className="absolute inset-0 bg-muted/30" />
          
          {/* Content Placeholder */}
          <div className="relative h-full px-8 md:px-16 lg:px-24 flex flex-col justify-end pb-24 md:pb-32 space-y-6">
            <div className="h-6 w-32 bg-muted/40 rounded-full" />
            <div className="h-12 w-3/4 bg-muted/50 rounded-xl" />
            <div className="space-y-3">
              <div className="h-4 w-1/2 bg-muted/30 rounded" />
              <div className="h-4 w-1/3 bg-muted/30 rounded" />
            </div>
            <div className="h-12 w-48 bg-muted/50 rounded-full mt-4" />
          </div>
          
          {/* Progress Indicators Placeholder */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn("h-1.5 rounded-full bg-white/20", i === 1 ? "w-12" : "w-1.5")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
