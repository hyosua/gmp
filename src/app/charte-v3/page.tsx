"use client";

import { Fraunces, DM_Sans } from "next/font/google";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronRight,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";

/* ─── Fonts ─────────────────────────────────────────────────────── */

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

/* ─── Tokens ─────────────────────────────────────────────────────── */

const C = {
  bg: "#fafaf9",
  primary: "#1e3a5f",
  secondary: "#c2410c",
  accent: "#0ea5e9",
  neutral: "#78716c",
  border: "#e7e5e4",
  stone100: "#f5f5f4",
  stone200: "#e7e5e4",
  stone700: "#44403c",
  white: "#ffffff",
};

/* ─── Nav ───────────────────────────────────────────────────────── */

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { num: "01.", label: "Parcours", href: "#parcours" },
    { num: "02.", label: "Entreprises", href: "#entreprises" },
    { num: "03.", label: "Vie étudiante", href: "#vie" },
    { num: "04.", label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: C.primary,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: C.primary,
              letterSpacing: "-0.02em",
            }}
          >
            GMP
          </span>
          <span
            style={{
              color: C.neutral,
              fontSize: "0.8rem",
              marginLeft: "0.25rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            IUT d'Évry
          </span>
        </div>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
          className="hidden md:flex"
        >
          {navLinks.map((l) => (
            <a
              key={l.num}
              href={l.href}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.35rem",
                textDecoration: "none",
                color: C.neutral,
                fontSize: "0.875rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = C.primary)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = C.neutral)
              }
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  color: C.secondary,
                  fontWeight: 600,
                }}
              >
                {l.num}
              </span>
              {l.label}
            </a>
          ))}

          <a
            href="#candidater"
            style={{
              background: C.primary,
              color: C.white,
              padding: "0.5rem 1.25rem",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            Candidater
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.primary,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          aria-label="Menu"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: C.primary,
              transition: "transform 0.2s",
              transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: C.primary,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: C.primary,
              transition: "transform 0.2s",
              transform: menuOpen
                ? "rotate(-45deg) translate(5px,-5px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: `1px solid ${C.border}`,
            background: C.white,
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.num}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
                textDecoration: "none",
                color: C.primary,
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  color: C.secondary,
                }}
              >
                {l.num}
              </span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      style={{
        background: C.bg,
        paddingTop: "5rem",
        paddingBottom: "4rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Filigrane numéro de page */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "4rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(8rem, 20vw, 18rem)",
          fontWeight: 900,
          color: C.primary,
          opacity: 0.04,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}
      >
        01
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Label de rubrique */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{ width: 40, height: 2, background: C.secondary }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.secondary,
              fontWeight: 700,
            }}
          >
            Département GMP — IUT d'Évry — Université Paris-Saclay
          </span>
        </div>

        {/* Layout éditorial : titre large + encart texte */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "4rem",
            alignItems: "start",
          }}
          className="grid-cols-1 md:grid-cols-[1fr_320px]"
        >
          {/* Titre principal — déborde volontairement */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 900,
                color: C.primary,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                marginBottom: "2rem",
              }}
            >
              Former les
              <br />
              <em style={{ fontStyle: "italic", color: C.secondary }}>
                ingénieurs
              </em>
              <br />
              de demain.
            </h1>

            {/* Ligne de frise bleu marine */}
            <div
              style={{
                height: 3,
                background: C.primary,
                marginBottom: "2rem",
                width: "100%",
                maxWidth: 560,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#parcours"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: C.primary,
                  color: C.white,
                  padding: "0.75rem 1.75rem",
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 8px 24px rgba(30,58,95,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
              >
                Découvrir les parcours
                <ArrowRight size={16} />
              </a>
              <a
                href="#entreprises"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: C.primary,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  borderBottom: `1px solid ${C.primary}`,
                  paddingBottom: 2,
                }}
              >
                Espace entreprises
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Encart texte éditorial */}
          <aside
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: C.neutral,
                textTransform: "uppercase",
                marginBottom: "1rem",
                paddingBottom: "0.75rem",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              En bref
            </div>
            <p
              style={{
                color: C.stone700,
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Le département GMP de l'IUT d'Évry–Val-d'Essonne forme des
              techniciens supérieurs et des ingénieurs en génie mécanique,
              conception et production industrielle.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
            >
              {[
                { icon: <MapPin size={13} />, text: "Évry-Courcouronnes, Essonne" },
                { icon: <GraduationCap size={13} />, text: "BUT · Licence Pro · Alternance" },
                { icon: <Users size={13} />, text: "350 étudiants par an" },
                { icon: <Clock size={13} />, text: "Accrédité CTI · Paris-Saclay" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    color: C.neutral,
                    fontSize: "0.8rem",
                  }}
                >
                  <span style={{ color: C.accent }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─── Parcours ──────────────────────────────────────────────────── */

const parcours = [
  {
    num: "§01",
    sigle: "BUT GMP",
    titre: "Bachelor Universitaire de Technologie",
    specialite: "Génie Mécanique et Productique",
    duree: "3 ans",
    description:
      "Formation en conception mécanique, fabrication et gestion de production industrielle. Parcours complets en conception de produits, industrialisation et management de la production.",
    debouches: ["Technicien bureau d'études", "Responsable production", "Chargé méthodes", "Poursuite en école d'ingénieurs"],
    tags: ["Conception CAO", "Métrologie", "Procédés fab.", "Gestion projet"],
    color: C.primary,
  },
  {
    num: "§02",
    sigle: "LP QLIO",
    titre: "Licence Professionnelle",
    specialite: "Qualité, Logistique Industrielle & Organisation",
    duree: "1 an",
    description:
      "Formation d'excellence en management de la qualité, optimisation logistique et organisation industrielle. Accessible après un bac+2 dans le domaine technique.",
    debouches: ["Responsable qualité", "Coordinateur logistique", "Animateur lean", "Ingénieur méthodes"],
    tags: ["Lean manufacturing", "ISO 9001", "Supply chain", "Six Sigma"],
    color: C.secondary,
  },
  {
    num: "§03",
    sigle: "Alternance",
    titre: "Formation en Apprentissage",
    specialite: "BUT GMP par la voie de l'alternance",
    duree: "3 ans",
    description:
      "Le rythme entreprise-école permet d'acquérir une expérience professionnelle significative tout en validant le diplôme national. Contrat d'apprentissage ou de professionnalisation.",
    debouches: ["Intégration directe chez l'employeur", "CDI à l'issue", "Poursuite master", "Mobilité internationale"],
    tags: ["3 semaines/1 semaine", "Entreprise partenaire", "Maître alternance", "Tuteur pédago."],
    color: C.accent,
  },
];

function Parcours() {
  return (
    <section
      id="parcours"
      style={{ background: C.bg, padding: "6rem 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* En-tête de section style revue */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "3rem",
            alignItems: "end",
            marginBottom: "4rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "7rem",
                fontWeight: 900,
                color: C.primary,
                opacity: 0.08,
                lineHeight: 1,
                marginBottom: "-1rem",
              }}
              aria-hidden
            >
              §
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: C.secondary,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Section I
            </div>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: C.primary,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Nos parcours de formation
            </h2>
            <p style={{ color: C.neutral, fontSize: "0.95rem", maxWidth: 560 }}>
              Du BUT en trois ans à la Licence Professionnelle en un an, le
              département GMP propose des formations qui s'adaptent à chaque
              profil et à chaque ambition.
            </p>
          </div>
        </div>

        {/* Cards style entrée de dictionnaire */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {parcours.map((p) => (
            <ParcourCard key={p.num} parcour={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParcourCard({ parcour }: { parcour: (typeof parcours)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 2,
        padding: "2rem 2.5rem",
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: "2.5rem",
        alignItems: "start",
        cursor: "default",
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Numéro de section */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "2.5rem",
            fontWeight: 900,
            color: parcour.color,
            opacity: 0.25,
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          {parcour.num}
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: parcour.color,
            letterSpacing: "0.05em",
          }}
        >
          {parcour.sigle}
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            color: C.neutral,
            marginTop: "0.25rem",
          }}
        >
          {parcour.duree}
        </div>
      </div>

      {/* Corps */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: C.primary,
            letterSpacing: "-0.01em",
            marginBottom: "0.25rem",
          }}
        >
          {parcour.titre}
        </h3>
        <div
          style={{
            fontSize: "0.8rem",
            color: parcour.color,
            fontWeight: 600,
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {parcour.specialite}
        </div>
        <p
          style={{
            color: C.stone700,
            fontSize: "0.9rem",
            lineHeight: 1.7,
            marginBottom: "1.25rem",
          }}
        >
          {parcour.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {parcour.tags.map((t) => (
            <span
              key={t}
              style={{
                background: C.stone100,
                color: C.neutral,
                fontSize: "0.7rem",
                padding: "0.2rem 0.6rem",
                borderRadius: 9999,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Débouchés */}
      <div style={{ minWidth: 180 }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: C.neutral,
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Débouchés
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {parcour.debouches.map((d) => (
            <li
              key={d}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: C.stone700,
              }}
            >
              <span style={{ color: parcour.color, marginTop: 2, flexShrink: 0 }}>
                <ChevronRight size={12} />
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ─── Chiffres ──────────────────────────────────────────────────── */

const stats = [
  { value: "93", unit: "%", label: "Taux d'insertion professionnelle", sub: "à 6 mois après diplôme" },
  { value: "350", unit: "+", label: "Étudiants formés chaque année", sub: "sur les 3 niveaux" },
  { value: "120", unit: "", label: "Entreprises partenaires actives", sub: "en Île-de-France et au-delà" },
  { value: "30", unit: " ans", label: "D'expertise dans la formation", sub: "Fondé en 1994" },
];

function Chiffres() {
  return (
    <section
      style={{
        background: C.primary,
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Motif de fond typographique */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(12rem, 30vw, 28rem)",
          fontWeight: 900,
          color: "#ffffff",
          opacity: 0.03,
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        GMP
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "4rem",
          }}
        >
          <div style={{ width: 40, height: 2, background: C.secondary }} />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.secondary,
              fontWeight: 700,
            }}
          >
            Section II — En chiffres
          </span>
        </div>

        {/* Grille des chiffres */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3rem",
          }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              {/* Valeur géante */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.15em",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(3.5rem, 6vw, 5rem)",
                    fontWeight: 900,
                    color: C.white,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 700,
                    color: C.secondary,
                    lineHeight: 1,
                  }}
                >
                  {s.unit}
                </span>
              </div>

              {/* Séparateur */}
              <div
                style={{
                  width: 32,
                  height: 2,
                  background: C.secondary,
                  marginBottom: "0.75rem",
                }}
              />

              {/* Label */}
              <div
                style={{
                  color: "#e7e5e4",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  marginBottom: "0.25rem",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  color: "#78716c",
                  fontSize: "0.75rem",
                  letterSpacing: "0.03em",
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Entreprises ───────────────────────────────────────────────── */

const entreprises = [
  { nom: "Renault", secteur: "Automobile", type: "Alternance & stages" },
  { nom: "Safran", secteur: "Aéronautique", type: "Alternance & recrutement" },
  { nom: "Stellantis (ex-PSA)", secteur: "Automobile", type: "Projets tuteurés" },
  { nom: "Air Liquide", secteur: "Industrie des gaz", type: "Stages & alternance" },
  { nom: "Thales", secteur: "Défense & électronique", type: "Alternance" },
  { nom: "EDF", secteur: "Énergie", type: "Stages techniques" },
  { nom: "Dassault Systèmes", secteur: "Logiciel CAO", type: "Partenariat pédagogique" },
  { nom: "Faurecia", secteur: "Équipement automobile", type: "Recrutement & stages" },
];

function Entreprises() {
  return (
    <section
      id="entreprises"
      style={{ background: C.bg, padding: "6rem 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Layout journal : colonne principale + latérale */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "5rem",
            alignItems: "start",
          }}
          className="grid-cols-1 lg:grid-cols-[1fr_340px]"
        >
          {/* Colonne principale */}
          <div>
            {/* En-tête */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2.5rem",
              }}
            >
              <div style={{ width: 40, height: 2, background: C.secondary }} />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.secondary,
                  fontWeight: 700,
                }}
              >
                Section III — Partenaires
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: C.primary,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Un réseau industriel d'exception
            </h2>

            <p
              style={{
                color: C.neutral,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginBottom: "3rem",
                maxWidth: 520,
              }}
            >
              Depuis trente ans, le département GMP tisse des liens durables avec
              les acteurs industriels de l'Île-de-France et au-delà. Alternance,
              projets tuteurés et recrutement direct : les entreprises font
              confiance à nos diplômés.
            </p>

            {/* Liste des entreprises style tableau de presse */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {entreprises.map((e, i) => (
                <EntrepriseRow key={e.nom} entreprise={e} index={i} total={entreprises.length} />
              ))}
            </div>

            {/* Appel à l'action */}
            <div style={{ marginTop: "2.5rem" }}>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: C.primary,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  borderBottom: `2px solid ${C.primary}`,
                  paddingBottom: 2,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.secondary;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = C.secondary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.primary;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = C.primary;
                }}
              >
                Proposer une offre de stage ou d'alternance
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Colonne latérale */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Pull quote terracotta */}
            <blockquote
              style={{
                background: C.secondary,
                color: C.white,
                borderRadius: 2,
                padding: "2rem 2rem 2rem 2.5rem",
                position: "relative",
                margin: 0,
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1.25rem",
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "4rem",
                  lineHeight: 1,
                  opacity: 0.3,
                  fontWeight: 900,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  marginBottom: "1rem",
                  paddingTop: "1.5rem",
                }}
              >
                Les alternants GMP sont opérationnels dès leur première semaine.
                C'est un vrai gage de qualité.
              </p>
              <footer style={{ fontSize: "0.8rem", opacity: 0.8, fontWeight: 500 }}>
                — Responsable RH, Safran Aircraft Engines
              </footer>
            </blockquote>

            {/* Encart chiffre entreprises */}
            <div
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                padding: "1.75rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: C.neutral,
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                Pourquoi accueillir un alternant GMP ?
              </div>
              {[
                { icon: <Wrench size={14} />, text: "Formation polyvalente CAO, procédés et méthodes" },
                { icon: <BookOpen size={14} />, text: "Suivi pédagogique et tutorat entreprise inclus" },
                { icon: <Building2 size={14} />, text: "Aides à l'embauche jusqu'à 6 000 € (OPCO)" },
                { icon: <GraduationCap size={14} />, text: "Diplôme national niveau 6 (bac+3)" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "0.75rem 0",
                    borderTop: i > 0 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <span style={{ color: C.accent, flexShrink: 0, marginTop: 1 }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: C.stone700, lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact rapide */}
            <div
              style={{
                background: C.stone100,
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: C.neutral,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Contact relations entreprises
              </div>
              <a
                href="mailto:gmp-entreprises@iut-evry.fr"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: C.primary,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                }}
              >
                <Mail size={14} />
                gmp-entreprises@iut-evry.fr
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function EntrepriseRow({
  entreprise,
  index,
  total,
}: {
  entreprise: (typeof entreprises)[0];
  index: number;
  total: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isLastRow = index >= total - 2;
  const isRightCol = index % 2 === 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1rem 1.25rem",
        borderBottom: isLastRow ? "none" : `1px solid ${C.border}`,
        borderRight: isRightCol ? "none" : `1px solid ${C.border}`,
        background: hovered ? C.stone100 : C.white,
        transition: "background 0.15s",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          color: C.primary,
          fontSize: "0.9rem",
          marginBottom: "0.2rem",
        }}
      >
        {entreprise.nom}
      </div>
      <div style={{ fontSize: "0.75rem", color: C.neutral, marginBottom: "0.2rem" }}>
        {entreprise.secteur}
      </div>
      <div
        style={{
          fontSize: "0.65rem",
          color: C.accent,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {entreprise.type}
      </div>
    </div>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer
      style={{
        background: C.white,
        borderTop: `1px solid ${C.border}`,
        padding: "3rem 2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Logo footer */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.primary,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "1rem",
              fontWeight: 700,
              color: C.primary,
            }}
          >
            Département GMP
          </span>
        </div>

        {/* Références académiques */}
        <div
          style={{
            color: C.neutral,
            fontSize: "0.8rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
          }}
        >
          <strong style={{ color: C.stone700 }}>IUT d'Évry–Val-d'Essonne</strong>
          {" · "}
          Université Paris-Saclay
          <br />
          23 boulevard de France, 91034 Évry-Courcouronnes Cedex
          <br />
          Département Génie Mécanique et Productique (GMP)
        </div>

        {/* Séparateur */}
        <div
          style={{
            width: 40,
            height: 1,
            background: C.border,
            margin: "1.5rem auto",
          }}
        />

        {/* Liens */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {["Mentions légales", "Accessibilité", "Plan du site", "Espace numérique"].map(
            (l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: "0.75rem",
                  color: C.neutral,
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.primary)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.neutral)
                }
              >
                {l}
              </a>
            )
          )}
        </div>

        {/* Copyright + note design */}
        <div
          style={{
            fontSize: "0.7rem",
            color: C.stone200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ color: C.neutral }}>© 2025 IUT d'Évry — Université Paris-Saclay</span>
          <span style={{ color: C.border }}>·</span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: C.border,
              letterSpacing: "0.08em",
            }}
          >
            CHARTE V3 — CAMPUS — Proposition
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */

export default function CharteV3Page() {
  return (
    <div
      className={fraunces.variable + " " + dmSans.variable}
      style={{ fontFamily: "var(--font-dm-sans)", background: C.bg, minHeight: "100vh" }}
    >
      <Nav />
      <Hero />
      <Parcours />
      <Chiffres />
      <Entreprises />
      <Footer />
    </div>
  );
}
