import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Statut } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await context.params;
  const { statut } = (await request.json()) as { statut: Statut };

  if (statut !== "PUBLISHED" && statut !== "REJECTED") {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const existante = await prisma.offreAlternance.findUnique({ where: { id } });
  if (!existante) {
    return NextResponse.json({ error: "Offre introuvable" }, { status: 404 });
  }

  const offre = await prisma.offreAlternance.update({
    where: { id },
    data: { statut },
  });

  return NextResponse.json(offre);
}
