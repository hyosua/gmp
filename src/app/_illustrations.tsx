/* ─────────────────────────────────────────────────────────────
   Illustrations SVG — style dessin technique / blueprint
   Toutes les illustrations sont en line art, sans dépendances.
   ───────────────────────────────────────────────────────────── */

/* ── helpers ──────────────────────────────────────────────── */

/** Generates gear teeth as rotated rectangles around a center */
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

/** Arrowhead pointing left at (x,y) */
function ArrowL({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x + 6},${y - 3} ${x + 6},${y + 3}`} fill={c} />;
}
/** Arrowhead pointing right at (x,y) */
function ArrowR({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 6},${y - 3} ${x - 6},${y + 3}`} fill={c} />;
}
/** Arrowhead pointing up at (x,y) */
function ArrowU({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 3},${y + 6} ${x + 3},${y + 6}`} fill={c} />;
}
/** Arrowhead pointing down at (x,y) */
function ArrowD({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 3},${y - 6} ${x + 3},${y - 6}`} fill={c} />;
}

/* ═══════════════════════════════════════════════════════════════
   1. ASSEMBLAGE D'ENGRENAGES — hero (white-on-teal)
   Deux engrenages droits en prise, arbre, roulements, cotations
   ═══════════════════════════════════════════════════════════════ */

