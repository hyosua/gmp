"use server";

import { prisma } from "@/lib/prisma";

const creneauInclude = {
  enseignant: { select: { id: true, nom: true, prenom: true } },
  groupe: { select: { id: true, nom: true, type: true } },
  matiere: { select: { id: true, nom: true, code: true } },
} as const;

type CreateCreneauData = {
  semaine: Date;
  jour: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  intitule: string;
  groupeId: string;
  enseignantId: string;
  matiereId: string;
  recurrent: boolean;
  recurrenceFin?: Date;
};

type CreateCreneauResult =
  | { success: true; creneaux: { id: string; salle: string; semaine: Date }[] }
  | {
      success: false;
      error:
        | "CONFLIT_SALLE"
        | "CONFLIT_ENSEIGNANT"
        | "CONFLIT_GROUPE"
        | "UNAUTHORIZED";
    };

export async function createCreneau(
  data: CreateCreneauData,
): Promise<CreateCreneauResult> {
  const {
    semaine,
    jour,
    heureDebut,
    heureFin,
    salle,
    recurrent,
    recurrenceFin,
    enseignantId,
    groupeId,
    ...rest
  } = data;

  const semaines: Date[] = [semaine];
  if (recurrent && recurrenceFin) {
    const cursor = new Date(semaine);
    while (true) {
      cursor.setUTCDate(cursor.getUTCDate() + 7);
      if (cursor > recurrenceFin) break;
      semaines.push(new Date(cursor));
    }
  }

  for (const s of semaines) {
    const debut = new Date(s);
    debut.setUTCHours(0, 0, 0, 0);
    const fin = new Date(debut);
    fin.setUTCDate(fin.getUTCDate() + 7);

    // Vérifier les conflits
    const baseFilter = {
      jour,
      semaine: { gte: debut, lt: fin },
      AND: [{ heureDebut: { lt: heureFin } }, { heureFin: { gt: heureDebut } }],
    };

    const conflitSalle = await prisma.emploiDuTemps.findFirst({
      where: { salle, ...baseFilter },
    });
    if (conflitSalle) return { success: false, error: "CONFLIT_SALLE" };

    const conflitEnseignant = await prisma.emploiDuTemps.findFirst({
      where: { enseignantId, ...baseFilter },
    });
    if (conflitEnseignant)
      return { success: false, error: "CONFLIT_ENSEIGNANT" };

    const conflitGroupe = await prisma.emploiDuTemps.findFirst({
      where: { groupeId, ...baseFilter },
    });
    if (conflitGroupe) return { success: false, error: "CONFLIT_GROUPE" };
  }

  const creneaux = await prisma.$transaction(
    semaines.map((s) =>
      prisma.emploiDuTemps.create({
        data: {
          semaine: s,
          jour,
          heureDebut,
          heureFin,
          salle,
          recurrent,
          recurrenceFin: recurrenceFin ?? null,
          enseignantId,
          groupeId,
          ...rest,
        },
        select: { id: true, salle: true, semaine: true },
      }),
    ),
  );

  return { success: true, creneaux };
}

export async function updateCreneau(
  id: string,
  enseignantId: string,
  data: Partial<
    Pick<
      CreateCreneauData,
      | "salle"
      | "heureDebut"
      | "heureFin"
      | "jour"
      | "intitule"
      | "matiereId"
      | "groupeId"
      | "recurrenceFin"
    >
  >,
): Promise<
  | { success: true; creneau: { id: string; salle: string } }
  | {
      success: false;
      error:
        | "UNAUTHORIZED"
        | "CONFLIT_SALLE"
        | "CONFLIT_ENSEIGNANT"
        | "CONFLIT_GROUPE";
    }
> {
  const existing = await prisma.emploiDuTemps.findUnique({ where: { id } });
  if (!existing?.enseignantId || existing.enseignantId !== enseignantId) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  // Si on modifie les horaires, la salle ou le groupe, on vérifie les conflits
  const jour = data.jour || existing.jour;
  const heureDebut = data.heureDebut || existing.heureDebut;
  const heureFin = data.heureFin || existing.heureFin;
  const salle = data.salle || existing.salle;
  const groupeId = data.groupeId || existing.groupeId;

  const debut = new Date(existing.semaine);
  debut.setUTCHours(0, 0, 0, 0);
  const fin = new Date(debut);
  fin.setUTCDate(fin.getUTCDate() + 7);

  const baseFilter = {
    id: { not: id }, // Exclure le créneau actuel
    jour,
    semaine: { gte: debut, lt: fin },
    AND: [{ heureDebut: { lt: heureFin } }, { heureFin: { gt: heureDebut } }],
  };

  const conflitSalle = await prisma.emploiDuTemps.findFirst({
    where: { salle, ...baseFilter },
  });
  if (conflitSalle) return { success: false, error: "CONFLIT_SALLE" };

  const conflitEnseignant = await prisma.emploiDuTemps.findFirst({
    where: { enseignantId, ...baseFilter },
  });
  if (conflitEnseignant) return { success: false, error: "CONFLIT_ENSEIGNANT" };

  const conflitGroupe = await prisma.emploiDuTemps.findFirst({
    where: { groupeId, ...baseFilter },
  });
  if (conflitGroupe) return { success: false, error: "CONFLIT_GROUPE" };

  const creneau = await prisma.emploiDuTemps.update({
    where: { id },
    data,
    select: { id: true, salle: true },
  });

  return { success: true, creneau };
}

export async function deleteCreneau(
  id: string,
  enseignantId: string,
): Promise<{ success: true } | { success: false; error: "UNAUTHORIZED" }> {
  const existing = await prisma.emploiDuTemps.findUnique({ where: { id } });
  if (!existing?.enseignantId || existing.enseignantId !== enseignantId) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  await prisma.emploiDuTemps.delete({ where: { id } });
  return { success: true };
}

export async function getCreneauxSemaine(
  dateDebut: Date,
  groupeIds?: string[],
) {
  const debut = new Date(dateDebut);
  debut.setUTCHours(0, 0, 0, 0);
  const fin = new Date(debut);
  fin.setUTCDate(fin.getUTCDate() + 7);

  return prisma.emploiDuTemps.findMany({
    where: {
      semaine: { gte: debut, lt: fin },
      ...(groupeIds?.length ? { groupeId: { in: groupeIds } } : {}),
    },
    include: creneauInclude,
    orderBy: [{ jour: "asc" }, { heureDebut: "asc" }],
  });
}
