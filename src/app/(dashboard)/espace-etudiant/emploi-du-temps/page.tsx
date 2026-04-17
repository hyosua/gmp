import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCreneauxSemaine } from "@/actions/emploiDuTemps";
import CalendrierSemaine from "@/components/emploi-du-temps/CalendrierSemaine";
import NavigationSemaine from "@/components/emploi-du-temps/NavigationSemaine";
import { startOfWeek, parseISO, isValid } from "date-fns";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emploi du Temps | Espace Étudiant | GMP",
};

export default async function PageEmploiDuTempsEtudiant({
  searchParams,
}: {
  searchParams: Promise<{ semaine?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session?.user?.id || session.user.role !== "ETUDIANT") {
    redirect("/connexion");
  }

  // 1. Déterminer la date de début de semaine (Lundi)
  let dateDebut = startOfWeek(new Date(), { weekStartsOn: 1 });
  if (params.semaine) {
    const parsed = parseISO(params.semaine);
    if (isValid(parsed)) {
      dateDebut = startOfWeek(parsed, { weekStartsOn: 1 });
    }
  }

  // 2. Récupérer les groupes de l'étudiant
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { groupes: { select: { id: true } } },
  });

  const groupeIds = user?.groupes.map((g) => g.id) || [];

  // 3. Récupérer les créneaux
  const creneauxRaw = await getCreneauxSemaine(dateDebut, groupeIds);

  // 4. Formater pour le composant (s'assurer que les types correspondent)
  const creneaux = creneauxRaw.map((c) => ({
    ...c,
    matiere: c.matiere ? { nom: c.matiere.nom, code: c.matiere.code } : null,
  }));

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-secondary mb-2">
          Mon Emploi du Temps
        </h1>
        <div className="h-1 w-20 bg-primary shadow-[0_0_8px_var(--c-primary)]" />
      </div>

      <NavigationSemaine dateDebut={dateDebut} />

      <div className="mt-8">
        <CalendrierSemaine creneaux={creneaux} dateDebut={dateDebut} />
      </div>

      <div className="mt-6 flex items-center gap-4 text-[10px] font-mono text-muted uppercase">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/20 border border-primary/40" />
          <span>Cours / TP / TD</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-border" />
          <span>Plage libre</span>
        </div>
      </div>
    </div>
  );
}
