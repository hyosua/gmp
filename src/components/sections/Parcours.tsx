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
    icon: <GraduationCap className="w-5 h-5" />,
    description:
      "Formation universitaire technologique complète, de la conception CAO/FAO à la production en série. Alternance dès la 2ᵉ année. Débouchés : ingénierie, méthodes, qualité.",
    tags: ["CAO/FAO", "Méthodes", "Robotique", "Qualité"],
    illustration: <IllustrationCNC className="w-full h-36" />,
  },
  {
    code:  "LP-PROD",
    title: "Licence Pro Production Industrielle",
    duration: "1 an (Bac+2)",
    icon: <BarChart3 className="w-5 h-5" />,
    description:
      "Spécialisation rapide pour titulaires d'un BTS/DUT. Accent sur l'optimisation des procédés de fabrication, lean manufacturing et supply chain.",
    tags: ["Lean", "Supply Chain", "ERP", "Gestion prod."],
    illustration: <IllustrationChaine className="w-full h-36" />,
  },
  {
    code:  "ALT-GMP",
    title: "Alternance",
    duration: "BUT 2ᵉ & 3ᵉ année",
    icon: <Repeat2 className="w-5 h-5" />,
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
      <div className="mb-14">
        <SectionLabel>03 · Formations disponibles</SectionLabel>
        <h2
          className="text-secondary leading-[0.95] tracking-[0.02em]"
          style={{
            fontFamily: "var(--font-outfit, sans-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          3 parcours,
          <br />
          <span className="text-primary">une expertise forge</span>
        </h2>
      </div>

      {/* cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parcours.map(({ code, title, duration, icon, description, tags, illustration }) => (
          <ForgeCard key={code} style={{ padding: 0 }}>
            {/* illustration panel */}
            <div className="border-b border-border bg-bg-deep overflow-hidden p-4">
              {illustration}
            </div>

            <div className="p-7">
              {/* code + icon */}
              <div className="flex items-center justify-between mb-4">
                <MonoLabel>{code}</MonoLabel>
                <span className="text-primary">{icon}</span>
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
                className="text-[1.9rem] tracking-[0.02em] mb-3 leading-[1.1] font-bold"
                style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
              >
                {title}
              </h3>
              <p
                className="text-[0.9rem] text-muted leading-[1.6] mb-5"
                style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
              >
                {description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-[0.375rem] mb-5">
                {tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>

              {/* cta link */}
              <div
                className="flex items-center gap-[0.375rem] text-primary font-semibold text-[0.85rem] tracking-[0.04em]"
                style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
              >
                En savoir plus
                <ChevronRight className="w-[14px] h-[14px]" />
              </div>
            </div>
          </ForgeCard>
        ))}
      </div>
    </ForgeSection>
  );
}
