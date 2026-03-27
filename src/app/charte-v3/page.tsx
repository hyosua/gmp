"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronRight,
  GraduationCap,
  LogIn,
  Mail,
  MapPin,
  Repeat2,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/* ─── Fonts ─────────────────────────────────────────────────── */

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

/* ─── Tokens ─────────────────────────────────────────────────── */

const C = {
  bg: "#fafaf9",
  primary: "#1e3a5f",
  secondary: "#c2410c",
  accent: "#0ea5e9",
  neutral: "#78716c",
  border: "#e7e5e4",
  stone50: "#fafaf9",
  stone100: "#f5f5f4",
  stone200: "#e7e5e4",
  stone700: "#44403c",
  white: "#ffffff",
  primaryAlpha8: "rgba(30,58,95,0.08)",
  primaryAlpha15: "rgba(30,58,95,0.15)",
  shadow: "0 1px 3px rgba(30,58,95,0.08)",
};

const mono = "var(--font-geist-mono)";
const serif = "var(--font-playfair)";
const sans = "var(--font-dm-sans)";

/* ─── Helpers ───────────────────────────────────────────────── */

function ArrowL({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x + 6},${y - 3} ${x + 6},${y + 3}`} fill={c} />;
}
function ArrowR({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 6},${y - 3} ${x - 6},${y + 3}`} fill={c} />;
}
function ArrowU({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 3},${y + 6} ${x + 3},${y + 6}`} fill={c} />;
}
function ArrowD({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 3},${y - 6} ${x + 3},${y - 6}`} fill={c} />;
}

/* ─── Illustration 1 : Plan de coupe d'une pièce usinée ─────── */
/* Style normes ISO, vue en coupe complexe, cotations DM Sans    */

export function IllustrationPlanTechnique({ className = "" }: { className?: string }) {
  const s  = "#1e3a5f";          // main stroke
  const sd = "rgba(30,58,95,0.35)"; // dim / secondary
  const sc = "rgba(30,58,95,0.20)"; // centerlines
  const sf = "rgba(30,58,95,0.04)"; // face fill
  const sh = "rgba(30,58,95,0.09)"; // hatch
  const tx = "rgba(30,58,95,0.55)"; // annotation text

  // Piece: stepped housing (bride de palier), coupe en demi-vue
  // Left side = coupe, right side = vue extérieure
  const cy = 150; // centerline Y

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="v3hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={sd} strokeWidth="0.8" />
        </pattern>
        <pattern id="v3hatch2" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={sd} strokeWidth="0.6" />
        </pattern>
        <clipPath id="v3leftHalf">
          <rect x="0" y="0" width="200" height="300" />
        </clipPath>
        <clipPath id="v3rightHalf">
          <rect x="200" y="0" width="200" height="300" />
        </clipPath>
      </defs>

      {/* ── Cadre ─────────────────────────────────────────── */}
      <rect x="4" y="4" width="392" height="292" stroke={sc} strokeWidth="0.5" />
      {/* Ligne de coupe verticale */}
      <line x1="200" y1="20" x2="200" y2="280" stroke={sc} strokeWidth="0.5" strokeDasharray="8,3,2,3" />

      {/* ══════════════════════════════════════════════════════
          COUPE GAUCHE — vue en coupe (hachures ISO)
          ══════════════════════════════════════════════════════ */}

      {/* Bride extérieure — corps principal hatché */}
      {/* Bride top half */}
      <rect x="40" y={cy - 60} width="160" height="12" fill="url(#v3hatch)" stroke={s} strokeWidth="0.9" />
      {/* Bride bottom half */}
      <rect x="40" y={cy + 48} width="160" height="12" fill="url(#v3hatch)" stroke={s} strokeWidth="0.9" />
      {/* Flasque gauche */}
      <rect x="40" y={cy - 60} width="16" height="120" fill="url(#v3hatch)" stroke={s} strokeWidth="0.9" />
      {/* Flasque droit */}
      <rect x="184" y={cy - 60} width="16" height="120" fill="url(#v3hatch)" stroke={s} strokeWidth="0.9" />

      {/* Corps creux interne */}
      <rect x="56" y={cy - 48} width="128" height="96" fill={sf} stroke={sc} strokeWidth="0.4" />

      {/* Alésage central — section d'arbre */}
      <rect x="76" y={cy - 22} width="88" height="44" fill="url(#v3hatch2)" stroke={s} strokeWidth="0.9" />
      {/* Arrière de l'alésage */}
      <rect x="82" y={cy - 18} width="76" height="36" fill={sf} stroke={sc} strokeWidth="0.35" />

      {/* Joint annulaire (O-ring) */}
      <rect x="70" y={cy - 8} width="6" height="16" rx="1" fill={sh} stroke={s} strokeWidth="0.7" />
      <rect x="164" y={cy - 8} width="6" height="16" rx="1" fill={sh} stroke={s} strokeWidth="0.7" />

      {/* Vis de bride gauche (représentation en coupe) */}
      <rect x="48" y={cy - 56} width="8" height="14" fill={sh} stroke={s} strokeWidth="0.7" />
      <rect x="50" y={cy - 60} width="4" height="6" fill={sh} stroke={s} strokeWidth="0.6" />
      {/* Filetage stylisé */}
      {[0, 2, 4, 6, 8, 10].map((dy) => (
        <line key={dy} x1="48" y1={cy - 56 + dy + 1} x2="56" y2={cy - 56 + dy + 1}
              stroke={sc} strokeWidth="0.4" />
      ))}
      {/* Vis bas gauche */}
      <rect x="48" y={cy + 42} width="8" height="14" fill={sh} stroke={s} strokeWidth="0.7" />
      <rect x="50" y={cy + 54} width="4" height="6" fill={sh} stroke={s} strokeWidth="0.6" />
      {[0, 2, 4, 6, 8, 10].map((dy) => (
        <line key={dy} x1="48" y1={cy + 42 + dy + 1} x2="56" y2={cy + 42 + dy + 1}
              stroke={sc} strokeWidth="0.4" />
      ))}

      {/* Rainure de clavette */}
      <rect x="108" y={cy - 22} width="24" height="8" fill={sf} stroke={s} strokeWidth="0.7" />
      <rect x="113" y={cy - 22} width="14" height="5" fill={sh} stroke={s} strokeWidth="0.5" />

      {/* ── Ligne d'axe ────────────────────────────────────── */}
      <line x1="16" y1={cy} x2="198" y2={cy}
            stroke={sc} strokeWidth="0.7" strokeDasharray="10,3,2,3" />
      <line x1="16" y1={cy} x2="18" y2={cy} stroke={sc} strokeWidth="1" />

      {/* ══════════════════════════════════════════════════════
          VUE EXTÉRIEURE DROITE — projection ortho
          ══════════════════════════════════════════════════════ */}

      {/* Bride rectangulaire vue de face */}
      <rect x="216" y={cy - 60} width="152" height="120" fill={sf} stroke={s} strokeWidth="0.9" />
      {/* Épaisseur des flasques en vue extérieure */}
      <rect x="216" y={cy - 60} width="16" height="120" fill={sh} stroke={s} strokeWidth="0.7" />
      <rect x="352" y={cy - 60} width="16" height="120" fill={sh} stroke={s} strokeWidth="0.7" />

      {/* Cercle d'alésage en vue de face */}
      <circle cx="292" cy={cy} r="22" fill="rgba(30,58,95,0.03)" stroke={s} strokeWidth="0.9" />
      {/* Ligne de centre en vue droite */}
      <line x1="268" y1={cy} x2="316" y2={cy} stroke={sc} strokeWidth="0.5" strokeDasharray="6,2,2,2" />
      <line x1="292" y1={cy - 26} x2="292" y2={cy + 26} stroke={sc} strokeWidth="0.5" strokeDasharray="6,2,2,2" />

      {/* Cercle de perçage vis */}
      <circle cx="292" cy={cy} r="50" fill="none" stroke={sc} strokeWidth="0.5" strokeDasharray="4,2" />
      {/* Trous de vis sur cercle perçage — 4 × M8 */}
      {[45, 135, 225, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle key={deg}
            cx={292 + 50 * Math.cos(rad)}
            cy={cy + 50 * Math.sin(rad)}
            r="5" fill={sf} stroke={s} strokeWidth="0.7"
          />
        );
      })}

      {/* ══════════════════════════════════════════════════════
          COTATIONS
          ══════════════════════════════════════════════════════ */}

      {/* Cote alésage (gauche) */}
      <line x1="30" y1={cy - 22} x2="20" y2={cy - 22} stroke={sd} strokeWidth="0.5" />
      <line x1="30" y1={cy + 22} x2="20" y2={cy + 22} stroke={sd} strokeWidth="0.5" />
      <line x1="24" y1={cy - 22} x2="24" y2={cy + 22} stroke={sd} strokeWidth="0.6" />
      <ArrowU x={24} y={cy - 22} c={sd} />
      <ArrowD x={24} y={cy + 22} c={sd} />
      <text x="8" y={cy + 4} textAnchor="middle" fontSize="7.5" fill={tx} fontFamily="monospace"
            transform={`rotate(-90, 8, ${cy})`}>Ø 45 H7</text>

      {/* Cote hauteur bride */}
      <line x1="210" y1={cy - 60} x2="202" y2={cy - 60} stroke={sd} strokeWidth="0.5" />
      <line x1="210" y1={cy + 60} x2="202" y2={cy + 60} stroke={sd} strokeWidth="0.5" />
      <line x1="206" y1={cy - 60} x2="206" y2={cy + 60} stroke={sd} strokeWidth="0.6" />
      <ArrowU x={206} y={cy - 60} c={sd} />
      <ArrowD x={206} y={cy + 60} c={sd} />
      <text x="195" y={cy + 3} textAnchor="middle" fontSize="7.5" fill={tx} fontFamily="monospace"
            transform={`rotate(-90, 195, ${cy})`}>120</text>

      {/* Cote longueur bride */}
      <line x1="40" y1={cy + 66} x2="40" y2={cy + 74} stroke={sd} strokeWidth="0.5" />
      <line x1="200" y1={cy + 66} x2="200" y2={cy + 74} stroke={sd} strokeWidth="0.5" />
      <line x1="40" y1={cy + 70} x2="200" y2={cy + 70} stroke={sd} strokeWidth="0.6" />
      <ArrowL x={40} y={cy + 70} c={sd} />
      <ArrowR x={200} y={cy + 70} c={sd} />
      <text x="120" y={cy + 68} textAnchor="middle" fontSize="7.5" fill={tx} fontFamily="monospace">L = 160</text>

      {/* Cote perçage */}
      <line x1="292" y1={cy - 56} x2="340" y2={cy - 66} stroke={sd} strokeWidth="0.5" />
      <text x="342" y={cy - 68} fontSize="7" fill={tx} fontFamily="monospace">4 × Ø 8,5</text>
      <text x="342" y={cy - 60} fontSize="6.5" fill={tx} fontFamily="monospace">⌀ p.c. 100</text>

      {/* Symbole état de surface */}
      <path d={`M 188 ${cy - 28} l -4 8 l 4 0`} stroke={tx} strokeWidth="0.6" />
      <text x="190" y={cy - 22} fontSize="6.5" fill={tx} fontFamily="monospace">Ra 0,8</text>

      {/* ── Cartouche ──────────────────────────────────────── */}
      <rect x="280" y="264" width="114" height="28" stroke={sc} strokeWidth="0.5" />
      <line x1="280" y1="275" x2="394" y2="275" stroke={sc} strokeWidth="0.3" />
      <line x1="342" y1="264" x2="342" y2="292" stroke={sc} strokeWidth="0.3" />
      <text x="284" y="272" fontSize="6" fill={sd} fontFamily="monospace">BRIDE DE PALIER</text>
      <text x="284" y="288" fontSize="5.5" fill={sd} fontFamily="monospace">GMP-BRD-003 · MAT. : EN-GJL-250</text>
      <text x="346" y="272" fontSize="6" fill={sd} fontFamily="monospace">IUT ÉVRY</text>
      <text x="346" y="288" fontSize="5.5" fill={sd} fontFamily="monospace">2026 · REV.B</text>

      {/* Annotation titre haut gauche */}
      <text x="8" y="15" fontSize="6" fill={sd} fontFamily="monospace">
        PLAN DE COUPE AA — BRIDE DE PALIER À ROULEMENT
      </text>
      <text x="8" y="290" fontSize="5.5" fill={sd} fontFamily="monospace">
        GMP · BUREAU D'ÉTUDES · ECH. 1:2
      </text>
    </svg>
  );
}

