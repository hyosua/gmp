import type { CSSProperties } from "react";

/* ─── Colour tokens — V2 Forge Outfit ───────────────────────── */

export const C = {
  bg:       "#f8fafc",
  bgDeep:   "#f1f5f9",
  bgCard:   "#ffffff",
  primary:  "#0d9488",
  secondary:"#171717",
  accent:   "#f59e0b",
  border:   "#e2e8f0",
  muted:    "#81adc8",
  mono:     "var(--font-geist-mono, monospace)",
};

/* ─── Forge grid texture ────────────────────────────────────── */

export const forgeGrid: CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(13,148,136,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13,148,136,0.07) 1px, transparent 1px),
    linear-gradient(rgba(13,148,136,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13,148,136,0.03) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/* ─── Scanlines overlay ─────────────────────────────────────── */

export const scanLines: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.006) 3px, rgba(0,0,0,0.006) 4px)",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1,
};
