"use client";

import { Building2, MapPin, Shield, Wrench, Zap } from "lucide-react";
import { C } from "@/lib/forge";
import { Tag, SectionLabel, MonoLabel, IconBox, Button, ForgeCard, ForgeSection } from "@/components/ui";

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
    <ForgeSection>
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
                <IconBox>{icon}</IconBox>
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

          <Button>
            <Building2 style={{ width: "14px", height: "14px" }} />
            Déposer une offre
          </Button>
        </div>

        {/* right — offer cards */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
          {offres.map(({ company, location, type, title, description, tags, start }) => (
            <ForgeCard key={company} style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <IconBox size={34}>
                    <Building2 style={{ width: "14px", height: "14px" }} />
                  </IconBox>
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
                    <MonoLabel style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin style={{ width: "9px", height: "9px" }} /> {location}
                    </MonoLabel>
                  </div>
                </div>
                <MonoLabel color={C.accent} borderColor="var(--c-accent-30)" style={{ padding: "2px 8px", whiteSpace: "nowrap" }}>
                  {type}
                </MonoLabel>
              </div>

              <p
                data-card-title
                style={{
                  fontFamily: "var(--font-outfit, sans-serif)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
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
                <MonoLabel style={{ whiteSpace: "nowrap" }}>{start}</MonoLabel>
              </div>
            </ForgeCard>
          ))}
        </div>
      </div>
    </ForgeSection>
  );
}
