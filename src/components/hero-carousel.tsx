"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, Pause } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { type Post } from "@/lib/data"
import { cn } from "@/lib/utils"

interface HeroCarouselProps {
  posts: Post[]
}

export function HeroCarousel({ posts }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 50, // Super smooth
      align: "center",
      containScroll: false, // Allow peeking
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const toggleAutoplay = React.useCallback(() => {
    if (!emblaApi) return
    const autoplay = emblaApi.plugins().autoplay
    if (!autoplay) return

    if (autoplay.isPlaying()) {
      autoplay.stop()
      setIsPlaying(false)
    } else {
      autoplay.play()
      setIsPlaying(true)
    }
  }, [emblaApi])

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden py-10">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex gap-4 md:gap-8 px-4 md:px-0">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              className={cn(
                "embla__slide relative flex-[0_0_100%] md:flex-[0_0_90%] h-full rounded-[1rem] md:rounded-[2rem] overflow-hidden transition-all duration-1000",
                selectedIndex !== index && "opacity-40 scale-[0.95]"
              )}
            >
              {/* Background Media with Cinematic Zoom */}
              <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      initial={index === 0 ? { scale: 1.05, opacity: 1 } : { scale: 1.15, opacity: 0 }}
                      animate={{ scale: 1.05, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                      className="absolute inset-0"
                    >
                      {post.videoUrl ? (
                        <div className="relative w-full h-full">
                          <video
                            src={post.videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={post.heroImage || post.image}
                          />
                          <div className="absolute inset-0 bg-black/30" />
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={post.heroImage || post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 90vw"
                            // @ts-ignore
                            fetchPriority={index === 0 ? "high" : "auto"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Overlay with Staggered Entry */}
              <div className="relative h-full px-8 md:px-16 lg:px-24 flex flex-col justify-end pb-24 md:pb-32">
                <AnimatePresence>
                  {selectedIndex === index && (
                    <div className="max-w-3xl space-y-6">
                      <motion.span
                        initial={index === 0 ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: "translateY(20px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        transition={{ duration: 0.8, delay: index === 0 ? 0 : 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-indigo-200 text-xs font-bold tracking-widest uppercase"
                      >
                        {post.category}
                      </motion.span>

                      <motion.h2
                        initial={index === 0 ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: "translateY(30px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        transition={{ duration: 0.8, delay: index === 0 ? 0 : 0.4, ease: [0.32, 0.72, 0, 1] }}
                        className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-[1.05] tracking-tight"
                      >
                        {post.title}
                      </motion.h2>

                      <motion.p
                        initial={index === 0 ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: "translateY(20px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        transition={{ duration: 0.8, delay: index === 0 ? 0 : 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
                      >
                        {post.excerpt}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, transform: "scale(0.95)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale(1.05) active:scale(0.97) transition-transform duration-200"
                        >
                          Explore Story
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation & Progress Pills */}
      <div className="absolute bottom-16 md:bottom-20 left-0 right-0 z-30">
        <div className="container mx-auto px-6 flex items-center justify-center gap-6">
          {/* Autoplay Toggle */}
          <button
            onClick={toggleAutoplay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white hover:bg-white/20 transition-all active:scale-90"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Progress Indicators */}
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "relative h-1.5 transition-all duration-500 rounded-full bg-white/20 overflow-hidden",
                  selectedIndex === index ? "w-12" : "w-1.5"
                )}
                aria-label={`Slide ${index + 1}`}
              >
                {selectedIndex === index && (
                  <motion.div
                    key={`${index}-${isPlaying}`}
                    initial={{ width: "0%" }}
                    animate={isPlaying ? { width: "100%" } : { width: "100%" }}
                    transition={isPlaying ? { duration: 6, ease: "linear" } : { duration: 0 }}
                    className="absolute inset-0 bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
