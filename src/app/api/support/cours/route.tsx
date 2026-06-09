import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";


export async function GET() {
  try {
    // Affiche tous les enseignants existants
    const enseignants = await prisma.supportDeCours.findMany();
    console.log("Tous les cours:", enseignants);
    const session = await auth();

    const cours = await prisma.supportDeCours.findMany({
      where: { enseignantId: session?.user.id.toString() || '' },
    });

    console.log("Cours filtrés:", cours);

    return NextResponse.json(cours, { status: 200 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
