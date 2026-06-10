import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const role = session.user.role;

  if (role === "ENTREPRISE") {
    const projets = await prisma.projetTuteure.findMany({
      where: { entrepriseId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projets);
  }

  // ETUDIANT, ENSEIGNANT et ADMIN voient les projets publiés avec les infos de l'entreprise
  const projets = await prisma.projetTuteure.findMany({
    where: { statut: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      entreprise: { select: { nom: true, prenom: true, email: true } },
    },
  });
  return NextResponse.json(projets);
}
