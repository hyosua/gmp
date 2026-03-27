"use client";

import {
  Building2,
  ChevronRight,
  Cog,
  GraduationCap,
  LogIn,
  MapPin,
  Repeat2,
  Wrench,
  Zap,
  Flame,
  ArrowRight,
  BarChart3,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { Bebas_Neue, Barlow_Condensed } from "next/font/google";

/* ─── Fonts ─────────────────────────────────────────────────── */

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
});

/* ─── Colour tokens ─────────────────────────────────────────── */

const C = {
  bg:       "#0f172a",
  bgDeep:   "#020617",
  bgCard:   "#1e293b",
  primary:  "#f97316",
  secondary:"#e2e8f0",
  accent:   "#fbbf24",
  border:   "#334155",
  muted:    "#64748b",
  mono:     "var(--font-geist-mono, monospace)",
};

/* ─── Scanlines overlay ─────────────────────────────────────── */

const scanLines: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1,
};

/* ─── Forge grid texture ────────────────────────────────────── */

const forgeGrid: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px),
    linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/* ─── Arrow helpers ─────────────────────────────────────────── */

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

/* ─── Gear teeth helper ─────────────────────────────────────── */

function GearTeeth({
  cx, cy, rootR, tipR, count, tw, stroke, fill,
}: {
  cx: number; cy: number; rootR: number; tipR: number;
  count: number; tw: number; stroke: string; fill: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360;
        return (
          <rect
            key={i}
            x={cx - tw / 2}
            y={cy - tipR}
            width={tw}
            height={tipR - rootR}
            fill={fill}
            stroke={stroke}
            strokeWidth={0.7}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
          />
        );
      })}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SVG 1 — PRESSE DE FORGE (hero)
   Vue de face, schéma technique, lignes de force orange
   ViewBox 400×320
   ═══════════════════════════════════════════════════════════════ */

