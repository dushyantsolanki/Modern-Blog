"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/splash-screen";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function SplashController({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only for homepage
    if (pathname !== "/") return;

    const hasSeen = sessionStorage.getItem("seenSplash");

    if (!hasSeen) {
      setShowSplash(true);
      sessionStorage.setItem("seenSplash", "true");

      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000); // 2 seconds for a better premium reveal

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {!showSplash && children}

      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
            }}
            className="fixed inset-0 z-[9999]"
          >
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
