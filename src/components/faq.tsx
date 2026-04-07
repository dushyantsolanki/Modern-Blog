"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What topics do you cover?",
    answer: "We focus on the intersection of design, technology, and productivity, exploring how modern tools like AI are reshaping the creative landscape through in-depth analysis and practical guides."
  },
  {
    question: "How often is new content published?",
    answer: "We release in-depth articles every Tuesday and Friday, with occasional special features, industry interviews, and deep-dive case studies."
  },
  {
    question: "Is there a newsletter?",
    answer: "Yes! Our weekly digest, 'Insight Weekly,' summarizes the top stories and includes exclusive resources, curated links, and early access to our 12,000+ subscribers."
  },
  {
    question: "Can I contribute an article?",
    answer: "We're always looking for fresh perspectives from designers and engineers. Visit our 'Contact' page to see our submission guidelines and editorial calendar."
  },
  {
    question: "Is the content free to read?",
    answer: "Our core library of articles is completely free. We also offer a 'Premium' tier for exclusive deep-dive reports, downloadable templates, and access to our community Slack."
  }
]

function FAQItem({ question, answer, isOpen, onClick, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <div

      className="border-b border-border last:border-0"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-lg font-semibold transition-colors duration-300",
          isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "p-2 rounded-full transition-colors duration-300",
            isOpen ? "bg-primary/10 text-primary" : "bg-surface-alt text-muted-foreground group-hover:bg-primary/5"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Header Section */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Frequently Asked <br />
                <span className="text-primary italic">Questions.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Everything you need to know about Insight. If you can't find the answer you're looking for, feel free to reach out.
              </p>
              <Button
                variant="outline"
                className="px-6 py-3 font-bold text-sm shadow-sm hover:shadow-md h-auto"
              >
                Get in touch
              </Button>
            </motion.div>
          </div>

          {/* Accordion List */}
          <div className="lg:w-2/3">
            <div className="bg-surface border border-border/50 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-black/5 dark:shadow-white/5 relative bg-white/5 backdrop-blur-sm">
              <div className="flex flex-col">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
