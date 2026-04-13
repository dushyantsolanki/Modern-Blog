"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Category {
  count: number
  image: string
  color: string
  slug?: string
  title: string
}

interface CategoryCarouselProps {
  categories: Category[]
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const onSelect = React.useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group/carousel">
      {/* Navigation Buttons */}
      <div className="absolute -top-16 right-0 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className={cn(
            "rounded-full transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-surface-alt",
            !canScrollPrev && "opacity-0 invisible"
          )}
          aria-label="Previous categories"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className={cn(
            "rounded-full transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-surface-alt",
            !canScrollNext && "opacity-0 invisible"
          )}
          aria-label="Next categories"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Carousel Viewport */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6 py-4 px-1">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-[0_0_85%] min-w-0 md:flex-[0_0_320px] lg:flex-[0_0_380px]"
            >
              <Link href={`/category/${category.slug || category.title.toLowerCase()}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative aspect-[4/5] rounded-[32px] overflow-hidden group shadow-lg"
                >
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Color Overlay */}
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: category.color }}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="text-sm font-medium mb-2 opacity-80 uppercase tracking-widest"
                    >
                      {category.count} Articles
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="text-3xl md:text-4xl font-black leading-tight tracking-tighter"
                    >
                      {category.title}
                    </motion.h3>
                  </div>

                  {/* Glassmorphism Border Shadow */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
