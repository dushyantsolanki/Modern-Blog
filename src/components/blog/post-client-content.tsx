"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { TableOfContents } from "@/components/table-of-contents"
import { GoogleAd } from "@/components/google-ad"
import { Calendar, Clock, ChevronRight, X, Link2 } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { Post, posts } from "@/lib/data"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"
import { ViewTransition } from "react"
import { PostAudioPlayer } from "@/components/post-audio-player"
import { BlogShare } from "@/components/blog-share"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { motion } from "framer-motion"

const tocItems = [
  { id: "section-1", title: "Current State of AI", level: 2 },
  { id: "section-2", title: "Applications Today", level: 2 },
  { id: "section-3", title: "Essential Skills", level: 2 },
  { id: "section-4", title: "Ethical Considerations", level: 2 },
  { id: "section-5", title: "Practical Steps", level: 2 },
  { id: "section-6", title: "Future Outlook", level: 2 },
]

export default function PostClientContent({ post, slug }: { post: Post, slug: string }) {
  // Related posts logic
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <DirectionalTransition>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {/* Article Header / Hero */}
            <div className="container mx-auto px-6 pt-12 pb-8">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium truncate">{post.title}</span>
              </nav>

              <div className="max-w-4xl">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary text-white mb-6 inline-block">
                  {post.category}
                </span>
                <ViewTransition name={`post-title-${slug}`} share="text-morph">
                  <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                    {post.title}
                  </h1>
                </ViewTransition>

                <PostAudioPlayer title={post.title} contentSelector="article" />
                
                <BlogShare url={typeof window !== 'undefined' ? window.location.href : ''} title={post.title} />

                <div className="flex flex-wrap items-center gap-8 py-8 border-y border-border mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <div>
                      <div className="font-bold text-foreground">Sarah Chen</div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Senior Editor</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime="2026-03-28">{post.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="container mx-auto px-6 pb-24">
              <div className="flex flex-col lg:flex-row gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:flex-1"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl bg-black flex items-center justify-center">
                    <ViewTransition name={`post-image-${slug}`} share="morph">
                      {post.videoUrl ? (
                        <VideoPlayer src={post.videoUrl} poster={post.image} />
                      ) : (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 1200px) 100vw, 80vw"
                        />
                      )}
                    </ViewTransition>
                  </div>

                  <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-blockquote:border-primary prose-blockquote:bg-surface-alt prose-blockquote:p-8 prose-blockquote:rounded-md prose-blockquote:not-italic prose-strong:text-foreground prose-li:text-muted-foreground prose-ol:text-muted-foreground">
                    <p>The relationship between artificial intelligence and creative work has evolved dramatically over the past two years. What began as a novelty—generating amusing images from text prompts—has matured into a sophisticated ecosystem of tools that are fundamentally changing how designers, writers, and artists approach their craft.</p>
                    <p>But here's the nuance that often gets lost in the discourse: <strong>AI isn't replacing creativity. It's redefining the creative process itself.</strong></p>
                    <h2 id="section-1">The Current State of AI in Design</h2>
                    <p>As we enter 2026, AI-powered design tools have moved well beyond the experimental phase. They're now embedded in the daily workflows of design teams at companies of every size, from two-person startups to Fortune 500 enterprises.</p>
                    <blockquote>
                      <p>"The best designers I know aren't threatened by AI tools—they're leveraging them to do work that would have taken weeks in a matter of hours. The creative vision hasn't changed; the execution speed has."</p>
                      <cite className="block mt-4 font-bold text-foreground">— Maya Patel, Design Director at Airbnb</cite>
                    </blockquote>
                    <h2 id="section-2">How AI Tools Are Being Used Today</h2>
                    <ul>
                      <li><strong>Rapid prototyping</strong> — Converting wireframes and sketches into interactive prototypes in minutes</li>
                      <li><strong>Content generation</strong> — Creating placeholder content that actually reflects the intended tone and context</li>
                      <li><strong>Accessibility auditing</strong> — Automated contrast checking, screen reader optimization, and WCAG compliance</li>
                    </ul>
                    <h2 id="section-3">The Skills That Will Matter Most</h2>
                    <ol>
                      <li><strong>Systems thinking</strong> — Understanding how individual decisions affect the broader product ecosystem</li>
                      <li><strong>Strategic framing</strong> — Defining the right problems to solve, not just producing solutions</li>
                      <li><strong>Human insight</strong> — Deep empathy and understanding of user needs that AI cannot replicate</li>
                    </ol>
                    <h2 id="section-4">Ethical Considerations</h2>
                    <p>With great power comes great responsibility. The creative community is grappling with important questions about attribution, originality, and the economic impact on creative professionals.</p>
                    <h2 id="section-5">Practical Steps for Designers</h2>
                    <ol>
                      <li><strong>Audit your current workflow</strong> — Identify repetitive tasks that consume creative energy</li>
                      <li><strong>Start with low-stakes experiments</strong> — Use AI for internal projects before client-facing work</li>
                    </ol>
                    <h2 id="section-6">Looking Ahead: 2027 and Beyond</h2>
                    <p>The next wave of AI tools will likely focus on understanding design intent—not just what something should look like, but why it should look that way.</p>
                    <p><strong>The question isn't whether AI will change creative work. It already has. The question is whether you'll be the one shaping that change, or simply reacting to it.</strong></p>
                  </article>

                  {/* Final Engagement Share (Bottom) */}
                  <div className="mt-16">
                    <BlogShare url={typeof window !== 'undefined' ? window.location.href : ''} title={post.title} />
                  </div>

                  {/* Related Posts Section */}
                  {relatedPosts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-border">
                      <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedPosts.map((rp) => ( rp.slug !== post.slug && (
                          <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                              <Image src={rp.image} alt={rp.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h4>
                            <p className="text-sm text-muted-foreground mt-2">{rp.date}</p>
                          </Link>
                        )))}
                      </div>
                    </div>
                  )}

                  {/* Tags and Author Box */}
                  <div className="mt-24 pt-16 border-t border-border">
                    <div className="flex flex-wrap gap-2 mb-12">
                      {["AI", "Design", "Future of Work", "Creative Tools", "Productivity"].map(tag => (
                        <span key={tag} className="px-4 py-2 bg-surface-alt rounded-full text-xs font-semibold text-muted-foreground border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="p-8 lg:p-12 bg-surface border border-border rounded-3xl flex flex-col md:flex-row gap-8">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Sarah Chen</h3>
                        <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Senior Editor & Technology Writer</div>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          Sarah covers the intersection of technology and creativity. With 10 years in tech journalism and a background in UX design, she brings a unique perspective to how tools shape creative work.
                        </p>
                        <div className="flex gap-4">
                          <a href="#" className="p-2 border border-border rounded-xl hover:bg-surface-alt transition-colors"><X className="w-4 h-4" /></a>
                          <a href="#" className="p-2 border border-border rounded-xl hover:bg-surface-alt transition-colors"><Link2 className="w-4 h-4" /></a>
                        </div>
                      </div>
                    </div>

                    <GoogleAd slotId="post-article-banner" className="my-12 px-6" />
                  </div>
                </motion.div>

                {/* Sidebar Column */}
                <div className="lg:w-80">
                  <div className="sticky top-28 flex flex-col gap-12 self-start">
                    <TableOfContents items={tocItems} />
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>

            <Newsletter />
          </main>
          <Footer />
        </div>
      </DirectionalTransition>
    </>
  )
}
