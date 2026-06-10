import Link from "next/link";

export default function RolePage() {
  const roles = [
    {
      title: "Étudiant",
      description: "Accéder à l’espace étudiant, cours et services.",
      href: "/connexion",
    },
    {
      title: "Enseignant",
      description: "Accéder aux outils pédagogiques et gestion des cours.",
      href: "/connexion",
    },
    {
      title: "Entreprise",
      description: "Espace partenaires et offres de stage / alternance.",
      href: "/connexion",
    },
    {
      title: "Administrateur",
      description: "Gestion globale de la plateforme et des utilisateurs.",
      href: "/connexion",
    },
  ];

  return (
    <section className="forge-section text-center">
      <div className="forge-container px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-primary">
            FORGE PLATFORM
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            Qui êtes-vous ?
          </h1>

          <p className="text-muted max-w-2xl mx-auto">
            Choisissez votre espace pour accéder aux services adaptés à votre profil.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <Link key={role.title} href={role.href}>
              <div className="forge-card group cursor-pointer transition">
                <h2
                  data-card-title
                  className="mb-2 text-xl font-semibold group-hover:text-primary"
                >
                  {role.title}
                </h2>

                <p className="text-sm text-muted">
                  {role.description}
                </p>

                <div className="mt-6 text-sm text-primary opacity-0 transition group-hover:opacity-100">
                  Accéder →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}