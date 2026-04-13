"use client";

import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        {/* Volumetric Spreading Light */}
        <div className="absolute flex items-center justify-center">
          {/* Intense Core Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.4, 0.3],
              scale: [0.5, 1.2, 1.1],
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-primary/20 blur-[40px] pointer-events-none"
          />

          {/* Large Spreading Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 0.1, 0.05],
              scale: [0.3, 2, 1.8],
            }}
            transition={{ duration: 3, ease: "circOut", delay: 0.2 }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-primary/10 blur-[80px] pointer-events-none"
          />

          {/* Rotating Conic Light Sweep */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.08, 0.04],
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 2 },
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            }}
            className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full bg-[conic-gradient(from_0deg,transparent_0%,hsl(var(--primary))_50%,transparent_100%)] blur-[100px] opacity-10"
          />
        </div>

        {/* Branding Text with Typewriter Effect */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.3,
              },
            },
          }}
          className="flex flex-col items-center z-10"
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
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    },
                  },
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
                    delay: 0.8,
                  },
                },
              }}
              className="text-primary ml-1"
            >
              .
            </motion.span>
          </h1>
        </motion.div>
      </div>

      {/* Background Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none"
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
