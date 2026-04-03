import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Sparkles, Users, Target, Award } from "lucide-react"

const values = [
  {
    title: "Craft Over Speed",
    description: "We'd rather publish one excellent article than five mediocre ones. Every piece is researched, written, and edited to meet a high bar.",
    icon: Sparkles,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Reader First",
    description: "No pop-ups, no paywalls, no dark patterns. We respect your time and your attention. Our revenue comes from honest sponsorships.",
    icon: Users,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Honest Perspective",
    description: "We don't chase trends for clicks. Every article reflects genuine thinking and real-world experience from people who do the work.",
    icon: Target,
    color: "bg-emerald-500/10 text-emerald-600",
  },
]

const stats = [
  { label: "Newsletter Subscribers", value: "12K+", color: "text-primary" },
  { label: "Articles Published", value: "340+", color: "text-accent" },
  { label: "Annual Page Views", value: "2M+", color: "text-success" },
  { label: "Contributing Authors", value: "50+", color: "text-purple-600" },
]

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & Editor-in-Chief",
    bio: "Former tech journalist at Wired. 10 years covering the intersection of technology and creativity.",
    gradient: "from-indigo-500 to-pink-500",
  },
  {
    name: "Marcus Lee",
    role: "Senior Writer",
    bio: "Productivity expert and former startup CTO. Writes about systems, frameworks, and working smarter.",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    name: "Priya Sharma",
    role: "Sustainability Editor",
    bio: "Environmental scientist turned tech writer. Passionate about sustainable technology and green innovation.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "David Kim",
    role: "Business & Strategy",
    bio: "MBA from Stanford. Writes about remote work, leadership, and the future of business models.",
    gradient: "from-slate-700 to-slate-500",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-24 lg:py-32 bg-slate-900 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span>/</span>
                <span className="text-white">About</span>
              </nav>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
                We write for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-light">
                  curious minds.
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Insight started as a side project in 2022. Today, it's a thriving community of 12,000+ readers who believe great ideas deserve great writing.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted grayscale opacity-60">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-extrabold mb-8 tracking-tight">The Story Behind Insight</h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>In 2022, we noticed something about the internet: there was plenty of content, but not enough craft. The blogs we loved growing up — the ones that combined deep thinking with beautiful presentation — were being replaced by SEO-optimized noise.</p>
                  <p>So we set out to build something different. Insight is a blog that treats every article like a piece of design work. We believe the container matters as much as the content — that typography, whitespace, and visual rhythm make ideas more accessible and more enjoyable to engage with.</p>
                  <p>Every week, we publish 3-4 articles at the intersection of technology, design, productivity, and creative thinking. Our readers are designers, developers, founders, and thinkers who value quality over quantity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-surface-alt/50 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight">What We Value</h2>
              <p className="text-muted-foreground text-lg">The principles that guide everything we publish</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div key={i} className="p-8 bg-surface border border-border rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${value.color}`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight">By the Numbers</h2>
              <p className="text-muted-foreground">Four years in, here's where we stand</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="p-8 bg-surface border border-border rounded-2xl">
                  <div className={`text-4xl font-extrabold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-surface-alt/50 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Meet the Team</h2>
              <p className="text-muted-foreground">The people behind the words</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {team.map((member, i) => (
                <div key={i}>
                  <div className={`w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br ${member.gradient} shadow-lg shadow-primary/20`} />
                  <h4 className="text-lg font-bold mb-1">{member.name}</h4>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
