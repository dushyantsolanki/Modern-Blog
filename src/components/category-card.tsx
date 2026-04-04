"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface CategoryCardProps {
  title: string
  count: number
  image: string
  color: string
}

export function CategoryCard({ title, count, image, color }: CategoryCardProps) {
  return (
    <Link href={`/category/${title.toLowerCase()}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative aspect-[4/5] rounded-[32px] overflow-hidden group shadow-lg hover:shadow-2xl transition-all"
      >
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Color Overlay Overlay */}
        <div
          className="absolute inset-0 opacity-30 group-hover:opacity-20 transition-opacity"
          style={{ backgroundColor: color }}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <p className="text-sm font-medium mb-2 opacity-80 uppercase tracking-[0.2em] translate-y-2 group-hover:translate-y-0 transition-transform">
            {count} Articles
          </p>
          <h3 className="text-3xl font-black leading-tight tracking-tighter">
            {title}
          </h3>
        </div>

        {/* Glassmorphism Border Shadow */}
        <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
