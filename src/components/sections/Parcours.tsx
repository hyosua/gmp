"use client";

import { ChevronRight, GraduationCap, BarChart3, Repeat2 } from "lucide-react";
import { C } from "@/lib/forge";
import { Tag, SectionLabel, MonoLabel, ForgeCard, ForgeSection } from "@/components/ui";
import { IllustrationCNC } from "@/components/illustrations/IllustrationCNC";
import { IllustrationChaine } from "@/components/illustrations/IllustrationChaine";
import { IllustrationEngrenages } from "@/components/illustrations/IllustrationEngrenages";

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
    illustration: <IllustrationEngrenages className="w-full h-36" />,
  },
];

export function Parcours() {
  return (
    <ForgeSection bg={C.bgDeep} withScanLines>
      {/* header */}
      <div style={{ marginBottom: "3.5rem" }}>
        <SectionLabel>03 · Formations disponibles</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-outfit, sans-serif)",
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
        style={{ gap: "1.5rem" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {parcours.map(({ code, title, duration, icon, description, tags, illustration }) => (
          <ForgeCard key={code} style={{ padding: 0 }}>
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
                <MonoLabel color={C.muted}>{code}</MonoLabel>
                <span style={{ color: C.primary }}>{icon}</span>
              </div>

              {/* duration badge */}
              <MonoLabel
                color={C.accent}
                borderColor="var(--c-accent-40)"
                style={{ display: "inline-block", marginBottom: "0.875rem" }}
              >
                {duration}
              </MonoLabel>

              <h3
                data-card-title
                style={{
                  fontFamily: "var(--font-outfit, sans-serif)",
                  fontSize: "1.9rem",
                  letterSpacing: "0.02em",
                  marginBottom: "0.75rem",
                  lineHeight: 1.1,
                  fontWeight: 700,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-outfit, sans-serif)",
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
                  fontFamily: "var(--font-outfit, sans-serif)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                }}
              >
                En savoir plus
                <ChevronRight style={{ width: "14px", height: "14px" }} />
              </div>
            </div>
          </ForgeCard>
        ))}
      </div>
    </ForgeSection>
  );
}
