"use client";

import { C } from "@/lib/forge";
import { ArrowL, ArrowR, ArrowU, ArrowD } from "@/components/forge/illustrations/helpers";

export function IllustrationForgeHero({ className = "" }: { className?: string }) {
  const s  = "var(--c-primary)";
  const sd = "var(--c-primary-30)";
  const sc = "var(--c-primary-20)";
  const tx = "var(--c-primary)";
  const sf = "var(--c-primary-15)";
  const mono = "monospace";

  return (
    <svg viewBox="0 0 400 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* outer frame */}
      <rect x="2" y="2" width="396" height="316" stroke={sc} strokeWidth="0.5" />

      {/* corner marks */}
      <polyline points="2,22 2,2 22,2" stroke={sd} strokeWidth="0.8" />
      <polyline points="378,2 398,2 398,22" stroke={sd} strokeWidth="0.8" />
      <polyline points="2,298 2,318 22,318" stroke={sd} strokeWidth="0.8" />
      <polyline points="378,318 398,318 398,298" stroke={sd} strokeWidth="0.8" />

      {/* title block top-left */}
      <text x="10" y="14" fontSize="6" fill={tx} fontFamily={mono} letterSpacing="2">PRESSE HYDRAULIQUE — VUE AVANT — ECH. 1:20</text>

      {/* ── Colonnes / bâti principal ── */}
      <rect x="60" y="40" width="28" height="220" fill={sf} stroke={s} strokeWidth="1.2" />
      <rect x="312" y="40" width="28" height="220" fill={sf} stroke={s} strokeWidth="1.2" />

      {/* traverses de bâti (haut) */}
      <rect x="60" y="40" width="280" height="30" fill={sf} stroke={s} strokeWidth="1.2" />
      {/* traverse du milieu */}
      <rect x="60" y="140" width="280" height="20" fill={sf} stroke={s} strokeWidth="1" />

      {/* ── Vérin hydraulique ── */}
      <rect x="160" y="70" width="80" height="80" fill="rgba(249,115,22,0.1)" stroke={s} strokeWidth="1.5" />
      <rect x="155" y="65" width="90" height="12" fill={sf} stroke={s} strokeWidth="1" />
      <rect x="188" y="150" width="24" height="60" fill="rgba(249,115,22,0.12)" stroke={s} strokeWidth="1.5" />
      <rect x="184" y="148" width="32" height="8" fill={sf} stroke={s} strokeWidth="0.8" />

      {/* ── Marteau / outil ── */}
      <rect x="170" y="210" width="60" height="28" fill="rgba(249,115,22,0.15)" stroke={s} strokeWidth="1.8" />
      <line x1="170" y1="238" x2="230" y2="238" stroke={s} strokeWidth="2.5" strokeLinecap="square" />

      {/* ── Pièce à forger (sur enclume) ── */}
      <ellipse cx="200" cy="268" rx="42" ry="8" fill="rgba(249,115,22,0.1)" stroke={sd} strokeWidth="1" strokeDasharray="3,2" />
      <rect x="175" y="255" width="50" height="14" fill="rgba(249,115,22,0.18)" stroke={s} strokeWidth="1.2" />

      {/* ── Enclume / table ── */}
      <rect x="88" y="268" width="224" height="22" fill={sf} stroke={s} strokeWidth="1.2" />
      <rect x="108" y="290" width="184" height="10" fill={sf} stroke={s} strokeWidth="1" />

      {/* ── Lignes de force (flèches) ── */}
      <line x1="200" y1="8" x2="200" y2="40" stroke={C.accent} strokeWidth="1.5" strokeDasharray="4,2" />
      <ArrowD x={200} y={40} c={C.accent} />
      <text x="206" y="30" fontSize="7" fill={C.accent} fontFamily={mono}>F</text>

      <line x1="215" y1="290" x2="215" y2="310" stroke={sd} strokeWidth="1" strokeDasharray="3,2" />
      <ArrowU x={215} y={290} c={sd} />
      <text x="220" y="308" fontSize="6.5" fill={tx} fontFamily={mono}>R</text>

      {/* ── Cotations ── */}
      <line x1="240" y1="150" x2="240" y2="210" stroke={sd} strokeWidth="0.7" />
      <ArrowU x={240} y={150} c={sd} />
      <ArrowD x={240} y={210} c={sd} />
      <line x1="232" y1="150" x2="248" y2="150" stroke={sd} strokeWidth="0.5" />
      <line x1="232" y1="210" x2="248" y2="210" stroke={sd} strokeWidth="0.5" />
      <text x="244" y="182" fontSize="7" fill={tx} fontFamily={mono}>C=60</text>

      <line x1="60" y1="308" x2="340" y2="308" stroke={sd} strokeWidth="0.6" />
      <ArrowL x={60} y={308} c={sd} />
      <ArrowR x={340} y={308} c={sd} />
      <text x="200" y="306" textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>L = 280</text>

      <line x1="16" y1="40" x2="16" y2="290" stroke={sd} strokeWidth="0.6" />
      <ArrowU x={16} y={40} c={sd} />
      <ArrowD x={16} y={290} c={sd} />
      <text x="20" y="168" fontSize="7" fill={tx} fontFamily={mono} transform="rotate(-90 20 168)">H=1200</text>

      {/* ── annotations techniques ── */}
      <line x1="244" y1="100" x2="270" y2="88" stroke={sd} strokeWidth="0.6" />
      <circle cx="244" cy="100" r="1.5" fill={sd} />
      <text x="272" y="87" fontSize="7" fill={tx} fontFamily={mono}>VÉRIN Ø80</text>

      <line x1="212" y1="180" x2="265" y2="175" stroke={sd} strokeWidth="0.6" />
      <circle cx="212" cy="180" r="1.5" fill={sd} />
      <text x="267" y="178" fontSize="7" fill={tx} fontFamily={mono}>TIGE Ø24</text>

      <line x1="170" y1="224" x2="135" y2="218" stroke={sd} strokeWidth="0.6" />
      <circle cx="170" cy="224" r="1.5" fill={sd} />
      <text x="75" y="220" fontSize="7" fill={tx} fontFamily={mono}>MATRICE</text>

      {/* ── centerline vertical ── */}
      <line x1="200" y1="45" x2="200" y2="248" stroke={sc} strokeWidth="0.6" strokeDasharray="8,3,2,3" />

      {/* ── hydraulic input symbol ── */}
      <line x1="240" y1="100" x2="258" y2="100" stroke={s} strokeWidth="0.8" />
      <polygon points="258,100 252,96 252,104" fill={s} />
      <text x="260" y="103" fontSize="6" fill={tx} fontFamily={mono}>P=200bar</text>

      {/* ref doc */}
      <text x="10" y="313" fontSize="5.5" fill={tx} fontFamily={mono} letterSpacing="1.5">REF: GMP-FORGE-001 · IUT ÉVRY · 2026</text>
    </svg>
  );
}
