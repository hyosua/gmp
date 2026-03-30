"use client";

const cards = [
  {
    title: "Double compétence",
    desc: "Formation équilibrée entre mécanique théorique et savoir-faire pratique en production",
  },
  {
    title: "Laboratoires modernes",
    desc: "Équipements de pointe pour l&rsquo;usinage, la métrologie et l&rsquo;automatisation industrielle",
  },
  {
    title: "Partenariats industriels",
    desc: "Relations étroites avec les entreprises locales pour stages et projets professionnels",
  },
  {
    title: "Pédagogie active",
    desc: "Apprentissage par projets, travaux pratiques et cas d&rsquo;études industriels",
  },
  {
    title: "Ouverture internationale",
    desc: "Possibilité d&rsquo;échanges Erasmus et enseignement en anglais",
  },
  {
    title: "Insertion professionnelle",
    desc: "Taux d&rsquo;insertion de 95% dans les 6 mois suivant l&rsquo;obtention du diplôme",
  },
];

export default function SpecificitePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
      <div className="max-w-[1280px] w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">
            Spécificités
          </h1>
          <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
            Ce qui fait la particularité du BUT GMP à l&rsquo;IUT d&rsquo;Évry
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-12">
          {cards.map(({ title, desc }) => (
            <div
              key={title}
              className="bg-bg-card p-6 border border-border border-t-[3px] border-t-primary text-center"
            >
              <h3 className="text-base font-bold mb-3 text-primary font-sans tracking-[0.03em]">
                {title}
              </h3>
              <p className="text-muted text-sm font-sans leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-bg-card border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] p-8">
          <h3 className="text-xl font-bold mb-6 text-center text-primary font-sans tracking-[0.05em]">
            Pourquoi choisir le BUT GMP d&rsquo;Évry ?
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {[
              { title: "Excellence académique", desc: "Formation reconnue et appréciée par les entreprises du secteur industriel" },
              { title: "Réseau professionnel", desc: "Plus de 200 entreprises partenaires dans la région Île-de-France" },
              { title: "Recherche & Innovation", desc: "Laboratoires de recherche intégrés aux enseignements" },
              { title: "Poursuite d&rsquo;études", desc: "Possibilité d&rsquo;intégrer des masters ou écoles d&rsquo;ingénieurs" },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h4 className="font-bold mb-2 text-secondary font-sans text-sm">
                  {title}
                </h4>
                <p className="text-sm text-muted font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
