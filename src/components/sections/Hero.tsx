"use client";

import { useRef } from "react";
import { ChevronRight, Flame } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forgeGrid, scanLines } from "@/lib/forge";
import { IllustrationForgeHero } from "@/components/illustrations/IllustrationForgeHero";
import { PhotoBlueprint } from "@/components/sections/PhotoBlueprint";

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
      className="bg-background relative overflow-hidden min-h-[80vh] flex items-center py-16 md:py-24 lg:py-32"
    >
      {/* forge grid texture */}
      <div style={forgeGrid} />
      {/* scanlines */}
      <div style={scanLines} />

      {/* SVG blueprint — arrière-plan géant */}
      <div
        ref={bgSvgRef}
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[72%] opacity-[0.12] pointer-events-none z-[1]"
      >
        <IllustrationForgeHero className="w-full h-auto" />
      </div>

      {/* vertical accent stripe left */}
      <div
        className="hero-accent-stripe absolute left-0 top-0 bottom-0 w-[3px] z-[2]"
        style={{ background: "linear-gradient(180deg, transparent, var(--c-primary), transparent)" }}
      />

      {/* Contenu */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-8 max-w-[1280px] mx-auto relative z-[3] w-full gap-12 items-center"
      >
        {/* colonne gauche — texte */}
        <div>
          {/* eyebrow */}
          <div className="hero-eyebrow flex items-center gap-3 mb-8">
            <Flame className="w-3 h-3 text-primary" />
            <span className="font-mono text-[0.65rem] tracking-[0.25em] text-primary uppercase">
              IUT d'Évry-Courcouronnes · Université Paris-Saclay
            </span>
          </div>

          {/* main title */}
          <h1
            className="font-sans text-secondary mb-2 tracking-[0.02em]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.92 }}
          >
            <span className="hero-h1-line block">
              Génie
            </span>
            <span className="hero-h1-line block">
              Mécanique
            </span>
            <span className="hero-h1-line block text-primary">
              &amp; Productique
            </span>
          </h1>

          {/* sub-title tag */}
          <div className="hero-subtitle inline-flex items-center gap-2 mb-7 mt-2">
            <div className="w-2 h-2 bg-[var(--c-accent)]" />
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
              Dept. GMP · BUT · Licence Pro · Alternance
            </span>
          </div>

          {/* description */}
          <p
            className="hero-desc font-sans font-normal text-[1.1rem] text-secondary leading-[1.65] max-w-[480px] mb-10 opacity-75"
          >
            Formez-vous aux métiers de l'industrie de demain — conception
            assistée par ordinateur, fabrication additive, robotique et méthodes
            de production dans un département à taille humaine, au cœur de
            l'Essonne.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap mb-12">
            <button
              className="hero-cta font-sans flex items-center gap-2 py-3 px-7 text-base tracking-[0.1em] bg-primary text-white border border-primary cursor-pointer transition-all"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--c-primary-hover)";
                e.currentTarget.style.boxShadow = "3px 3px 0 var(--c-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--c-primary)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Découvrir la formation
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              className="hero-cta font-sans flex items-center gap-2 py-3 px-7 text-base tracking-[0.1em] bg-transparent text-secondary border border-border cursor-pointer transition-all"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--c-secondary)";
                e.currentTarget.style.boxShadow = "2px 2px 0 var(--c-secondary-30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--c-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Espace entreprises
            </button>
          </div>

          {/* stats bar */}
          <div className="border-t border-border pt-8 flex gap-0 flex-wrap">
            {[
              { val: "120+", label: "ÉTUDIANTS/AN" },
              { val: "87%", label: "INSERTION PRO" },
              { val: "40+", label: "ENTREPRISES" },
              { val: "3", label: "PARCOURS" },
            ].map(({ val, label }, i) => (
              <div
                key={label}
                className={`hero-stat pr-8 mr-8 ${i < 3 ? "border-r border-border" : ""}`}
              >
                <p
                  className="font-sans text-primary leading-none tracking-[0.03em] text-[2.25rem]"
                >
                  {val}
                </p>
                <p className="font-mono text-[0.6rem] text-muted tracking-[0.15em] mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* colonne droite — photo cadrée */}
        <div className="relative hidden lg:block">
          <PhotoBlueprint ref={photoBpRef} />
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 flex z-[3]">
        <div className="h-[2px] bg-primary w-[80px]" />
        <div className="h-[2px] bg-[var(--c-primary-20)] flex-1" />
        <div className="h-[2px] bg-primary w-[80px]" />
      </div>
    </section>
  );
}
