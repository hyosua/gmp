import type { CSSProperties } from "react";

export const C = {
  bg:       "var(--c-bg)",
  bgDeep:   "var(--c-bg-deep)",
  bgCard:   "var(--c-bg-card)",
  bgBright: "var(--c-bg-bright)",
  primary:  "var(--c-primary)",
  secondary:"var(--c-secondary)",
  accent:   "var(--c-accent)",
  border:   "var(--c-border)",
  muted:    "var(--c-muted)",
  sans:     "var(--font-outfit, sans-serif)",
  mono:     "var(--font-geist-mono, monospace)",
};

export const forgeGrid: CSSProperties = {
  backgroundImage: `
    linear-gradient(var(--c-grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--c-grid-color) 1px, transparent 1px),
    linear-gradient(var(--c-grid-color-sm) 1px, transparent 1px),
    linear-gradient(90deg, var(--c-grid-color-sm) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

export const scanLines: CSSProperties = {
  backgroundImage: "var(--c-scanlines)",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1,
};
