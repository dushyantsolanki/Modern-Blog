"use client"

import * as React from "react"
import { PostCard } from "@/components/post-card"
import { motion, AnimatePresence } from "framer-motion"
import { X, Share2, Globe, Mail, MapPin, Calendar, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthorContentProps {
  author: any
  posts: any[]
}

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
} as const

export function AuthorContent({ author, posts }: AuthorContentProps) {
  return (
    <main className="flex-1 pb-24">
      {/* Editorial Author Hero (Apple Style) */}
      <section className="pt-32 pb-20 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Asymmetric Profile Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] } as const}
              className="relative shrink-0"
            >
              <div className={cn(
                "w-48 h-48 lg:w-64 lg:h-64 rounded-[3rem] p-1 bg-gradient-to-br shadow-2xl overflow-hidden shadow-primary/5",
                author.gradient
              )}>
                <div className="w-full h-full rounded-[2.8rem] bg-surface flex items-center justify-center border-4 border-surface overflow-hidden transition-transform duration-700 hover:scale-105">
                  <span className="text-6xl font-black text-muted-foreground/20 leading-none">
                    {author.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 p-4 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 border-4 border-background">
                <BookOpen className="w-6 h-6" strokeWidth={1.5} />
              </div>
            </motion.div>

            <div className="flex-1 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] } as const}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                  Verified Mind
                </div>
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
                  {author.name}.
                </h1>
                <p className="text-2xl font-bold text-muted-foreground/60 mb-8 italic">
                  {author.role}
                </p>
                <p className="text-2xl font-medium leading-relaxed max-w-3xl mb-12">
                  {author.bio}
                </p>

                <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-muted-foreground/40 mb-12 uppercase tracking-widest">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" strokeWidth={1.5} /> {author.location}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" strokeWidth={1.5} /> Since {author.joined}</div>
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" strokeWidth={1.5} /> {posts.length} Stories</div>
                </div>

                <div className="flex items-center gap-4">
                  {[
                    { icon: X, href: author.social.twitter },
                    { icon: Share2, href: author.social.linkedin },
                    { icon: Globe, href: author.social.website },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href}
                      className="w-12 h-12 rounded-2xl bg-surface-alt border border-border/40 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      <social.icon className="w-5 h-5" strokeWidth={1.5} />
                    </motion.a>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all ml-4"
                  >
                    <Mail className="w-4 h-4" /> Message
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Posts (Editorial Grid) */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div {...FADE_UP} className="flex items-center justify-between mb-20">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Discovery</h2>
              <p className="text-4xl font-black tracking-tight">Recent stories from {author.name.split(' ')[0]}.</p>
            </div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {posts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {posts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    {...FADE_UP}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <PostCard {...post} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-32 bg-surface-alt/50 rounded-[3rem] border border-dashed border-border/60">
                <p className="text-3xl font-bold mb-4 opacity-30 tracking-tight">Silent for now.</p>
                <p className="text-muted-foreground font-medium">This author hasn't shared any stories yet.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
