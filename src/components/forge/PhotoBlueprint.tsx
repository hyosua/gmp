import Image from "next/image";
import { C } from "@/lib/forge";

export function PhotoBlueprint() {
  return (
    <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
      <Image
        src="/gmp-stud.png"
        alt="Étudiants en atelier GMP"
        fill
        priority
        style={{ objectFit: "cover", filter: "grayscale(100%)" }}
      />

      {/* overlay couleur thème */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--c-photo-overlay)",
          mixBlendMode: "multiply",
        }}
      />

      {/* fondu bas */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "linear-gradient(to top, var(--c-bg), transparent)",
        }}
      />

      {/* cadre blueprint SVG */}
      <svg
        viewBox="0 0 400 300"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 5,
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* cadre principal + cadre intérieur tirets */}
        <rect x="1" y="1" width="398" height="298" stroke="var(--c-primary)" strokeWidth="0.8" />
        <rect x="5" y="5" width="390" height="290" stroke="var(--c-primary-20)" strokeWidth="0.5" strokeDasharray="4,3" />

        {/* coin marks */}
        <polyline points="1,22 1,1 22,1"   stroke="var(--c-primary)" strokeWidth="1.5" />
        <polyline points="378,1 399,1 399,22" stroke="var(--c-primary)" strokeWidth="1.5" />
        <polyline points="1,278 1,299 22,299"   stroke="var(--c-muted)" strokeWidth="1.2" />
        <polyline points="378,299 399,299 399,278" stroke="var(--c-muted)" strokeWidth="1.2" />

        {/* titre technique (au-dessus du cadre) */}
        <text x="1" y="-8" fontSize="6" fill="var(--c-primary)" fontFamily="monospace" letterSpacing="2">
          VUE · ATELIER GMP — REF. GMP-STU-001 · ECH. RÉEL
        </text>

        {/* ligne de cote horizontale (en dessous) */}
        <line x1="1"   y1="312" x2="399" y2="312" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <polyline points="1,312 7,309 7,315"     fill="var(--c-primary-30)" stroke="none" />
        <polyline points="399,312 393,309 393,315" fill="var(--c-primary-30)" stroke="none" />
        <line x1="1"   y1="299" x2="1"   y2="316" stroke="var(--c-primary-30)" strokeWidth="0.5" />
        <line x1="399" y1="299" x2="399" y2="316" stroke="var(--c-primary-30)" strokeWidth="0.5" />
        <rect x="155" y="306" width="90" height="12" fill="var(--c-bg)" />
        <text x="200" y="315" textAnchor="middle" fontSize="6.5" fill="var(--c-primary)" fontFamily="monospace">
          L = 720 mm
        </text>

        {/* ligne de cote verticale (à droite) */}
        <line x1="412" y1="1"   x2="412" y2="299" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <polyline points="412,1 409,7 415,7"     fill="var(--c-primary-30)" stroke="none" />
        <polyline points="412,299 409,293 415,293" fill="var(--c-primary-30)" stroke="none" />
        <line x1="399" y1="1"   x2="416" y2="1"   stroke="var(--c-primary-30)" strokeWidth="0.5" />
        <line x1="399" y1="299" x2="416" y2="299" stroke="var(--c-primary-30)" strokeWidth="0.5" />
        <rect x="404" y="138" width="50" height="24" fill="var(--c-bg)" />
        <text
          x="428" y="147"
          textAnchor="middle"
          fontSize="6.5"
          fill="var(--c-primary)"
          fontFamily="monospace"
          transform="rotate(90 428 150)"
        >
          H = 480 mm
        </text>

        {/* annotations — pointeurs techniques */}
        <line x1="280" y1="110" x2="340" y2="80" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <circle cx="280" cy="110" r="2" fill="var(--c-primary-30)" />
        <text x="343" y="84" fontSize="6" fill="var(--c-primary)" fontFamily="monospace">TP · USINAGE</text>

        <line x1="120" y1="180" x2="58" y2="210" stroke="var(--c-primary-30)" strokeWidth="0.7" />
        <circle cx="120" cy="180" r="2" fill="var(--c-primary-30)" />
        <text x="12" y="214" fontSize="6" fill="var(--c-primary)" fontFamily="monospace">ATELIER·B</text>

        {/* axe de symétrie vertical (tirets) */}
        <line x1="200" y1="5" x2="200" y2="295" stroke="var(--c-primary-20)" strokeWidth="0.5" strokeDasharray="8,3,2,3" />

        {/* cartouche bas droite */}
        <rect x="300" y="263" width="98" height="35" fill="var(--c-bg)" fillOpacity="0.85" stroke="var(--c-primary)" strokeWidth="0.7" />
        <line x1="300" y1="273" x2="398" y2="273" stroke="var(--c-primary)" strokeWidth="0.5" />
        <text x="349" y="271" textAnchor="middle" fontSize="5.5" fill="var(--c-primary)" fontFamily="monospace" letterSpacing="1">
          DEPT. GMP · IUT ÉVRY
        </text>
        <text x="349" y="282" textAnchor="middle" fontSize="5" fill={C.muted} fontFamily="monospace">
          UNIV. PARIS-SACLAY · 2026
        </text>
        <text x="349" y="292" textAnchor="middle" fontSize="5" fill={C.muted} fontFamily="monospace">
          REV. A · CONFIDENTIEL
        </text>
      </svg>
    </div>
  );
}
