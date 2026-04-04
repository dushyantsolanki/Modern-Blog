import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="p-8 bg-surface border border-border rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Data Protection</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use industry-standard encryption and security protocols to ensure your data stays safe and private.
                  </p>
                </div>
                <div className="p-8 bg-surface border border-border rounded-2xl">
                  <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">No Third-Party Sales</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We will never sell your personal information to third parties. Your data belongs to you.
                  </p>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                <div id="introduction">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FileText className="text-primary" /> 1. Introduction
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>Welcome to Insight ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us.</p>
                    <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.</p>
                  </div>
                </div>

                <div id="data-collection">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Eye className="text-accent" /> 2. Information We Collect
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on our website, or otherwise contacting us.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Personal Data:</strong> Name, email address, and other contact information you provide.</li>
                      <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP addresses, browser types, and pages visited.</li>
                      <li><strong>Cookies:</strong> We use cookies to enhance your experience and remember your preferences.</li>
                    </ul>
                  </div>
                </div>

                <div id="how-we-use">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    3. How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                    <p>Specifically, we use the information we collect or receive:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To send you administrative information.</li>
                      <li>To fulfill and manage your requests.</li>
                      <li>To send you marketing and promotional communications (if opted in).</li>
                      <li>To protect our services and users.</li>
                      <li>To respond to legal requests and prevent harm.</li>
                    </ul>
                  </div>
                </div>

                <div id="your-rights">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    4. Your Privacy Rights
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>In some regions (like the European Economic Area), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
                    <p>If you are a resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.</p>
                  </div>
                </div>

                <div id="contact">
                  <div className="p-8 bg-surface-alt rounded-2xl border border-border mt-16">
                    <h3 className="text-2xl font-bold mb-4">Questions?</h3>
                    <p className="text-muted-foreground mb-6">If you have questions or comments about this policy, you may email us at privacy@insightblog.com or contact us via our contact page.</p>
                    <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
