"use client";

import {
  Building2,
  ChevronRight,
  Cog,
  GraduationCap,
  LogIn,
  MapPin,
  Repeat2,
  Wrench,
  Zap,
} from "lucide-react";
import {
  IllustrationGearAssembly,
  IllustrationCAO,
  IllustrationUsinage,
  IllustrationRobot,
} from "./_illustrations";

/* ─── Blueprint background ──────────────────────────────────── */

const blueprintGrid = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
};

const blueprintGridLight = {
  backgroundImage: `
    linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px),
    linear-gradient(rgba(13,148,136,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13,148,136,0.025) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
};

/* ─── Crosshair decoration ──────────────────────────────────── */

function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`text-[#14b8a6] opacity-40 ${className}`}
    >
      <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="10" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/* ─── Annotation label (blueprint-style) ────────────────────── */

function Annotation({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`text-[10px] tracking-[0.25em] uppercase ${
        light ? "text-[#81adc8]/60" : "text-[#14b8a6]/70"
      }`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      {children}
    </span>
  );
}

/* ─── Nav ───────────────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#81adc8]/25">
      {/* thin teal top rule */}
      <div className="h-[2px] bg-[#0d9488]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0d9488] flex items-center justify-center shrink-0">
              <Cog className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none">
              <span
                className="font-bold text-[#171717] tracking-tight text-base"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                GMP
              </span>
              <span
                className="ml-1.5 text-[10px] text-[#81adc8] tracking-widest uppercase"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                IUT d'Évry
              </span>
            </div>
          </div>

          {/* links */}
          <div className="hidden md:flex items-center">
            {["Formation", "Entreprises", "Actualités"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-1.5 text-sm text-[#171717]/60 hover:text-[#0d9488] transition-colors"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* cta */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0d9488] text-white border border-[#0d9488] hover:bg-[#0f766e] hover:shadow-[3px_3px_0_#14b8a6] transition-all duration-150"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <LogIn className="w-3.5 h-3.5" />
            Connexion
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      className="relative bg-[#0c4a6e] pt-32 pb-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #0891b2 100%)",
      }}
    >
      {/* blueprint grid */}
      <div className="absolute inset-0" style={blueprintGrid} />

      {/* corner crosshairs */}
      <Crosshair className="absolute top-8 left-8" />
      <Crosshair className="absolute top-8 right-8" />
      <Crosshair className="absolute bottom-8 left-8" />
      <Crosshair className="absolute bottom-8 right-8" />

      {/* top-left document ref */}
      <div className="absolute top-[72px] left-8 flex flex-col gap-0.5">
        <Annotation>REF-GMP·IUT·EVR·2026</Annotation>
        <Annotation>ECH. 1:1 · RÉDACTEUR: DEPT-GMP</Annotation>
      </div>

      {/* vertical rule line left */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />
      {/* horizontal rule */}
      <div className="absolute left-0 right-0 top-[116px] h-[1px] bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          {/* label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-[1px] bg-[#f59e0b]" />
            <Annotation>Université Paris-Saclay · IUT d'Évry-Val-d'Essonne</Annotation>
          </div>

          {/* main title */}
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-2"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Génie Mécanique
            <br />
            <span className="text-[#f59e0b]">&amp; Productique</span>
          </h1>

          {/* subtitle annotation */}
          <div className="flex items-center gap-2 mt-4 mb-8">
            <span
              className="text-white/50 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Dept. GMP · BUT · Licence Pro · Alternance
            </span>
          </div>

          {/* description */}
          <p
            className="text-white/75 text-lg max-w-xl leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Formez-vous aux métiers de l'industrie de demain — conception
            assistée par ordinateur, fabrication, robotique et méthodes de
            production dans un département à taille humaine.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-16">
            <button
              className="flex items-center gap-2 px-7 py-3.5 font-semibold text-sm bg-[#f59e0b] text-white border border-[#f59e0b] hover:bg-[#d97706] hover:shadow-[4px_4px_0_#fbbf24] transition-all duration-150"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Découvrir la formation
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3.5 font-semibold text-sm bg-transparent text-white border border-white/30 hover:border-white/70 hover:shadow-[4px_4px_0_rgba(255,255,255,0.15)] transition-all duration-150"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Espace entreprises
            </button>
          </div>

          {/* stats */}
          <div
            className="flex flex-wrap gap-0 border-t border-white/10 pt-8"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {[
              { val: "120+", label: "ÉTUDIANTS / AN" },
              { val: "87%", label: "INSERTION PROF." },
              { val: "40+", label: "ENTREPRISES PARTENAIRES" },
              { val: "3", label: "PARCOURS DISPONIBLES" },
            ].map(({ val, label }, i) => (
              <div
                key={label}
                className="pr-10 mr-10 border-r border-white/10 last:border-0 last:mr-0 last:pr-0"
              >
                <p className="text-3xl font-bold text-white">{val}</p>
                <p className="text-[10px] text-white/40 tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* blueprint gear assembly illustration — right side */}
        <IllustrationGearAssembly className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[480px] opacity-20 pointer-events-none" />
      </div>

      {/* bottom border decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex">
        <div className="h-[2px] bg-[#f59e0b] w-24" />
        <div className="h-[2px] bg-white/10 flex-1" />
        <div className="h-[2px] bg-[#f59e0b] w-24" />
      </div>
    </section>
  );
}

/* ─── Parcours ──────────────────────────────────────────────── */

const parcours = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    code: "BUT-GMP",
    title: "BUT Génie Mécanique et Productique",
    duration: "3 ans",
    description:
      "Formation universitaire technologique complète, de la conception à la production. Débouchés ingénierie, méthodes, qualité.",
    tags: ["CAO/FAO", "Méthodes", "Robotique"],
    illustration: <IllustrationCAO className="w-full h-36" />,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    code: "LP-PROD",
    title: "Licence Pro Production Industrielle",
    duration: "1 an (Bac+2)",
    description:
      "Spécialisation rapide pour les titulaires d'un BTS/DUT. Accent sur l'optimisation des procédés et la lean manufacturing.",
    tags: ["Lean", "Qualité", "Gestion prod."],
    illustration: <IllustrationUsinage className="w-full h-36" />,
  },
  {
    icon: <Repeat2 className="w-6 h-6" />,
    code: "ALT-GMP",
    title: "Alternance",
    duration: "BUT 2e & 3e année",
    description:
      "Combinez formation et expérience professionnelle en entreprise. Rythme 1 semaine IUT / 3 semaines entreprise.",
    tags: ["Contrat pro", "Contrat app."],
    illustration: <IllustrationRobot className="w-full h-36" />,
  },
];

function Parcours() {
  return (
    <section className="py-24 bg-white relative">
      <div className="absolute inset-0" style={blueprintGridLight} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* section header */}
        <div className="flex items-start justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-[1px] bg-[#0d9488]" />
              <Annotation light>03 · Formations</Annotation>
            </div>
            <h2
              className="text-4xl font-bold text-[#171717]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              3 parcours,<br />
              <span className="text-[#0d9488]">une expertise</span>
            </h2>
          </div>
          <Crosshair className="opacity-20 mt-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {parcours.map(({ icon, code, title, duration, description, tags, illustration }) => (
            <div
              key={code}
              className="border border-[#81adc8]/25 bg-white hover:border-[#f59e0b] hover:shadow-[5px_5px_0_#f59e0b] transition-all duration-150 group cursor-pointer"
            >
              {/* illustration panel */}
              <div className="border-b border-[#81adc8]/20 bg-[#f8fafc] overflow-hidden">
                {illustration}
              </div>

              <div className="p-8">
              {/* code label */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[10px] tracking-[0.2em] text-[#81adc8] uppercase"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {code}
                </span>
                <span className="text-[#0d9488] group-hover:text-[#f59e0b] transition-colors">
                  {icon}
                </span>
              </div>

              {/* duration badge */}
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0d9488]/8 text-[#0d9488] border border-[#0d9488]/20 mb-4"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {duration}
              </span>

              <h3
                className="text-lg font-bold text-[#171717] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-[#171717]/60 leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {description}
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] text-[#81adc8] border border-[#81adc8]/30 bg-[#81adc8]/5"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-1 text-[#0d9488] group-hover:text-[#f59e0b] text-sm font-semibold transition-colors">
                <span style={{ fontFamily: "var(--font-outfit)" }}>En savoir plus</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              </div>{/* end p-8 */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Chiffres clés ─────────────────────────────────────────── */

const metrics = [
  { val: "87%", label: "Taux d'insertion professionnelle", sub: "à 6 mois après diplomation" },
  { val: "120+", label: "Étudiants formés", sub: "chaque année académique" },
  { val: "40+", label: "Entreprises partenaires", sub: "PME, ETI et grands groupes" },
  { val: "#3", label: "Classement IUT GMP", sub: "Île-de-France · édition 2025" },
];

function ChiffresClés() {
  return (
    <section className="py-24 bg-[#f0f9ff] relative overflow-hidden">
      <div className="absolute inset-0" style={blueprintGridLight} />

      {/* decorative corner */}
      <div className="absolute top-0 left-0 w-32 h-32 border-r border-b border-[#0d9488]/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-l border-t border-[#0d9488]/10" />
      <Crosshair className="absolute top-6 left-6 opacity-30" />
      <Crosshair className="absolute bottom-6 right-6 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-3 mb-14">
          <div className="w-4 h-[1px] bg-[#0d9488]" />
          <Annotation light>04 · Données · Année 2025-2026</Annotation>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {metrics.map(({ val, label, sub }, i) => (
            <div
              key={val}
              className="p-8 border-r border-[#81adc8]/20 last:border-0"
            >
              <p
                className="text-5xl font-bold text-[#0d9488] mb-2"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {val}
              </p>
              <p
                className="text-sm font-semibold text-[#171717] mb-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {label}
              </p>
              <p
                className="text-[11px] text-[#81adc8]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Entreprises ───────────────────────────────────────────── */

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
];

function Entreprises() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* left — pitch */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-[1px] bg-[#f59e0b]" />
              <Annotation light>05 · Partenariats</Annotation>
            </div>
            <h2
              className="text-4xl font-bold text-[#171717] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Recrutez des talents
              <br />
              <span className="text-[#f59e0b]">formés pour l'industrie</span>
            </h2>
            <p
              className="text-[#171717]/60 leading-relaxed mb-8 text-base"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Le département GMP entretient des relations étroites avec les
              acteurs industriels de l'Île-de-France. Proposez vos offres de
              stage, d'alternance ou de projets tuteurés directement à nos
              étudiants.
            </p>
            <button
              className="flex items-center gap-2 px-6 py-3 font-semibold text-sm bg-[#f59e0b] text-white border border-[#f59e0b] hover:bg-[#d97706] hover:shadow-[4px_4px_0_#fbbf24] transition-all duration-150"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <Building2 className="w-4 h-4" />
              Déposer une offre
            </button>
          </div>

          {/* right — cards */}
          <div className="space-y-5">
            {offres.map(({ company, location, type, title, description, tags, start }) => (
              <div
                key={company}
                className="border border-[#81adc8]/25 p-6 bg-white hover:border-[#f59e0b] hover:shadow-[4px_4px_0_#f59e0b] transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <div>
                      <p
                        className="font-bold text-[#171717] text-sm"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {company}
                      </p>
                      <p
                        className="text-[11px] text-[#81adc8] flex items-center gap-1"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        <MapPin className="w-2.5 h-2.5" /> {location}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f59e0b]/10 text-[#d97706] border border-[#f59e0b]/30"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {type}
                  </span>
                </div>

                <p
                  className="font-semibold text-[#171717] mb-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {title}
                </p>
                <p
                  className="text-xs text-[#171717]/55 leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] text-[#81adc8] border border-[#81adc8]/30"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-[10px] text-[#81adc8] tracking-widest"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {start}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#171717] text-white relative overflow-hidden">
      {/* blueprint teal grid on dark */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* top accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#0d9488] via-[#f59e0b] to-[#0d9488]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#0d9488] flex items-center justify-center">
                <Cog className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-bold text-white text-lg"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                GMP
              </span>
            </div>
            <p
              className="text-white/40 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Département Génie Mécanique et Productique<br />
              IUT d'Évry-Val-d'Essonne<br />
              Université Paris-Saclay
            </p>
          </div>

          {/* nav links */}
          <div>
            <p
              className="text-[10px] text-[#0d9488] tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Navigation
            </p>
            {["Formation", "Entreprises", "Actualités", "Connexion"].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-sm text-white/50 hover:text-white transition-colors mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* contact */}
          <div>
            <p
              className="text-[10px] text-[#0d9488] tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Contact
            </p>
            <p
              className="text-sm text-white/50 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              23 bd de France<br />
              91037 Évry-Courcouronnes<br />
              iut-gmp@univ-evry.fr
            </p>
          </div>
        </div>

        {/* cartouche footer — blueprint style */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div
            className="flex items-center gap-6 text-[10px] text-white/25 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <span>DOC: GMP-WEB-2026</span>
            <span>REV: 1.0</span>
            <span>IUT ÉVRY · UNIV. PARIS-SACLAY</span>
          </div>
          <p
            className="text-[10px] text-white/25 tracking-widest"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            © 2026 — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div style={{ fontFamily: "var(--font-outfit)" }}>
      <Nav />
      <Hero />
      <Parcours />
      <ChiffresClés />
      <Entreprises />
      <Footer />
    </div>
  );
}
