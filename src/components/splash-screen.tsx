"use client";

import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden">
      
      {/* Dynamic Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.2, 0.08], scale: [0.7, 1.2, 1] }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: [0, 0.15, 0], rotate: 30, scale: 1.1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute w-[150vw] h-[10vh] bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-[60px] transform-gpu"
        />
      </div>

      {/* Main Logo Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >
        <div className="overflow-hidden pb-4 md:pb-6 px-4">
          <motion.h1 
            variants={{
              hidden: { opacity: 0, filter: "blur(12px)", scale: 0.98 },
              visible: { 
                opacity: 1, 
                filter: "blur(0px)",
                scale: 1,
                transition: { 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.07,
                  delayChildren: 0.15
                }
              }
            }}
            className="text-6xl md:text-8xl lg:text-[10rem] leading-none font-black italic tracking-[-0.05em] bg-gradient-to-r from-[#FF671F] via-[#FFFFFF] to-[#046A38] text-transparent bg-clip-text selection:bg-transparent flex items-baseline drop-shadow-xl dark:drop-shadow-none"
          >
            {"INFIXE".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: "100%", 
                    rotateX: -40,
                    filter: "blur(8px)"
                  },
                  visible: {
                    opacity: 1,
                    y: "0%",
                    rotateX: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="inline-block transform-gpu"
              >
                {char}
              </motion.span>
            ))}
            
            {/* The Dot */}
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0, y: 20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                    mass: 0.8,
                    delay: 0.8,
                  },
                },
              }}
              className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-[#06038D] ml-2 md:ml-3 mt-auto mb-3 md:mb-5 lg:mb-7 shadow-[0_0_20px_rgba(6,3,141,0.6)]"
            />
          </motion.h1>
        </div>
        
        {/* Sleek Line Sweep underneath */}
        <motion.div
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { 
              scaleX: 1, 
              opacity: 1,
              transition: { 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.7 
              } 
            }
          }}
          className="h-[1px] md:h-[2px] w-4/5 max-w-sm mt-4 bg-gradient-to-r from-transparent via-foreground/30 dark:via-foreground/50 to-transparent origin-center"
        />

        {/* Cinematic Subtitle */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
            visible: { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              transition: { 
                duration: 0.9, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.9 
              } 
            }
          }}
          className="mt-6 md:mt-8 text-xs md:text-sm font-semibold tracking-[0.3em] text-foreground/60 uppercase"
        >
          Curious Minds
        </motion.p>
      </motion.div>

      {/* Subtle Film Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
