import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ENTREPRISE") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await context.params;

  const existant = await prisma.projetTuteure.findUnique({ where: { id } });
  if (!existant || existant.entrepriseId !== session.user.id) {
    return NextResponse.json(
      { error: "Projet introuvable ou accès refusé" },
      { status: 404 },
    );
  }

  const formData = await request.formData();
  const titre = formData.get("titre")?.toString() ?? existant.titre;
  const description =
    formData.get("description")?.toString() ?? existant.description;
  const prerequis =
    formData.get("prerequis")?.toString() ?? existant.prerequis ?? "";
  const nbEtudiants = parseInt(
    formData.get("nbEtudiants")?.toString() ?? String(existant.nbEtudiants),
    10,
  );

  const projet = await prisma.projetTuteure.update({
    where: { id },
    data: {
      titre,
      description,
      prerequis: prerequis || null,
      nbEtudiants: isNaN(nbEtudiants) ? existant.nbEtudiants : nbEtudiants,
    },
  });

  return NextResponse.json(projet);
}
