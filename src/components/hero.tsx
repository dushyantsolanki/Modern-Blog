"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 dark:bg-black text-white">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs font-medium mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Welcome to Insight Blog
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Ideas that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-light">
              shape tomorrow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl"
          >
            Explore thoughtful articles on technology, design, productivity and the art of creative thinking. Written for curious minds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/blog"
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
            >
              Start Reading <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/10"
          >
            <div>
              <div className="text-3xl font-extrabold mb-1">12K+</div>
              <div className="text-sm text-slate-400">Active Readers</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold mb-1">340+</div>
              <div className="text-sm text-slate-400">Articles Published</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold mb-1">50+</div>
              <div className="text-sm text-slate-400">Categories</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