/* ─── Illustration 2 : CAO V3 marine/crème ─────────────────── */
/* Adaptation de IllustrationCAO, navy #1e3a5f sur fond crème   */

export function IllustrationCAOv3({ className = "" }: { className?: string }) {
  const s  = "#1e3a5f";
  const sd = "rgba(30,58,95,0.35)";
  const sf = "rgba(30,58,95,0.05)";
  const sh = "rgba(30,58,95,0.10)";

  return (
    <svg viewBox="0 0 240 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="v3hatchCAO" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={sd} strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* frame */}
      <rect x="2" y="2" width="236" height="156" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />

      {/* ── desk ────────────────────────────────────────────── */}
      <rect x="28" y="118" width="184" height="8" fill={sf} stroke={s} strokeWidth="0.8" />
      <rect x="36" y="126" width="6" height="18" fill={sf} stroke={s} strokeWidth="0.7" />
      <rect x="198" y="126" width="6" height="18" fill={sf} stroke={s} strokeWidth="0.7" />
      <line x1="28" y1="118" x2="212" y2="118" stroke={s} strokeWidth="1" />

      {/* ── monitor stand ───────────────────────────────────── */}
      <rect x="108" y="110" width="24" height="10" fill={sf} stroke={s} strokeWidth="0.7" />
      <rect x="117" y="76" width="6" height="34" fill={sf} stroke={s} strokeWidth="0.7" />

      {/* ── monitor ─────────────────────────────────────────── */}
      <rect x="68" y="42" width="104" height="72" fill="rgba(30,58,95,0.03)" stroke={s} strokeWidth="1" />
      <rect x="74" y="47" width="92" height="62" fill="rgba(30,58,95,0.06)" stroke={sd} strokeWidth="0.5" />

      {/* ── CAD wireframe — bride en vue iso ────────────────── */}
      {/* iso box représentation */}
      {/* face avant */}
      <path d="M 88 68 L 88 92 L 130 92 L 130 68 Z" fill="rgba(30,58,95,0.04)" stroke={s} strokeWidth="0.8" />
      {/* face dessus */}
      <path d="M 88 68 L 100 60 L 142 60 L 130 68 Z" fill="rgba(30,58,95,0.08)" stroke={s} strokeWidth="0.8" />
      {/* face droite */}
      <path d="M 130 68 L 142 60 L 142 84 L 130 92 Z" fill="rgba(30,58,95,0.06)" stroke={s} strokeWidth="0.8" />
      {/* alésage circulaire face avant */}
      <ellipse cx="109" cy="80" rx="10" ry="10" fill="rgba(30,58,95,0.02)" stroke={s} strokeWidth="0.7" />
      <ellipse cx="109" cy="80" rx="5" ry="5" fill="none" stroke={sd} strokeWidth="0.4" strokeDasharray="2,1.5" />
      {/* lignes construction isométrique */}
      <line x1="109" y1="68" x2="109" y2="56" stroke={sd} strokeWidth="0.4" strokeDasharray="3,2" />
      <line x1="88" y1="80" x2="76" y2="80" stroke={sd} strokeWidth="0.4" strokeDasharray="3,2" />
      {/* cotation rapide */}
      <text x="148" y="65" fontSize="5" fill={s} fontFamily="monospace">Ø 20</text>
      <text x="148" y="73" fontSize="5" fill={sd} fontFamily="monospace">L=42</text>

      {/* ── keyboard ─────────────────────────────────────────── */}
      <rect x="80" y="112" width="80" height="8" fill={sf} stroke={s} strokeWidth="0.7" />
      {[0, 1, 2].map((row) => (
        Array.from({ length: 8 }, (_, col) => (
          <rect key={`${row}-${col}`}
            x={83 + col * 9.5} y={113.5 + row * 2}
            width={7.5} height={1.2}
            fill={s} opacity={0.12}
          />
        ))
      ))}

      {/* ── mouse ────────────────────────────────────────────── */}
      <ellipse cx="177" cy="114" rx="7" ry="10" fill={sf} stroke={s} strokeWidth="0.7" />
      <line x1="177" y1="104" x2="177" y2="110" stroke={s} strokeWidth="0.4" />

      {/* ── silhouette étudiant ──────────────────────────────── */}
      <circle cx="56" cy="85" r="12" fill={sf} stroke={s} strokeWidth="0.9" />
      <line x1="56" y1="97" x2="56" y2="106" stroke={s} strokeWidth="3" strokeLinecap="round" />
      <path d="M 42 118 Q 42 106 56 106 Q 70 106 70 118" fill={sf} stroke={s} strokeWidth="0.9" />
      <path d="M 44 110 Q 60 112 80 115" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 68 110 Q 74 112 80 115" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 46 82 Q 56 76 66 82" stroke={s} strokeWidth="1.5" fill="none" />

      {/* ── annotations ─────────────────────────────────────── */}
      <text x="12" y="12" fontSize="5.5" fill={sd} fontFamily="monospace">CAO/FAO · STATION 03 · BUT-GMP</text>
      <text x="12" y="152" fontSize="5" fill={sd} fontFamily="monospace">CONCEPTION ASSISTÉE PAR ORDINATEUR · V3 MARINE</text>
    </svg>
  );
}

