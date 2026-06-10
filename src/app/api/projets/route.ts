import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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

  let wherePublie: Prisma.ProjetTuteureFindManyArgs["where"];

  if (
    role === "ETUDIANT" &&
    session.user.parcours &&
    session.user.parcours !== "NON_DEFINI"
  ) {
    wherePublie = {
      statut: "PUBLISHED",
      OR: [
        { parcours: null },
        { parcours: "NON_DEFINI" },
        { parcours: session.user.parcours },
      ],
    };
  } else {
    wherePublie = { statut: "PUBLISHED" };
  }

  const projets = await prisma.projetTuteure.findMany({
    where: wherePublie,
    orderBy: { createdAt: "desc" },
    include: {
      entreprise: { select: { nom: true, prenom: true, email: true } },
    },
  });
  return NextResponse.json(projets);
}
