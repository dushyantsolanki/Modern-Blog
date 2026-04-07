"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export function PwaSplash({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              {/* Volumetric Spreading Light (Centered behind Insight) */}
              <div className="absolute flex items-center justify-center">
                {/* Intense Core Glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.4, 0.3],
                    scale: [0.5, 1.2, 1.1]
                  }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-primary/20 blur-[40px] pointer-events-none"
                />

                {/* Large Spreading Aura */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: [0, 0.1, 0.05],
                    scale: [0.3, 2, 1.8]
                  }}
                  transition={{ duration: 4, ease: "circOut", delay: 0.5 }}
                  className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-primary/10 blur-[80px] pointer-events-none"
                />

                {/* Rotating Conic Light Sweep */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.08, 0.04],
                    rotate: 360
                  }}
                  transition={{
                    opacity: { duration: 2.5 },
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" }
                  }}
                  className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full bg-[conic-gradient(from_0deg,transparent_0%,var(--color-primary)_50%,transparent_100%)] blur-[100px] opacity-10"
                />
              </div>

              {/* Branding Text with Typewriter Effect */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.5
                    }
                  }
                }}
                className="flex flex-col items-center"
              >
                <h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] text-foreground selection:bg-transparent flex items-baseline">
                  {"Insight".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 15, filter: "blur(8px)", scale: 0.9 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          scale: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.32, 0.72, 0, 1]
                          }
                        }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                          delay: 1.2
                        }
                      }
                    }}
                    className="text-primary ml-1"
                  >
                    .
                  </motion.span>
                </h1>

              </motion.div>
            </div>

            {/* Background Ambient Glow (Refined Apple Style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.07, scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_65%)] pointer-events-none"
            />

            {/* Subtle noise texture for "physical" screen depth */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
      >
        {children}
      </div>
    </>
  )
}

