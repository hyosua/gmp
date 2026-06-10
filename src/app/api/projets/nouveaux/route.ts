import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Parcours } from "@prisma/client";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ENTREPRISE") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const titre = formData.get("titre")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const prerequis = formData.get("prerequis")?.toString() ?? "";
  const nbEtudiants = parseInt(
    formData.get("nbEtudiants")?.toString() ?? "1",
    10,
  );
  const parcoursRaw = formData.get("parcours")?.toString() ?? "";

  if (!titre || !description) {
    return NextResponse.json(
      { error: "Titre et description obligatoires" },
      { status: 400 },
    );
  }

  const projet = await prisma.projetTuteure.create({
    data: {
      titre,
      description,
      prerequis: prerequis || null,
      nbEtudiants: isNaN(nbEtudiants) ? 1 : nbEtudiants,
      parcours: parcoursRaw ? (parcoursRaw as Parcours) : null,
      entrepriseId: session.user.id,
    },
  });

  return NextResponse.json(projet, { status: 201 });
}
