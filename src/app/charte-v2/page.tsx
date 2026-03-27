"use client";

import { Syne } from "next/font/google";
import {
  Cog,
  Flame,
  GraduationCap,
  Building2,
  Wrench,
  ChevronRight,
  ArrowRight,
  MapPin,
  Zap,
  Shield,
  BarChart3,
  LogIn,
  Mail,
  Phone,
} from "lucide-react";

/* ─── font ──────────────────────────────────────────────────── */

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

/* ─── SVG noise filter (grain texture) ─────────────────────── */

function NoiseFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="forge-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─── scan lines overlay ────────────────────────────────────── */

const scanLinesStyle: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/* ─── colour tokens ─────────────────────────────────────────── */

const C = {
  bg: "#0f172a",
  bgDeep: "#020617",
  bgCard: "#1e293b",
  primary: "#f97316",
  secondary: "#e2e8f0",
  accent: "#fbbf24",
  neutral: "#334155",
  mutedText: "#64748b",
};

/* ─── parcours data ─────────────────────────────────────────── */

const parcours = [
  {
    code: "B.U.T. GMP",
    label: "Génie Mécanique & Productique",
    duree: "3 ans — 180 ECTS",
    desc: "Formation complète en conception CAO/FAO, fabrication additive, robotique industrielle et méthodes de production. Alternance possible dès la 2ᵉ année.",
    icon: <GraduationCap className="w-5 h-5" />,
    tags: ["CAO/FAO", "Robotique", "Méthodes", "Qualité"],
  },
  {
    code: "LP GIIM",
    label: "Gestion Industrielle & Ingénierie des Marchés",
    duree: "1 an — 60 ECTS",
    desc: "Licence professionnelle orientée gestion de production, achats industriels et supply chain. Accès direct avec un bac+2 validé en GMP ou équivalent.",
    icon: <BarChart3 className="w-5 h-5" />,
    tags: ["Supply Chain", "Achats", "ERP", "Production"],
  },
  {
    code: "LP MACS",
    label: "Maintenance et Conception des Systèmes",
    duree: "1 an — 60 ECTS",
    desc: "Spécialisation en maintenance industrielle, diagnostic de pannes, automatismes et pilotage de projets de mise à niveau de lignes de production.",
    icon: <Wrench className="w-5 h-5" />,
    tags: ["Maintenance", "Automatismes", "Diagnostic", "Projet"],
  },
];

/* ─── chiffres data ─────────────────────────────────────────── */

const chiffres = [
  { val: "93%", label: "d'insertion pro\nà 6 mois" },
  { val: "42%", label: "en alternance\nen B.U.T." },
  { val: "180+", label: "entreprises\npartenaires" },
  { val: "28", label: "ans d'existence\ndu département" },
];

/* ─── entreprises data ──────────────────────────────────────── */

const entreprises = [
  {
    nom: "Renault Group",
    lieu: "Flins-sur-Seine (78)",
    offre: "Alternance — Technicien Méthodes Industrialisation",
    tags: ["Méthodes", "CAO", "Production"],
  },
  {
    nom: "Safran Aircraft Engines",
    lieu: "Évry-Courcouronnes (91)",
    offre: "Stage 6 mois — Contrôle qualité pièces turbine",
    tags: ["Qualité", "Métrologie", "Aéronautique"],
  },
  {
    nom: "PSA Stellantis",
    lieu: "Poissy (78)",
    offre: "Alternance — Technicien Process Emboutissage",
    tags: ["Process", "Emboutissage", "Amélioration continue"],
  },
  {
    nom: "Thales Group",
    lieu: "Élancourt (78)",
    offre: "Stage 4 mois — Bureau d'études mécaniques",
    tags: ["Bureau d'études", "SolidWorks", "Défense"],
  },
];

/* ─── components ────────────────────────────────────────────── */

