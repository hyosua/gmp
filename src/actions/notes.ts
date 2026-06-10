"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

/**
 * Crée une nouvelle note
 * @returns La note créée
 */
export async function createNote(formData: FormData) {
  const session = await auth();
  const enseignantId = session?.user?.id;
  if (!enseignantId || session?.user?.role !== "ENSEIGNANT") {
    throw new Error("Accès refusé.");
  }

  const etudiantId = formData.get("etudiantId") as string;
  const matiereId = formData.get("matiere") as string;
  const valeur = Number.parseFloat(formData.get("valeur") as string);
  const semestre = Number.parseInt(formData.get("semestre") as string);
  const annee = Number.parseInt(formData.get("annee") as string);

  if (Number.isNaN(valeur) || Number.isNaN(semestre) || Number.isNaN(annee)) {
    throw new Error("Valeur, semestre et année doivent être des nombres.");
  }

  if (!etudiantId || !matiereId) {
    throw new Error("L'étudiant et la matière sont requis.");
  }

  const note = await prisma.note.create({
    data: {
      etudiantId,
      enseignantId,
      matiereId,
      valeur,
      semestre,
      annee,
    },
  });

  revalidatePath("/espace-enseignant/notes");
}

/**
 * Supprime une note
 * @param noteId L'ID de la note à supprimer
 */
export async function deleteNote(noteId: string) {
  const session = await auth();
  const enseignantId = session?.user?.id;
  if (!enseignantId || session?.user?.role !== "ENSEIGNANT") {
    throw new Error("Accès refusé.");
  }
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note || note?.enseignantId !== enseignantId) {
    throw new Error("Accès refusé");
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  revalidatePath("/espace-enseignant/notes");
}

/**
 * Modifie une note
 *
 */
export async function updateNote(formData: FormData) {
  const session = await auth();
  const enseignantId = session?.user?.id;
  if (!enseignantId || session?.user?.role !== "ENSEIGNANT") {
    throw new Error("Accès refusé.");
  }

  const id = formData.get("id") as string;
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note || note?.enseignantId !== enseignantId) {
    throw new Error("Accès refusé");
  }
  const etudiantId = formData.get("etudiantId") as string;
  const matiereId = formData.get("matiere") as string;
  const valeur = Number.parseFloat(formData.get("valeur") as string);
  const semestre = Number.parseInt(formData.get("semestre") as string);
  const annee = Number.parseInt(formData.get("annee") as string);

  if (Number.isNaN(valeur) || Number.isNaN(semestre) || Number.isNaN(annee)) {
    throw new Error("Valeur, semestre et année doivent être des nombres.");
  }

  if (!etudiantId || !matiereId) {
    throw new Error("L'étudiant et la matière sont requis.");
  }

  await prisma.note.update({
    where: { id },
    data: {
      etudiantId,
      matiereId,
      valeur,
      semestre,
      annee,
    },
  });

  revalidatePath("/espace-enseignant/notes");
  redirect("/espace-enseignant/notes");
}
