import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { Scale, Users, ShieldCheck, ScaleIcon } from "lucide-react"

export default function TermsPage() {
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
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Acceptable Use</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We encourage respectful discussion and sharing of ideas. Harassment or abusive behavior will not be tolerated.
                  </p>
                </div>
                <div className="p-8 bg-surface border border-border rounded-2xl">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Intellectual Property</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All original content published on Insight is protected by copyright. Please respect our creators' work.
                  </p>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                <div id="agreement">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <ScaleIcon className="text-primary" /> 1. Agreement to Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>By accessing or using our website, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access or use the website.</p>
                    <p>Our website is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use our services without permission from a parent or legal guardian.</p>
                  </div>
                </div>

                <div id="property">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    2. Intellectual Property Rights
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>Unless otherwise indicated, the website and its original content, features, and functionality are owned by Insight and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                    <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Insight.</p>
                  </div>
                </div>

                <div id="conduct">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Users className="text-accent" /> 3. User Conduct
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>As a user of our website, you agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the website for any unlawful purpose.</li>
                      <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website.</li>
                      <li>Transmit any advertising or promotional material without our prior written consent.</li>
                      <li>Attempt to gain unauthorized access to any portion of the website.</li>
                      <li>Introduce any viruses or other malicious material to the website.</li>
                    </ul>
                  </div>
                </div>

                <div id="liability">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    4. Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>In no event shall Insight, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.</p>
                  </div>
                </div>

                <div id="governing-law">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    5. Governing Law
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>These terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                    <p>Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.</p>
                  </div>
                </div>

                <div id="contact" className="mt-20 border-t border-border pt-16">
                  <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                  <p className="text-muted-foreground text-lg mb-8">If you have any questions about these Terms, please contact us at terms@insightblog.com.</p>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      Contact Us
                    </a>
                    <a href="/privacy" className="inline-flex items-center justify-center px-8 py-4 bg-surface-alt text-foreground rounded-xl font-bold hover:bg-surface transition-all border border-border">
                      Read Privacy Policy
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
