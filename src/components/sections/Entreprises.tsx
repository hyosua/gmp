"use client";

import { Building2, MapPin, Shield, Wrench, Zap } from "lucide-react";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* left — pitch */}
        <div>
          <SectionLabel>05 · Partenariats industriels</SectionLabel>
          <h2
            className="text-secondary leading-[0.95] tracking-[0.02em] mb-6"
            style={{
              fontFamily: "var(--font-outfit, sans-serif)",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
            }}
          >
            Recrutez des talents
            <br />
            <span className="text-primary">forgés pour l'industrie</span>
          </h2>
          <p
            className="text-[1rem] text-muted leading-[1.7] mb-8"
            style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
          >
            Le département GMP entretient des relations étroites avec les
            acteurs industriels de l'Île-de-France. Proposez vos offres de
            stage, d'alternance ou de projets tuteurés directement à nos
            étudiants qualifiés.
          </p>

          {/* benefits */}
          <div className="mb-8">
            {[
              { icon: <Shield className="w-[14px] h-[14px]" />, text: "Étudiants formés aux normes industrielles" },
              { icon: <Wrench className="w-[14px] h-[14px]" />, text: "Maîtrise des outils CAO/FAO & ERP" },
              { icon: <Zap className="w-[14px] h-[14px]" />, text: "Réseau IUT · 40+ entreprises partenaires" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 mb-3">
                <IconBox>{icon}</IconBox>
                <span
                  className="text-[0.875rem] text-muted"
                  style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <Button>
            <Building2 className="w-[14px] h-[14px]" />
            Déposer une offre
          </Button>
        </div>

        {/* right — offer cards */}
        <div className="flex flex-col gap-4">
          {offres.map(({ company, location, type, title, description, tags, start }) => (
            <ForgeCard key={company} style={{ cursor: "pointer" }}>
              <div className="flex items-start justify-between mb-[0.875rem]">
                <div className="flex items-center gap-3">
                  <IconBox size={34}>
                    <Building2 className="w-[14px] h-[14px]" />
                  </IconBox>
                  <div>
                    <p
                      className="font-bold text-[0.875rem] text-secondary"
                      style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
                    >
                      {company}
                    </p>
                    <MonoLabel style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin className="w-[9px] h-[9px]" /> {location}
                    </MonoLabel>
                  </div>
                </div>
                <MonoLabel color="var(--c-accent)" borderColor="var(--c-accent-30)" style={{ padding: "2px 8px", whiteSpace: "nowrap" }}>
                  {type}
                </MonoLabel>
              </div>

              <p
                data-card-title
                className="font-semibold text-[0.9rem] mb-2"
                style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
              >
                {title}
              </p>
              <p
                className="text-[0.8rem] text-muted leading-[1.55] mb-4"
                style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
              >
                {description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-[0.375rem] flex-wrap">
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