function OrangeLine() {
  return (
    <div
      style={{
        height: "2px",
        background: `linear-gradient(90deg, ${C.primary}, transparent)`,
        marginBottom: "1.5rem",
      }}
    />
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "0.65rem",
        letterSpacing: "0.08em",
        color: C.mutedText,
        border: `1px solid ${C.neutral}`,
        padding: "2px 8px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

/* ─── nav ───────────────────────────────────────────────────── */

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
              width: "28px",
              height: "28px",
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cog
              style={{ width: "16px", height: "16px", color: C.bg }}
              strokeWidth={2.5}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: "1rem",
              color: C.secondary,
              letterSpacing: "0.05em",
            }}
          >
            GMP
            <span
              style={{
                fontWeight: 400,
                fontSize: "0.75rem",
                color: C.mutedText,
                marginLeft: "0.5rem",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-geist-mono, monospace)",
              }}
            >
              IUT d'Évry
            </span>
          </span>
        </div>

        {/* links */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {["Formation", "Entreprises", "Actualités", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "0.8125rem",
                color: C.mutedText,
                fontFamily: "var(--font-geist-mono, monospace)",
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.primary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = C.mutedText)
              }
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
            padding: "0.375rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 700,
            fontFamily: "var(--font-geist-mono, monospace)",
            letterSpacing: "0.06em",
            background: "transparent",
            color: C.primary,
            border: `1px solid ${C.primary}`,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.primary;
            e.currentTarget.style.color = C.bg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.primary;
          }}
        >
          <LogIn style={{ width: "14px", height: "14px" }} />
          CONNEXION
        </button>
      </div>
    </nav>
  );
}

