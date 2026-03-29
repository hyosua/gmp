"use client";

import { Building2, MapPin, Shield, Wrench, Zap } from "lucide-react";
import { C, forgeGrid } from "@/lib/forge";
import { Tag, SectionLabel } from "@/components/forge/ui";

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

export function Entreprises() {
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
          position: "relative",
          zIndex: 2,
        }}
        className="px-4 md:px-8"
      >
        <div
          style={{ gap: "4rem", alignItems: "start" }}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          {/* left — pitch */}
          <div>
            <SectionLabel>05 · Partenariats industriels</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-outfit, sans-serif)",
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
                fontFamily: "var(--font-outfit, sans-serif)",
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
                      background: "var(--c-primary-15)",
                      border: "1px solid var(--c-primary-30)",
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
                      fontFamily: "var(--font-outfit, sans-serif)",
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
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = C.primary;
                  el.style.boxShadow = `3px 3px 0 ${C.primary}`;
                  (el.querySelector("[data-card-title]") as HTMLElement | null)?.style.setProperty("color", C.primary);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = C.border;
                  el.style.boxShadow = "none";
                  (el.querySelector("[data-card-title]") as HTMLElement | null)?.style.setProperty("color", C.secondary);
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "var(--c-primary-15)",
                        border: "1px solid var(--c-primary-30)",
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
                          fontFamily: "var(--font-outfit, sans-serif)",
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
                      border: "1px solid var(--c-accent-30)",
                      padding: "2px 8px",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {type}
                  </span>
                </div>

                <p
                  data-card-title
                  style={{
                    fontFamily: "var(--font-outfit, sans-serif)",
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
                    fontFamily: "var(--font-outfit, sans-serif)",
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