export function IllustrationGearAssembly({ className = "" }: { className?: string }) {
  const s   = "rgba(255,255,255,0.85)";   // main stroke
  const sd  = "rgba(255,255,255,0.35)";   // dim / secondary
  const sc  = "rgba(255,255,255,0.25)";   // centerlines
  const sf  = "rgba(255,255,255,0.06)";   // face fill
  const sh  = "rgba(255,255,255,0.15)";   // hatch fill
  const tx  = "rgba(255,255,255,0.55)";   // annotation text

  // Gear 1 (large, left) — pitch radius 90, ratio 2:1
  const G1 = { cx: 148, cy: 152, pitchR: 90, tipR: 103, rootR: 80, hub: 34, bore: 16, teeth: 18, tw: 15 };
  // Gear 2 (small, right) — pitch radius 45
  const G2 = { cx: 283, cy: 152, pitchR: 45, tipR: 52, rootR: 38, hub: 18, bore: 9, teeth: 9, tw: 10 };
  // centre distance: 283-148=135, G1.pitchR+G2.pitchR=135 ✓

  const mono = "monospace";

  return (
    <svg viewBox="0 0 460 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatchW" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={sd} strokeWidth="0.8" />
        </pattern>
        {/* clip circles */}
        <clipPath id="clipG1"><circle cx={G1.cx} cy={G1.cy} r={G1.tipR + 1} /></clipPath>
        <clipPath id="clipG2"><circle cx={G2.cx} cy={G2.cy} r={G2.tipR + 1} /></clipPath>
      </defs>

      {/* ── outer frame ───────────────────────────────────── */}
      <rect x="4" y="4" width="452" height="292" stroke={sc} strokeWidth="0.5" />

      {/* ── shaft (goes through G1 bore) ───────────────────── */}
      {/* shaft body */}
      <rect x="24" y={G1.cy - G1.bore} width={190} height={G1.bore * 2}
            fill={sf} stroke={s} strokeWidth="0.8" />
      {/* keyway slot top */}
      <rect x="62" y={G1.cy - G1.bore} width="28" height={G1.bore * 0.45}
            fill="rgba(255,255,255,0.12)" stroke={s} strokeWidth="0.6" />
      {/* shaft centerline */}
      <line x1="8" y1={G1.cy} x2="220" y2={G1.cy}
            stroke={sc} strokeWidth="0.6" strokeDasharray="10,3,2,3" />

      {/* ── left bearing (hatched rectangle) ──────────────── */}
      <rect x="24" y={G1.cy - G1.bore - 10} width="20" height={(G1.bore + 10) * 2}
            fill="url(#hatchW)" stroke={s} strokeWidth="0.8" />
      {/* ── mid bearing ───────────────────────────────────── */}
      <rect x="190" y={G1.cy - G1.bore - 8} width="18" height={(G1.bore + 8) * 2}
            fill="url(#hatchW)" stroke={s} strokeWidth="0.8" />

      {/* ── GEAR 1 ─────────────────────────────────────────── */}
      {/* centerlines */}
      <line x1={G1.cx - G1.tipR - 24} y1={G1.cy} x2={G1.cx + G1.tipR + 24} y2={G1.cy}
            stroke={sc} strokeWidth="0.6" strokeDasharray="10,3,2,3" />
      <line x1={G1.cx} y1={G1.cy - G1.tipR - 24} x2={G1.cx} y2={G1.cy + G1.tipR + 24}
            stroke={sc} strokeWidth="0.6" strokeDasharray="10,3,2,3" />
      {/* pitch circle dashed */}
      <circle cx={G1.cx} cy={G1.cy} r={G1.pitchR} stroke={sd} strokeWidth="0.5" strokeDasharray="6,3" />
      {/* body fill */}
      <circle cx={G1.cx} cy={G1.cy} r={G1.rootR} fill={sf} />
      {/* spokes (4) */}
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={a}
            x1={G1.cx + G1.hub * Math.cos(rad)} y1={G1.cy + G1.hub * Math.sin(rad)}
            x2={G1.cx + G1.rootR * Math.cos(rad)} y2={G1.cy + G1.rootR * Math.sin(rad)}
            stroke={s} strokeWidth="5" strokeLinecap="square"
          />
        );
      })}
      {/* root circle */}
      <circle cx={G1.cx} cy={G1.cy} r={G1.rootR} stroke={s} strokeWidth="0.8" />
      {/* hub */}
      <circle cx={G1.cx} cy={G1.cy} r={G1.hub} fill={sh} stroke={s} strokeWidth="0.8" />
      {/* bore */}
      <circle cx={G1.cx} cy={G1.cy} r={G1.bore} fill="rgba(0,0,0,0)" stroke={s} strokeWidth="0.9" />
      {/* teeth */}
      <GearTeeth cx={G1.cx} cy={G1.cy} rootR={G1.rootR} tipR={G1.tipR}
        count={G1.teeth} tw={G1.tw} stroke={s} fill={sf} />

      {/* ── GEAR 2 ─────────────────────────────────────────── */}
      <line x1={G2.cx - G2.tipR - 18} y1={G2.cy} x2={G2.cx + G2.tipR + 18} y2={G2.cy}
            stroke={sc} strokeWidth="0.6" strokeDasharray="10,3,2,3" />
      <line x1={G2.cx} y1={G2.cy - G2.tipR - 18} x2={G2.cx} y2={G2.cy + G2.tipR + 18}
            stroke={sc} strokeWidth="0.6" strokeDasharray="10,3,2,3" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.pitchR} stroke={sd} strokeWidth="0.5" strokeDasharray="4,2" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.rootR} fill={sf} />
      {/* spokes G2 */}
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={a}
            x1={G2.cx + G2.hub * Math.cos(rad)} y1={G2.cy + G2.hub * Math.sin(rad)}
            x2={G2.cx + G2.rootR * Math.cos(rad)} y2={G2.cy + G2.rootR * Math.sin(rad)}
            stroke={s} strokeWidth="3" strokeLinecap="square"
          />
        );
      })}
      <circle cx={G2.cx} cy={G2.cy} r={G2.rootR} stroke={s} strokeWidth="0.8" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.hub} fill={sh} stroke={s} strokeWidth="0.8" />
      <circle cx={G2.cx} cy={G2.cy} r={G2.bore} stroke={s} strokeWidth="0.9" />
      <GearTeeth cx={G2.cx} cy={G2.cy} rootR={G2.rootR} tipR={G2.tipR}
        count={G2.teeth} tw={G2.tw} stroke={s} fill={sf} />

      {/* ── Dimension: G1 tip diameter ────────────────────── */}
      {/* extension lines */}
      <line x1={G1.cx - G1.tipR} y1={G1.cy + G1.tipR + 8} x2={G1.cx - G1.tipR} y2={G1.cy + G1.tipR + 28}
            stroke={sd} strokeWidth="0.6" />
      <line x1={G1.cx + G1.tipR} y1={G1.cy + G1.tipR + 8} x2={G1.cx + G1.tipR} y2={G1.cy + G1.tipR + 28}
            stroke={sd} strokeWidth="0.6" />
      {/* dim line */}
      <line x1={G1.cx - G1.tipR} y1={G1.cy + G1.tipR + 22} x2={G1.cx + G1.tipR} y2={G1.cy + G1.tipR + 22}
            stroke={sd} strokeWidth="0.6" />
      <ArrowL x={G1.cx - G1.tipR} y={G1.cy + G1.tipR + 22} c={sd} />
      <ArrowR x={G1.cx + G1.tipR} y={G1.cy + G1.tipR + 22} c={sd} />
      <text x={G1.cx} y={G1.cy + G1.tipR + 20} textAnchor="middle"
            fontSize="8" fill={tx} fontFamily={mono}>Ø 206 h6</text>

      {/* ── Dimension: bore G1 ────────────────────────────── */}
      <line x1={G1.cx + G1.bore} y1={G1.cy - 6} x2={G1.cx + 55} y2={G1.cy - 42}
            stroke={sd} strokeWidth="0.5" />
      <text x={G1.cx + 57} y={G1.cy - 45} fontSize="7.5" fill={tx} fontFamily={mono}>Ø 32 H7</text>

      {/* ── Dimension: shaft length ───────────────────────── */}
      <line x1="24" y1={G1.cy + G1.bore + 12} x2="208" y2={G1.cy + G1.bore + 12}
            stroke={sd} strokeWidth="0.6" />
      <ArrowL x={24} y={G1.cy + G1.bore + 12} c={sd} />
      <ArrowR x={208} y={G1.cy + G1.bore + 12} c={sd} />
      <line x1="24" y1={G1.cy + G1.bore + 5} x2="24" y2={G1.cy + G1.bore + 16}
            stroke={sd} strokeWidth="0.5" />
      <line x1="208" y1={G1.cy + G1.bore + 5} x2="208" y2={G1.cy + G1.bore + 16}
            stroke={sd} strokeWidth="0.5" />
      <text x={116} y={G1.cy + G1.bore + 10} textAnchor="middle"
            fontSize="7.5" fill={tx} fontFamily={mono}>L = 184</text>

      {/* ── Dimension: center distance ────────────────────── */}
      <line x1={G1.cx} y1="30" x2={G2.cx} y2="30"
            stroke={sd} strokeWidth="0.6" />
      <ArrowL x={G1.cx} y={30} c={sd} />
      <ArrowR x={G2.cx} y={30} c={sd} />
      <line x1={G1.cx} y1="18" x2={G1.cx} y2="36" stroke={sd} strokeWidth="0.5" />
      <line x1={G2.cx} y1="18" x2={G2.cx} y2="36" stroke={sd} strokeWidth="0.5" />
      <text x={(G1.cx + G2.cx) / 2} y="28" textAnchor="middle"
            fontSize="7.5" fill={tx} fontFamily={mono}>a = 135</text>

      {/* ── Surface finish mark (on G1) ───────────────────── */}
      <text x={G1.cx + G1.tipR + 16} y={G1.cy - 20} fontSize="7" fill={tx} fontFamily={mono}>Ra 1.6</text>
      <path d={`M ${G1.cx + G1.tipR + 14} ${G1.cy - 16} l -4 8 l 4 0`}
            stroke={tx} strokeWidth="0.6" />

      {/* ── Title block ───────────────────────────────────── */}
      <rect x="310" y="264" width="144" height="30" stroke={sc} strokeWidth="0.5" />
      <line x1="310" y1="277" x2="454" y2="277" stroke={sc} strokeWidth="0.3" />
      <line x1="380" y1="264" x2="380" y2="294" stroke={sc} strokeWidth="0.3" />
      <text x="315" y="274" fontSize="6" fill={sd} fontFamily={mono}>ASSEMBLAGE ENGRENAGES</text>
      <text x="315" y="289" fontSize="6" fill={sd} fontFamily={mono}>GMP-ASS-001 · m=4 · i=2</text>
      <text x="384" y="274" fontSize="6" fill={sd} fontFamily={mono}>IUT ÉVRY</text>
      <text x="384" y="289" fontSize="6" fill={sd} fontFamily={mono}>REV. A · 2026</text>

      {/* ── module / module annotation ─────────────────────── */}
      <text x="16" y="282" fontSize="6.5" fill={sd} fontFamily={mono}>ENGRENAGE DROIT · m = 4 · z₁=18 / z₂=9</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. STATION CAO — parcours BUT (teal on white)
   Étudiant à une station de conception assistée par ordinateur
   ═══════════════════════════════════════════════════════════════ */

