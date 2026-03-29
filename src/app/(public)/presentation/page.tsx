"use client";

import { C } from "@/lib/forge";
import Link from "next/link";

const links = [
  { label: "Programme", href: "/presentation/programme" },
  { label: "Spécificités", href: "/presentation/specificite" },
  { label: "Lieux", href: "/presentation/lieu" },
  { label: "Buts GMP", href: "/presentation/but-gmp" },
  { label: "Alternance", href: "/presentation/alternance" },
  { label: "Après le BUT", href: "/presentation/apres-but" },
];

export default function PresentationPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "3rem 1rem",
        background: C.bg,
        color: C.secondary,
      }}
    >
      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
            color: C.secondary,
            fontFamily: C.sans,
          }}
        >
          Présentation
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: C.muted,
            marginBottom: "2.5rem",
            fontFamily: C.sans,
          }}
        >
          Découvrez le département Génie Mécanique et Productique de l'IUT d'Évry
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "block",
                padding: "1rem 1.25rem",
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.primary}`,
                color: C.secondary,
                fontFamily: C.sans,
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "border-color 0.15s, color 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.primary;
                e.currentTarget.style.boxShadow = `2px 2px 0 ${C.accent}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.secondary;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
