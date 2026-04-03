"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GoogleAdProps {
  slotId?: string
  clientId?: string
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  responsive?: "true" | "false"
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function GoogleAd({
  slotId = "0000000000",
  clientId = "ca-pub-0000000000000000",
  format = "auto",
  responsive = "true",
  className,
  style,
}: GoogleAdProps) {
  const isDev = process.env.NODE_ENV === "development"

  React.useEffect(() => {
    if (!isDev) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [isDev])

  if (isDev) {
    return (
      <div 
        className={cn(
          "w-full bg-surface-alt border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 min-h-[100px]",
          className
        )}
        style={style}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2">Google Ad Placement</span>
        <div className="text-xs text-muted-foreground font-medium">Slot: {slotId}</div>
        <div className="text-[10px] text-muted-foreground/40 mt-1">Format: {format}</div>
      </div>
    )
  }

  return (
    <div className={cn("w-full overflow-hidden my-8", className)} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
