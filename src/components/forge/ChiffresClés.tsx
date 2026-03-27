"use client";

import Image from "next/image";
import { C, scanLines } from "@/lib/forge";
import { SectionLabel } from "@/components/forge/ui";

const metrics = [
  { val: "87%",  label: "Taux d'insertion professionnelle", sub: "à 6 mois après diplomation" },
  { val: "120+", label: "Étudiants formés par an",          sub: "chaque année académique" },
  { val: "40+",  label: "Entreprises partenaires",          sub: "PME, ETI et grands groupes" },
  { val: "#3",   label: "Classement IUT GMP",               sub: "Île-de-France · édition 2025" },
];

export function ChiffresClés() {
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
                  fontFamily: "var(--font-outfit, sans-serif)",
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
                  fontFamily: "var(--font-outfit, sans-serif)",
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