export function IllustrationCAO({ className = "" }: { className?: string }) {
  const s  = "#0d9488";
  const sd = "#81adc8";
  const sf = "rgba(13,148,136,0.06)";

  return (
    <svg viewBox="0 0 240 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatchT" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={sd} strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* frame */}
      <rect x="2" y="2" width="236" height="156" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />

      {/* ── desk ───────────────────────────────────────────── */}
      <rect x="28" y="118" width="184" height="8" fill={sf} stroke={s} strokeWidth="0.8" />
      {/* desk legs */}
      <rect x="36" y="126" width="6" height="18" fill={sf} stroke={s} strokeWidth="0.7" />
      <rect x="198" y="126" width="6" height="18" fill={sf} stroke={s} strokeWidth="0.7" />
      {/* desk top extension */}
      <line x1="28" y1="118" x2="212" y2="118" stroke={s} strokeWidth="1" />

      {/* ── monitor stand ─────────────────────────────────── */}
      <rect x="108" y="110" width="24" height="10" fill={sf} stroke={s} strokeWidth="0.7" />
      {/* stand neck */}
      <rect x="117" y="76" width="6" height="34" fill={sf} stroke={s} strokeWidth="0.7" />

      {/* ── monitor ───────────────────────────────────────── */}
      <rect x="68" y="42" width="104" height="72" rx="0" fill="rgba(13,148,136,0.04)" stroke={s} strokeWidth="1" />
      {/* screen bezel inner */}
      <rect x="74" y="47" width="92" height="62" fill="rgba(13,148,136,0.08)" stroke={sd} strokeWidth="0.5" />

      {/* ── CAD wireframe on screen — a mechanical part ───── */}
      {/* Front face of a step-shaft cross-section */}
      {/* main cylinder */}
      <ellipse cx="120" cy="78" rx="28" ry="18" stroke={s} strokeWidth="0.8" fill="none" />
      {/* inner bore */}
      <ellipse cx="120" cy="78" rx="14" ry="9" stroke={s} strokeWidth="0.5" strokeDasharray="3,2" fill="none" />
      {/* construction lines */}
      <line x1="92" y1="78" x2="148" y2="78" stroke={sd} strokeWidth="0.4" strokeDasharray="4,2" />
      <line x1="120" y1="60" x2="120" y2="96" stroke={sd} strokeWidth="0.4" strokeDasharray="4,2" />
      {/* hidden lines (dashed) */}
      <line x1="74" y1="72" x2="166" y2="72" stroke={sd} strokeWidth="0.4" strokeDasharray="2,2" />
      <line x1="74" y1="84" x2="166" y2="84" stroke={sd} strokeWidth="0.4" strokeDasharray="2,2" />
      {/* dimension annotation on screen */}
      <text x="149" y="64" fontSize="5.5" fill={s} fontFamily="monospace">Ø56</text>
      <text x="120" y="58" textAnchor="middle" fontSize="5" fill={sd} fontFamily="monospace">L=120</text>

      {/* ── keyboard ──────────────────────────────────────── */}
      <rect x="80" y="112" width="80" height="8" rx="0" fill={sf} stroke={s} strokeWidth="0.7" />
      {/* key rows */}
      {[0, 1, 2].map((row) => (
        Array.from({ length: 8 }, (_, col) => (
          <rect key={`${row}-${col}`}
            x={83 + col * 9.5} y={113.5 + row * 2}
            width={7.5} height={1.2}
            fill={s} opacity={0.15}
          />
        ))
      ))}

      {/* ── mouse ─────────────────────────────────────────── */}
      <ellipse cx="177" cy="114" rx="7" ry="10" fill={sf} stroke={s} strokeWidth="0.7" />
      <line x1="177" y1="104" x2="177" y2="110" stroke={s} strokeWidth="0.4" />

      {/* ── student silhouette ────────────────────────────── */}
      {/* head */}
      <circle cx="56" cy="85" r="12" fill={sf} stroke={s} strokeWidth="0.9" />
      {/* neck */}
      <line x1="56" y1="97" x2="56" y2="106" stroke={s} strokeWidth="3" strokeLinecap="round" />
      {/* body */}
      <path d="M 42 118 Q 42 106 56 106 Q 70 106 70 118" fill={sf} stroke={s} strokeWidth="0.9" />
      {/* arms — reaching toward keyboard */}
      <path d="M 44 110 Q 60 112 80 115" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 68 110 Q 74 112 80 115" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      {/* hair (simple arc) */}
      <path d="M 46 82 Q 56 76 66 82" stroke={s} strokeWidth="1.5" fill="none" />

      {/* ── annotations ───────────────────────────────────── */}
      <text x="12" y="12" fontSize="5.5" fill={sd} fontFamily="monospace">CAO/FAO · STATION 03</text>
      <text x="12" y="152" fontSize="5" fill={sd} fontFamily="monospace">BUT-GMP · CONCEPTION ASSISTÉE PAR ORDINATEUR</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. TOUR / USINAGE — parcours Licence Pro (teal on white)
   Vue schématique d'un tour avec pièce en coupe et cotations
   ═══════════════════════════════════════════════════════════════ */

export function IllustrationUsinage({ className = "" }: { className?: string }) {
  const s  = "#0d9488";
  const sd = "#81adc8";
  const sf = "rgba(13,148,136,0.06)";
  const sh = "rgba(129,173,200,0.15)";

  // Shaft profile points (step shaft, half-section top)
  // Drawn as a profile then mirrored
  const cy = 80; // centerline Y

  // Profile: left end → step 1 → step 2 → right end (top half)
  const profile = [
    [30, cy - 10],   // left top
    [30, cy - 18],   // step up
    [90, cy - 18],   // shoulder top
    [90, cy - 28],   // step 2 up
    [190, cy - 28],  // main body top
    [190, cy - 18],  // step down right
    [210, cy - 18],  // right shoulder
    [210, cy - 10],  // right step down
    [220, cy - 10],  // tip
    [220, cy],       // to centerline
    [30, cy],        // back along centerline
    [30, cy - 10],   // close
  ];

  const bottomProfile = [
    [30, cy + 10],
    [30, cy + 18],
    [90, cy + 18],
    [90, cy + 28],
    [190, cy + 28],
    [190, cy + 18],
    [210, cy + 18],
    [210, cy + 10],
    [220, cy + 10],
    [220, cy],
    [30, cy],
    [30, cy + 10],
  ];

  const toPath = (pts: number[][]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 280 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatchS" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={sd} strokeWidth="0.7" />
        </pattern>
        <clipPath id="shaftClip">
          <path d={toPath(profile)} />
          <path d={toPath(bottomProfile)} />
        </clipPath>
      </defs>

      {/* frame dashes */}
      <rect x="2" y="2" width="276" height="156" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />

      {/* ── section hatching on shaft ──────────────────────── */}
      <path d={toPath(profile)} fill="url(#hatchS)" />
      <path d={toPath(bottomProfile)} fill="url(#hatchS)" />
      {/* shaft outline */}
      <path d={toPath(profile)} stroke={s} strokeWidth="1.1" />
      <path d={toPath(bottomProfile)} stroke={s} strokeWidth="1.1" />

      {/* ── center line ───────────────────────────────────── */}
      <line x1="12" y1={cy} x2="268" y2={cy}
            stroke={sd} strokeWidth="0.6" strokeDasharray="10,3,2,3" />

      {/* ── cutting tool ──────────────────────────────────── */}
      {/* tool body */}
      <rect x="185" y={cy - 42} width="50" height="14" fill={sf} stroke={s} strokeWidth="0.8" />
      {/* tool tip (triangle insert) */}
      <polygon points={`185,${cy - 42} 185,${cy - 28} 172,${cy - 35}`}
               fill="rgba(13,148,136,0.2)" stroke={s} strokeWidth="0.8" />
      {/* tool holder */}
      <rect x="230" y={cy - 46} width="30" height="22" fill={sh} stroke={s} strokeWidth="0.7" />
      {/* feed arrow */}
      <line x1="190" y1={cy - 50} x2="185" y2={cy - 42} stroke={s} strokeWidth="0.7" />
      <ArrowD x={185} y={cy - 42} c={s} />
      <text x="165" y={cy - 54} fontSize="6" fill={sd} fontFamily="monospace">Vf →</text>

      {/* ── lathe chuck (left, schematic) ─────────────────── */}
      <circle cx="22" cy={cy} r="16" fill={sf} stroke={s} strokeWidth="0.9" />
      <circle cx="22" cy={cy} r="8" fill="rgba(13,148,136,0.1)" stroke={s} strokeWidth="0.7" />
      {/* 3 jaws */}
      {[0, 120, 240].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect key={a}
            x={22 - 2} y={cy - 16}
            width={4} height={8}
            fill={sh} stroke={s} strokeWidth="0.6"
            transform={`rotate(${a}, 22, ${cy})`}
          />
        );
      })}
      {/* rotation arrow */}
      <path d={`M 8 ${cy - 20} A 22 22 0 0 1 36 ${cy - 20}`}
            stroke={s} strokeWidth="0.8" markerEnd="url(#arr)" strokeDasharray="none" />
      <text x="14" y={cy - 24} fontSize="5.5" fill={sd} fontFamily="monospace">n →</text>

      {/* ── chip representation ───────────────────────────── */}
      <path d={`M 172 ${cy - 35} Q 162 ${cy - 48} 155 ${cy - 40} Q 148 ${cy - 30} 155 ${cy - 25}`}
            stroke={s} strokeWidth="0.7" strokeDasharray="2,1" />
      <path d={`M 172 ${cy - 35} Q 168 ${cy - 52} 160 ${cy - 46}`}
            stroke={s} strokeWidth="0.5" strokeDasharray="2,1" />

      {/* ── dimensions ─────────────────────────────────────── */}
      {/* Main diameter */}
      <line x1="90" y1={cy - 28 - 5} x2="90" y2={cy - 28 - 22}
            stroke={sd} strokeWidth="0.5" />
      <line x1="190" y1={cy - 28 - 5} x2="190" y2={cy - 28 - 22}
            stroke={sd} strokeWidth="0.5" />
      <line x1="90" y1={cy - 28 - 16} x2="190" y2={cy - 28 - 16}
            stroke={sd} strokeWidth="0.6" />
      <ArrowL x={90} y={cy - 28 - 16} c={sd} />
      <ArrowR x={190} y={cy - 28 - 16} c={sd} />
      <text x={140} y={cy - 28 - 18} textAnchor="middle"
            fontSize="7" fill={s} fontFamily="monospace">L = 100</text>

      {/* Diameter annotation (vertical) */}
      <line x1="255" y1={cy - 28} x2="265" y2={cy - 28} stroke={sd} strokeWidth="0.5" />
      <line x1="255" y1={cy + 28} x2="265" y2={cy + 28} stroke={sd} strokeWidth="0.5" />
      <line x1="260" y1={cy - 28} x2="260" y2={cy + 28} stroke={sd} strokeWidth="0.6" />
      <ArrowU x={260} y={cy - 28} c={sd} />
      <ArrowD x={260} y={cy + 28} c={sd} />
      <text x="267" y={cy + 2} fontSize="7" fill={s} fontFamily="monospace">Ø56</text>

      {/* Step diameter */}
      <line x1="30" y1={cy + 18 + 6} x2="30" y2={cy + 18 + 18}
            stroke={sd} strokeWidth="0.5" />
      <line x1="90" y1={cy + 18 + 6} x2="90" y2={cy + 18 + 18}
            stroke={sd} strokeWidth="0.5" />
      <line x1="30" y1={cy + 18 + 12} x2="90" y2={cy + 18 + 12}
            stroke={sd} strokeWidth="0.6" />
      <ArrowL x={30} y={cy + 18 + 12} c={sd} />
      <ArrowR x={90} y={cy + 18 + 12} c={sd} />
      <text x={60} y={cy + 18 + 10} textAnchor="middle"
            fontSize="6.5" fill={s} fontFamily="monospace">l = 60</text>

      {/* surface finish */}
      <text x="100" y={cy - 32} fontSize="6" fill={sd} fontFamily="monospace">Ra 1.6</text>

      {/* annotation */}
      <text x="8" y="12" fontSize="5.5" fill={sd} fontFamily="monospace">TOURNAGE · ARBRE ÉTAGÉ</text>
      <text x="8" y="153" fontSize="5" fill={sd} fontFamily="monospace">LP-PROD · PROCÉDÉS D'USINAGE</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. ROBOT INDUSTRIEL — parcours Alternance (teal on white)
   Bras robotisé 6 axes en vue schématique, enveloppe de travail
   ═══════════════════════════════════════════════════════════════ */