/* ─── Illustration 3 : Coupe assemblage boulonné ─────────────── */
/* Vue en coupe d'un palier à bride, hachures ISO, repères (1..4) */

export function IllustrationCoupe({ className = "" }: { className?: string }) {
  const s   = "#1e3a5f";
  const sd  = "rgba(30,58,95,0.30)";
  const sc  = "rgba(30,58,95,0.18)";
  const sf  = "rgba(30,58,95,0.04)";
  const sh1 = "rgba(30,58,95,0.08)";
  const sh2 = "rgba(30,58,95,0.13)";
  const tx  = "rgba(30,58,95,0.55)";

  const cy = 90;

  return (
    <svg viewBox="0 0 260 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Hachures acier */}
        <pattern id="v3hatchSteel" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={sd} strokeWidth="0.7" />
        </pattern>
        {/* Hachures fonte (croisées) */}
        <pattern id="v3hatchCast" width="5" height="5" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="5" y2="5" stroke={sd} strokeWidth="0.5" />
          <line x1="5" y1="0" x2="0" y2="5" stroke={sd} strokeWidth="0.5" />
        </pattern>
        {/* Hachures caoutchouc (dense) */}
        <pattern id="v3hatchRubber" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3" stroke={sd} strokeWidth="1" />
        </pattern>
      </defs>

      {/* frame */}
      <rect x="2" y="2" width="256" height="176" stroke={sc} strokeWidth="0.4" strokeDasharray="3,3" />

      {/* ── Corps principal fonte (1) ─────────────────────── */}
      {/* Bride inférieure */}
      <rect x="30" y={cy + 22} width="140" height="30" fill="url(#v3hatchCast)" stroke={s} strokeWidth="0.9" />
      {/* Corps cylindrique */}
      <rect x="55" y={cy - 22} width="90" height="44" fill="url(#v3hatchCast)" stroke={s} strokeWidth="0.9" />
      {/* Alésage intérieur */}
      <rect x="72" y={cy - 16} width="56" height="32" fill={sf} stroke={sc} strokeWidth="0.4" />

      {/* ── Roulement à billes (2) — simplifié ────────────── */}
      {/* Bague extérieure */}
      <rect x="72" y={cy - 16} width="8" height="32" fill="url(#v3hatchSteel)" stroke={s} strokeWidth="0.8" />
      <rect x="120" y={cy - 16} width="8" height="32" fill="url(#v3hatchSteel)" stroke={s} strokeWidth="0.8" />
      {/* Cage */}
      <rect x="80" y={cy - 12} width="40" height="24" fill={sh1} stroke={sd} strokeWidth="0.5" />
      {/* Billes — 5 billes stylisées */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={84 + i * 9} cy={cy} r="4.5"
          fill={sh2} stroke={s} strokeWidth="0.6" />
      ))}
      {/* Bague intérieure */}
      <rect x="80" y={cy - 10} width="40" height="20" fill="none" stroke={s} strokeWidth="0.7" />

      {/* ── Arbre acier (3) ─────────────────────────────── */}
      <rect x="30" y={cy - 9} width="42" height="18" fill="url(#v3hatchSteel)" stroke={s} strokeWidth="0.9" />
      <rect x="128" y={cy - 9} width="70" height="18" fill="url(#v3hatchSteel)" stroke={s} strokeWidth="0.9" />

      {/* ── Joint torique (4) ──────────────────────────── */}
      <ellipse cx="72" cy={cy - 16} rx="3" ry="3" fill="url(#v3hatchRubber)" stroke={s} strokeWidth="0.6" />
      <ellipse cx="128" cy={cy + 16} rx="3" ry="3" fill="url(#v3hatchRubber)" stroke={s} strokeWidth="0.6" />

      {/* ── Boulon bride M10 × 40 ──────────────────────── */}
      {[48, 112].map((x) => (
        <g key={x}>
          {/* Corps boulon */}
          <rect x={x - 3} y={cy + 22} width="6" height="28" fill="url(#v3hatchSteel)" stroke={s} strokeWidth="0.7" />
          {/* Tête hex (simplifiée) */}
          <rect x={x - 5} y={cy + 48} width="10" height="6" fill={sh2} stroke={s} strokeWidth="0.7" />
          {/* Filetage stylisé */}
          {[0, 3, 6, 9, 12].map((dy) => (
            <line key={dy} x1={x - 3} y1={cy + 23 + dy} x2={x + 3} y2={cy + 23 + dy}
                  stroke={sc} strokeWidth="0.4" />
          ))}
          {/* Rondelle */}
          <rect x={x - 6} y={cy + 21} width="12" height="3" fill={sh1} stroke={s} strokeWidth="0.6" />
        </g>
      ))}

      {/* ── Ligne d'axe ──────────────────────────────────── */}
      <line x1="16" y1={cy} x2="244" y2={cy}
            stroke={sc} strokeWidth="0.7" strokeDasharray="10,3,2,3" />

      {/* ── Repères numérotés ─────────────────────────────── */}
      {[
        { x: 100, y: cy - 36, num: "1", label: "Corps fonte" },
        { x: 196, y: cy - 30, num: "2", label: "Roulement 6208" },
        { x: 196, y: cy - 18, num: "3", label: "Arbre Ø 18 k6" },
        { x: 196, y: cy - 6,  num: "4", label: "Joint torique" },
      ].map(({ x, y, num, label }) => (
        <g key={num}>
          <circle cx={x} cy={y} r="6" fill={s} />
          <text x={x} y={y + 2.5} textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace" fontWeight="bold">
            {num}
          </text>
        </g>
      ))}
      {/* Légende */}
      <rect x="176" y="40" width="76" height="56" fill="rgba(30,58,95,0.03)" stroke={sc} strokeWidth="0.4" />
      <text x="179" y="49" fontSize="5.5" fill={s} fontFamily="monospace" fontWeight="bold">NOMENCLATURE</text>
      <line x1="176" y1="52" x2="252" y2="52" stroke={sc} strokeWidth="0.3" />
      {[
        { num: "1", label: "Corps fonte GJL" },
        { num: "2", label: "Roulement 6208" },
        { num: "3", label: "Arbre Ø 18 k6" },
        { num: "4", label: "Joint NBR" },
      ].map(({ num, label }, i) => (
        <g key={num}>
          <circle cx="181" cy={57 + i * 10} r="4" fill={s} />
          <text x="181" y={57 + i * 10 + 1.5} textAnchor="middle" fontSize="4.5" fill="white" fontFamily="monospace">{num}</text>
          <text x="189" y={57 + i * 10 + 1.5} fontSize="5.5" fill={tx} fontFamily="monospace">{label}</text>
        </g>
      ))}

      {/* ── Cotations ─────────────────────────────────────── */}
      <line x1="30" y1={cy - 9} x2="16" y2={cy - 9} stroke={sd} strokeWidth="0.5" />
      <line x1="30" y1={cy + 9} x2="16" y2={cy + 9} stroke={sd} strokeWidth="0.5" />
      <line x1="20" y1={cy - 9} x2="20" y2={cy + 9} stroke={sd} strokeWidth="0.6" />
      <ArrowU x={20} y={cy - 9} c={sd} />
      <ArrowD x={20} y={cy + 9} c={sd} />
      <text x="8" y={cy + 2} textAnchor="middle" fontSize="6.5" fill={tx} fontFamily="monospace"
            transform={`rotate(-90,8,${cy})`}>18</text>

      {/* ── Annotations ──────────────────────────────────── */}
      <text x="8" y="14" fontSize="5.5" fill={sd} fontFamily="monospace">COUPE A–A · PALIER À ROULEMENT BRIDÉ</text>
      <text x="8" y="173" fontSize="5" fill={sd} fontFamily="monospace">BUT-GMP · COMPOSANTS MÉCANIQUES · ECH. 1:1</text>
    </svg>
  );
}

