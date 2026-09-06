import { ResponsiveStyles } from "@/schemas/page";
import React from "react";

export function parseStyles(styles: ResponsiveStyles, breakpoint: "desktop" | "tablet" | "mobile" = "desktop"): React.CSSProperties {
  // For now, simple fallback: merge mobile -> tablet -> desktop
  // In a real implementation, we might generate CSS media queries or use JS window matchMedia
  
  const base = styles?.mobile || {};
  const tablet = styles?.tablet || {};
  const desktop = styles?.desktop || {};

  // For server-side rendering, we usually return a compiled CSS string or 
  // rely on the browser to apply media queries. 
  // Returning inline styles for 'desktop' as default for this stub.
  return {
    ...base,
    ...tablet,
    ...desktop,
  } as React.CSSProperties;
}
