"use client";

import type { CSSProperties, HTMLAttributes, ButtonHTMLAttributes } from "react";
import { C, forgeGrid, scanLines } from "@/lib/forge";

// ---------------------------------------------------------------------------
// Tag — étiquette monospace uppercase avec bordure subtile
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// SectionLabel — label de section avec trait coloré
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// MonoLabel — texte monospace petit, optionnellement avec bordure colorée
// ---------------------------------------------------------------------------

interface MonoLabelProps {
  children: React.ReactNode;
  color?: string;
  borderColor?: string;
  style?: CSSProperties;
}

export function MonoLabel({ children, color, borderColor, style }: MonoLabelProps) {
  return (
    <span
      style={{
        fontFamily: C.mono,
        fontSize: "0.6rem",
        letterSpacing: "0.06em",
        color: color ?? C.muted,
        whiteSpace: "nowrap",
        ...(borderColor ? { border: `1px solid ${borderColor}`, padding: "2px 8px" } : {}),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// IconBox — carré d'icône avec fond et bordure primary
// ---------------------------------------------------------------------------

interface IconBoxProps {
  children: React.ReactNode;
  size?: number;
}

export function IconBox({ children, size = 28 }: IconBoxProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "var(--c-primary-15)",
        border: "1px solid var(--c-primary-30)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.primary,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Button — bouton utilisant les classes CSS du design system (globals.css)
// ---------------------------------------------------------------------------

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={`forge-btn forge-btn-${variant}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// ForgeCard — carte interactive, hover géré par la classe CSS `forge-card`
//
// NOTE: pour que le titre change de couleur au hover, poser `data-card-title`
// sur l'élément titre et ne PAS lui mettre de `color` inline (le CSS gère ça).
// ---------------------------------------------------------------------------

export function ForgeCard({ className, style, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`forge-card${className ? ` ${className}` : ""}`}
      style={{ padding: "1.5rem", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ForgeSection — section avec grille blueprint + container centré
// ---------------------------------------------------------------------------

interface ForgeSectionProps {
  children: React.ReactNode;
  bg?: string;
  className?: string;
  innerClassName?: string;
  withScanLines?: boolean;
}

export function ForgeSection({
  children,
  bg,
  className,
  innerClassName = "",
  withScanLines = false,
}: ForgeSectionProps) {
  return (
    <section
      className={`forge-section${className ? ` ${className}` : ""}`}
      style={{ background: bg ?? C.bg }}
    >
      <div style={forgeGrid} />
      {withScanLines && <div style={scanLines} />}
      <div className={`forge-container px-4 md:px-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