/* ─── Illustration 4 : Robot industriel marine/terracotta ────── */
/* Adaptation de IllustrationRobot, navy + terracotta           */

export function IllustrationRobotV3({ className = "" }: { className?: string }) {
  const s  = "#1e3a5f";
  const sd = "rgba(30,58,95,0.30)";
  const sf = "rgba(30,58,95,0.06)";
  const sa = "rgba(194,65,12,0.75)";   // terracotta pour effecteur

  return (
    <svg viewBox="0 0 220 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* frame */}
      <rect x="2" y="2" width="216" height="176" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />

      {/* ── Enveloppe de travail ────────────────────────────── */}
      <path d="M 40 155 A 130 130 0 0 1 200 80" stroke={sd} strokeWidth="0.6" strokeDasharray="5,3" />
      <path d="M 40 155 A 90 90 0 0 1 160 80" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />
      <text x="152" y="50" fontSize="5.5" fill={sd} fontFamily="monospace">ENV. TRAVAIL</text>

      {/* ── Base ─────────────────────────────────────────────── */}
      <rect x="28" y="148" width="50" height="16" fill={sf} stroke={s} strokeWidth="1" />
      <rect x="18" y="162" width="70" height="8" fill={sf} stroke={s} strokeWidth="0.8" />
      {[26, 46, 66, 86].map((x) => (
        <circle key={x} cx={x} cy={166} r="2" fill={sf} stroke={s} strokeWidth="0.6" />
      ))}

      {/* ── Axe 1 — rotation base ─────────────────────────── */}
      <circle cx="53" cy="148" r="8" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="63" y="145" fontSize="5.5" fill={sd} fontFamily="monospace">J1</text>

      {/* ── Bras 1 ──────────────────────────────────────────── */}
      <rect x="47" y="110" width="12" height="40" fill={sf} stroke={s} strokeWidth="0.9" />

      {/* ── Axe 2 ───────────────────────────────────────────── */}
      <circle cx="53" cy="110" r="9" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="64" y="108" fontSize="5.5" fill={sd} fontFamily="monospace">J2</text>

      {/* ── Bras 2 — diagonal ───────────────────────────────── */}
      <line x1="53" y1="110" x2="110" y2="75" stroke={s} strokeWidth="10" strokeLinecap="square" />
      <line x1="53" y1="110" x2="110" y2="75" stroke="white" strokeWidth="7" strokeLinecap="square" />
      <line x1="53" y1="110" x2="110" y2="75" stroke={s} strokeWidth="1" />

      {/* ── Axe 3 ───────────────────────────────────────────── */}
      <circle cx="110" cy="75" r="8" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="120" y="73" fontSize="5.5" fill={sd} fontFamily="monospace">J3</text>

      {/* ── Avant-bras ──────────────────────────────────────── */}
      <line x1="110" y1="75" x2="165" y2="60" stroke={s} strokeWidth="8" strokeLinecap="square" />
      <line x1="110" y1="75" x2="165" y2="60" stroke="white" strokeWidth="5" strokeLinecap="square" />
      <line x1="110" y1="75" x2="165" y2="60" stroke={s} strokeWidth="1" />

      {/* ── Axe 4 ───────────────────────────────────────────── */}
      <circle cx="165" cy="60" r="7" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="174" y="58" fontSize="5.5" fill={sd} fontFamily="monospace">J4</text>

      {/* ── Poignet ─────────────────────────────────────────── */}
      <line x1="165" y1="60" x2="185" y2="45" stroke={s} strokeWidth="6" strokeLinecap="square" />
      <line x1="165" y1="60" x2="185" y2="45" stroke="white" strokeWidth="3.5" strokeLinecap="square" />
      <line x1="165" y1="60" x2="185" y2="45" stroke={s} strokeWidth="0.9" />

      {/* ── Axe 5 ───────────────────────────────────────────── */}
      <circle cx="185" cy="45" r="6" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="193" y="43" fontSize="5.5" fill={sd} fontFamily="monospace">J5</text>

      {/* ── Effecteur — terracotta ───────────────────────────── */}
      <line x1="185" y1="45" x2="200" y2="32" stroke={s} strokeWidth="4" />
      <line x1="185" y1="45" x2="200" y2="32" stroke="white" strokeWidth="2" />
      <line x1="200" y1="32" x2="207" y2="25" stroke={sa} strokeWidth="2" strokeLinecap="round" />
      <line x1="200" y1="32" x2="207" y2="36" stroke={sa} strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="32" r="4" fill="rgba(194,65,12,0.12)" stroke={sa} strokeWidth="0.9" />

      {/* TCP annotation */}
      <line x1="207" y1="30" x2="214" y2="20" stroke={sd} strokeWidth="0.5" />
      <text x="190" y="18" fontSize="5.5" fill={sa} fontFamily="monospace">TCP</text>

      {/* Arc rotation J2 */}
      <path d="M 45 118 A 14 14 0 0 1 62 104" stroke={s} strokeWidth="0.6" fill="none" />

      {/* Sol */}
      <line x1="10" y1="170" x2="100" y2="170" stroke={s} strokeWidth="0.8" />
      {[12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92].map((x) => (
        <line key={x} x1={x} y1="170" x2={x - 4} y2="176" stroke={s} strokeWidth="0.5" />
      ))}

      {/* Annotations */}
      <text x="8" y="12" fontSize="5.5" fill={sd} fontFamily="monospace">ROBOT 6 AXES · SCHÉMA CINÉMATIQUE</text>
      <text x="8" y="175" fontSize="5" fill={sd} fontFamily="monospace">ALT-GMP · INDUSTRIE 4.0 · ROBOTIQUE AVANCÉE</text>
    </svg>
  );
}

