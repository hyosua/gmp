"use client";

import { Cog } from "lucide-react";
import { C } from "@/lib/forge";

const DARK = "#0A3D67";
const DARK_DEEP = "#072d4d";
const DARK_BORDER = "#1A5A8A";
const TEXT_LIGHT = "#e2e8f0";
const TEXT_MUTED = "#64748b";

export function Footer() {
  return (
    <footer
      style={{
        background: DARK_DEEP,
        color: TEXT_LIGHT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle teal grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--c-grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--c-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* top accent bar */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${C.primary}, ${C.accent}, ${C.primary})`,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
        className="px-4 md:px-8 py-14"
      >
        <div
          style={{ gap: "3rem", marginBottom: "3rem" }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {/* brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  background: C.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cog style={{ width: "16px", height: "16px", color: "white" }} strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-outfit, sans-serif)",
                  fontSize: "1.75rem",
                  color: TEXT_LIGHT,
                  letterSpacing: "0.1em",
                }}
              >
                GMP
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-outfit, sans-serif)",
                fontSize: "0.875rem",
                color: TEXT_MUTED,
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              Département Génie Mécanique et Productique
              <br />
              IUT d'Évry-Val-d'Essonne
              <br />
              Université Paris-Saclay
            </p>
          </div>

          {/* nav */}
          <div>
            <p
              style={{
                fontFamily: C.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: C.primary,
                textTransform: "uppercase" as const,
                marginBottom: "1rem",
              }}
            >
              Navigation
            </p>
            {["Formation", "Entreprises", "Actualités", "Connexion"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontFamily: "var(--font-outfit, sans-serif)",
                  fontSize: "0.875rem",
                  color: TEXT_MUTED,
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
              >
                {l}
              </a>
            ))}
          </div>

          {/* contact */}
          <div>
            <p
              style={{
                fontFamily: C.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: C.primary,
                textTransform: "uppercase" as const,
                marginBottom: "1rem",
              }}
            >
              Contact
            </p>
            <p
              style={{
                fontFamily: C.mono,
                fontSize: "0.72rem",
                color: TEXT_MUTED,
                lineHeight: 1.9,
              }}
            >
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
        <div
          style={{
            borderTop: `1px solid ${DARK_BORDER}`,
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              fontFamily: C.mono,
              fontSize: "0.58rem",
              color: "rgba(226,232,240,0.25)",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            <span>DOC: GMP-WEB-FORGE-2026</span>
            <span>REV: 2.0</span>
            <span>CHARTE: FORGE</span>
            <span>IUT ÉVRY · UNIV. PARIS-SACLAY</span>
          </div>
          <p
            style={{
              fontFamily: C.mono,
              fontSize: "0.58rem",
              color: "rgba(226,232,240,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            © 2026 — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
