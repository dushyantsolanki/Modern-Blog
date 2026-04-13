"use client"

import * as React from "react"
import { CategoryCardSkeleton } from "./category-card-skeleton"

export function CategoryCarouselSkeleton() {
  return (
    <div className="relative group/carousel overflow-hidden">
      {/* Navigation Buttons Placeholder */}
      <div className="absolute -top-16 right-0 flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
      </div>

      {/* Carousel Viewport Placeholder */}
      <div className="overflow-hidden">
        <div className="flex gap-6 py-4 px-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-[0_0_85%] min-w-0 md:flex-[0_0_320px] lg:flex-[0_0_380px]"
            >
              <CategoryCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
