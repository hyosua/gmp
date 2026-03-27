/* Page de comparaison des chartes graphiques — usage interne
   Accessible à /chartes — à partager au collaborateur GitHub      */

const chartes = [
  {
    id: "v1",
    route: "/",
    label: "V1 — Blueprint",
    description: "Teal institutionnel · Esthétique dessin technique · Outfit + Geist Mono · Sharp · Overlay photo monochrome",
    colors: ["#0d9488", "#f59e0b", "#81adc8", "#ffffff"],
    bg: "#0d9488",
    tag: "Charte actuelle",
    tagColor: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
  {
    id: "v2",
    route: "/charte-v2",
    label: "V2 — Forge",
    description: "Dark industriel · Orange acier chauffé · Syne + Mono · Fond nuit d'usine · Glow orange au hover",
    colors: ["#0f172a", "#f97316", "#fbbf24", "#e2e8f0"],
    bg: "#0f172a",
    tag: "Alternative sombre",
    tagColor: "bg-orange-100 text-orange-800 border border-orange-200",
  },
  {
    id: "v3",
    route: "/charte-v3",
    label: "V3 — Campus",
    description: "Éditorial académique · Bleu marine + Terracotta · Fraunces serif + DM Sans · Aéré · Prestige IUT",
    colors: ["#fafaf9", "#1e3a5f", "#c2410c", "#0ea5e9"],
    bg: "#fafaf9",
    tag: "Alternative lumineuse",
    tagColor: "bg-blue-100 text-blue-800 border border-blue-200",
  },
];

export default function ChartesPage() {
  return (
    <div
      className="min-h-screen bg-[#f1f5f9]"
      style={{ fontFamily: "var(--font-outfit, system-ui, sans-serif)" }}
    >
      {/* header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p
            className="text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-2"
            style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
          >
            GMP · IUT d'Évry · Usage interne
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Comparaison des chartes graphiques
          </h1>
          <p className="text-slate-500 text-base">
            3 propositions de design pour le site institutionnel GMP. Cliquez sur une charte pour la visualiser en pleine page.
          </p>
        </div>
      </div>

      {/* cards */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-6">
        {chartes.map(({ id, route, label, description, colors, bg, tag, tagColor }) => (
          <a
            key={id}
            href={route}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-0 bg-white border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            {/* color preview strip */}
            <div
              className="w-48 shrink-0 flex flex-col justify-end p-4 relative"
              style={{ background: bg }}
            >
              <div className="flex gap-1.5 mb-3">
                {colors.map((c) => (
                  <div
                    key={c}
                    className="w-6 h-6 border border-white/20"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
              <span
                className="text-[9px] tracking-widest uppercase text-white/40"
                style={{ fontFamily: "monospace" }}
              >
                {id.toUpperCase()}
              </span>
            </div>

            {/* info */}
            <div className="flex-1 p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold text-slate-900">{label}</h2>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tagColor}`}>
                    {tag}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{description}</p>
              </div>
              <div className="shrink-0 ml-6 text-slate-300 group-hover:text-slate-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* footer */}
      <div
        className="max-w-5xl mx-auto px-6 pb-10 text-center text-[11px] text-slate-400"
        style={{ fontFamily: "monospace" }}
      >
        GMP-CHARTE-CMP · feat/chartre-graphique · Pour décision design finale
      </div>
    </div>
  );
}
