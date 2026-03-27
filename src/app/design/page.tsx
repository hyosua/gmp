"use client";

import {
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  Cog,
  GraduationCap,
  LayoutGrid,
  LogIn,
  Mail,
  MapPin,
  Wrench,
} from "lucide-react";

/* ─── helpers ──────────────────────────────────────────────── */

function Section({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20">
      <div className="flex items-baseline gap-4 mb-8 pb-3 border-b border-[#81adc8]/30">
        <span
          className="font-mono text-xs tracking-widest text-[#81adc8] uppercase"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {tag}
        </span>
        <h2
          className="text-2xl font-semibold text-[#0d9488]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/* ─── colour swatch ─────────────────────────────────────────── */

function Swatch({
  color,
  label,
  hex,
  textDark = false,
}: {
  color: string;
  label: string;
  hex: string;
  textDark?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div
        className="h-20 w-full border border-[#81adc8]/20"
        style={{ background: color }}
      />
      <div className="mt-2">
        <p
          className="text-sm font-medium text-[#171717]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {label}
        </p>
        <p
          className="text-xs text-[#81adc8]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {hex}
        </p>
      </div>
    </div>
  );
}

/* ─── button ────────────────────────────────────────────────── */

function Btn({
  variant,
  children,
}: {
  variant: "primary" | "secondary" | "outline" | "ghost";
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-150 cursor-pointer border";

  const variants = {
    primary:
      "bg-[#0d9488] text-white border-[#0d9488] hover:bg-[#0f766e] hover:shadow-[4px_4px_0px_0px_#14b8a6]",
    secondary:
      "bg-[#f59e0b] text-white border-[#f59e0b] hover:bg-[#d97706] hover:shadow-[4px_4px_0px_0px_#fbbf24]",
    outline:
      "bg-transparent text-[#0d9488] border-[#0d9488] hover:bg-[#0d9488] hover:text-white hover:shadow-[4px_4px_0px_0px_#81adc8]",
    ghost:
      "bg-transparent text-[#171717] border-transparent hover:border-[#81adc8] hover:shadow-[4px_4px_0px_0px_#81adc8]",
  };

  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}

/* ─── badge ─────────────────────────────────────────────────── */

function Badge({
  color,
  children,
}: {
  color: "teal" | "amber" | "neutral" | "dark";
  children: React.ReactNode;
}) {
  const colors = {
    teal: "bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/30",
    amber: "bg-[#f59e0b]/10 text-[#d97706] border border-[#f59e0b]/40",
    neutral: "bg-[#81adc8]/15 text-[#5a8aaa] border border-[#81adc8]/30",
    dark: "bg-[#171717] text-white border border-[#171717]",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {children}
    </span>
  );
}

/* ─── card ──────────────────────────────────────────────────── */

function CardEtudiant() {
  return (
    <div className="border border-[#81adc8]/30 p-6 hover:border-[#0d9488] hover:shadow-[4px_4px_0px_0px_#0d9488] transition-all duration-150 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0d9488]/10 border border-[#0d9488]/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-[#0d9488]" />
          </div>
          <div>
            <p
              className="font-semibold text-[#171717]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Martin Dupont
            </p>
            <p
              className="text-xs text-[#81adc8]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              GMP2 · TD-A · TP-3
            </p>
          </div>
        </div>
        <Badge color="teal">Étudiant</Badge>
      </div>

      <div
        className="grid grid-cols-2 gap-3 border-t border-[#81adc8]/20 pt-4 mt-2 text-sm"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <div>
          <p className="text-[#81adc8] text-xs mb-1">MOYENNE GEN.</p>
          <p className="text-[#171717] font-semibold text-lg">13,4</p>
        </div>
        <div>
          <p className="text-[#81adc8] text-xs mb-1">CRÉDITS ECTS</p>
          <p className="text-[#171717] font-semibold text-lg">48 / 60</p>
        </div>
      </div>
    </div>
  );
}

function CardEntreprise() {
  return (
    <div className="border border-[#81adc8]/30 p-6 hover:border-[#f59e0b] hover:shadow-[4px_4px_0px_0px_#f59e0b] transition-all duration-150 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <p
              className="font-semibold text-[#171717]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Renault Group
            </p>
            <p
              className="text-xs text-[#81adc8] flex items-center gap-1"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <MapPin className="w-3 h-3" /> Flins-sur-Seine
            </p>
          </div>
        </div>
        <Badge color="amber">Partenaire</Badge>
      </div>

      <p
        className="text-sm text-[#171717]/70 mb-4 leading-relaxed"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Offre d'alternance — Technicien méthodes industrialisation. Démarrage
        septembre 2026.
      </p>

      <div className="flex gap-2 flex-wrap">
        <Badge color="neutral">Mécanique</Badge>
        <Badge color="neutral">Méthodes</Badge>
        <Badge color="neutral">CAO</Badge>
      </div>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────── */

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: "var(--font-outfit)" }}>

      {/* ── topbar nav ─────────────────────────────────────── */}
      <nav className="bg-white border-b border-[#81adc8]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#0d9488] flex items-center justify-center">
                <Cog className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[#171717] tracking-tight">
                GMP
                <span className="text-[#81adc8] font-normal ml-1 text-sm">
                  IUT d'Évry
                </span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {["Formation", "Entreprises", "Actualités"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-1.5 text-sm text-[#171717]/70 hover:text-[#0d9488] hover:bg-[#0d9488]/5 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-[#0d9488] text-white border border-[#0d9488] hover:bg-[#0f766e] hover:shadow-[3px_3px_0px_0px_#14b8a6] transition-all duration-150">
              <LogIn className="w-3.5 h-3.5" />
              Connexion
            </button>
          </div>
        </div>
      </nav>

      {/* ── hero ───────────────────────────────────────────── */}
      <div className="bg-[#0d9488] text-white relative overflow-hidden">
        {/* blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <p
            className="text-[#14b8a6] text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            IUT d'Évry · Université Paris-Saclay
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-2xl">
            Génie Mécanique
            <br />
            <span className="text-[#f59e0b]">&amp; Productique</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-8 leading-relaxed">
            Formez-vous aux métiers de l'industrie de demain — conception,
            fabrication, robotique, méthodes.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-6 py-3 font-semibold bg-[#f59e0b] text-white border border-[#f59e0b] hover:bg-[#d97706] hover:shadow-[4px_4px_0px_0px_#fbbf24] transition-all duration-150">
              Découvrir la formation
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 font-semibold bg-transparent text-white border border-white/40 hover:border-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-150">
              Espace entreprises
            </button>
          </div>
        </div>
      </div>

      {/* ── design system sections ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 1. palette */}
        <Section title="Palette couleurs" tag="01 · colors">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            <Swatch color="#0d9488" label="Primaire" hex="#0d9488" />
            <Swatch color="#0f766e" label="Primaire dark" hex="#0f766e" />
            <Swatch color="#14b8a6" label="Primaire light" hex="#14b8a6" textDark />
            <Swatch color="#f59e0b" label="Secondaire" hex="#f59e0b" textDark />
            <Swatch color="#d97706" label="Secondaire dark" hex="#d97706" />
            <Swatch color="#fbbf24" label="Secondaire light" hex="#fbbf24" textDark />
            <Swatch color="#81adc8" label="Neutre" hex="#81adc8" textDark />
            <Swatch color="#5a8aaa" label="Neutre dark" hex="#5a8aaa" />
            <Swatch color="#b8d4e8" label="Neutre light" hex="#b8d4e8" textDark />
            <Swatch color="#171717" label="Foreground" hex="#171717" />
            <Swatch color="#ffffff" label="Background" hex="#ffffff" textDark />
          </div>
        </Section>

        {/* 2. typographie */}
        <Section title="Typographie" tag="02 · typography">
          <div className="space-y-6">
            {[
              { tag: "h1", size: "text-5xl", weight: "font-bold", label: "Titre display" },
              { tag: "h2", size: "text-4xl", weight: "font-bold", label: "Titre section" },
              { tag: "h3", size: "text-3xl", weight: "font-semibold", label: "Titre carte" },
              { tag: "h4", size: "text-2xl", weight: "font-semibold", label: "Sous-titre" },
              { tag: "h5", size: "text-xl", weight: "font-medium", label: "Label fort" },
              { tag: "h6", size: "text-base", weight: "font-medium", label: "Label" },
            ].map(({ tag, size, weight, label }) => (
              <div key={tag} className="flex items-baseline gap-6">
                <span
                  className="w-24 shrink-0 text-xs text-[#81adc8] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {tag} · {label}
                </span>
                <p className={`${size} ${weight} text-[#171717]`}>
                  Génie Mécanique & Productique
                </p>
              </div>
            ))}

            <div className="flex items-baseline gap-6">
              <span
                className="w-24 shrink-0 text-xs text-[#81adc8] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                body
              </span>
              <p className="text-base text-[#171717]/80 max-w-xl leading-relaxed">
                Le département GMP forme des techniciens supérieurs aux métiers
                de la production industrielle, de la conception assistée par
                ordinateur et de la qualité.
              </p>
            </div>

            <div className="flex items-baseline gap-6">
              <span
                className="w-24 shrink-0 text-xs text-[#81adc8] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                mono
              </span>
              <p
                className="text-sm text-[#0d9488] bg-[#0d9488]/5 border border-[#0d9488]/20 px-4 py-2"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                UE-301 · MECA-STRUCT · 13,5 / 20 · ECTS 4
              </p>
            </div>
          </div>
        </Section>

        {/* 3. boutons */}
        <Section title="Boutons" tag="03 · buttons">
          <div className="flex flex-wrap gap-4 items-center">
            <Btn variant="primary">
              <Cog className="w-4 h-4" /> Primaire teal
            </Btn>
            <Btn variant="secondary">
              <ChevronRight className="w-4 h-4" /> Secondaire amber
            </Btn>
            <Btn variant="outline">
              <LayoutGrid className="w-4 h-4" /> Outline
            </Btn>
            <Btn variant="ghost">Ghost</Btn>
          </div>
          <p
            className="mt-3 text-xs text-[#81adc8]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            * hover pour voir l'effet shadow colorée
          </p>
        </Section>

        {/* 4. badges */}
        <Section title="Badges & Tags" tag="04 · badges">
          <div className="flex flex-wrap gap-3">
            <Badge color="teal">Étudiant</Badge>
            <Badge color="amber">Partenaire</Badge>
            <Badge color="neutral">Mécanique</Badge>
            <Badge color="neutral">CAO / FAO</Badge>
            <Badge color="neutral">Robotique</Badge>
            <Badge color="dark">Admin</Badge>
            <Badge color="teal">Alternance</Badge>
            <Badge color="amber">Offre ouverte</Badge>
          </div>
        </Section>

        {/* 5. cards */}
        <Section title="Cards" tag="05 · cards">
          <div className="grid md:grid-cols-2 gap-6">
            <CardEtudiant />
            <CardEntreprise />
          </div>
        </Section>

        {/* 6. formulaire */}
        <Section title="Formulaire" tag="06 · form">
          <form className="max-w-lg space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                className="block text-sm font-semibold text-[#171717] mb-1.5"
                htmlFor="nom"
              >
                Nom complet
              </label>
              <input
                id="nom"
                type="text"
                placeholder="Martin Dupont"
                className="w-full px-4 py-2.5 text-sm bg-white border border-[#81adc8]/40 text-[#171717] placeholder:text-[#81adc8]/60 outline-none focus:border-[#0d9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.15)] transition-all"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-[#171717] mb-1.5"
                htmlFor="email"
              >
                E-mail institutionnel
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#81adc8]" />
                <input
                  id="email"
                  type="email"
                  placeholder="m.dupont@etud.univ-evry.fr"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#81adc8]/40 text-[#171717] placeholder:text-[#81adc8]/60 outline-none focus:border-[#0d9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.15)] transition-all"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-[#171717] mb-1.5"
                htmlFor="role"
              >
                Rôle
              </label>
              <select
                id="role"
                className="w-full px-4 py-2.5 text-sm bg-white border border-[#81adc8]/40 text-[#171717] outline-none focus:border-[#0d9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.15)] transition-all appearance-none cursor-pointer"
              >
                <option value="">Sélectionner un rôle</option>
                <option value="etudiant">Étudiant</option>
                <option value="enseignant">Enseignant</option>
                <option value="entreprise">Entreprise</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold bg-[#0d9488] text-white border border-[#0d9488] hover:bg-[#0f766e] hover:shadow-[4px_4px_0px_0px_#14b8a6] transition-all duration-150"
            >
              Soumettre
            </button>
          </form>
        </Section>

        {/* 7. icônes */}
        <Section title="Iconographie — Lucide React" tag="07 · icons">
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: "GraduationCap" },
              { icon: <Building2 className="w-6 h-6" />, label: "Building2" },
              { icon: <Cog className="w-6 h-6" />, label: "Cog" },
              { icon: <Wrench className="w-6 h-6" />, label: "Wrench" },
              { icon: <BookOpen className="w-6 h-6" />, label: "BookOpen" },
              { icon: <Calendar className="w-6 h-6" />, label: "Calendar" },
              { icon: <LayoutGrid className="w-6 h-6" />, label: "LayoutGrid" },
              { icon: <Mail className="w-6 h-6" />, label: "Mail" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-4 border border-[#81adc8]/20 hover:border-[#0d9488] hover:shadow-[3px_3px_0px_0px_#0d9488] transition-all duration-150 w-24"
              >
                <span className="text-[#0d9488]">{icon}</span>
                <span
                  className="text-[9px] text-[#81adc8] text-center leading-tight"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* footer marker */}
        <div
          className="border-t border-[#81adc8]/30 pt-6 flex items-center justify-between text-xs text-[#81adc8]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <span>GMP · IUT d'Évry · Charte graphique V2 Forge Outfit</span>
          <span className="text-[#0d9488]">— page de validation interne —</span>
        </div>
      </div>
    </div>
  );
}
