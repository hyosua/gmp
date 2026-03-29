"use client";

import { C } from "@/lib/forge";
import { ArrowD } from "@/components/illustrations/helpers";

export function IllustrationCNC({ className = "" }: { className?: string }) {
  const s  = "#F29400";
  const sd = "rgba(242,148,0,0.4)";
  const sc = "rgba(242,148,0,0.18)";
  const tx = "rgba(242,148,0,0.6)";
  const sf = "rgba(249,115,22,0.06)";
  const mono = "monospace";

  return (
    <svg viewBox="0 0 240 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="238" height="158" stroke={sc} strokeWidth="0.5" />

      {/* ── Table de travail ── */}
      <rect x="20" y="20" width="200" height="120" fill={sf} stroke={s} strokeWidth="1" />

      {/* rainures en T sur la table (5 rainures horizontales) */}
      {[36, 56, 76, 96, 116].map((y) => (
        <rect key={y} x="20" y={y} width="200" height="6" fill="rgba(249,115,22,0.04)" stroke={sd} strokeWidth="0.5" />
      ))}

      {/* ── Pièce montée sur table ── */}
      <rect x="80" y="50" width="80" height="60" fill="rgba(249,115,22,0.1)" stroke={s} strokeWidth="1.2" />
      {/* hachures pièce */}
      {[0,1,2,3,4,5].map((i) => (
        <line key={i}
          x1={80 + i * 14} y1="50"
          x2={80 + i * 14 - 20} y2="110"
          stroke={sd} strokeWidth="0.4"
        />
      ))}

      {/* ── Broche (vue de dessus = cercle) ── */}
      <circle cx="120" cy="35" r="10" fill="rgba(249,115,22,0.12)" stroke={s} strokeWidth="1.5" />
      <circle cx="120" cy="35" r="4" fill="rgba(249,115,22,0.2)" stroke={s} strokeWidth="0.8" />
      {[0,60,120,180,240,300].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={a}
            x1={120 + 6 * Math.cos(rad)} y1={35 + 6 * Math.sin(rad)}
            x2={120 + 9 * Math.cos(rad)} y2={35 + 9 * Math.sin(rad)}
            stroke={sd} strokeWidth="0.6"
          />
        );
      })}

      {/* ── Trajectoires d'outil (en tirets orange) ── */}
      <path d="M 85 55 L 155 55" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="155,55 149,52 149,58" fill={s} />
      <path d="M 155 65 L 85 65" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="85,65 91,62 91,68" fill={s} />
      <path d="M 85 75 L 155 75" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="155,75 149,72 149,78" fill={s} />
      <path d="M 155 85 L 85 85" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="85,85 91,82 91,88" fill={s} />
      <path d="M 155 55 L 155 65 M 85 65 L 85 75 M 155 75 L 155 85" stroke={sd} strokeWidth="0.6" strokeDasharray="2,2" />

      {/* ── Porte-outil schéma ── */}
      <rect x="113" y="25" width="14" height="22" fill={sf} stroke={sd} strokeWidth="0.6" />
      <line x1="132" y1="20" x2="132" y2="40" stroke={C.accent} strokeWidth="0.8" strokeDasharray="3,2" />
      <ArrowD x={132} y={40} c={C.accent} />
      <text x="135" y="34" fontSize="6" fill={tx} fontFamily={mono}>Z</text>

      {/* ── axes X / Y ── */}
      <line x1="22" y1="148" x2="50" y2="148" stroke={sd} strokeWidth="0.8" />
      <polygon points="50,148 44,145 44,151" fill={sd} />
      <text x="52" y="151" fontSize="7" fill={tx} fontFamily={mono}>X</text>
      <line x1="22" y1="148" x2="22" y2="122" stroke={sd} strokeWidth="0.8" />
      <polygon points="22,122 19,128 25,128" fill={sd} />
      <text x="16" y="120" fontSize="7" fill={tx} fontFamily={mono}>Y</text>

      {/* ── labels ── */}
      <text x="164" y="55" fontSize="6" fill={tx} fontFamily={mono}>N010</text>
      <text x="164" y="65" fontSize="6" fill={tx} fontFamily={mono}>N020</text>
      <text x="164" y="75" fontSize="6" fill={tx} fontFamily={mono}>N030</text>
      <text x="164" y="85" fontSize="6" fill={tx} fontFamily={mono}>N040</text>

      {/* ref */}
      <text x="4" y="156" fontSize="5" fill={tx} fontFamily={mono}>CNC-FRAS-001</text>
    </svg>
  );
}
