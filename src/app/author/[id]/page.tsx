import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PostCard } from "@/components/post-card"
import { Newsletter } from "@/components/newsletter"
import { X, Share2, Globe, Mail, MapPin, Calendar, BookOpen } from "lucide-react"

import { posts, authors } from "@/lib/data"

export async function generateStaticParams() {
  return authors.map((author) => ({
    id: author.id,
  }))
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const author = authors.find(a => a.id === id) || authors[0]
  const authorPosts = posts.filter(p => p.author.name === author.name)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Author Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-950 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="relative group">
                <div className={`w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br ${author.gradient} shadow-2xl p-1`}>
                  <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center border-4 border-slate-900">
                    {/* Placeholder for avatar */}
                    <span className="text-6xl font-bold text-white/20">{author.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-3 rounded-2xl shadow-lg border-4 border-slate-950">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary-light text-sm font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Verified Author
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
                  {author.name}
                </h1>
                <p className="text-2xl text-slate-300 font-medium mb-8">
                  {author.role}
                </p>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-10">
                  {author.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 mb-10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {author.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {author.joined}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {author.postCount} Articles Published
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <a href={author.social.twitter} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all">
                    <X className="w-5 h-5" />
                  </a>
                  <a href={author.social.linkedin} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all">
                    <Share2 className="w-5 h-5" />
                  </a>
                  <a href={author.social.github} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href={author.social.website} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all">
                    <Globe className="w-5 h-5" />
                  </a>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-bold hover:bg-primary hover:text-white transition-all ml-4">
                    <Mail className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Posts Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-16 px-4">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                Latest from <span className="text-primary">{author.name.split(' ')[0]}</span>
              </h2>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {authorPosts.length} Articles
              </div>
            </div>

            {authorPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorPosts.map((post, i) => (
                  <PostCard key={i} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-surface-alt rounded-3xl border border-dashed border-border">
                <p className="text-muted-foreground text-lg">No articles discovered yet from this author.</p>
              </div>
            )}
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
