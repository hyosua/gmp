"use client";

import { useRef } from "react";
import { ChevronRight, Flame } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { C, forgeGrid, scanLines } from "@/lib/forge";
import { IllustrationForgeHero } from "@/components/forge/illustrations/IllustrationForgeHero";
import { PhotoBlueprint } from "@/components/forge/PhotoBlueprint";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgSvgRef = useRef<HTMLDivElement>(null);
  const photoBpRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const bgDiv = bgSvgRef.current;
      const bp = photoBpRef.current;
      if (!hero || !bgDiv || !bp) return;

      const bgSvg = bgDiv.querySelector("svg");
      const bpSvg = bp.querySelector("svg");

      // ── États initiaux ───────────────────────────────────────────────────────
      gsap.set(
        [
          ".hero-eyebrow",
          ".hero-subtitle",
          ".hero-desc",
          ".hero-cta",
          ".hero-stat",
        ],
        { autoAlpha: 0, y: 8 },
      );

      // Chaque ligne du H1 a sa propre origine
      const h1 = hero.querySelectorAll(".hero-h1-line");
      gsap.set(h1[0], { autoAlpha: 0, x: -40 }); // "Génie"        ← gauche
      gsap.set(h1[1], { autoAlpha: 0, x: 50 }); // "Mécanique"    → droite
      gsap.set(h1[2], { autoAlpha: 0, y: 30, scale: 0.92 }); // "& Productique" ↑ bas + scale

      gsap.set(hero.querySelector(".hero-accent-stripe"), {
        scaleY: 0,
        transformOrigin: "top",
      });

      if (bgSvg) gsap.set(bgSvg, { autoAlpha: 0 });

      if (bpSvg) {
        gsap.set(bp.querySelector(".bp-photo"), { autoAlpha: 0 });
        gsap.set(bpSvg.querySelectorAll(".bp-border"), {
          strokeDasharray: 1400,
          strokeDashoffset: 1400,
        });
        gsap.set(
          bpSvg.querySelectorAll(
            ".bp-header, .bp-corner-top, .bp-corner-bottom, .bp-grad-x, .bp-grad-y, .bp-dim-h, .bp-dim-v, .bp-annot, .bp-cartouche",
          ),
          { autoAlpha: 0 },
        );
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // ── 1. Tout le contenu texte apparaît ensemble, rapidement ──────────────
      const h1Lines = hero.querySelectorAll<HTMLElement>(".hero-h1-line");

      tl.to(
        hero.querySelector(".hero-accent-stripe"),
        { scaleY: 1, duration: 0.7 },
        0,
      )
        .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.1)
        // "Génie" — glisse depuis la gauche
        .to(h1Lines[0], { autoAlpha: 1, x: 0, y: 0, duration: 0.5 }, 0.25)
        // "Mécanique" — glisse depuis la droite
        .to(h1Lines[1], { autoAlpha: 1, x: 0, y: 0, duration: 0.5 }, 0.4)
        // "& Productique" — monte depuis le bas avec légère scale
        .to(
          h1Lines[2],
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.55 },
          0.55,
        )
        .to(".hero-subtitle", { autoAlpha: 1, y: 0, duration: 0.45 }, 0.75)
        .to(".hero-desc",     { autoAlpha: 1, y: 0, duration: 0.45 }, 0.88)
        .to(".hero-cta",      { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, 1.0)
        .to(".hero-stat",     { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07 }, 1.1);

      // ── 2. SVG arrière-plan — apparaît en un bloc doux ──────────────────────
      if (bgSvg) {
        tl.to(bgSvg, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, 0.1);
      }

      // ── 3. Photo + cadre (séquence conservée) ───────────────────────────────
      if (bp && bpSvg) {
        tl.to(
          bp.querySelector(".bp-photo"),
          { autoAlpha: 1, duration: 0.5 },
          0.15,
        );

        tl.to(
          bpSvg.querySelectorAll(".bp-border"),
          {
            strokeDashoffset: 0,
            duration: 1.3,
            ease: "power1.inOut",
          },
          0.2,
        );

        // Tous les détails blueprint apparaissent en fondu une fois le cadre terminé
        tl.to(
          bpSvg.querySelectorAll(
            ".bp-header, .bp-corner-top, .bp-corner-bottom, .bp-grad-x, .bp-grad-y, .bp-dim-h, .bp-dim-v, .bp-annot, .bp-cartouche",
          ),
          { autoAlpha: 1, duration: 0.5, ease: "power1.out" },
          ">",
        );
      }
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      style={{
        background: C.bg,
        position: "relative",
        overflow: "hidden",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
      className="py-16 md:py-24 lg:py-32"
    >
      {/* forge grid texture */}
      <div style={forgeGrid} />
      {/* scanlines */}
      <div style={scanLines} />

      {/* SVG blueprint — arrière-plan géant */}
      <div
        ref={bgSvgRef}
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "72%",
          opacity: 0.12,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <IllustrationForgeHero className="w-full h-auto" />
      </div>

      {/* vertical accent stripe left */}
      <div
        className="hero-accent-stripe"
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

      {/* Contenu */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 3,
          width: "100%",
          gap: "3rem",
          alignItems: "center",
        }}
        className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-8"
      >
        {/* colonne gauche — texte */}
        <div>
          {/* eyebrow */}
          <div
            className="hero-eyebrow"
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
            <span className="hero-h1-line" style={{ display: "block" }}>
              Génie
            </span>
            <span className="hero-h1-line" style={{ display: "block" }}>
              Mécanique
            </span>
            <span
              className="hero-h1-line"
              style={{ display: "block", color: C.primary }}
            >
              &amp; Productique
            </span>
          </h1>

          {/* sub-title tag */}
          <div
            className="hero-subtitle"
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
                color: C.muted,
                textTransform: "uppercase" as const,
              }}
            >
              Dept. GMP · BUT · Licence Pro · Alternance
            </span>
          </div>

          {/* description */}
          <p
            className="hero-desc"
            style={{
              fontFamily: "var(--font-outfit, sans-serif)",
              fontWeight: 400,
              fontSize: "1.1rem",
              color: C.secondary,
              lineHeight: 1.65,
              maxWidth: "480px",
              marginBottom: "2.5rem",
              opacity: 0.75,
            }}
          >
            Formez-vous aux métiers de l'industrie de demain — conception
            assistée par ordinateur, fabrication additive, robotique et méthodes
            de production dans un département à taille humaine, au cœur de
            l'Essonne.
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
              className="hero-cta"
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
                e.currentTarget.style.background = "var(--c-primary-hover)";
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
              className="hero-cta"
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
                e.currentTarget.style.boxShadow =
                  "2px 2px 0 var(--c-secondary-30)";
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
                className="hero-stat"
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
                    color: C.muted,
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

        {/* colonne droite — photo cadrée */}
        <div style={{ position: "relative" }} className="hidden lg:block">
          <PhotoBlueprint ref={photoBpRef} />
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
        <div
          style={{ height: "2px", background: "var(--c-primary-20)", flex: 1 }}
        />
        <div style={{ height: "2px", background: C.primary, width: "80px" }} />
      </div>
    </section>
  );
}
