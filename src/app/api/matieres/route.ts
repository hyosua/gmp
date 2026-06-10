import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const matieres = await prisma.matiere.findMany({
    select: { id: true, nom: true, code: true },
    orderBy: { nom: "asc" },
  });

  return NextResponse.json(matieres);
}
