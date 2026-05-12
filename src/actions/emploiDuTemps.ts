"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type ConflitResult =
  | "CONFLIT_SALLE"
  | "CONFLIT_ENSEIGNANT"
  | "CONFLIT_GROUPE"
  | null;

type VerifierConflitsParams = {
  semaine: Date;
  jour: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  enseignantId: string;
  groupeId: string;
  excludeId?: string;
};

async function verifierConflits(
  params: VerifierConflitsParams,
): Promise<ConflitResult> {
  const {
    semaine,
    jour,
    heureDebut,
    heureFin,
    salle,
    enseignantId,
    groupeId,
    excludeId,
  } = params;

  const debutSemaine = new Date(semaine);
  debutSemaine.setUTCHours(0, 0, 0, 0);

  const finSemaine = new Date(debutSemaine);
  finSemaine.setUTCDate(finSemaine.getUTCDate() + 7);

  const filtre = {
    jour,
    semaine: { gte: debutSemaine, lt: finSemaine },
    AND: [{ heureDebut: { lt: heureFin } }, { heureFin: { gt: heureDebut } }],
    ...(excludeId && { id: { not: excludeId } }),
  };

  const salleOccupee = await prisma.emploiDuTemps.findFirst({
    where: { salle, ...filtre },
  });
  if (salleOccupee) return "CONFLIT_SALLE";

  const profOccupe = await prisma.emploiDuTemps.findFirst({
    where: { enseignantId, ...filtre },
  });
  if (profOccupe) return "CONFLIT_ENSEIGNANT";

  const groupeOccupe = await prisma.emploiDuTemps.findFirst({
    where: { groupeId, ...filtre },
  });
  if (groupeOccupe) return "CONFLIT_GROUPE";

  return null;
}

type CreateCreneauData = {
  semaine: Date;
  jour: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  intitule: string;
  groupeId: string;
  matiereId: string;
};

type UpdateCreneauData = {
  semaine?: Date;
  jour?: string;
  heureDebut?: string;
  heureFin?: string;
  salle?: string;
  intitule?: string;
  groupeId?: string;
  matiereId?: string;
};

export async function createCreneau(data: CreateCreneauData) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ENSEIGNANT") {
    return { success: false, error: "UNAUTHORIZED" } as const;
  }

  const enseignantId = session.user.id;
  const salle = data.salle.trim().toUpperCase();

  const conflit = await verifierConflits({ ...data, salle, enseignantId });
  if (conflit) return { success: false, error: conflit } as const;

  const creneau = await prisma.emploiDuTemps.create({
    data: {
      semaine: data.semaine,
      jour: data.jour,
      heureDebut: data.heureDebut,
      heureFin: data.heureFin,
      salle,
      intitule: data.intitule,
      groupeId: data.groupeId,
      matiereId: data.matiereId,
      enseignantId,
    },
    select: { id: true, salle: true, semaine: true },
  });

  return { success: true, creneau } as const;
}

export async function updateCreneau(id: string, data: UpdateCreneauData) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ENSEIGNANT") {
    return { success: false, error: "UNAUTHORIZED" } as const;
  }

  const enseignantId = session.user.id;

  const existing = await prisma.emploiDuTemps.findUnique({ where: { id } });
  if (!existing || existing.enseignantId !== enseignantId) {
    return { success: false, error: "UNAUTHORIZED" } as const;
  }

  // Fusionner avec les valeurs existantes pour la vérification de conflits
  const merged = {
    semaine: data.semaine ?? existing.semaine,
    jour: data.jour ?? existing.jour,
    heureDebut: data.heureDebut ?? existing.heureDebut,
    heureFin: data.heureFin ?? existing.heureFin,
    salle: (data.salle ?? existing.salle).trim().toUpperCase(),
    groupeId: data.groupeId ?? existing.groupeId,
  };

  const conflit = await verifierConflits({
    ...merged,
    enseignantId,
    excludeId: id,
  });
  if (conflit) return { success: false, error: conflit } as const;

  const creneau = await prisma.emploiDuTemps.update({
    where: { id },
    data: { ...data, salle: merged.salle },
    select: { id: true, salle: true },
  });

  return { success: true, creneau } as const;
}

export async function deleteCreneau(id: string) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ENSEIGNANT") {
    return { success: false, error: "UNAUTHORIZED" } as const;
  }

  const enseignantId = session.user.id;

  const existing = await prisma.emploiDuTemps.findUnique({ where: { id } });
  if (!existing || existing.enseignantId !== enseignantId) {
    return { success: false, error: "UNAUTHORIZED" } as const;
  }

  await prisma.emploiDuTemps.delete({ where: { id } });
  return { success: true } as const;
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
      ...(groupeIds !== undefined ? { groupeId: { in: groupeIds } } : {}),
    },
    include: {
      enseignant: { select: { id: true, nom: true, prenom: true } },
      groupe: { select: { id: true, nom: true, type: true } },
      matiere: { select: { id: true, nom: true, code: true } },
    },
    orderBy: [{ jour: "asc" }, { heureDebut: "asc" }],
  });
}
