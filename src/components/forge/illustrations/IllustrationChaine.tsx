"use client";

import { C } from "@/lib/forge";

export function IllustrationChaine({ className = "" }: { className?: string }) {
  const s  = "#f97316";
  const sd = "rgba(249,115,22,0.4)";
  const sc = "rgba(249,115,22,0.18)";
  const tx = "rgba(249,115,22,0.6)";
  const sf = "rgba(249,115,22,0.07)";
  const mono = "monospace";

  return (
    <svg viewBox="0 0 280 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="278" height="158" stroke={sc} strokeWidth="0.5" />

      {/* ── Convoyeur principal ── */}
      <rect x="10" y="100" width="260" height="14" fill={sf} stroke={s} strokeWidth="1" />
      {[20, 45, 70, 95, 120, 145, 170, 195, 220, 245].map((x) => (
        <ellipse key={x} cx={x} cy="107" rx="4" ry="7" fill={sf} stroke={sd} strokeWidth="0.7" />
      ))}

      {/* ── Pièces sur convoyeur ── */}
      {[30, 100, 180, 250].map((x) => (
        <rect key={x} x={x - 6} y="94" width="12" height="8" fill="rgba(249,115,22,0.18)" stroke={s} strokeWidth="0.8" />
      ))}

      {/* ── Poste 1 — Usinage ── */}
      <rect x="15" y="50" width="45" height="42" fill={sf} stroke={s} strokeWidth="1.1" />
      <text x="37" y="70" textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>USIN.</text>
      <text x="37" y="80" textAnchor="middle" fontSize="6" fill={sd} fontFamily={mono}>P01</text>
      <line x1="37" y1="90" x2="37" y2="100" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="37,100 33,94 41,94" fill={s} />

      {/* ── Poste 2 — Robot bras ── */}
      <rect x="108" y="70" width="18" height="32" fill={sf} stroke={s} strokeWidth="1" />
      <line x1="117" y1="70" x2="117" y2="48" stroke={s} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="117" y1="48" x2="138" y2="36" stroke={s} strokeWidth="2" strokeLinecap="round" />
      <circle cx="117" cy="48" r="4" fill={sf} stroke={s} strokeWidth="1" />
      <line x1="138" y1="36" x2="143" y2="30" stroke={s} strokeWidth="1.5" />
      <line x1="138" y1="36" x2="143" y2="40" stroke={s} strokeWidth="1.5" />
      <circle cx="138" cy="36" r="3" fill={sf} stroke={s} strokeWidth="0.8" />
      <text x="148" y="32" fontSize="6" fill={tx} fontFamily={mono}>ROBOT</text>
      <text x="148" y="40" fontSize="5.5" fill={sd} fontFamily={mono}>6-DOF</text>

      {/* ── Poste 3 — Contrôle qualité ── */}
      <rect x="208" y="50" width="55" height="42" fill={sf} stroke={s} strokeWidth="1.1" />
      <text x="235" y="67" textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>CTRL</text>
      <text x="235" y="77" textAnchor="middle" fontSize="6" fill={tx} fontFamily={mono}>QUALITÉ</text>
      <text x="235" y="87" textAnchor="middle" fontSize="6" fill={sd} fontFamily={mono}>P03</text>
      <polyline points="224,72 230,80 246,62" stroke={s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── Flèches de flux ── */}
      <line x1="5" y1="107" x2="10" y2="107" stroke={C.accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <polygon points="10,107 6,104 6,110" fill={C.accent} />
      <text x="2" y="99" fontSize="6" fill={C.accent} fontFamily={mono}>IN</text>
      <line x1="62" y1="72" x2="108" y2="84" stroke={sd} strokeWidth="0.8" strokeDasharray="3,2" />
      <polygon points="108,84 103,80 101,86" fill={sd} />
      <line x1="126" y1="84" x2="208" y2="78" stroke={sd} strokeWidth="0.8" strokeDasharray="3,2" />
      <polygon points="208,78 203,74 202,80" fill={sd} />
      <line x1="265" y1="107" x2="275" y2="107" stroke={C.accent} strokeWidth="1.2" />
      <polygon points="275,107 271,104 271,110" fill={C.accent} />
      <text x="265" y="99" fontSize="6" fill={C.accent} fontFamily={mono}>OUT</text>

      {/* ── labels process ── */}
      <text x="37" y="46" textAnchor="middle" fontSize="6" fill={tx} fontFamily={mono}>USINAGE</text>
      <text x="4" y="156" fontSize="5" fill={tx} fontFamily={mono}>LIGNE-PROD-001</text>

      {/* takt time */}
      <text x="232" y="14" fontSize="6" fill={C.accent} fontFamily={mono} textAnchor="middle">TAKT = 45s</text>
      <line x1="174" y1="16" x2="280" y2="16" stroke={C.accent} strokeWidth="0.4" strokeDasharray="2,3" />
    </svg>
  );
}
