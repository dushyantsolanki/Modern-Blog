import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ViewTransition } from "react"




interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: {
    name: string
    avatar: string
  }
  image: string
  featured?: boolean
  priority?: boolean
  className?: string
}

export function PostCard({
  slug,
  title,
  excerpt,
  category,
  date,
  readTime,
  author,
  image,
  featured = false,
  priority = false,
  className,
}: PostCardProps) {

  return (

    <article
      className={cn(
        "group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1",
        featured ? "md:flex-row md:col-span-2 lg:col-span-3" : "",
        className
      )}
    >
      <div className={cn("relative overflow-hidden bg-muted/20", featured ? "md:w-1/2" : "h-64")}>
        <ViewTransition name={`post-image-${slug}`} share="morph" default="none">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </ViewTransition>
        <div className="absolute top-4 left-4">

          <span className={cn(
            "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full glass border border-white/20 text-white shadow-lg backdrop-blur-md",
            featured ? "bg-accent/40" : "bg-primary/40"
          )}>
            {category}
          </span>
        </div>
      </div>

      <div className={cn("flex flex-col p-6 lg:p-8", featured ? "md:w-1/2 justify-center" : "flex-1")}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <time dateTime={date}>{date}</time>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>{readTime}</span>
        </div>

        <ViewTransition name={`post-title-${slug}`} share="text-morph" default="none">
          <h3 className={cn(
            "font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight",
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          )}>
            {title}
          </h3>
        </ViewTransition>


        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
          <Link
            href={`/author/${author.name.toLowerCase().replace(/ /g, "-")}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden flex items-center justify-center text-[10px] font-bold text-white/50">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-sm font-medium text-foreground">{author.name}</span>
          </Link>
          <Link
            href={`/blog/${slug}`}
            transitionTypes={['nav-forward']}
            className="flex items-center gap-1 text-sm font-semibold text-primary group/link hover:gap-2 transition-all"
          >

            Read More <ArrowRight className="w-4 h-4" />
          </Link>



        </div>
      </div>
    </article>
  )
}