/* ─── Nav ───────────────────────────────────────────────────── */

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { num: "01 ·", label: "Parcours", href: "#parcours" },
    { num: "02 ·", label: "Entreprises", href: "#entreprises" },
    { num: "03 ·", label: "Chiffres", href: "#chiffres" },
    { num: "04 ·", label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      background: C.white,
      borderBottom: `1px solid ${C.border}`,
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: C.shadow,
    }}>
      {/* Frise navy 2px en haut */}
      <div style={{ height: 2, background: C.primary }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 2rem",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 8, height: 8,
            background: C.secondary,
            borderRadius: 1,
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: serif,
            fontSize: "1.2rem",
            fontWeight: 700,
            fontStyle: "italic",
            color: C.primary,
            letterSpacing: "-0.01em",
          }}>
            GMP
          </span>
          <span style={{
            fontFamily: mono,
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.neutral,
            borderLeft: `1px solid ${C.border}`,
            paddingLeft: "0.75rem",
          }}>
            IUT d'Évry · Paris-Saclay
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
          {navLinks.map((l) => (
            <a key={l.num} href={l.href} style={{
              display: "flex", alignItems: "baseline", gap: "0.3rem",
              textDecoration: "none", color: C.neutral,
              fontSize: "0.875rem", fontFamily: sans,
              transition: "color 0.15s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.primary;
                (e.currentTarget as HTMLAnchorElement).style.borderBottom = `1px solid ${C.primary}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.neutral;
                (e.currentTarget as HTMLAnchorElement).style.borderBottom = "none";
              }}
            >
              <span style={{ fontFamily: mono, fontSize: "0.65rem", color: C.secondary, fontWeight: 700 }}>
                {l.num}
              </span>
              {l.label}
            </a>
          ))}

          <a href="#candidater" style={{
            background: C.primary,
            color: C.white,
            padding: "0.45rem 1.1rem",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontFamily: sans,
            fontWeight: 500,
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.4rem",
            transition: "opacity 0.15s, transform 0.15s",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
            }}
          >
            <LogIn size={14} />
            Connexion
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: C.primary, display: "flex", flexDirection: "column", gap: 5, padding: 4,
        }} aria-label="Menu">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: 22, height: 2, background: C.primary,
              transition: "transform 0.2s, opacity 0.2s",
              transform: i === 0 && menuOpen ? "rotate(45deg) translate(5px,5px)"
                : i === 2 && menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden" style={{
          borderTop: `1px solid ${C.border}`, background: C.white,
          padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {navLinks.map((l) => (
            <a key={l.num} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: "flex", alignItems: "baseline", gap: "0.5rem",
              textDecoration: "none", color: C.primary,
              fontSize: "1rem", fontWeight: 500, fontFamily: sans,
            }}>
              <span style={{ fontFamily: mono, fontSize: "0.7rem", color: C.secondary }}>{l.num}</span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */

function Hero() {
  return (
    <section style={{
      background: C.bg,
      paddingTop: "5rem",
      paddingBottom: "5rem",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Filigrane Vol. XXIV */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) rotate(-8deg)",
        fontFamily: serif,
        fontSize: "clamp(5rem, 14vw, 12rem)",
        fontWeight: 900,
        fontStyle: "italic",
        color: C.primary,
        opacity: 0.03,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
        whiteSpace: "nowrap",
      }}>
        Vol. XXIV
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Label de rubrique */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
          <div style={{ width: 48, height: 2, background: C.secondary, flexShrink: 0 }} />
          <span style={{
            fontFamily: mono,
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.secondary,
            fontWeight: 700,
          }}>
            Département GMP — IUT d'Évry-Val-d'Essonne — Université Paris-Saclay
          </span>
        </div>

        {/* Grid éditorial : titre + photo */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "4rem",
          alignItems: "start",
        }} className="grid-cols-1 md:grid-cols-[1fr_420px]">

          {/* ─ Colonne gauche : titre éditorial + corps ─ */}
          <div>
            {/* Numéro de volume décoratif */}
            <div style={{
              fontFamily: mono,
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: C.neutral,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              opacity: 0.7,
            }}>
              Vol. XXIV · 2025–2026 · Numéro spécial formations
            </div>

            {/* Titre principal — Playfair italic, casse la grille */}
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: C.primary,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}>
              Former les
            </h1>
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: C.secondary,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
              marginLeft: "clamp(1rem, 4vw, 3.5rem)",
            }}>
              ingénieurs
            </h1>
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: C.primary,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}>
              de demain.
            </h1>

            {/* Frise horizontale navy 2px */}
            <div style={{
              height: 2,
              background: C.primary,
              width: "100%",
              maxWidth: 520,
              marginBottom: "2rem",
            }} />

            {/* Corps éditorial */}
            <p style={{
              fontFamily: sans,
              fontSize: "1rem",
              lineHeight: 1.75,
              color: C.stone700,
              maxWidth: 500,
              marginBottom: "2.5rem",
            }}>
              Le département Génie Mécanique et Productique de l'IUT d'Évry–Val-d'Essonne
              prépare des techniciens supérieurs et futurs ingénieurs aux métiers
              de la conception, de la fabrication et du management industriel.
              À taille humaine, ancré dans le tissu industriel d'Île-de-France.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <a href="#parcours" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: C.primary, color: C.white,
                padding: "0.75rem 1.75rem", borderRadius: 2,
                fontFamily: sans, fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(30,58,95,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                Découvrir les formations
                <ArrowRight size={15} />
              </a>
              <a href="#entreprises" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                color: C.primary, fontSize: "0.9rem", fontFamily: sans, fontWeight: 500,
                textDecoration: "none",
                borderBottom: `1px solid ${C.primary}`, paddingBottom: 2,
              }}>
                Espace entreprises
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Stats horizontales */}
            <div style={{
              display: "flex", gap: 0,
              borderTop: `1px solid ${C.border}`,
              paddingTop: "2rem",
            }}>
              {[
                { val: "120+", label: "Étudiants / an" },
                { val: "87%", label: "Insertion pro." },
                { val: "40+", label: "Entreprises partenaires" },
                { val: "3", label: "Parcours" },
              ].map(({ val, label }, i, arr) => (
                <div key={label} style={{
                  paddingRight: i < arr.length - 1 ? "2rem" : 0,
                  marginRight: i < arr.length - 1 ? "2rem" : 0,
                  borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <p style={{
                    fontFamily: serif,
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: C.primary,
                    lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}>
                    {val}
                  </p>
                  <p style={{
                    fontFamily: mono,
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.neutral,
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─ Colonne droite : photo navy + illustration ─ */}
          <div style={{ position: "relative" }} className="hidden md:block">
            {/* Coin décoratif haut gauche */}
            <div style={{
              position: "absolute", top: -12, left: -12,
              width: 40, height: 40,
              borderTop: `2px solid ${C.primary}`,
              borderLeft: `2px solid ${C.primary}`,
              zIndex: 1,
            }} />
            {/* Coin décoratif bas droit */}
            <div style={{
              position: "absolute", bottom: -12, right: -12,
              width: 40, height: 40,
              borderBottom: `2px solid ${C.secondary}`,
              borderRight: `2px solid ${C.secondary}`,
              zIndex: 1,
            }} />

            {/* Photo avec overlay navy */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 2 }}>
              <Image
                src="/gmp-stud.png"
                alt="Étudiants en travaux pratiques de génie mécanique, IUT d'Évry"
                width={680}
                height={480}
                style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(1)" }}
                priority
              />
              {/* Overlay navy multiply */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(30,58,95,0.40)",
                mixBlendMode: "multiply",
              }} />
              {/* Dégradé bas */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                background: "linear-gradient(to top, rgba(30,58,95,0.5), transparent)",
              }} />
            </div>

            {/* Encart illustration plan technique — flottant bas */}
            <div style={{
              position: "absolute",
              bottom: -24,
              left: -32,
              width: 220,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              padding: "0.75rem",
              boxShadow: "0 4px 16px rgba(30,58,95,0.12)",
              zIndex: 2,
            }}>
              <div style={{
                fontFamily: mono,
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                color: C.neutral,
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}>
                Bureau d'études — vue en coupe
              </div>
              <IllustrationPlanTechnique className="w-full h-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Parcours ──────────────────────────────────────────────── */

const parcoursData = [
  {
    num: "§01",
    sigle: "BUT GMP",
    titre: "Bachelor Universitaire de Technologie",
    specialite: "Génie Mécanique et Productique",
    duree: "3 ans",
    dureeLabel: "Bac → Bac+3",
    description:
      "Formation en conception mécanique, fabrication assistée par ordinateur et gestion industrielle. Trois parcours disponibles : Conception de Produits et Systèmes Mécaniques, Industrialisation et Management de la Production, ainsi qu'Innovation et Industrie 4.0.",
    debouches: [
      "Technicien bureau d'études",
      "Responsable production",
      "Chargé méthodes & industrialisation",
      "Poursuite en école d'ingénieurs (CTI)",
    ],
    tags: ["Conception CAO/FAO", "Métrologie", "Procédés fab.", "Gestion de projet"],
    color: C.primary,
    illustration: <IllustrationCAOv3 className="w-full h-36" />,
  },
  {
    num: "§02",
    sigle: "LP QLIO",
    titre: "Licence Professionnelle",
    specialite: "Qualité, Logistique Industrielle & Organisation",
    duree: "1 an",
    dureeLabel: "Bac+2 → Bac+3",
    description:
      "Spécialisation en management de la qualité, optimisation logistique et organisation industrielle. Accessible après BTS, DUT/BUT ou équivalent dans le domaine technique. Formation en alternance obligatoire.",
    debouches: [
      "Responsable qualité (ISO 9001)",
      "Coordinateur logistique",
      "Animateur lean manufacturing",
      "Ingénieur méthodes junior",
    ],
    tags: ["Lean manufacturing", "ISO 9001:2015", "Supply chain", "Six Sigma"],
    color: C.secondary,
    illustration: <IllustrationCoupe className="w-full h-36" />,
  },
  {
    num: "§03",
    sigle: "ALT-GMP",
    titre: "Formation en Apprentissage",
    specialite: "BUT GMP par la voie de l'alternance",
    duree: "2–3 ans",
    dureeLabel: "Dès la 2e année",
    description:
      "Rythme 3 semaines en entreprise, 1 semaine à l'IUT. Contrat d'apprentissage ou de professionnalisation. Les entreprises partenaires de la région Île-de-France couvrent les secteurs aéronautique, automobile, défense et énergie.",
    debouches: [
      "Intégration directe chez l'employeur (CDI)",
      "Poursuite en master ou école d'ingénieurs",
      "Mobilité internationale (Erasmus+)",
      "Création d'activité",
    ],
    tags: ["3 sem. / 1 sem.", "Maître alternance", "Tuteur pédagogique", "Contrat app./pro."],
    color: C.accent,
    illustration: <IllustrationRobotV3 className="w-full h-36" />,
  },
];

function ParcoursCard({ p }: { p: (typeof parcoursData)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid ${hovered ? p.color : C.border}`,
        borderRadius: 2,
        display: "grid",
        gridTemplateColumns: "80px 260px 1fr",
        gap: 0,
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? `0 8px 24px rgba(30,58,95,0.10)`
          : C.shadow,
      }}
      className="flex-col md:grid"
    >
      {/* ─ Numéro §xx ─ */}
      <div style={{
        background: hovered ? p.color : C.stone100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        transition: "background 0.18s",
        borderRight: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: serif,
          fontSize: "2.5rem",
          fontWeight: 900,
          color: hovered ? "rgba(255,255,255,0.9)" : C.primary,
          opacity: hovered ? 1 : 0.25,
          letterSpacing: "-0.02em",
          transition: "color 0.18s, opacity 0.18s",
          lineHeight: 1,
        }}>
          {p.num}
        </span>
      </div>

      {/* ─ Illustration ─ */}
      <div style={{
        borderRight: `1px solid ${C.border}`,
        overflow: "hidden",
        background: C.stone50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}>
        {p.illustration}
      </div>

      {/* ─ Contenu textuel ─ */}
      <div style={{ padding: "2rem 2.5rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
          <span style={{
            fontFamily: mono,
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: p.color,
            textTransform: "uppercase",
            fontWeight: 700,
          }}>
            {p.sigle}
          </span>
          <span style={{
            fontFamily: mono,
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: C.neutral,
            background: C.stone100,
            padding: "0.15rem 0.5rem",
            borderRadius: 2,
          }}>
            {p.dureeLabel}
          </span>
        </div>

        <h3 style={{
          fontFamily: serif,
          fontSize: "1.3rem",
          fontWeight: 700,
          fontStyle: "italic",
          color: C.primary,
          marginBottom: "0.2rem",
          letterSpacing: "-0.01em",
        }}>
          {p.titre}
        </h3>
        <p style={{
          fontFamily: sans,
          fontSize: "0.8rem",
          color: p.color,
          fontWeight: 500,
          marginBottom: "1rem",
        }}>
          {p.specialite}
        </p>

        <p style={{
          fontFamily: sans,
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: C.stone700,
          marginBottom: "1.25rem",
          maxWidth: 560,
        }}>
          {p.description}
        </p>

        {/* Débouchés */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{
            fontFamily: mono,
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: C.neutral,
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            Débouchés
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {p.debouches.map((d) => (
              <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: p.color, marginTop: 3, flexShrink: 0 }}>
                  <ChevronRight size={12} />
                </span>
                <span style={{ fontFamily: sans, fontSize: "0.8rem", color: C.stone700 }}>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {p.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: mono,
              fontSize: "0.6rem",
              letterSpacing: "0.06em",
              color: C.neutral,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              padding: "0.2rem 0.5rem",
              background: C.stone50,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Parcours() {
  return (
    <section id="parcours" style={{ background: C.bg, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* En-tête éditorial de section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "3rem",
          alignItems: "end",
          marginBottom: "4rem",
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: "3rem",
        }} className="grid-cols-1 md:grid-cols-[160px_1fr]">
          <div>
            <div style={{
              fontFamily: serif,
              fontSize: "6rem",
              fontWeight: 900,
              color: C.primary,
              opacity: 0.06,
              lineHeight: 1,
              marginBottom: "-0.5rem",
            }} aria-hidden>
              §
            </div>
            <div style={{
              fontFamily: mono,
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: C.secondary,
              textTransform: "uppercase",
              fontWeight: 700,
            }}>
              Section I — Formations
            </div>
          </div>
          <div>
            <h2 style={{
              fontFamily: serif,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: C.primary,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}>
              Nos parcours de formation
            </h2>
            <p style={{
              fontFamily: sans,
              color: C.neutral,
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: 560,
            }}>
              Du BUT en trois ans à la Licence Professionnelle en un an, le département GMP
              propose des formations qui s'adaptent à chaque profil et chaque ambition
              industrielle, en formation initiale ou par alternance.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {parcoursData.map((p) => (
            <ParcoursCard key={p.num} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bande Photos ──────────────────────────────────────────── */

function BandePhotos() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 280, overflow: "hidden" }}
         className="grid-cols-1 md:grid-cols-2">
      {/* dessin.jpg — overlay terracotta */}
      <div style={{ position: "relative", overflow: "hidden" }} className="group">
        <Image
          src="/dessin.jpg"
          alt="Dessin technique et conception mécanique au département GMP"
          fill
          style={{ objectFit: "cover", filter: "grayscale(1)", transform: "scale(1.05)",
                   transition: "filter 0.5s, transform 0.5s" }}
          className="group-hover:grayscale-0 group-hover:scale-100"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(194,65,12,0.45)",
          mixBlendMode: "multiply",
          transition: "opacity 0.5s",
        }} className="group-hover:opacity-0" />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
        }} />
        <div style={{ position: "absolute", bottom: 20, left: 20 }}>
          <span style={{
            fontFamily: mono, fontSize: "0.55rem",
            letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase", display: "block", marginBottom: 4,
          }}>
            GMP-DES-001
          </span>
          <p style={{ fontFamily: serif, color: "white", fontSize: "1rem", fontStyle: "italic" }}>
            Conception & Dessin technique
          </p>
        </div>
      </div>

      {/* machine.jpg — overlay navy */}
      <div style={{
        position: "relative", overflow: "hidden",
        borderLeft: `1px solid rgba(30,58,95,0.15)`,
      }} className="group">
        <Image
          src="/machine.jpg"
          alt="Machine-outil en atelier de génie mécanique"
          fill
          style={{ objectFit: "cover", filter: "grayscale(1)", transform: "scale(1.05)",
                   transition: "filter 0.5s, transform 0.5s" }}
          className="group-hover:grayscale-0 group-hover:scale-100"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(30,58,95,0.45)",
          mixBlendMode: "multiply",
          transition: "opacity 0.5s",
        }} className="group-hover:opacity-0" />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
        }} />
        <div style={{ position: "absolute", bottom: 20, left: 20 }}>
          <span style={{
            fontFamily: mono, fontSize: "0.55rem",
            letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase", display: "block", marginBottom: 4,
          }}>
            GMP-MAC-001
          </span>
          <p style={{ fontFamily: serif, color: "white", fontSize: "1rem", fontStyle: "italic" }}>
            Atelier & Machines-outils
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Chiffres (fond navy) ─────────────────────────── */

const metrics = [
  { val: "87 %", label: "Taux d'insertion professionnelle", sub: "À 6 mois après diplomation" },
  { val: "120+", label: "Étudiants formés par an", sub: "Sur les 3 parcours du département" },
  { val: "40+", label: "Entreprises partenaires", sub: "PME, ETI et grands groupes IDF" },
  { val: "3", label: "Parcours accrédités CTI", sub: "BUT · Licence Pro · Alternance" },
];

function ChiffresSection() {
  return (
    <section id="chiffres" style={{ background: C.primary, padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      {/* Texture subtile — lignes navy légèrement plus claires */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        {/* En-tête */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
          <div style={{ width: 40, height: 2, background: C.secondary, flexShrink: 0 }} />
          <span style={{
            fontFamily: mono,
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>
            Section II — Données · Année 2025-2026
          </span>
        </div>

        <h2 style={{
          fontFamily: serif,
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "white",
          marginBottom: "4rem",
          letterSpacing: "-0.02em",
          maxWidth: 540,
          lineHeight: 1.2,
        }}>
          Un département reconnu,
          des résultats qui parlent.
        </h2>

        {/* Grille chiffres */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}
             className="grid-cols-2 md:grid-cols-4">
          {metrics.map(({ val, label, sub }, i, arr) => (
            <div key={val} style={{
              padding: "2.5rem 2rem",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <p style={{
                fontFamily: serif,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1,
                marginBottom: "0.75rem",
                letterSpacing: "-0.02em",
              }}>
                {val}
              </p>
              <p style={{
                fontFamily: sans,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.75)",
                marginBottom: "0.4rem",
              }}>
                {label}
              </p>
              <p style={{
                fontFamily: mono,
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
              }}>
                {sub}
              </p>
            </div>
          ))}
        </div>

        {/* Photo machine en fond en coin */}
        <div style={{
          position: "absolute",
          right: 0, bottom: 0,
          width: 280, height: 200,
          overflow: "hidden",
          opacity: 0.12,
        }} className="hidden lg:block">
          <Image
            src="/machine.jpg"
            alt=""
            fill
            aria-hidden
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Section Entreprises — layout journal 2 colonnes ────────── */

const offres = [
  {
    company: "Renault Group",
    location: "Flins-sur-Seine · 78",
    type: "Alternance",
    title: "Technicien méthodes & industrialisation",
    description:
      "Intégrez l'équipe méthodes de notre usine de production pour optimiser les procédés d'assemblage, rédiger les gammes de fabrication et participer à la transformation industrie 4.0.",
    tags: ["Méthodes", "Lean", "CAO"],
    start: "Sept. 2026",
  },
  {
    company: "Safran Aircraft Engines",
    location: "Villaroche · 77",
    type: "Stage 6 mois",
    title: "Contrôle qualité pièces moteur",
    description:
      "Participation au contrôle dimensionnel et à l'analyse des non-conformités sur pièces de haute précision pour moteurs aéronautiques civils et militaires. Environnement normé AS9100.",
    tags: ["Qualité", "Métrologie", "Aéronautique"],
    start: "Fév. 2026",
  },
  {
    company: "PSA Peugeot Citroën",
    location: "Poissy · 78",
    type: "Projet tuteuré",
    title: "Optimisation ligne d'assemblage carrosserie",
    description:
      "Étude et proposition d'améliorations d'une ligne de montage carrosserie. Application des outils VSM, 5S et analyse des temps et mouvements dans un contexte de production haute cadence.",
    tags: ["VSM", "5S", "Production"],
    start: "Nov. 2025",
  },
];

function EntreprisesSection() {
  return (
    <section id="entreprises" style={{ background: C.white, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* Layout journal 2 colonnes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }} className="grid-cols-1 md:grid-cols-2">

          {/* ─ Colonne gauche : pitch + pull-quote ─ */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: 40, height: 2, background: C.secondary, flexShrink: 0 }} />
              <span style={{
                fontFamily: mono, fontSize: "0.62rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: C.secondary, fontWeight: 700,
              }}>
                Section III — Partenariats industriels
              </span>
            </div>

            <h2 style={{
              fontFamily: serif,
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: C.primary,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              lineHeight: 1.15,
            }}>
              Recrutez des talents
              formés pour l'industrie.
            </h2>

            <p style={{
              fontFamily: sans,
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: C.stone700,
              marginBottom: "2rem",
              maxWidth: 440,
            }}>
              Le département GMP entretient des relations étroites avec plus de quarante
              entreprises de l'Île-de-France. Proposez vos offres de stage, d'alternance
              ou de projets tuteurés directement à nos étudiants qualifiés.
            </p>

            {/* Pull-quote terracotta */}
            <blockquote style={{
              borderLeft: `3px solid ${C.secondary}`,
              paddingLeft: "1.5rem",
              marginLeft: 0,
              marginBottom: "2rem",
            }}>
              <p style={{
                fontFamily: serif,
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: C.secondary,
                lineHeight: 1.5,
                marginBottom: "0.6rem",
              }}>
                « Les étudiants du GMP maîtrisent à la fois les outils de conception
                et la réalité du terrain industriel — c'est rare et précieux. »
              </p>
              <footer style={{
                fontFamily: mono,
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.neutral,
              }}>
                — Responsable RH, Renault Group · Partenaire depuis 2018
              </footer>
            </blockquote>

            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: C.secondary, color: C.white,
              padding: "0.75rem 1.75rem", borderRadius: 2,
              fontFamily: sans, fontWeight: 600, fontSize: "0.9rem",
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(194,65,12,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              <Building2 size={15} />
              Déposer une offre
            </a>
          </div>

          {/* ─ Colonne droite : cartes offres ─ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {offres.map(({ company, location, type, title, description, tags, start }) => (
              <article key={company} style={{
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                padding: "1.5rem",
                background: C.white,
                boxShadow: C.shadow,
                transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(30,58,95,0.10)";
                  (e.currentTarget as HTMLElement).style.borderColor = C.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = C.shadow;
                  (e.currentTarget as HTMLElement).style.borderColor = C.border;
                }}
              >
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: 34, height: 34,
                      background: C.stone100,
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Building2 size={14} color={C.primary} />
                    </div>
                    <div>
                      <p style={{ fontFamily: sans, fontWeight: 600, color: C.primary, fontSize: "0.875rem" }}>
                        {company}
                      </p>
                      <p style={{
                        fontFamily: mono, fontSize: "0.6rem",
                        color: C.neutral, letterSpacing: "0.05em",
                        display: "flex", alignItems: "center", gap: 3,
                      }}>
                        <MapPin size={9} /> {location}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: mono, fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    color: C.secondary,
                    background: "rgba(194,65,12,0.07)",
                    border: `1px solid rgba(194,65,12,0.2)`,
                    borderRadius: 2,
                    padding: "0.2rem 0.5rem",
                    flexShrink: 0,
                  }}>
                    {type}
                  </span>
                </div>

                <p style={{ fontFamily: sans, fontWeight: 600, color: C.primary, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  {title}
                </p>
                <p style={{
                  fontFamily: sans, fontSize: "0.8rem",
                  color: C.neutral, lineHeight: 1.6, marginBottom: "1rem",
                }}>
                  {description}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    {tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: mono, fontSize: "0.58rem",
                        color: C.neutral, border: `1px solid ${C.border}`,
                        borderRadius: 2, padding: "0.15rem 0.4rem",
                        letterSpacing: "0.04em",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontFamily: mono, fontSize: "0.6rem", color: C.neutral, flexShrink: 0 }}>
                    {start}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer id="contact" style={{ background: C.primary, color: "white", position: "relative", overflow: "hidden" }}>
      {/* Ligne terracotta en haut */}
      <div style={{ height: 2, background: C.secondary }} />

      {/* Grid légère en fond */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}
             className="grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 6, height: 6, background: C.secondary, borderRadius: 1 }} />
              <span style={{
                fontFamily: serif,
                fontSize: "1.3rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "white",
              }}>
                GMP
              </span>
            </div>
            <p style={{
              fontFamily: sans,
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 280,
              marginBottom: "1.5rem",
            }}>
              Département Génie Mécanique et Productique<br />
              IUT d'Évry-Val-d'Essonne<br />
              Université Paris-Saclay
            </p>
            <p style={{
              fontFamily: mono,
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.8,
            }}>
              23 bd de France<br />
              91037 Évry-Courcouronnes<br />
              iut-gmp@univ-evry.fr
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontFamily: mono, fontSize: "0.6rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.secondary, marginBottom: "1.25rem",
            }}>
              Navigation
            </p>
            {["Formation", "Entreprises", "Actualités", "Connexion"].map((l) => (
              <a key={l} href="#" style={{
                display: "block",
                fontFamily: sans, fontSize: "0.875rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                marginBottom: "0.6rem",
                transition: "color 0.15s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Formation */}
          <div>
            <p style={{
              fontFamily: mono, fontSize: "0.6rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.secondary, marginBottom: "1.25rem",
            }}>
              Formations
            </p>
            {["BUT GMP", "Licence Pro QLIO", "Alternance", "Admissions"].map((l) => (
              <a key={l} href="#" style={{
                display: "block",
                fontFamily: sans, fontSize: "0.875rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                marginBottom: "0.6rem",
                transition: "color 0.15s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Liens utiles */}
          <div>
            <p style={{
              fontFamily: mono, fontSize: "0.6rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.secondary, marginBottom: "1.25rem",
            }}>
              Liens utiles
            </p>
            {[
              "Parcoursup",
              "ECANDIDAT",
              "ENT Paris-Saclay",
              "Bibliothèque IUT",
            ].map((l) => (
              <a key={l} href="#" style={{
                display: "block",
                fontFamily: sans, fontSize: "0.875rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                marginBottom: "0.6rem",
                transition: "color 0.15s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Cartouche bas de page — style académique */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "2rem",
            fontFamily: mono, fontSize: "0.58rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}>
            <span>DOC. GMP-WEB-2026</span>
            <span>REV. 3.0</span>
            <span>IUT Évry · Univ. Paris-Saclay</span>
          </div>
          <p style={{
            fontFamily: serif,
            fontSize: "0.75rem",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.25)",
          }}>
            © 2026 — Département GMP, tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function CharteV3Page() {
  return (
    <div
      className={playfairDisplay.variable + " " + dmSans.variable}
      style={{ fontFamily: sans, background: C.bg }}
    >
      <Nav />
      <Hero />
      <Parcours />
      <BandePhotos />
      <ChiffresSection />
      <EntreprisesSection />
      <Footer />
    </div>
  );
}