function IllustrationForgeHero({ className = "" }: { className?: string }) {
  const s  = "#f97316";           // primary stroke orange
  const sd = "rgba(249,115,22,0.4)"; // dim orange
  const sc = "rgba(249,115,22,0.2)"; // centerlines
  const tx = "rgba(249,115,22,0.65)"; // annotation text
  const sf = "rgba(249,115,22,0.07)"; // surface fill
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
      {/* colonne gauche */}
      <rect x="60" y="40" width="28" height="220" fill={sf} stroke={s} strokeWidth="1.2" />
      {/* colonne droite */}
      <rect x="312" y="40" width="28" height="220" fill={sf} stroke={s} strokeWidth="1.2" />

      {/* traverses de bâti (haut) */}
      <rect x="60" y="40" width="280" height="30" fill={sf} stroke={s} strokeWidth="1.2" />
      {/* traverse du milieu */}
      <rect x="60" y="140" width="280" height="20" fill={sf} stroke={s} strokeWidth="1" />

      {/* ── Vérin hydraulique ── */}
      {/* corps vérin */}
      <rect x="160" y="70" width="80" height="80" fill="rgba(249,115,22,0.1)" stroke={s} strokeWidth="1.5" />
      {/* cache fond haut */}
      <rect x="155" y="65" width="90" height="12" fill={sf} stroke={s} strokeWidth="1" />
      {/* piston rod */}
      <rect x="188" y="150" width="24" height="60" fill="rgba(249,115,22,0.12)" stroke={s} strokeWidth="1.5" />
      {/* joint/presse-étoupe */}
      <rect x="184" y="148" width="32" height="8" fill={sf} stroke={s} strokeWidth="0.8" />

      {/* ── Marteau / outil ── */}
      <rect x="170" y="210" width="60" height="28" fill="rgba(249,115,22,0.15)" stroke={s} strokeWidth="1.8" />
      {/* face active (bas outil) — ligne épaisse */}
      <line x1="170" y1="238" x2="230" y2="238" stroke={s} strokeWidth="2.5" strokeLinecap="square" />

      {/* ── Pièce à forger (sur enclume) ── */}
      <ellipse cx="200" cy="268" rx="42" ry="8" fill="rgba(249,115,22,0.1)" stroke={sd} strokeWidth="1" strokeDasharray="3,2" />
      {/* pièce */}
      <rect x="175" y="255" width="50" height="14" fill="rgba(249,115,22,0.18)" stroke={s} strokeWidth="1.2" />

      {/* ── Enclume / table ── */}
      <rect x="88" y="268" width="224" height="22" fill={sf} stroke={s} strokeWidth="1.2" />
      {/* pied table */}
      <rect x="108" y="290" width="184" height="10" fill={sf} stroke={s} strokeWidth="1" />

      {/* ── Lignes de force (flèches) ── */}
      {/* force appliquée vers le bas */}
      <line x1="200" y1="8" x2="200" y2="40" stroke={C.accent} strokeWidth="1.5" strokeDasharray="4,2" />
      <ArrowD x={200} y={40} c={C.accent} />
      <text x="206" y="30" fontSize="7" fill={C.accent} fontFamily={mono}>F</text>

      {/* force de réaction vers le haut */}
      <line x1="215" y1="290" x2="215" y2="310" stroke={sd} strokeWidth="1" strokeDasharray="3,2" />
      <ArrowU x={215} y={290} c={sd} />
      <text x="220" y="308" fontSize="6.5" fill={tx} fontFamily={mono}>R</text>

      {/* ── Cotations ── */}
      {/* course du piston */}
      <line x1="240" y1="150" x2="240" y2="210" stroke={sd} strokeWidth="0.7" />
      <ArrowU x={240} y={150} c={sd} />
      <ArrowD x={240} y={210} c={sd} />
      <line x1="232" y1="150" x2="248" y2="150" stroke={sd} strokeWidth="0.5" />
      <line x1="232" y1="210" x2="248" y2="210" stroke={sd} strokeWidth="0.5" />
      <text x="244" y="182" fontSize="7" fill={tx} fontFamily={mono}>C=60</text>

      {/* largeur bâti */}
      <line x1="60" y1="308" x2="340" y2="308" stroke={sd} strokeWidth="0.6" />
      <ArrowL x={60} y={308} c={sd} />
      <ArrowR x={340} y={308} c={sd} />
      <text x="200" y="306" textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>L = 280</text>

      {/* hauteur total */}
      <line x1="16" y1="40" x2="16" y2="290" stroke={sd} strokeWidth="0.6" />
      <ArrowU x={16} y={40} c={sd} />
      <ArrowD x={16} y={290} c={sd} />
      <text x="20" y="168" fontSize="7" fill={tx} fontFamily={mono} transform="rotate(-90 20 168)">H=1200</text>

      {/* ── annotations techniques ── */}
      {/* flèche vers vérin */}
      <line x1="244" y1="100" x2="270" y2="88" stroke={sd} strokeWidth="0.6" />
      <circle cx="244" cy="100" r="1.5" fill={sd} />
      <text x="272" y="87" fontSize="7" fill={tx} fontFamily={mono}>VÉRIN Ø80</text>

      {/* flèche vers piston */}
      <line x1="212" y1="180" x2="265" y2="175" stroke={sd} strokeWidth="0.6" />
      <circle cx="212" cy="180" r="1.5" fill={sd} />
      <text x="267" y="178" fontSize="7" fill={tx} fontFamily={mono}>TIGE Ø24</text>

      {/* flèche vers outil */}
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

/* ═══════════════════════════════════════════════════════════════
   SVG 2 — FRAISEUSE CNC (card BUT-GMP)
   Vue de dessus, table de travail, broche, trajectoires en tirets
   ViewBox 240×160
   ═══════════════════════════════════════════════════════════════ */

function IllustrationCNC({ className = "" }: { className?: string }) {
  const s  = "#f97316";
  const sd = "rgba(249,115,22,0.4)";
  const sc = "rgba(249,115,22,0.18)";
  const tx = "rgba(249,115,22,0.6)";
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
      {/* marque rotation */}
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
      {/* passe 1 */}
      <path d="M 85 55 L 155 55" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="155,55 149,52 149,58" fill={s} />
      {/* passe 2 */}
      <path d="M 155 65 L 85 65" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="85,65 91,62 91,68" fill={s} />
      {/* passe 3 */}
      <path d="M 85 75 L 155 75" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="155,75 149,72 149,78" fill={s} />
      {/* passe 4 */}
      <path d="M 155 85 L 85 85" stroke={s} strokeWidth="1" strokeDasharray="4,2" />
      <polygon points="85,85 91,82 91,88" fill={s} />
      {/* liaison passes — descente */}
      <path d="M 155 55 L 155 65 M 85 65 L 85 75 M 155 75 L 155 85" stroke={sd} strokeWidth="0.6" strokeDasharray="2,2" />

      {/* ── Porte-outil schéma ── */}
      <rect x="113" y="25" width="14" height="22" fill={sf} stroke={sd} strokeWidth="0.6" />
      {/* flèche descente Z */}
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

/* ═══════════════════════════════════════════════════════════════
   SVG 3 — CHAÎNE DE PRODUCTION (card Licence Pro)
   Ligne de fabrication : convoyeur, postes, robot bras, flux
   ViewBox 280×160
   ═══════════════════════════════════════════════════════════════ */

function IllustrationChaine({ className = "" }: { className?: string }) {
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
      {/* rouleaux convoyeur */}
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
      {/* outil */}
      <line x1="37" y1="90" x2="37" y2="100" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="37,100 33,94 41,94" fill={s} />

      {/* ── Poste 2 — Robot bras ── */}
      {/* socle */}
      <rect x="108" y="70" width="18" height="32" fill={sf} stroke={s} strokeWidth="1" />
      {/* bras 1 */}
      <line x1="117" y1="70" x2="117" y2="48" stroke={s} strokeWidth="2.5" strokeLinecap="round" />
      {/* bras 2 (orienté) */}
      <line x1="117" y1="48" x2="138" y2="36" stroke={s} strokeWidth="2" strokeLinecap="round" />
      {/* articulation 1 */}
      <circle cx="117" cy="48" r="4" fill={sf} stroke={s} strokeWidth="1" />
      {/* pince */}
      <line x1="138" y1="36" x2="143" y2="30" stroke={s} strokeWidth="1.5" />
      <line x1="138" y1="36" x2="143" y2="40" stroke={s} strokeWidth="1.5" />
      {/* articulation haut */}
      <circle cx="138" cy="36" r="3" fill={sf} stroke={s} strokeWidth="0.8" />
      <text x="148" y="32" fontSize="6" fill={tx} fontFamily={mono}>ROBOT</text>
      <text x="148" y="40" fontSize="5.5" fill={sd} fontFamily={mono}>6-DOF</text>

      {/* ── Poste 3 — Contrôle qualité ── */}
      <rect x="208" y="50" width="55" height="42" fill={sf} stroke={s} strokeWidth="1.1" />
      <text x="235" y="67" textAnchor="middle" fontSize="7" fill={tx} fontFamily={mono}>CTRL</text>
      <text x="235" y="77" textAnchor="middle" fontSize="6" fill={tx} fontFamily={mono}>QUALITÉ</text>
      <text x="235" y="87" textAnchor="middle" fontSize="6" fill={sd} fontFamily={mono}>P03</text>
      {/* symbole check */}
      <polyline points="224,72 230,80 246,62" stroke={s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── Flèches de flux ── */}
      {/* entrée */}
      <line x1="5" y1="107" x2="10" y2="107" stroke={C.accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <polygon points="10,107 6,104 6,110" fill={C.accent} />
      <text x="2" y="99" fontSize="6" fill={C.accent} fontFamily={mono}>IN</text>
      {/* flux poste 1 → robot */}
      <line x1="62" y1="72" x2="108" y2="84" stroke={sd} strokeWidth="0.8" strokeDasharray="3,2" />
      <polygon points="108,84 103,80 101,86" fill={sd} />
      {/* flux robot → poste 3 */}
      <line x1="126" y1="84" x2="208" y2="78" stroke={sd} strokeWidth="0.8" strokeDasharray="3,2" />
      <polygon points="208,78 203,74 202,80" fill={sd} />
      {/* sortie */}
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

/* ═══════════════════════════════════════════════════════════════
   SVG 4 — ENGRENAGES (card Alternance) — palette orange/sombre
   Adapté de IllustrationGearAssembly mais couleurs forge
   ═══════════════════════════════════════════════════════════════ */

function IllustrationEngrenagesSombre({ className = "" }: { className?: string }) {
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

/* ─── Tag component ─────────────────────────────────────────── */

function Tag({ children }: { children: React.ReactNode }) {
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

/* ─── Section label ─────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
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

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */

function Nav() {
  return (
    <nav
      style={{
        background: C.bg,
        borderBottom: `2px solid ${C.primary}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cog
              style={{ width: "16px", height: "16px", color: C.bgDeep }}
              strokeWidth={2.5}
            />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-bebas, sans-serif)",
                fontSize: "1.5rem",
                color: C.secondary,
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              GMP
            </span>
            <span
              style={{
                marginLeft: "0.5rem",
                fontFamily: C.mono,
                fontSize: "0.65rem",
                color: C.muted,
                letterSpacing: "0.1em",
              }}
            >
              IUT d'Évry
            </span>
          </div>
        </div>

        {/* links */}
        <div style={{ display: "flex", gap: "0.25rem" }} className="hidden md:flex">
          {["Formation", "Entreprises", "Actualités", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                padding: "0.375rem 0.875rem",
                fontSize: "0.75rem",
                color: C.muted,
                fontFamily: "var(--font-barlow, sans-serif)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {item}
            </a>
          ))}
        </div>

        {/* cta */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1.1rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            fontFamily: "var(--font-bebas, sans-serif)",
            letterSpacing: "0.12em",
            background: "transparent",
            color: C.primary,
            border: `1px solid ${C.primary}`,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.primary;
            e.currentTarget.style.color = C.bgDeep;
            e.currentTarget.style.boxShadow = `2px 2px 0 ${C.accent}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.primary;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <LogIn style={{ width: "13px", height: "13px" }} />
          CONNEXION
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section
      style={{
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* forge grid texture */}
      <div style={forgeGrid} />
      {/* scanlines */}
      <div style={scanLines} />

      {/* vertical accent stripe left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: `linear-gradient(180deg, transparent, ${C.primary}, transparent)`,
          zIndex: 2,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* 2-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* ── left col: text ── */}
          <div>
            {/* eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              <Flame style={{ width: "12px", height: "12px", color: C.primary }} />
              <span
                style={{
                  fontFamily: C.mono,
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: C.primary,
                  textTransform: "uppercase" as const,
                }}
              >
                IUT d'Évry-Courcouronnes · Université Paris-Saclay
              </span>
            </div>

            {/* main title */}
            <h1
              style={{
                fontFamily: "var(--font-bebas, sans-serif)",
                fontSize: "clamp(4rem, 9vw, 7.5rem)",
                lineHeight: 0.92,
                color: C.secondary,
                marginBottom: "0.5rem",
                letterSpacing: "0.02em",
              }}
            >
              Génie Mécanique
              <br />
              <span style={{ color: C.primary }}>&amp; Productique</span>
            </h1>

            {/* sub-title tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.75rem",
                marginTop: "0.5rem",
              }}
            >
              <div style={{ width: "8px", height: "8px", background: C.accent }} />
              <span
                style={{
                  fontFamily: C.mono,
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: `${C.secondary}80`,
                  textTransform: "uppercase" as const,
                }}
              >
                Dept. GMP · BUT · Licence Pro · Alternance
              </span>
            </div>

            {/* description */}
            <p
              style={{
                fontFamily: "var(--font-barlow, sans-serif)",
                fontWeight: 400,
                fontSize: "1.1rem",
                color: `${C.secondary}90`,
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              Formez-vous aux métiers de l'industrie de demain —
              conception assistée par ordinateur, fabrication additive,
              robotique et méthodes de production dans un département
              à taille humaine, au cœur de l'Essonne.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const, marginBottom: "3rem" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  fontFamily: "var(--font-bebas, sans-serif)",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  background: C.primary,
                  color: C.bgDeep,
                  border: `1px solid ${C.primary}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ea6a0a";
                  e.currentTarget.style.boxShadow = `3px 3px 0 ${C.accent}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.primary;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Découvrir la formation
                <ChevronRight style={{ width: "16px", height: "16px" }} />
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  fontFamily: "var(--font-bebas, sans-serif)",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  background: "transparent",
                  color: C.secondary,
                  border: `1px solid ${C.border}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.secondary;
                  e.currentTarget.style.boxShadow = `2px 2px 0 ${C.secondary}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Espace entreprises
              </button>
            </div>

            {/* stats bar */}
            <div
              style={{
                borderTop: `1px solid ${C.border}`,
                paddingTop: "2rem",
                display: "flex",
                gap: "0",
                flexWrap: "wrap" as const,
              }}
            >
              {[
                { val: "120+", label: "ÉTUDIANTS/AN" },
                { val: "87%", label: "INSERTION PRO" },
                { val: "40+", label: "ENTREPRISES" },
                { val: "3", label: "PARCOURS" },
              ].map(({ val, label }, i) => (
                <div
                  key={label}
                  style={{
                    paddingRight: "2rem",
                    marginRight: "2rem",
                    borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-bebas, sans-serif)",
                      fontSize: "2.25rem",
                      color: C.primary,
                      lineHeight: 1,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {val}
                  </p>
                  <p
                    style={{
                      fontFamily: C.mono,
                      fontSize: "0.6rem",
                      color: `${C.secondary}40`,
                      letterSpacing: "0.15em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── right col: photo + illustration ── */}
          <div style={{ position: "relative" }} className="hidden lg:block">
            {/* corner marks */}
            <div
              style={{
                position: "absolute",
                top: "-12px",
                left: "-12px",
                width: "40px",
                height: "40px",
                borderTop: `2px solid ${C.primary}`,
                borderLeft: `2px solid ${C.primary}`,
                zIndex: 4,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-12px",
                right: "-12px",
                width: "40px",
                height: "40px",
                borderBottom: `2px solid ${C.muted}`,
                borderRight: `2px solid ${C.muted}`,
                zIndex: 4,
              }}
            />

            {/* photo ref label */}
            <span
              style={{
                position: "absolute",
                top: "-24px",
                left: 0,
                fontFamily: C.mono,
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: `${C.secondary}25`,
                textTransform: "uppercase" as const,
                zIndex: 4,
              }}
            >
              PHOTO · GMP-STU-001 · FORGE-THEME
            </span>

            {/* photo with orange overlay */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src="/gmp-stud.png"
                alt="Étudiants en atelier de génie mécanique"
                width={680}
                height={480}
                priority
                style={{ width: "100%", height: "auto", objectFit: "cover", filter: "grayscale(100%)" }}
              />
              {/* orange multiply overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(249,115,22,0.45)",
                  mixBlendMode: "multiply",
                }}
              />
              {/* bottom fade */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "80px",
                  background: `linear-gradient(to top, ${C.bg}, transparent)`,
                }}
              />
            </div>

            {/* illustration overlay — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                width: "200px",
                opacity: 0.85,
              }}
            >
              <IllustrationForgeHero className="w-full h-40" />
            </div>
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          zIndex: 3,
        }}
      >
        <div style={{ height: "2px", background: C.primary, width: "80px" }} />
        <div style={{ height: "2px", background: `${C.primary}20`, flex: 1 }} />
        <div style={{ height: "2px", background: C.primary, width: "80px" }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARCOURS — 3 cards
   ═══════════════════════════════════════════════════════════════ */

const parcours = [
  {
    code:  "BUT-GMP",
    title: "BUT Génie Mécanique et Productique",
    duration: "3 ans — 180 ECTS",
    icon: <GraduationCap style={{ width: "20px", height: "20px" }} />,
    description:
      "Formation universitaire technologique complète, de la conception CAO/FAO à la production en série. Alternance dès la 2ᵉ année. Débouchés : ingénierie, méthodes, qualité.",
    tags: ["CAO/FAO", "Méthodes", "Robotique", "Qualité"],
    illustration: <IllustrationCNC className="w-full h-36" />,
  },
  {
    code:  "LP-PROD",
    title: "Licence Pro Production Industrielle",
    duration: "1 an (Bac+2)",
    icon: <BarChart3 style={{ width: "20px", height: "20px" }} />,
    description:
      "Spécialisation rapide pour titulaires d'un BTS/DUT. Accent sur l'optimisation des procédés de fabrication, lean manufacturing et supply chain.",
    tags: ["Lean", "Supply Chain", "ERP", "Gestion prod."],
    illustration: <IllustrationChaine className="w-full h-36" />,
  },
  {
    code:  "ALT-GMP",
    title: "Alternance",
    duration: "BUT 2ᵉ & 3ᵉ année",
    icon: <Repeat2 style={{ width: "20px", height: "20px" }} />,
    description:
      "Combinez formation et expérience professionnelle. Rythme 1 semaine IUT / 3 semaines entreprise. Contrat d'apprentissage ou professionnalisation.",
    tags: ["Contrat app.", "Contrat pro", "1 sem. / 3 sem."],
    illustration: <IllustrationEngrenagesSombre className="w-full h-36" />,
  },
];

function Parcours() {
  return (
    <section
      style={{
        background: C.bgDeep,
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={forgeGrid} />
      <div style={scanLines} />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>03 · Formations disponibles</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-bebas, sans-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: C.secondary,
              lineHeight: 0.95,
              letterSpacing: "0.02em",
            }}
          >
            3 parcours,
            <br />
            <span style={{ color: C.primary }}>une expertise forge</span>
          </h2>
        </div>

        {/* cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {parcours.map(({ code, title, duration, icon, description, tags, illustration }) => (
            <div
              key={code}
              style={{
                border: `1px solid ${C.border}`,
                background: C.bgCard,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = C.primary;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 4px 0 ${C.primary}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* illustration panel */}
              <div
                style={{
                  borderBottom: `1px solid ${C.border}`,
                  background: C.bgDeep,
                  overflow: "hidden",
                  padding: "1rem",
                }}
              >
                {illustration}
              </div>

              <div style={{ padding: "1.75rem" }}>
                {/* code + icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: C.mono,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: C.muted,
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {code}
                  </span>
                  <span style={{ color: C.primary }}>{icon}</span>
                </div>

                {/* duration badge */}
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: C.mono,
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    color: C.accent,
                    border: `1px solid ${C.accent}40`,
                    padding: "2px 8px",
                    marginBottom: "0.875rem",
                  }}
                >
                  {duration}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-bebas, sans-serif)",
                    fontSize: "1.5rem",
                    letterSpacing: "0.04em",
                    color: C.secondary,
                    marginBottom: "0.75rem",
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-barlow, sans-serif)",
                    fontSize: "0.9rem",
                    color: C.muted,
                    lineHeight: 1.6,
                    marginBottom: "1.25rem",
                  }}
                >
                  {description}
                </p>

                {/* tags */}
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.375rem", marginBottom: "1.25rem" }}>
                  {tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>

                {/* cta link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    color: C.primary,
                    fontFamily: "var(--font-barlow, sans-serif)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  En savoir plus
                  <ChevronRight style={{ width: "14px", height: "14px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BANDE PHOTOS — dessin.jpg + machine.jpg
   ═══════════════════════════════════════════════════════════════ */

function BandePhotos() {
  const photos = [
    { src: "/dessin.jpg", alt: "Dessin technique et conception CAO", label: "Conception & Dessin technique", ref: "GMP-DES-001" },
    { src: "/machine.jpg", alt: "Machine-outil en atelier GMP", label: "Atelier & Machines-outils", ref: "GMP-MAC-001" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "300px", overflow: "hidden" }}>
      {photos.map(({ src, alt, label, ref }) => (
        <div key={ref} style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={src}
            alt={alt}
            fill
            style={{
              objectFit: "cover",
              filter: "grayscale(100%)",
              transform: "scale(1.05)",
              transition: "transform 0.5s",
            }}
          />
          {/* orange overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(249,115,22,0.45)",
              mixBlendMode: "multiply",
            }}
          />
          {/* gradient bas */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to top, rgba(2,6,23,0.8), transparent)",
            }}
          />
          {/* label */}
          <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
            <span
              style={{
                fontFamily: C.mono,
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: `${C.secondary}50`,
                textTransform: "uppercase" as const,
                display: "block",
                marginBottom: "4px",
              }}
            >
              PHOTO · {ref}
            </span>
            <p
              style={{
                fontFamily: "var(--font-barlow, sans-serif)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: C.secondary,
              }}
            >
              {label}
            </p>
          </div>
          {/* border-right separator */}
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "1px", background: `${C.primary}30` }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHIFFRES CLÉS
   ═══════════════════════════════════════════════════════════════ */

const metrics = [
  { val: "87%",  label: "Taux d'insertion professionnelle", sub: "à 6 mois après diplomation" },
  { val: "120+", label: "Étudiants formés par an",          sub: "chaque année académique" },
  { val: "40+",  label: "Entreprises partenaires",          sub: "PME, ETI et grands groupes" },
  { val: "#3",   label: "Classement IUT GMP",               sub: "Île-de-France · édition 2025" },
];

function ChiffresClés() {
  return (
    <section
      style={{
        background: C.bgDeep,
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0",
      }}
    >
      {/* machine.jpg background with heavy overlay */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Image
          src="/machine.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", filter: "grayscale(100%)", opacity: 0.08 }}
        />
      </div>
      <div style={scanLines} />

      {/* corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "120px",
          borderBottom: `1px solid ${C.primary}20`,
          borderRight: `1px solid ${C.primary}20`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "120px",
          height: "120px",
          borderTop: `1px solid ${C.primary}20`,
          borderLeft: `1px solid ${C.primary}20`,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionLabel>04 · Données · Année 2025-2026</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: `1px solid ${C.border}`,
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {metrics.map(({ val, label, sub }, i) => (
            <div
              key={val}
              style={{
                padding: "3rem 2rem",
                borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-bebas, sans-serif)",
                  fontSize: "4.5rem",
                  color: C.primary,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                  marginBottom: "0.5rem",
                }}
              >
                {val}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-barlow, sans-serif)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: C.secondary,
                  marginBottom: "0.25rem",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: C.mono,
                  fontSize: "0.6rem",
                  color: C.muted,
                  letterSpacing: "0.05em",
                }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENTREPRISES
   ═══════════════════════════════════════════════════════════════ */

const offres = [
  {
    company: "Renault Group",
    location: "Flins-sur-Seine · 78",
    type: "Alternance",
    title: "Technicien méthodes & industrialisation",
    description:
      "Intégrez l'équipe méthodes de notre usine de production pour optimiser les procédés d'assemblage et participer à la transition industrie 4.0.",
    tags: ["Méthodes", "Lean", "CAO"],
    start: "Sept. 2026",
  },
  {
    company: "Safran Aircraft Engines",
    location: "Villaroche · 77",
    type: "Stage 6 mois",
    title: "Contrôle qualité pièces moteur",
    description:
      "Participation au contrôle dimensionnel et à l'analyse des non-conformités sur pièces de haute précision pour moteurs aéronautiques.",
    tags: ["Qualité", "Métrologie", "Aéro"],
    start: "Fév. 2026",
  },
  {
    company: "PSA Stellantis",
    location: "Poissy · 78",
    type: "Alternance",
    title: "Technicien Process Emboutissage",
    description:
      "Suivi de la fabrication des pièces embouties, analyse des dérives process et propositions d'améliorations sur ligne de presse à froid.",
    tags: ["Process", "Emboutissage", "AMDEC"],
    start: "Sept. 2026",
  },
];

function Entreprises() {
  return (
    <section
      style={{
        background: C.bg,
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={forgeGrid} />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* left — pitch */}
          <div>
            <SectionLabel>05 · Partenariats industriels</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-bebas, sans-serif)",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                color: C.secondary,
                lineHeight: 0.95,
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Recrutez des talents
              <br />
              <span style={{ color: C.primary }}>forgés pour l'industrie</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-barlow, sans-serif)",
                fontSize: "1rem",
                color: C.muted,
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Le département GMP entretient des relations étroites avec les
              acteurs industriels de l'Île-de-France. Proposez vos offres de
              stage, d'alternance ou de projets tuteurés directement à nos
              étudiants qualifiés.
            </p>

            {/* benefits */}
            <div style={{ marginBottom: "2rem" }}>
              {[
                { icon: <Shield style={{ width: "14px", height: "14px" }} />, text: "Étudiants formés aux normes industrielles" },
                { icon: <Wrench style={{ width: "14px", height: "14px" }} />, text: "Maîtrise des outils CAO/FAO & ERP" },
                { icon: <Zap style={{ width: "14px", height: "14px" }} />, text: "Réseau IUT · 40+ entreprises partenaires" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      background: `${C.primary}15`,
                      border: `1px solid ${C.primary}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: C.primary,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-barlow, sans-serif)",
                      fontSize: "0.875rem",
                      color: C.muted,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                fontFamily: "var(--font-bebas, sans-serif)",
                fontSize: "1rem",
                letterSpacing: "0.1em",
                background: C.primary,
                color: C.bgDeep,
                border: `1px solid ${C.primary}`,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ea6a0a";
                e.currentTarget.style.boxShadow = `3px 3px 0 ${C.accent}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = C.primary;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Building2 style={{ width: "14px", height: "14px" }} />
              Déposer une offre
            </button>
          </div>

          {/* right — offer cards */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
            {offres.map(({ company, location, type, title, description, tags, start }) => (
              <div
                key={company}
                style={{
                  border: `1px solid ${C.border}`,
                  background: C.bgCard,
                  padding: "1.5rem",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = C.primary;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `3px 3px 0 ${C.primary}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        background: `${C.primary}15`,
                        border: `1px solid ${C.primary}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Building2 style={{ width: "14px", height: "14px", color: C.primary }} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-barlow, sans-serif)",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: C.secondary,
                        }}
                      >
                        {company}
                      </p>
                      <p
                        style={{
                          fontFamily: C.mono,
                          fontSize: "0.6rem",
                          color: C.muted,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin style={{ width: "9px", height: "9px" }} /> {location}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: C.mono,
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: C.accent,
                      border: `1px solid ${C.accent}30`,
                      padding: "2px 8px",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {type}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-barlow, sans-serif)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: C.secondary,
                    marginBottom: "0.5rem",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-barlow, sans-serif)",
                    fontSize: "0.8rem",
                    color: C.muted,
                    lineHeight: 1.55,
                    marginBottom: "1rem",
                  }}
                >
                  {description}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" as const }}>
                    {tags.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <span
                    style={{
                      fontFamily: C.mono,
                      fontSize: "0.6rem",
                      color: C.muted,
                      letterSpacing: "0.08em",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {start}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer
      style={{
        background: C.bgDeep,
        color: C.secondary,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* top accent bar */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${C.primary}, ${C.accent}, ${C.primary})`,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3.5rem 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {/* brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  background: C.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cog style={{ width: "16px", height: "16px", color: C.bgDeep }} strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-bebas, sans-serif)",
                  fontSize: "1.75rem",
                  color: C.secondary,
                  letterSpacing: "0.1em",
                }}
              >
                GMP
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-barlow, sans-serif)",
                fontSize: "0.875rem",
                color: C.muted,
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              Département Génie Mécanique et Productique
              <br />
              IUT d'Évry-Val-d'Essonne
              <br />
              Université Paris-Saclay
            </p>
          </div>

          {/* nav */}
          <div>
            <p
              style={{
                fontFamily: C.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: C.primary,
                textTransform: "uppercase" as const,
                marginBottom: "1rem",
              }}
            >
              Navigation
            </p>
            {["Formation", "Entreprises", "Actualités", "Connexion"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontFamily: "var(--font-barlow, sans-serif)",
                  fontSize: "0.875rem",
                  color: C.muted,
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {l}
              </a>
            ))}
          </div>

          {/* contact */}
          <div>
            <p
              style={{
                fontFamily: C.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: C.primary,
                textTransform: "uppercase" as const,
                marginBottom: "1rem",
              }}
            >
              Contact
            </p>
            <p
              style={{
                fontFamily: C.mono,
                fontSize: "0.72rem",
                color: C.muted,
                lineHeight: 1.9,
              }}
            >
              23 bd de France
              <br />
              91037 Évry-Courcouronnes
              <br />
              iut-gmp@univ-evry.fr
              <br />
              +33 1 69 47 XX XX
            </p>
          </div>
        </div>

        {/* cartouche industriel */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              fontFamily: C.mono,
              fontSize: "0.58rem",
              color: `${C.secondary}25`,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            <span>DOC: GMP-WEB-FORGE-2026</span>
            <span>REV: 2.0</span>
            <span>CHARTE: FORGE</span>
            <span>IUT ÉVRY · UNIV. PARIS-SACLAY</span>
          </div>
          <p
            style={{
              fontFamily: C.mono,
              fontSize: "0.58rem",
              color: `${C.secondary}25`,
              letterSpacing: "0.1em",
            }}
          >
            © 2026 — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════ */

export default function CharteV2Page() {
  return (
    <div
      className={bebasNeue.variable + " " + barlowCondensed.variable}
      style={{ background: C.bg, minHeight: "100vh" }}
    >
      <Nav />
      <Hero />
      <Parcours />
      <BandePhotos />
      <ChiffresClés />
      <Entreprises />
      <Footer />
    </div>
  );
}
