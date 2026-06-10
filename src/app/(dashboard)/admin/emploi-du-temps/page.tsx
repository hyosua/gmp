import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCreneauxSemaine } from "@/actions/emploiDuTemps";
import CalendrierSemaine from "@/components/emploi-du-temps/CalendrierSemaine";
import CalendrierJour from "@/components/emploi-du-temps/CalendrierJour";
import NavigationSemaine from "@/components/emploi-du-temps/NavigationSemaine";
import SelectGroupe from "./SelectGroupe";
import { startOfWeek, parseISO, isValid } from "date-fns";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emploi du Temps | Administration | GMP",
};

export default async function PageEmploiDuTempsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ semaine?: string; groupeId?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/connexion");
  }

  let dateDebut = startOfWeek(new Date(), { weekStartsOn: 1 });
  if (params.semaine) {
    const parsed = parseISO(params.semaine);
    if (isValid(parsed)) {
      dateDebut = startOfWeek(parsed, { weekStartsOn: 1 });
    }
  }

  const groupes = await prisma.groupe.findMany({
    select: { id: true, nom: true, type: true, anneeScolaire: true },
    orderBy: [{ anneeScolaire: "desc" }, { nom: "asc" }],
  });

  const groupeIdActuel = params.groupeId ?? "";

  const creneauxRaw = groupeIdActuel
    ? await getCreneauxSemaine(dateDebut, [groupeIdActuel])
    : [];

  const creneaux = creneauxRaw.map((c) => ({
    ...c,
    matiere: c.matiere
      ? { id: c.matiere.id, nom: c.matiere.nom, code: c.matiere.code }
      : null,
  }));

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-secondary mb-2">
          Emploi du Temps
        </h1>
        <div className="h-1 w-20 bg-primary shadow-[0_0_8px_var(--c-primary)]" />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-mono text-muted uppercase tracking-widest">
          Groupe
        </span>
        <SelectGroupe groupes={groupes} groupeIdActuel={groupeIdActuel} />
      </div>

      <NavigationSemaine dateDebut={dateDebut} />

      {!groupeIdActuel && (
        <div className="mt-8 forge-card text-center py-16 text-muted font-mono text-sm">
          Sélectionner un groupe pour afficher l&apos;emploi du temps.
        </div>
      )}

      {groupeIdActuel && (
        <>
          <div className="mt-8 hidden md:block">
            <CalendrierSemaine creneaux={creneaux} dateDebut={dateDebut} />
          </div>
          <div className="mt-8 md:hidden">
            <CalendrierJour creneaux={creneaux} dateDebut={dateDebut} />
          </div>
        </>
      )}
    </div>
  );
}
