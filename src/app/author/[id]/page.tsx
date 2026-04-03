import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PostCard } from "@/components/post-card"
import { Newsletter } from "@/components/newsletter"
import { X, Share2, Globe, Mail, MapPin, Calendar, BookOpen } from "lucide-react"

const authors = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Founder & Editor-in-Chief",
    bio: "Former tech journalist at Wired. 10 years covering the intersection of technology and creativity. Passionate about AI, design systems, and the future of work.",
    avatar: "",
    gradient: "from-indigo-500 to-pink-500",
    location: "San Francisco, CA",
    joined: "June 2022",
    posts: 42,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    role: "Senior Writer",
    bio: "Productivity expert and former startup CTO. Writes about systems, frameworks, and working smarter. Believes that the right tools can unlock human potential.",
    avatar: "",
    gradient: "from-emerald-500 to-cyan-500",
    location: "London, UK",
    joined: "August 2022",
    posts: 35,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Sustainability Editor",
    bio: "Environmental scientist turned tech writer. Passionate about sustainable technology and green innovation. Exploring how tech can solve global challenges.",
    avatar: "",
    gradient: "from-orange-500 to-amber-500",
    location: "Bangalore, India",
    joined: "October 2022",
    posts: 28,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  },
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Design Lead",
    bio: "Digital designer and creative strategist. Writes about visual rhythm, typography, and user experience. Obsessed with detail and craft.",
    avatar: "",
    gradient: "from-slate-700 to-slate-500",
    location: "Berlin, DE",
    joined: "December 2022",
    posts: 22,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  }
]

const allPosts = [
  {
    title: "The Future of AI in Creative Work: What Every Designer Should Know",
    excerpt: "Artificial intelligence is reshaping how we approach design, writing, and art. Here's a practical look at what's changing and how to stay ahead of the curve.",
    category: "Technology",
    date: "Mar 28, 2026",
    readTime: "8 min read",
    author: { name: "Sarah Chen", avatar: "" },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
  },
  {
    title: "10 Productivity Frameworks That Actually Work in 2026",
    excerpt: "Forget hustle culture. These evidence-based methods genuinely help you do meaningful work without burning out.",
    category: "Productivity",
    date: "Mar 25, 2026",
    readTime: "6 min read",
    author: { name: "Marcus Lee", avatar: "" },
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1472&auto=format&fit=crop",
  },
  {
    title: "Building a Sustainable Tech Stack for Startups",
    excerpt: "Why choosing the right technologies early can reduce your carbon footprint and save millions in infrastructure costs.",
    category: "Sustainability",
    date: "Mar 22, 2026",
    readTime: "5 min read",
    author: { name: "Priya Sharma", avatar: "" },
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "The Art of Creative Constraints: Less is More",
    excerpt: "How embracing limitations can unlock your most innovative work. Lessons from artists, engineers, and entrepreneurs.",
    category: "Creativity",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    author: { name: "Alex Rivera", avatar: "" },
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop",
  },
]

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const author = authors.find(a => a.id === id) || authors[0]
  const authorPosts = allPosts.filter(p => p.author.name === author.name)

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
                    {author.posts} Articles Published
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
