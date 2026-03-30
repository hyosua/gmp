"use client";

import Image from "next/image";
import { scanLines } from "@/lib/forge";
import { SectionLabel } from "@/components/ui";

const metrics = [
  { val: "87%",  label: "Taux d'insertion professionnelle", sub: "à 6 mois après diplomation" },
  { val: "120+", label: "Étudiants formés par an",          sub: "chaque année académique" },
  { val: "40+",  label: "Entreprises partenaires",          sub: "PME, ETI et grands groupes" },
  { val: "#3",   label: "Classement IUT GMP",               sub: "Île-de-France · édition 2025" },
];

export function ChiffresClés() {
  return (
    <section className="bg-bg-deep relative overflow-hidden py-24">
      {/* machine.jpg background with heavy overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/machine.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", filter: "grayscale(100%)", opacity: 0.08 }}
        />
      </div>
      <div style={scanLines} />

      {/* corner decorations */}
      <div className="absolute top-0 left-0 w-[120px] h-[120px] border-b border-r border-[var(--c-primary-20)]" />
      <div className="absolute bottom-0 right-0 w-[120px] h-[120px] border-t border-l border-[var(--c-primary-20)]" />

      <div className="max-w-[1280px] mx-auto relative z-[2] px-4 md:px-8">
        <SectionLabel>04 · Données · Année 2025-2026</SectionLabel>

        <div
          className="grid grid-cols-2 md:grid-cols-4 border-t border-border"
          style={{ gap: 0 }}
        >
          {metrics.map(({ val, label, sub }, i) => (
            <div
              key={val}
              className={[
                "p-8 border-b border-border border-r border-border",
                i === 1 ? "border-r-0 md:border-r" :
                i === 3 ? "border-r-0" :
                "",
              ].join(" ")}
            >
              <p
                className="text-primary leading-none tracking-[0.02em] mb-2"
                style={{ fontFamily: "var(--font-outfit, sans-serif)", fontSize: "4.5rem" }}
              >
                {val}
              </p>
              <p
                className="font-semibold text-[0.9rem] text-secondary mb-1"
                style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
              >
                {label}
              </p>
              <p className="font-mono text-[0.6rem] text-muted tracking-[0.05em]">
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
