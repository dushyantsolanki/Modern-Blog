"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Check if they already subscribed in this browser session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const subscribed = localStorage.getItem("xenon_subscribed");
      if (subscribed) {
        setHasSubscribed(true);
      }
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "footer" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("Thank you for subscribing! Check your inbox for updates.");
      localStorage.setItem("xenon_subscribed", "true");
      setTimeout(() => {
        setHasSubscribed(true);
      }, 3000); // Collapse after 3 seconds showing success
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to subscribe. Please try again.");
    }
  };

  if (hasSubscribed) {
    return (
      <section id="newsletter" className="py-12 bg-surface border-y border-border text-center">
        <div className="container mx-auto px-6">
          <p className="text-sm text-muted-foreground">
            You're currently subscribed to our weekly newsletter. ✨
          </p>
        </div>
      </section>
    );
  }

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

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 p-2 bg-surface-alt rounded-2xl border border-border shadow-inner max-w-xl mx-auto relative"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="flex-1 px-6 py-4 bg-transparent outline-none text-lg disabled:opacity-60"
              aria-label="Email address"
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="relative overflow-hidden min-w-[120px] transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {status === "loading" ? (
                  <motion.span
                    key="loading"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing
                  </motion.span>
                ) : status === "success" ? (
                  <motion.span
                    key="success"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center justify-center text-emerald-300"
                  >
                    ✓ Subscribed
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                  >
                    Subscribe
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </form>

          {/* Feedback Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6"
              >
                <p
                  className={`text-sm font-semibold ${
                    status === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
            Join <span className="font-bold text-foreground">12,000+ readers</span>. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