/* ─── hero ──────────────────────────────────────────────────── */

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
      {/* scan lines */}
      <div style={scanLinesStyle} />

      {/* vertical accent line */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: 0,
          bottom: 0,
          width: "1px",
          background: `linear-gradient(180deg, transparent, ${C.primary}40, transparent)`,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
        }}
      >
        {/* eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: C.primary,
            textTransform: "uppercase",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Flame style={{ width: "12px", height: "12px" }} />
          IUT d'Évry-Courcouronnes · Université Paris-Saclay
        </p>

        {/* headline */}
        <h1
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 0.9,
            color: C.secondary,
            marginBottom: "2rem",
            maxWidth: "820px",
            letterSpacing: "-0.02em",
          }}
        >
          GÉNIE
          <br />
          <span style={{ color: C.primary }}>MÉCANIQUE</span>
          <br />
          <span
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 600,
              color: C.mutedText,
              letterSpacing: "0.1em",
            }}
          >
            & PRODUCTIQUE
          </span>
        </h1>

        {/* sub */}
        <p
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.9rem",
            color: C.mutedText,
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Former les techniciens supérieurs qui conçoivent, fabriquent et
          optimisent les systèmes industriels de demain. Atelier numérique,
          machines-outils, robotique, méthodes.
        </p>

        {/* cta row */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.06em",
              background: C.primary,
              color: C.bg,
              border: `1px solid ${C.primary}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 1px ${C.primary}, 0 0 20px ${C.primary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            DÉCOUVRIR LA FORMATION
            <ChevronRight style={{ width: "16px", height: "16px" }} />
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.06em",
              background: "transparent",
              color: C.secondary,
              border: `1px solid ${C.neutral}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 1px ${C.primary}`;
              e.currentTarget.style.borderColor = C.primary;
              e.currentTarget.style.color = C.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = C.neutral;
              e.currentTarget.style.color = C.secondary;
            }}
          >
            ESPACE ENTREPRISES
          </button>
        </div>

        {/* stats row */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: `1px solid ${C.neutral}`,
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "Bac+2 / Bac+3", label: "Niveaux délivrés" },
            { val: "2 sites", label: "Ateliers équipés CNC & FAO" },
            { val: "Sept. 2026", label: "Prochaine rentrée" },
          ].map(({ val, label }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: C.accent,
                  marginBottom: "0.2rem",
                }}
              >
                {val}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "0.7rem",
                  color: C.mutedText,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── section parcours ──────────────────────────────────────── */

function SectionParcours() {
  return (
    <section style={{ background: C.bgCard, padding: "5rem 0" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* heading */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: C.primary,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // 01 — FORMATION
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: C.secondary,
              letterSpacing: "-0.01em",
            }}
          >
            Parcours disponibles
          </h2>
        </div>

        <OrangeLine />

        {/* cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {parcours.map((p) => (
            <div
              key={p.code}
              style={{
                background: C.bg,
                borderLeft: `4px solid ${C.primary}`,
                padding: "1.75rem",
                transition: "box-shadow 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 0 0 1px ${C.primary}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* icon + code */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: `${C.primary}15`,
                    border: `1px solid ${C.primary}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.primary,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-syne, sans-serif)",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      color: C.primary,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {p.code}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "0.65rem",
                      color: C.mutedText,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {p.duree}
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: C.secondary,
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {p.label}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "0.78rem",
                  color: C.mutedText,
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}
              >
                {p.desc}
              </p>

              {/* tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              {/* arrow */}
              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: C.primary,
                  textTransform: "uppercase",
                }}
              >
                En savoir plus
                <ArrowRight style={{ width: "12px", height: "12px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── section chiffres ──────────────────────────────────────── */

function SectionChiffres() {
  return (
    <section
      style={{
        background: C.bgDeep,
        padding: "5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={scanLinesStyle} />

      {/* large ambient text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-syne, sans-serif)",
          fontWeight: 800,
          fontSize: "18vw",
          color: `${C.neutral}20`,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        FORGE
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: C.primary,
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          // 02 — CHIFFRES CLÉS
        </p>
        <h2
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: C.secondary,
            letterSpacing: "-0.01em",
            marginBottom: "3rem",
          }}
        >
          Le département en chiffres
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1px",
            background: C.neutral,
          }}
        >
          {chiffres.map(({ val, label }) => (
            <div
              key={val}
              style={{
                background: C.bgDeep,
                padding: "2.5rem 2rem",
                textAlign: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  `${C.primary}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = C.bgDeep;
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: C.primary,
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {val}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "0.7rem",
                  color: C.secondary,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── section entreprises ───────────────────────────────────── */

function SectionEntreprises() {
  return (
    <section style={{ background: C.bg, padding: "5rem 0" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="grid-cols-1 lg:grid-cols-[1fr_1.5fr]"
      >
        {/* left pitch */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: C.primary,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            // 03 — PARTENAIRES
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: C.secondary,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
            }}
          >
            Travaillons ensemble
          </h2>

          <div
            style={{
              width: "48px",
              height: "2px",
              background: C.primary,
              marginBottom: "1.5rem",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.82rem",
              color: C.mutedText,
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Le département GMP entretient des relations industrielles fortes
            avec les acteurs de la mécanique, de l'aéronautique et de
            l'automobile en Île-de-France. Proposez une alternance, un stage ou
            un projet tuteuré.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: <Zap style={{ width: "14px", height: "14px" }} />, text: "Alternants opérationnels dès le 1er mois" },
              { icon: <Shield style={{ width: "14px", height: "14px" }} />, text: "Suivi pédagogique par un enseignant référent" },
              { icon: <Building2 style={{ width: "14px", height: "14px" }} />, text: "Convention simplifiée via l'IUT" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <span style={{ color: C.primary, marginTop: "1px", flexShrink: 0 }}>
                  {icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "0.78rem",
                    color: C.secondary,
                    lineHeight: 1.5,
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
              marginTop: "2.5rem",
              padding: "0.875rem 1.5rem",
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.06em",
              background: C.primary,
              color: C.bg,
              border: `1px solid ${C.primary}`,
              cursor: "pointer",
              transition: "box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 1px ${C.primary}, 0 0 24px ${C.primary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            CONTACTER LE DÉPARTEMENT
            <ArrowRight style={{ width: "14px", height: "14px" }} />
          </button>
        </div>

        {/* right cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {entreprises.map((e) => (
            <div
              key={e.nom}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.neutral}`,
                padding: "1.25rem 1.5rem",
                transition: "all 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={(el) => {
                (el.currentTarget as HTMLDivElement).style.borderColor =
                  C.primary;
                (el.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 0 0 1px ${C.primary}`;
              }}
              onMouseLeave={(el) => {
                (el.currentTarget as HTMLDivElement).style.borderColor =
                  C.neutral;
                (el.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-syne, sans-serif)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: C.secondary,
                  }}
                >
                  {e.nom}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "0.65rem",
                    color: C.mutedText,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <MapPin style={{ width: "10px", height: "10px" }} />
                  {e.lieu}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "0.75rem",
                  color: C.mutedText,
                  marginBottom: "0.875rem",
                  lineHeight: 1.5,
                }}
              >
                {e.offre}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {e.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer style={{ background: C.bgDeep, position: "relative" }}>
      {/* orange separator */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${C.primary}, ${C.accent}, transparent)`,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                background: C.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cog
                style={{ width: "13px", height: "13px", color: C.bg }}
                strokeWidth={2.5}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-syne, sans-serif)",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: C.secondary,
                letterSpacing: "0.05em",
              }}
            >
              GMP
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.72rem",
              color: C.mutedText,
              lineHeight: 1.7,
            }}
          >
            Département Génie Mécanique
            <br />
            & Productique
            <br />
            IUT d'Évry-Courcouronnes
          </p>
        </div>

        {/* formation */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: C.primary,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Formation
          </p>
          {["B.U.T. GMP", "LP GIIM", "LP MACS", "Alternance", "Candidater"].map(
            (item) => (
              <a
                key={item}
                href="#"
                style={{
                  display: "block",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "0.75rem",
                  color: C.mutedText,
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = C.secondary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = C.mutedText)
                }
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* entreprises */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: C.primary,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Entreprises
          </p>
          {[
            "Publier une offre",
            "Projets tuteurés",
            "Partenariat",
            "Taxe d'apprentissage",
          ].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: "block",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.75rem",
                color: C.mutedText,
                textDecoration: "none",
                marginBottom: "0.5rem",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.secondary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.mutedText)}
            >
              {item}
            </a>
          ))}
        </div>

        {/* contact */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: C.primary,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Contact
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a
              href="mailto:gmp@iut-evry.fr"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.75rem",
                color: C.mutedText,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.mutedText)}
            >
              <Mail style={{ width: "12px", height: "12px" }} />
              gmp@iut-evry.fr
            </a>
            <a
              href="tel:+33169477000"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.75rem",
                color: C.mutedText,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.mutedText)}
            >
              <Phone style={{ width: "12px", height: "12px" }} />
              01 69 47 70 00
            </a>
            <p
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.72rem",
                color: C.mutedText,
                lineHeight: 1.6,
              }}
            >
              Boulevard des Coquibus
              <br />
              91025 Évry-Courcouronnes
            </p>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div
        style={{
          borderTop: `1px solid ${C.neutral}`,
          padding: "1.25rem 2rem",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.65rem",
            color: C.mutedText,
            letterSpacing: "0.05em",
          }}
        >
          © 2026 IUT d'Évry-Courcouronnes · Université Paris-Saclay
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.65rem",
            color: `${C.primary}80`,
            letterSpacing: "0.1em",
          }}
        >
          CHARTE GRAPHIQUE V2 — FORGE — PROPOSITION INTERNE
        </span>
      </div>
    </footer>
  );
}

/* ─── page ──────────────────────────────────────────────────── */

export default function CharteV2Page() {
  return (
    <div
      className={syne.variable}
      style={{
        fontFamily: "var(--font-syne, sans-serif)",
        background: C.bg,
        minHeight: "100vh",
        color: C.secondary,
      }}
    >
      <NoiseFilter />
      <Nav />
      <Hero />
      <SectionParcours />
      <SectionChiffres />
      <SectionEntreprises />
      <Footer />
    </div>
  );
}
