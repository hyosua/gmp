"use client";

import type { CSSProperties, HTMLAttributes, ButtonHTMLAttributes } from "react";
import { C, forgeGrid, scanLines } from "@/lib/forge";

// ---------------------------------------------------------------------------
// Tag — étiquette monospace uppercase avec bordure subtile
// ---------------------------------------------------------------------------

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.65rem] tracking-[0.08em] text-muted border border-border px-2 py-[2px] uppercase">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// SectionLabel — label de section avec trait coloré
// ---------------------------------------------------------------------------

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-5 h-[2px] bg-primary" />
      <span className="font-mono text-[0.65rem] tracking-[0.25em] text-muted uppercase">
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
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "0.6rem",
        letterSpacing: "0.06em",
        color: color ?? "var(--c-muted)",
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
      className="bg-[var(--c-primary-15)] border border-[var(--c-primary-30)] flex items-center justify-center text-primary shrink-0"
      style={{ width: size, height: size }}
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
