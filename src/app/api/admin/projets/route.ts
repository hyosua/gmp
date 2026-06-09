import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const projets = await prisma.projetTuteure.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      entreprise: { select: { nom: true, prenom: true, email: true } },
    },
  });

  return NextResponse.json(projets);
}
