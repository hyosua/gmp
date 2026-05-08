import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Affiche tous les enseignants existants
    const enseignants = await prisma.supportDeCours.findMany();
    console.log("Tous les cours:", enseignants);

    const cours = await prisma.supportDeCours.findMany({
      where: { enseignantId: "cmo2xtsya0001covurps87zi5" },
    });

    console.log("Cours filtrés:", cours);

    return NextResponse.json(cours, { status: 200 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
