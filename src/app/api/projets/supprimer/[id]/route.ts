import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: NextRequest,
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

  await prisma.projetTuteure.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
