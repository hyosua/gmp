"use client";

import { ChevronRight, Flame } from "lucide-react";
import Image from "next/image";
import { C, forgeGrid, scanLines } from "@/lib/forge";
import { IllustrationForgeHero } from "@/components/forge/illustrations/IllustrationForgeHero";

export function Hero() {
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
              <Flame
                style={{ width: "12px", height: "12px", color: C.primary }}
              />
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
                fontFamily: "var(--font-outfit, sans-serif)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 0.92,
                color: C.secondary,
                marginBottom: "0.5rem",
                letterSpacing: "0.02em",
              }}
            >
              Génie
              <br />
              Mécanique
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
              <div
                style={{ width: "8px", height: "8px", background: C.accent }}
              />
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
                fontFamily: "var(--font-outfit, sans-serif)",
                fontWeight: 400,
                fontSize: "1.1rem",
                color: `${C.secondary}90`,
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              Formez-vous aux métiers de l'industrie de demain — conception
              assistée par ordinateur, fabrication additive, robotique et
              méthodes de production dans un département à taille humaine, au
              cœur de l'Essonne.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap" as const,
                marginBottom: "3rem",
              }}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  fontFamily: "var(--font-outfit, sans-serif)",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  background: C.primary,
                  color: "white",
                  border: `1px solid ${C.primary}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0f766e";
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
                  fontFamily: "var(--font-outfit, sans-serif)",
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
                      fontFamily: "var(--font-outfit, sans-serif)",
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

          {/* ── right col: SVG illustrations ── */}
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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(13,148,136,0.55)",
                  mixBlendMode: "multiply",
                }}
              />
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

            {/* vérin hydraulique — overlay bas droite */}
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
