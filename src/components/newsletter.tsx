import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  return (
    <section id="newsletter" className="py-24 bg-surface border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Stay in the loop.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Get our best articles delivered to your inbox every week. No spam, unsubscribe anytime.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 p-2 bg-surface-alt rounded-2xl border border-border shadow-inner max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 bg-transparent outline-none text-lg"
              aria-label="Email address"
            />
            <Button
              type="submit"
              size="lg"
            >
              Subscribe
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
            Join <span className="font-bold text-foreground">12,000+ readers</span>. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}
