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
import { Post } from "@/lib/types"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"
import { ViewTransition } from "react"
import { PostAudioPlayer } from "@/components/post-audio-player"
import { BlogShare } from "@/components/blog-share"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { motion, AnimatePresence } from "framer-motion"
import { ArticleSummarizer } from "@/components/article-summarizer"
import { getPosts } from "@/lib/api"
import { AuthorAvatar } from "@/components/author-avatar"


// TOC items will be generated dynamically from the article content
interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export default function PostClientContent({ post, slug }: { post: Post, slug: string }) {
  const [showFloatingShare, setShowFloatingShare] = React.useState(false)
  const [dynamicTocItems, setDynamicTocItems] = React.useState<TOCItem[]>([])
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector('article');
    if (article) {
      const headings = Array.from(article.querySelectorAll('h2, h3'));
      const items = headings.map((h, index) => ({
        id: h.id || `heading-${index}`,
        title: h.textContent || '',
        level: parseInt(h.tagName.replace('H', ''))
      }));
      setDynamicTocItems(items);
    }
  }, [post, post.content]); // Re-run if post or its content changes

  React.useEffect(() => {
    async function fetchRelated() {
      if (post.category) {
        const data = await getPosts({ limit: 3, categorySlug: post.category });
        setRelatedPosts(data.posts.filter(p => p.slug !== slug).slice(0, 2));
      }
    }
    fetchRelated();
  }, [post.category, slug]);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show floating share after scrolling past the main header (roughly 600px)
      setShowFloatingShare(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Related posts logic
  // const relatedPosts = posts
  //   .filter((p) => p.category === post.category && p.slug !== slug)
  //   .slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <DirectionalTransition>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* Floating Lateral Share Bar - Apple Inspired */}
          <AnimatePresence>
            {showFloatingShare && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[60] scale-90 md:scale-100"
              >
                <BlogShare
                  variant="floating"
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={post.title}
                />
              </motion.div>
            )}
          </AnimatePresence >

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

                <div className="flex flex-wrap items-center gap-8 py-8 border-y border-border mb-12">
                  <div className="flex items-center gap-3">
                    <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size="md" />
                    <div>
                      <div className="font-bold text-foreground">{post.author.name}</div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{post.author.role || "Author"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>{post.date}</time>
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
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl bg-transparent flex items-center justify-center">
                    <ViewTransition name={`post-image-${slug}`} share="morph">
                      {post.videoUrl ? (
                        <VideoPlayer src={post.videoUrl} />
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

                  {/* AI Article Summarizer */}
                  {/* <ArticleSummarizer summaryPoints={post.summaryPoints} /> */}

                  <article
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-blockquote:border-primary prose-blockquote:bg-surface-alt prose-blockquote:p-8 prose-blockquote:rounded-md prose-blockquote:not-italic prose-strong:text-foreground prose-li:text-muted-foreground prose-ol:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                  />

                  {/* Related Posts Section */}
                  {relatedPosts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-border">
                      <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedPosts.map((rp) => (
                          <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                              <Image src={rp.image} alt={rp.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h4>
                            <p className="text-sm text-muted-foreground mt-2">{rp.date}</p>
                          </Link>
                        ))}
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

                    <div className="p-6 lg:p-6 bg-surface border border-border rounded-3xl flex flex-col md:flex-row gap-8">
                      <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size="xl" />
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{post.author.name}</h3>
                        <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">{post.author.role || "Author"}</div>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {post.author.bio || `Creative mind and contributor at Insight. Sharing perspectives on ${post.category} and the future of work.`}
                        </p>
                        <div className="flex gap-4">
                          <a href="#" className="p-2 border border-border rounded-xl hover:bg-surface-alt transition-colors"><X className="w-4 h-4" /></a>
                          <a href="#" className="p-2 border border-border rounded-xl hover:bg-surface-alt transition-colors"><Link2 className="w-4 h-4" /></a>
                        </div>
                      </div>
                    </div>

                    {/* <GoogleAd slotId="post-article-banner" className="my-12 px-6" /> */}
                  </div>
                </motion.div>

                {/* Sidebar Column */}
                <div className="lg:w-80">
                  <div className="sticky top-28 flex flex-col gap-12 self-start">
                    <TableOfContents items={dynamicTocItems} />
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>

            <Newsletter />
          </main>
          <Footer />
        </div>
      </DirectionalTransition >
    </>
  )
}
