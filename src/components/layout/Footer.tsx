"use client";

import { Cog } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#072d4d] text-[#e2e8f0] relative overflow-hidden">
      {/* subtle teal grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--c-grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--c-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* top accent bar */}
      <div
        className="h-[2px]"
        style={{ background: `linear-gradient(90deg, var(--c-primary), var(--c-accent), var(--c-primary))` }}
      />

      <div className="px-4 md:px-8 py-14 max-w-[1280px] mx-auto relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[30px] h-[30px] bg-primary flex items-center justify-center">
                <Cog className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-sans tracking-[0.1em] text-[1.75rem] text-[#e2e8f0]">
                GMP
              </span>
            </div>
            <p className="font-sans text-[0.875rem] leading-[1.7] max-w-[280px] text-[#64748b]">
              Département Génie Mécanique et Productique
              <br />
              IUT d'Évry-Val-d'Essonne
              <br />
              Université Paris-Saclay
            </p>
          </div>

          {/* nav */}
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-primary uppercase mb-4">
              Navigation
            </p>
            {["Formation", "Entreprises", "Actualités", "Connexion"].map((l) => (
              <a
                key={l}
                href="#"
                className="block font-sans text-[0.875rem] text-[#64748b] no-underline mb-2 transition-colors hover:text-primary"
              >
                {l}
              </a>
            ))}
          </div>

          {/* contact */}
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-primary uppercase mb-4">
              Contact
            </p>
            <p className="font-mono text-[0.72rem] leading-[1.9] text-[#64748b]">
              23 bd de France
              <br />
              91037 Évry-Courcouronnes
              <br />
              iut-gmp@univ-evry.fr
              <br />
              +33 1 69 47 XX XX
            </p>
          </div>
        </div>

        {/* cartouche industriel */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-6 border-t border-[#1A5A8A]">
          <div className="flex items-center gap-8 font-mono text-[0.58rem] tracking-[0.15em] uppercase text-[rgba(226,232,240,0.25)]">
            <span>DOC: GMP-WEB-FORGE-2026</span>
            <span>REV: 2.0</span>
            <span>CHARTE: FORGE</span>
            <span>IUT ÉVRY · UNIV. PARIS-SACLAY</span>
          </div>
          <p className="font-mono text-[0.58rem] tracking-[0.1em] text-[rgba(226,232,240,0.25)]">
            © 2026 — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
