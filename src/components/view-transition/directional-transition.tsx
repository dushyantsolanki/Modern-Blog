"use client";

import * as React from "react";
import { ViewTransition } from "react";

/**
 * DirectionalTransition wrap segments (pages) to provide 
 * high-end horizontal slide animations based on the navigation direction.
 * 
 * Use with `addTransitionType('nav-forward' | 'nav-back')` inside `startTransition`.
 */
export function DirectionalTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
