"use client";

import { C } from "@/lib/forge";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: C.mono,
        fontSize: "0.65rem",
        letterSpacing: "0.08em",
        color: C.muted,
        border: `1px solid ${C.border}`,
        padding: "2px 8px",
        textTransform: "uppercase" as const,
      }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ width: "20px", height: "2px", background: C.primary }} />
      <span
        style={{
          fontFamily: C.mono,
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: C.muted,
          textTransform: "uppercase" as const,
        }}
      >
        {children}
      </span>
    </div>
  );
}
