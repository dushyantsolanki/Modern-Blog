"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Generate a simple unique ID client-side
function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sessionRef = useRef({
    viewId: "",
    path: "",
    postSlug: "",
    activeTime: 0,
    lastActive: 0,
    maxScroll: 0,
  });

  const visitorIdRef = useRef<string>("");

  // Initialize visitor ID once
  useEffect(() => {
    if (typeof window !== "undefined") {
      let vId = localStorage.getItem("blog_visitor_id");
      if (!vId) {
        vId = "vis_" + generateId();
        localStorage.setItem("blog_visitor_id", vId);
      }
      visitorIdRef.current = vId;
    }
  }, []);

  // Track page navigation changes
  useEffect(() => {
    if (!visitorIdRef.current) return;

    // 1. Flush any active previous page view session
    const prevSession = sessionRef.current;
    if (prevSession.viewId) {
      let finalActiveTime = prevSession.activeTime;
      if (document.visibilityState === "visible") {
        finalActiveTime += (performance.now() - prevSession.lastActive) / 1000;
      }

      // Check if read completed
      let completedRead = false;
      const articleEl = document.querySelector("article");
      if (prevSession.postSlug && articleEl) {
        const text = articleEl.innerText || articleEl.textContent || "";
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const estimatedSeconds = Math.max(30, Math.round((wordCount / 200) * 60));
        completedRead = prevSession.maxScroll >= 80 && finalActiveTime >= Math.min(30, estimatedSeconds * 0.5);
      }

      const payload = {
        viewId: prevSession.viewId,
        visitorId: visitorIdRef.current,
        path: prevSession.path,
        postSlug: prevSession.postSlug || undefined,
        timeOnPage: Math.round(finalActiveTime),
        scrollDepth: prevSession.maxScroll,
        completedRead,
      };

      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon("/api/analytics", blob);
      } else {
        fetch("/api/analytics", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        });
      }
    }

    // 2. Start a new session
    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    // Detect post slug from path like /blog/slug-name
    let postSlug = "";
    const postMatch = pathname.match(/^\/blog\/([^/]+)/);
    if (postMatch && postMatch[1] && pathname !== "/blog") {
      postSlug = postMatch[1];
    }

    const newViewId = "view_" + generateId();
    sessionRef.current = {
      viewId: newViewId,
      path: fullPath,
      postSlug,
      activeTime: 0,
      lastActive: performance.now(),
      maxScroll: 0,
    };

    // Send initial pageview event
    fetch("/api/analytics", {
      method: "POST",
      body: JSON.stringify({
        viewId: newViewId,
        visitorId: visitorIdRef.current,
        path: fullPath,
        postSlug: postSlug || undefined,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        language: typeof navigator !== "undefined" ? navigator.language : "en",
        timeOnPage: 0,
        scrollDepth: 0,
        completedRead: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error("[Analytics] Initial pageview report failed", err));

  }, [pathname, searchParams]);

  // Track active time and scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportBottom = scrolled + window.innerHeight;
      const articleEl = document.querySelector("article");
      
      let pct = 0;
      if (articleEl) {
        const rect = articleEl.getBoundingClientRect();
        const articleTop = rect.top + scrolled;
        const articleHeight = rect.height;
        
        if (articleHeight > 0 && viewportBottom >= articleTop) {
          const scrolledPixels = viewportBottom - articleTop;
          pct = Math.round((scrolledPixels / articleHeight) * 100);
        }
      } else {
        const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
        pct = maxScrollable > 0 ? Math.round((scrolled / maxScrollable) * 100) : 0;
      }
      
      const clampedPct = Math.min(100, Math.max(0, pct));
      if (clampedPct > sessionRef.current.maxScroll) {
        sessionRef.current.maxScroll = clampedPct;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Paused: Add elapsed time to accumulator
        sessionRef.current.activeTime += (performance.now() - sessionRef.current.lastActive) / 1000;

        // Flush intermediate analytics using Beacon to persist progress
        let completedRead = false;
        const articleEl = document.querySelector("article");
        if (sessionRef.current.postSlug && articleEl) {
          const text = articleEl.innerText || articleEl.textContent || "";
          const wordCount = text.split(/\s+/).filter(Boolean).length;
          const estimatedSeconds = Math.max(30, Math.round((wordCount / 200) * 60));
          completedRead = sessionRef.current.maxScroll >= 80 && sessionRef.current.activeTime >= Math.min(30, estimatedSeconds * 0.5);
        }

        const payload = {
          viewId: sessionRef.current.viewId,
          visitorId: visitorIdRef.current,
          path: sessionRef.current.path,
          postSlug: sessionRef.current.postSlug || undefined,
          timeOnPage: Math.round(sessionRef.current.activeTime),
          scrollDepth: sessionRef.current.maxScroll,
          completedRead,
        };

        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
          navigator.sendBeacon("/api/analytics", blob);
        }
      } else {
        // Resumed: reset last active time anchor
        sessionRef.current.lastActive = performance.now();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial check (useful for short articles or if page loaded pre-scrolled)
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Flush final metrics on unmount or tab close
  useEffect(() => {
    const handleUnload = () => {
      const session = sessionRef.current;
      if (!session.viewId || !visitorIdRef.current) return;

      let finalActiveTime = session.activeTime;
      if (document.visibilityState === "visible") {
        finalActiveTime += (performance.now() - session.lastActive) / 1000;
      }

      let completedRead = false;
      const articleEl = document.querySelector("article");
      if (session.postSlug && articleEl) {
        const text = articleEl.innerText || articleEl.textContent || "";
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const estimatedSeconds = Math.max(30, Math.round((wordCount / 200) * 60));
        completedRead = session.maxScroll >= 80 && finalActiveTime >= Math.min(30, estimatedSeconds * 0.5);
      }

      const payload = {
        viewId: session.viewId,
        visitorId: visitorIdRef.current,
        path: session.path,
        postSlug: session.postSlug || undefined,
        timeOnPage: Math.round(finalActiveTime),
        scrollDepth: session.maxScroll,
        completedRead,
      };

      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon("/api/analytics", blob);
      } else {
        // Fallback for browsers that don't support sendBeacon or block it
        fetch("/api/analytics", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        });
      }
    };

    window.addEventListener("pagehide", handleUnload);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("pagehide", handleUnload);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
}
