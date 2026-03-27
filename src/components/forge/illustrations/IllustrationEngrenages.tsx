"use client";

import { C } from "@/lib/forge";
import { ArrowL, ArrowR } from "@/components/forge/illustrations/helpers";
import { GearTeeth } from "@/components/forge/illustrations/helpers";

export function IllustrationEngrenages({ className = "" }: { className?: string }) {
  const s  = "#f97316";
  const sd = "rgba(249,115,22,0.4)";
  const sc = "rgba(249,115,22,0.18)";
  const sf = "rgba(249,115,22,0.07)";
  const sh = "rgba(249,115,22,0.15)";
  const tx = "rgba(249,115,22,0.6)";
  const mono = "monospace";

  const G1 = { cx: 90, cy: 100, pitchR: 56, tipR: 64, rootR: 50, hub: 22, bore: 10, teeth: 14, tw: 10 };
  const G2 = { cx: 174, cy: 100, pitchR: 28, tipR: 33, rootR: 24, hub: 11, bore: 6, teeth: 7, tw: 7 };

  return (
    <svg viewBox="0 0 240 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="238" height="158" stroke={sc} strokeWidth="0.5" />

      {/* shaft */}
      <rect x="8" y={G1.cy - G1.bore} width={118} height={G1.bore * 2} fill={sf} stroke={s} strokeWidth="0.8" />
      {/* keyway */}
      <rect x="28" y={G1.cy - G1.bore} width="18" height={G1.bore * 0.45} fill={sh} stroke={s} strokeWidth="0.5" />
      {/* shaft centerline */}
      <line x1="4" y1={G1.cy} x2="140" y2={G1.cy} stroke={sc} strokeWidth="0.5" strokeDasharray="8,3,2,3" />

      {/* bearings */}
      <pattern id="hatchO" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke={sd} strokeWidth="0.8" />
      </pattern>
      <rect x="8" y={G1.cy - G1.bore - 8} width="16" height={(G1.bore + 8) * 2} fill="url(#hatchO)" stroke={s} strokeWidth="0.7" />
      <rect x="118" y={G1.cy - G1.bore - 6} width="14" height={(G1.bore + 6) * 2} fill="url(#hatchO)" stroke={s} strokeWidth="0.7" />

      {/* gear 1 centerlines */}
      <line x1={G1.cx - G1.tipR - 16} y1={G1.cy} x2={G1.cx + G1.tipR + 16} y2={G1.cy} stroke={sc} strokeWidth="0.5" strokeDasharray="8,3,2,3" />
      <line x1={G1.cx} y1={G1.cy - G1.tipR - 16} x2={G1.cx} y2={G1.cy + G1.tipR + 16} stroke={sc} strokeWidth="0.5" strokeDasharray="8,3,2,3" />
      <circle cx={G1.cx} cy={G1.cy} r={G1.pitchR} stroke={sd} strokeWidth="0.5" strokeDasharray="5,2" />
      <circle cx={G1.cx} cy={G1.cy} r={G1.rootR} fill={sf} />
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={a}
            x1={G1.cx + G1.hub * Math.cos(rad)} y1={G1.cy + G1.hub * Math.sin(rad)}
            x2={G1.cx + G1.rootR * Math.cos(rad)} y2={G1.cy + G1.rootR * Math.sin(rad)}
            stroke={s} strokeWidth="4" strokeLinecap="square"
          />
        );
      })}
      <circle cx={G1.cx} cy={G1.cy} r={G1.rootR} stroke={s} strokeWidth="0.8" />
      <circle cx={G1.cx} cy={G1.cy} r={G1.hub} fill={sh} stroke={s} strokeWidth="0.8" />
      <circle cx={G1.cx} cy={G1.cy} r={G1.bore} stroke={s} strokeWidth="0.8" />
      <GearTeeth cx={G1.cx} cy={G1.cy} rootR={G1.rootR} tipR={G1.tipR} count={G1.teeth} tw={G1.tw} stroke={s} fill={sf} />

      {/* gear 2 */}
      <line x1={G2.cx - G2.tipR - 12} y1={G2.cy} x2={G2.cx + G2.tipR + 12} y2={G2.cy} stroke={sc} strokeWidth="0.5" strokeDasharray="8,3,2,3" />
      <line x1={G2.cx} y1={G2.cy - G2.tipR - 12} x2={G2.cx} y2={G2.cy + G2.tipR + 12} stroke={sc} strokeWidth="0.5" strokeDasharray="8,3,2,3" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.pitchR} stroke={sd} strokeWidth="0.5" strokeDasharray="3,2" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.rootR} fill={sf} />
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={a}
            x1={G2.cx + G2.hub * Math.cos(rad)} y1={G2.cy + G2.hub * Math.sin(rad)}
            x2={G2.cx + G2.rootR * Math.cos(rad)} y2={G2.cy + G2.rootR * Math.sin(rad)}
            stroke={s} strokeWidth="2.5" strokeLinecap="square"
          />
        );
      })}
      <circle cx={G2.cx} cy={G2.cy} r={G2.rootR} stroke={s} strokeWidth="0.8" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.hub} fill={sh} stroke={s} strokeWidth="0.8" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.bore} stroke={s} strokeWidth="0.8" />
      <GearTeeth cx={G2.cx} cy={G2.cy} rootR={G2.rootR} tipR={G2.tipR} count={G2.teeth} tw={G2.tw} stroke={s} fill={sf} />

      {/* dimension: center distance */}
      <line x1={G1.cx} y1="18" x2={G2.cx} y2="18" stroke={sd} strokeWidth="0.6" />
      <ArrowL x={G1.cx} y={18} c={sd} />
      <ArrowR x={G2.cx} y={18} c={sd} />
      <text x={(G1.cx + G2.cx) / 2} y="16" textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>a = 84</text>

      {/* dimension: G1 tip diam */}
      <line x1={G1.cx - G1.tipR} y1={G1.cy + G1.tipR + 6} x2={G1.cx - G1.tipR} y2={G1.cy + G1.tipR + 20} stroke={sd} strokeWidth="0.5" />
      <line x1={G1.cx + G1.tipR} y1={G1.cy + G1.tipR + 6} x2={G1.cx + G1.tipR} y2={G1.cy + G1.tipR + 20} stroke={sd} strokeWidth="0.5" />
      <line x1={G1.cx - G1.tipR} y1={G1.cy + G1.tipR + 16} x2={G1.cx + G1.tipR} y2={G1.cy + G1.tipR + 16} stroke={sd} strokeWidth="0.6" />
      <ArrowL x={G1.cx - G1.tipR} y={G1.cy + G1.tipR + 16} c={sd} />
      <ArrowR x={G1.cx + G1.tipR} y={G1.cy + G1.tipR + 16} c={sd} />
      <text x={G1.cx} y={G1.cy + G1.tipR + 14} textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>Ø128 h6</text>

      {/* ratio annotation */}
      <text x="196" y="96" fontSize="7" fill={C.accent} fontFamily={mono}>i = 2:1</text>
      <text x="196" y="106" fontSize="6" fill={tx} fontFamily={mono}>ALT-GMP</text>

      <text x="4" y="156" fontSize="5" fill={tx} fontFamily={mono}>ENGR-ALT-001</text>
    </svg>
  );
}
