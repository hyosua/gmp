import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCreneauxSemaine } from "@/actions/emploiDuTemps";
import NavigationSemaine from "@/components/emploi-du-temps/NavigationSemaine";
import CalendrierEnseignantClient from "@/components/emploi-du-temps/CalendrierEnseignantClient";
import { startOfWeek, parseISO, isValid } from "date-fns";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion Emploi du Temps | Enseignant | GMP",
};

export default async function PageEmploiDuTempsEnseignant({
  searchParams,
}: {
  searchParams: Promise<{ semaine?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session?.user?.id || session.user.role !== "ENSEIGNANT") {
    redirect("/connexion");
  }

  // 1. Date de début de semaine
  let dateDebut = startOfWeek(new Date(), { weekStartsOn: 1 });
  if (params.semaine) {
    const parsed = parseISO(params.semaine);
    if (isValid(parsed)) {
      dateDebut = startOfWeek(parsed, { weekStartsOn: 1 });
    }
  }

  // 2. Récupérer les données pour le formulaire
  const [matieres, groupes, creneauxRaw] = await Promise.all([
    // Matières de l'enseignant
    prisma.matiereEnseignant.findMany({
      where: { enseignantId: session.user.id },
      include: { matiere: true },
    }),
    // Tous les groupes (pour l'instant, on permet de choisir n'importe quel groupe)
    prisma.groupe.findMany({
      orderBy: { nom: "asc" },
    }),
    // Créneaux de la semaine (pour tout le monde, afin de voir les occupations de salle)
    getCreneauxSemaine(dateDebut),
  ]);

  // 3. Formater les créneaux pour l'affichage
  const creneaux = creneauxRaw.map((c) => ({
    ...c,
    matiere: c.matiere
      ? { id: c.matiere.id, nom: c.matiere.nom, code: c.matiere.code }
      : null,
  }));

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-secondary mb-2">
            Gestion du Planning
          </h1>
          <div className="h-1 w-20 bg-primary shadow-[0_0_8px_var(--c-primary)]" />
        </div>
        <p className="text-[10px] font-mono text-muted uppercase">
          Mode Édition : Enseignant
        </p>
      </div>

      <NavigationSemaine dateDebut={dateDebut} />

      {/* On utilise un composant client pour gérer l'état de la modale */}
      <CalendrierEnseignantClient
        initialCreneaux={creneaux}
        dateDebut={dateDebut}
        matieres={matieres.map((m) => m.matiere)}
        groupes={groupes}
        enseignantId={session.user.id}
      />
    </div>
  );
}
