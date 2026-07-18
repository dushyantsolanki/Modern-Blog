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
    utmSource: undefined as string | undefined,
    utmMedium: undefined as string | undefined,
    utmCampaign: undefined as string | undefined,
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
        completedRead = finalActiveTime >= Math.min(30, estimatedSeconds * 0.5);
      }

      const payload = {
        viewId: prevSession.viewId,
        visitorId: visitorIdRef.current,
        path: prevSession.path,
        postSlug: prevSession.postSlug || undefined,
        timeOnPage: Math.round(finalActiveTime),
        completedRead,
        utmSource: prevSession.utmSource,
        utmMedium: prevSession.utmMedium,
        utmCampaign: prevSession.utmCampaign,
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

    const utmSource = searchParams?.get("utm_source") || undefined;
    const utmMedium = searchParams?.get("utm_medium") || undefined;
    const utmCampaign = searchParams?.get("utm_campaign") || undefined;

    const newViewId = "view_" + generateId();
    sessionRef.current = {
      viewId: newViewId,
      path: fullPath,
      postSlug,
      activeTime: 0,
      lastActive: performance.now(),
      utmSource,
      utmMedium,
      utmCampaign,
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
        completedRead: false,
        utmSource,
        utmMedium,
        utmCampaign,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error("[Analytics] Initial pageview report failed", err));

  }, [pathname, searchParams]);

  // Track active time
  useEffect(() => {
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
          completedRead = sessionRef.current.activeTime >= Math.min(30, estimatedSeconds * 0.5);
        }

        const payload = {
          viewId: sessionRef.current.viewId,
          visitorId: visitorIdRef.current,
          path: sessionRef.current.path,
          postSlug: sessionRef.current.postSlug || undefined,
          timeOnPage: Math.round(sessionRef.current.activeTime),
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

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
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
        completedRead = finalActiveTime >= Math.min(30, estimatedSeconds * 0.5);
      }

      const payload = {
        viewId: session.viewId,
        visitorId: visitorIdRef.current,
        path: session.path,
        postSlug: session.postSlug || undefined,
        timeOnPage: Math.round(finalActiveTime),
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
