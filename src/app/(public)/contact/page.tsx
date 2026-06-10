export default function ContactPage() {
  const gestionnaires = [
    {
      nom: "Brigitte BEGARIN",
      tel: "01 69 47 73 30",
      href: "tel:+33169477330",
      role: "1ère année formation initiale",
    },
    {
      nom: "Patricia DE ROECK",
      tel: "01 69 47 73 32",
      href: "tel:+33169477332",
      role: "2ème année formation initiale",
    },
    {
      nom: "Karine LALANDRE",
      tel: "01 69 47 73 33",
      href: "tel:+33169477333",
      role: "Formation en alternance",
    },
  ];

  return (
    <section className="forge-section text-center">
      <div className="forge-container px-6">
        <div className="mb-12">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-primary">
            GMP EVRY
          </p>

          <h1 className="mb-4 text-4xl font-bold">Nous contacter</h1>

          <p>
            Retrouvez les contacts administratifs et pédagogiques du département
            GMP.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chef de département */}
          <div className="forge-card">
            <h2 data-card-title className="mb-6 text-xl font-semibold">
              Chef de département
            </h2>

            <p className="text-lg font-medium">Fanny JOBE</p>
          </div>

          {/* Responsable des études */}
          <div className="forge-card">
            <h2 data-card-title className="mb-6 text-xl font-semibold">
              Responsable des études
            </h2>

            <div>
              <p className="font-medium">Sylvain HALOUIS</p>

              <a
                href="tel:+33169477345"
                className="mt-1 block text-primary hover:underline"
              >
                01 69 47 73 45
              </a>
            </div>
          </div>

          {/* Formations */}
          <div className="forge-card lg:col-span-2">
            <h2 data-card-title className="mb-6 text-xl font-semibold">
              Responsables par formation
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 font-medium">
                  1ère année formation initiale
                </h3>

                <p>Fanny JOBE</p>

                <a
                  href="tel:+33169477345"
                  className="text-primary hover:underline"
                >
                  01 69 47 73 45
                </a>
              </div>

              <div>
                <h3 className="mb-2 font-medium">
                  2ème année formation initiale
                </h3>

                <p>Nilyan PRONE</p>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Formation en alternance</h3>

                <p>Nilyan PRONE</p>
              </div>
            </div>
          </div>

          {/* Secrétariat */}
          <div className="forge-card lg:col-span-2">
            <h2 data-card-title className="mb-6 text-xl font-semibold">
              Gestionnaires pédagogiques
            </h2>

            <div className="mb-8 rounded border border-border bg-primary/5 p-4">
              <p className="mb-2 font-medium">Secrétariat</p>

              <a
                href="mailto:secretariat-gmp@univ-evry.fr"
                className="text-primary hover:underline"
              >
                secretariat-gmp@univ-evry.fr
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {gestionnaires.map((personne) => (
                <div key={personne.nom}>
                  <h3 className="font-medium">{personne.nom}</h3>

                  <p className="text-muted">{personne.role}</p>

                  <a
                    href={personne.href}
                    className="mt-1 block text-primary hover:underline"
                  >
                    {personne.tel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
