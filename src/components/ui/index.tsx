"use client";

import { useRef, useState, useEffect } from "react";
import type {
  CSSProperties,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
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

export function MonoLabel({
  children,
  color,
  borderColor,
  style,
}: MonoLabelProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "0.6rem",
        letterSpacing: "0.06em",
        color: color ?? "var(--c-muted)",
        whiteSpace: "nowrap",
        ...(borderColor
          ? { border: `1px solid ${borderColor}`, padding: "2px 8px" }
          : {}),
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

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
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

export function ForgeCard({
  className,
  style,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const mono: CSSProperties = {
    fontFamily: "var(--font-geist-mono, monospace)",
    fontSize: "0.62rem",
    letterSpacing: "0.20em",
    color: "var(--c-primary)",
    opacity: 0.3,
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  return (
    <div
      className="relative"
      style={{ paddingTop: "1.5rem", paddingLeft: "1.5rem" }}
    >
      {/* Largeur — au-dessus de la carte, centrée */}
      <span
        className="pointer-events-none select-none absolute top-0 left-1/2"
        style={{ ...mono, transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        {dims.w || "—"}
      </span>

      {/* Hauteur — à gauche de la carte, verticale */}
      <span
        className="pointer-events-none select-none absolute top-1/2 left-0"
        style={{
          ...mono,
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
        }}
        aria-hidden="true"
      >
        {dims.h || "—"}
      </span>

      {/* ── La carte ── */}
      <div
        ref={cardRef}
        className={`forge-card relative${className ? ` ${className}` : ""}`}
        style={{ padding: "1.5rem", ...style }}
        {...props}
      >
        {/* Axes de symétrie — dash-dot (norme ISO) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        >
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="var(--c-primary)"
            strokeWidth="0.5"
            strokeDasharray="8 3 2 3"
          />
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="var(--c-primary)"
            strokeWidth="0.5"
            strokeDasharray="8 3 2 3"
          />
        </svg>

        {/* Marques de coin */}
        <span
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <span className="absolute top-[6px] left-[6px] block w-3 h-3 border-t border-l border-primary opacity-20" />
          <span className="absolute top-[6px] right-[6px] block w-3 h-3 border-t border-r border-primary opacity-20" />
          <span className="absolute bottom-[6px] left-[6px] block w-3 h-3 border-b border-l border-primary opacity-20" />
          <span className="absolute bottom-[6px] right-[6px] block w-3 h-3 border-b border-r border-primary opacity-20" />
        </span>

        {children}
      </div>
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
      <div className={`forge-container px-4 md:px-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
