"use client";

import { C } from "@/lib/forge";

const cards = [
  {
    icon: "⚙️",
    title: "Double compétence",
    desc: "Formation équilibrée entre mécanique théorique et savoir-faire pratique en production",
  },
  {
    icon: "🏭",
    title: "Laboratoires modernes",
    desc: "Équipements de pointe pour l'usinage, la métrologie et l'automatisation industrielle",
  },
  {
    icon: "🤝",
    title: "Partenariats industriels",
    desc: "Relations étroites avec les entreprises locales pour stages et projets professionnels",
  },
  {
    icon: "🎓",
    title: "Pédagogie active",
    desc: "Apprentissage par projets, travaux pratiques et cas d'études industriels",
  },
  {
    icon: "🌍",
    title: "Ouverture internationale",
    desc: "Possibilité d'échanges Erasmus et enseignement en anglais",
  },
  {
    icon: "📈",
    title: "Insertion professionnelle",
    desc: "Taux d'insertion de 95% dans les 6 mois suivant l'obtention du diplôme",
  },
];

export default function SpecificitePage() {
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
      <div style={{ maxWidth: "1280px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: C.secondary,
              fontFamily: C.sans,
            }}
          >
            Spécificités
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: C.muted,
              maxWidth: "42rem",
              margin: "0 auto",
              fontFamily: C.sans,
            }}
          >
            Ce qui fait la particularité du BUT GMP à l'IUT d'Évry
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {cards.map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: C.bgCard,
                padding: "1.5rem",
                border: `1px solid ${C.border}`,
                borderTop: `3px solid ${C.primary}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: C.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.375rem",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                  color: C.primary,
                  fontFamily: C.sans,
                  letterSpacing: "0.03em",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: C.muted,
                  fontSize: "0.875rem",
                  fontFamily: C.sans,
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: C.bgCard,
            border: `2px solid ${C.primary}`,
            boxShadow: `4px 4px 0 ${C.accent}`,
            padding: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              textAlign: "center",
              color: C.primary,
              fontFamily: C.sans,
              letterSpacing: "0.05em",
            }}
          >
            Pourquoi choisir le BUT GMP d'Évry ?
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              { icon: "🏆", title: "Excellence académique", desc: "Formation reconnue et appréciée par les entreprises du secteur industriel" },
              { icon: "💼", title: "Réseau professionnel", desc: "Plus de 200 entreprises partenaires dans la région Île-de-France" },
              { icon: "🔬", title: "Recherche & Innovation", desc: "Laboratoires de recherche intégrés aux enseignements" },
              { icon: "📚", title: "Poursuite d'études", desc: "Possibilité d'intégrer des masters ou écoles d'ingénieurs" },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <h4
                  style={{
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: C.secondary,
                    fontFamily: C.sans,
                    fontSize: "0.875rem",
                  }}
                >
                  {icon} {title}
                </h4>
                <p style={{ fontSize: "0.875rem", color: C.muted, fontFamily: C.sans }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