export function IllustrationRobot({ className = "" }: { className?: string }) {
  const s  = "#0d9488";
  const sd = "#81adc8";
  const sf = "rgba(13,148,136,0.08)";
  const sa = "rgba(245,158,11,0.6)";   // amber for end-effector

  return (
    <svg viewBox="0 0 220 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* frame */}
      <rect x="2" y="2" width="216" height="176" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />

      {/* ── work envelope arc ─────────────────────────────── */}
      <path d="M 40 155 A 130 130 0 0 1 200 80" stroke={sd} strokeWidth="0.6" strokeDasharray="5,3" />
      <path d="M 40 155 A 90 90 0 0 1 160 80" stroke={sd} strokeWidth="0.4" strokeDasharray="3,3" />
      <text x="155" y="50" fontSize="5.5" fill={sd} fontFamily="monospace">ENV. TRAVAIL</text>

      {/* ── base ──────────────────────────────────────────── */}
      <rect x="28" y="148" width="50" height="16" fill={sf} stroke={s} strokeWidth="1" />
      {/* base platform */}
      <rect x="18" y="162" width="70" height="8" fill={sf} stroke={s} strokeWidth="0.8" />
      {/* mounting bolts */}
      {[26, 46, 66, 86].map((x) => (
        <circle key={x} cx={x} cy={166} r="2" fill={sf} stroke={s} strokeWidth="0.6" />
      ))}

      {/* ── axis 1 — base rotation ────────────────────────── */}
      <circle cx="53" cy="148" r="8" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="63" y="145" fontSize="5.5" fill={sd} fontFamily="monospace">J1</text>

      {/* ── link 1 — from base up ─────────────────────────── */}
      <rect x="47" y="110" width="12" height="40" fill={sf} stroke={s} strokeWidth="0.9" />

      {/* ── axis 2 ────────────────────────────────────────── */}
      <circle cx="53" cy="110" r="9" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="64" y="108" fontSize="5.5" fill={sd} fontFamily="monospace">J2</text>

      {/* ── link 2 — diagonal upper arm ───────────────────── */}
      {/* from (53,110) to (110, 75) */}
      <line x1="53" y1="110" x2="110" y2="75" stroke={s} strokeWidth="10" strokeLinecap="square" />
      <line x1="53" y1="110" x2="110" y2="75" stroke="white" strokeWidth="7" strokeLinecap="square" />
      <line x1="53" y1="110" x2="110" y2="75" stroke={s} strokeWidth="1" />

      {/* ── axis 3 ────────────────────────────────────────── */}
      <circle cx="110" cy="75" r="8" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="120" y="73" fontSize="5.5" fill={sd} fontFamily="monospace">J3</text>

      {/* ── link 3 — forearm ──────────────────────────────── */}
      {/* from (110,75) to (165, 60) */}
      <line x1="110" y1="75" x2="165" y2="60" stroke={s} strokeWidth="8" strokeLinecap="square" />
      <line x1="110" y1="75" x2="165" y2="60" stroke="white" strokeWidth="5" strokeLinecap="square" />
      <line x1="110" y1="75" x2="165" y2="60" stroke={s} strokeWidth="1" />

      {/* ── axis 4 ────────────────────────────────────────── */}
      <circle cx="165" cy="60" r="7" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="174" y="58" fontSize="5.5" fill={sd} fontFamily="monospace">J4</text>

      {/* ── link 4 — wrist ────────────────────────────────── */}
      {/* from (165,60) to (185,45) */}
      <line x1="165" y1="60" x2="185" y2="45" stroke={s} strokeWidth="6" strokeLinecap="square" />
      <line x1="165" y1="60" x2="185" y2="45" stroke="white" strokeWidth="3.5" strokeLinecap="square" />
      <line x1="165" y1="60" x2="185" y2="45" stroke={s} strokeWidth="0.9" />

      {/* ── axis 5 ────────────────────────────────────────── */}
      <circle cx="185" cy="45" r="6" fill={sf} stroke={s} strokeWidth="0.9" />
      <text x="193" y="43" fontSize="5.5" fill={sd} fontFamily="monospace">J5</text>

      {/* ── end effector / gripper ────────────────────────── */}
      {/* from (185,45) to (200,32) */}
      <line x1="185" y1="45" x2="200" y2="32" stroke={s} strokeWidth="4" />
      <line x1="185" y1="45" x2="200" y2="32" stroke="white" strokeWidth="2" />
      {/* gripper jaws */}
      <line x1="200" y1="32" x2="207" y2="25" stroke={sa} strokeWidth="2" strokeLinecap="round" />
      <line x1="200" y1="32" x2="207" y2="36" stroke={sa} strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="32" r="4" fill="rgba(245,158,11,0.15)" stroke={sa} strokeWidth="0.8" />

      {/* ── tool center point annotation ──────────────────── */}
      <line x1="207" y1="30" x2="214" y2="20" stroke={sd} strokeWidth="0.5" />
      <text x="188" y="18" fontSize="5.5" fill={sa} fontFamily="monospace">TCP</text>

      {/* ── axis rotation indicators ──────────────────────── */}
      {/* small arc at J2 */}
      <path d="M 45 118 A 14 14 0 0 1 62 104" stroke={s} strokeWidth="0.6" fill="none" markerEnd="none" />

      {/* ── ground / mounting surface ─────────────────────── */}
      <line x1="10" y1="170" x2="100" y2="170" stroke={s} strokeWidth="0.8" />
      {[12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92].map((x) => (
        <line key={x} x1={x} y1="170" x2={x - 4} y2="176" stroke={s} strokeWidth="0.5" />
      ))}

      {/* ── annotations ───────────────────────────────────── */}
      <text x="8" y="12" fontSize="5.5" fill={sd} fontFamily="monospace">ROBOT 6 AXES · SCHÉMA CINÉMATIQUE</text>
      <text x="8" y="175" fontSize="5" fill={sd} fontFamily="monospace">ALT-GMP · INDUSTRIE 4.0 · ROBOTIQUE</text>
    </svg>
  );
}
