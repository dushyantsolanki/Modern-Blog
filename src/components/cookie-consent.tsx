"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const choice = localStorage.getItem("cookie_consent")
    if (!choice) {
      // Splash screen = 2000ms + exit animation ~800ms → wait 3200ms to appear after splash is gone
      const t = setTimeout(() => setVisible(true), 3200)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-6 right-6 z-[9999] w-[calc(100%-3rem)] max-w-sm"
        >
          <div className="relative bg-[#0f0f0f]/96 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-5 overflow-hidden">
            {/* Accent glow line at top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Close / dismiss button */}
            <button
              onClick={decline}
              className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3 items-start pr-5">
              {/* Cookie icon */}
              <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Cookie className="w-4.5 h-4.5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[#F8FAFC] font-semibold text-sm mb-1">We use cookies 🍪</p>
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  We use cookies to improve your experience and analyse traffic. By clicking{" "}
                  <strong className="text-white/80">OK</strong>, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 text-primary/80 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={accept}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all active:scale-95 shadow-lg shadow-primary/20"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    OK, Accept
                  </button>
                  <button
                    onClick={decline}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white text-xs font-semibold rounded-lg border border-white/10 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
