import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, MapPin, Clock, Globe, Share2, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-surface-alt/50 border-b border-border">
          <div className="container mx-auto px-6 text-center lg:text-left">
            <nav className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground mb-4">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <span className="text-foreground font-medium">Contact</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Have a question, feedback, or a story idea? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Contact Form */}
              <div className="lg:col-span-7 bg-surface border border-border p-8 lg:p-12 rounded-3xl shadow-sm">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-muted-foreground mb-10">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-semibold">First Name <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        id="first-name"
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:bg-background outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-semibold">Last Name <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        id="last-name"
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:bg-background outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold">Email Address <span className="text-destructive">*</span></label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:bg-background outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold">Subject</label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:bg-background outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="story">Story Idea / Pitch</option>
                      <option value="partnership">Partnership / Sponsorship</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold">Message <span className="text-destructive">*</span></label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us what's on your mind..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:border-primary focus:bg-background outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <a href="mailto:hello@insight.blog" className="text-muted-foreground hover:text-primary transition-colors">
                        hello@insight.blog
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Location</h4>
                      <p className="text-muted-foreground">San Francisco, CA<br />United States</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Response Time</h4>
                      <p className="text-muted-foreground">We typically respond within 24 hours during business days.</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-surface border border-border rounded-3xl">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Follow Us</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Website", icon: Globe, handle: "@InsightBlog" },
                      { name: "Share", icon: Share2, handle: "Insight Blog" },
                      { name: "Chat", icon: MessageSquare, handle: "@insight-blog" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-alt transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-surface-alt group-hover:bg-background flex items-center justify-center transition-colors">
                          <social.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {social.handle}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
