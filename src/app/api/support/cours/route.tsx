import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    const matiereId = req.nextUrl.searchParams.get("matiereId") || undefined;

    const cours = await prisma.supportDeCours.findMany({
      where: {
        ...(role === "ENSEIGNANT"
          ? { enseignantId: session?.user.id.toString() || "" }
          : {}),
        ...(matiereId ? { matiereId } : {}),
      },
      include: {
        matiere: { select: { id: true, nom: true, code: true } },
      },
      orderBy: { dateDepot: "desc" },
    });

    return NextResponse.json(cours, { status: 200 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
