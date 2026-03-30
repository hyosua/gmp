"use client";

import { forwardRef } from "react";
import Image from "next/image";

// Canvas SVG — la photo occupe la région IMG, entourée d'espace technique
const VB  = { w: 460, h: 390 };
const IMG = { x: 0, y: 40, w: 400, h: 300 };
const CY  = IMG.y + IMG.h / 2;

/**
 * PhotoBlueprint — exposé via forwardRef.
 * Le ref pointe sur le div conteneur racine.
 * La Hero timeline peut donc sélectionner :
 *   ref.current.querySelector('.bp-photo')
 *   ref.current.querySelector('svg')
 *   ref.current.querySelectorAll('.bp-border')  etc.
 */
export const PhotoBlueprint = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="relative" style={{ aspectRatio: `${VB.w}/${VB.h}` }}>

    {/* Photo */}
    <div
      className="bp-photo absolute overflow-hidden"
      style={{
        left:   `${(IMG.x / VB.w) * 100}%`,
        top:    `${(IMG.y / VB.h) * 100}%`,
        width:  `${(IMG.w / VB.w) * 100}%`,
        height: `${(IMG.h / VB.h) * 100}%`,
      }}
    >
      <Image
        src="/gmp-stud.png"
        alt="Étudiants en atelier GMP"
        fill
        priority
        style={{ objectFit: "cover", filter: "grayscale(100%)" }}
      />
      <div className="absolute inset-0" style={{ background: "var(--c-photo-overlay)", mixBlendMode: "multiply" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[80px]" style={{ background: "linear-gradient(to top, var(--c-bg), transparent)" }} />
    </div>

    {/* SVG blueprint */}
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-[5]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── En-tête ─────────────────────────────────────────────── */}
      <text className="bp-header" x="0" y="14" fontSize="7" fill="var(--c-primary)" fontFamily="monospace" letterSpacing="2.5">
        VUE · ATELIER GMP
      </text>
      <text className="bp-header" x="0" y="26" fontSize="5.5" fill="var(--c-muted)" fontFamily="monospace" letterSpacing="1">
        REF. GMP-STU-001 · DEPT. GÉNIE MÉCANIQUE ET PRODUCTIQUE
      </text>
      <line className="bp-header" x1="0" y1="34" x2={IMG.w} y2="34" stroke="var(--c-primary-20)" strokeWidth="0.5" />

      {/* ── Cadre photo ─────────────────────────────────────────── */}
      <rect className="bp-border" x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} stroke="var(--c-primary)" strokeWidth="0.7" />

      {/* ── Coins haut ──────────────────────────────────────────── */}
      <g className="bp-corner-top">
        <line x1="-12" y1={IMG.y} x2="-3" y2={IMG.y} stroke="var(--c-primary)" strokeWidth="0.9" />
        <line x1={IMG.x} y1="27" x2={IMG.x} y2="36" stroke="var(--c-primary)" strokeWidth="0.9" />
      </g>
      <g className="bp-corner-top">
        <line x1={IMG.x + IMG.w + 3} y1={IMG.y} x2={IMG.x + IMG.w + 12} y2={IMG.y} stroke="var(--c-primary)" strokeWidth="0.9" />
        <line x1={IMG.x + IMG.w} y1="27" x2={IMG.x + IMG.w} y2="36" stroke="var(--c-primary)" strokeWidth="0.9" />
      </g>

      {/* ── Coins bas ───────────────────────────────────────────── */}
      <g className="bp-corner-bottom">
        <line x1="-12" y1={IMG.y + IMG.h} x2="-3" y2={IMG.y + IMG.h} stroke="var(--c-muted)" strokeWidth="0.8" />
        <line x1={IMG.x} y1={IMG.y + IMG.h + 3} x2={IMG.x} y2={IMG.y + IMG.h + 12} stroke="var(--c-muted)" strokeWidth="0.8" />
      </g>
      <g className="bp-corner-bottom">
        <line x1={IMG.x + IMG.w + 3} y1={IMG.y + IMG.h} x2={IMG.x + IMG.w + 12} y2={IMG.y + IMG.h} stroke="var(--c-muted)" strokeWidth="0.8" />
        <line x1={IMG.x + IMG.w} y1={IMG.y + IMG.h + 3} x2={IMG.x + IMG.w} y2={IMG.y + IMG.h + 12} stroke="var(--c-muted)" strokeWidth="0.8" />
      </g>

      {/* ── Graduations horizontales ────────────────────────────── */}
      {[50, 100, 150, 200, 250, 300, 350].map((x) => (
        <g key={x} className="bp-grad-x">
          <line x1={IMG.x + x} y1={IMG.y + IMG.h} x2={IMG.x + x} y2={IMG.y + IMG.h + 5} stroke="var(--c-primary-30)" strokeWidth="0.5" />
          <text x={IMG.x + x} y={IMG.y + IMG.h + 11} textAnchor="middle" fontSize="4.5" fill="var(--c-primary-30)" fontFamily="monospace">
            {x / 4}
          </text>
        </g>
      ))}

      {/* ── Graduations verticales ──────────────────────────────── */}
      {[50, 100, 150, 200, 250].map((y) => (
        <line key={y} className="bp-grad-y" x1={IMG.x + IMG.w} y1={IMG.y + y} x2={IMG.x + IMG.w + 5} y2={IMG.y + y} stroke="var(--c-primary-30)" strokeWidth="0.5" />
      ))}

      {/* ── Cote horizontale ────────────────────────────────────── */}
      <g className="bp-dim-h">
        <line x1={IMG.x} y1="358" x2={IMG.x + IMG.w} y2="358" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <polyline points={`${IMG.x},358 ${IMG.x + 7},355 ${IMG.x + 7},361`} fill="var(--c-primary-30)" stroke="none" />
        <polyline points={`${IMG.x + IMG.w},358 ${IMG.x + IMG.w - 7},355 ${IMG.x + IMG.w - 7},361`} fill="var(--c-primary-30)" stroke="none" />
        <line x1={IMG.x} y1="344" x2={IMG.x} y2="361" stroke="var(--c-primary-30)" strokeWidth="0.4" />
        <line x1={IMG.x + IMG.w} y1="344" x2={IMG.x + IMG.w} y2="361" stroke="var(--c-primary-30)" strokeWidth="0.4" />
        <rect x="152" y="352" width="96" height="12" fill="var(--c-bg)" />
        <text x="200" y="362" textAnchor="middle" fontSize="6.5" fill="var(--c-primary)" fontFamily="monospace">L = 720 mm</text>
      </g>

      {/* ── Cote verticale ──────────────────────────────────────── */}
      <g className="bp-dim-v">
        <line x1="420" y1={IMG.y} x2="420" y2={IMG.y + IMG.h} stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <polyline points={`420,${IMG.y} 417,${IMG.y + 7} 423,${IMG.y + 7}`} fill="var(--c-primary-30)" stroke="none" />
        <polyline points={`420,${IMG.y + IMG.h} 417,${IMG.y + IMG.h - 7} 423,${IMG.y + IMG.h - 7}`} fill="var(--c-primary-30)" stroke="none" />
        <line x1="406" y1={IMG.y} x2="424" y2={IMG.y} stroke="var(--c-primary-30)" strokeWidth="0.4" />
        <line x1="406" y1={IMG.y + IMG.h} x2="424" y2={IMG.y + IMG.h} stroke="var(--c-primary-30)" strokeWidth="0.4" />
        <rect x="410" y={CY - 12} width="22" height="24" fill="var(--c-bg)" />
        <text x="421" y={CY} textAnchor="middle" fontSize="6.5" fill="var(--c-primary)" fontFamily="monospace" transform={`rotate(90 421 ${CY})`}>H = 480 mm</text>
      </g>

      {/* ── Annotations ─────────────────────────────────────────── */}
      <g className="bp-annot">
        <line x1="310" y1="95" x2="432" y2="58" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <circle cx="310" cy="95" r="2" fill="var(--c-primary-30)" />
        <text x="434" y="62" fontSize="6" fill="var(--c-primary)" fontFamily="monospace">USINAGE CNC</text>
      </g>
      <g className="bp-annot">
        <line x1="90" y1="210" x2="55" y2="30" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <circle cx="90" cy="210" r="2" fill="var(--c-primary-30)" />
        <text x="57" y="26" fontSize="6" fill="var(--c-primary)" fontFamily="monospace">ATELIER · B</text>
      </g>

      {/* ── Cartouche ───────────────────────────────────────────── */}
      <g className="bp-cartouche">
        <rect x={IMG.x + IMG.w} y={IMG.y + IMG.h} width="60" height="50" fill="var(--c-bg)" fillOpacity="0.92" stroke="var(--c-primary)" strokeWidth="0.7" />
        <line x1={IMG.x + IMG.w} y1={IMG.y + IMG.h + 17} x2={IMG.x + IMG.w + 60} y2={IMG.y + IMG.h + 17} stroke="var(--c-primary)" strokeWidth="0.5" />
        <text x={IMG.x + IMG.w + 30} y={IMG.y + IMG.h + 13} textAnchor="middle" fontSize="5.5" fill="var(--c-primary)" fontFamily="monospace" letterSpacing="0.5">GMP · IUT ÉVRY</text>
        <text x={IMG.x + IMG.w + 30} y={IMG.y + IMG.h + 28} textAnchor="middle" fontSize="5" fill="var(--c-muted)" fontFamily="monospace">PARIS-SACLAY · 2026</text>
        <text x={IMG.x + IMG.w + 30} y={IMG.y + IMG.h + 39} textAnchor="middle" fontSize="5" fill="var(--c-muted)" fontFamily="monospace">REV. A · CONFIDENTIEL</text>
      </g>
    </svg>
  </div>
));

PhotoBlueprint.displayName = "PhotoBlueprint";
