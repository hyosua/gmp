import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    let where: Prisma.OffreAlternanceWhereInput;

    if (session.user.role === "ENTREPRISE") {
      where = { entrepriseId: session.user.id };
    } else if (
      session.user.role === "ETUDIANT" &&
      session.user.parcours &&
      session.user.parcours !== "NON_DEFINI"
    ) {
      where = {
        statut: "PUBLISHED",
        OR: [
          { parcours: null },
          { parcours: "NON_DEFINI" },
          { parcours: session.user.parcours },
        ],
      };
    } else {
      where = { statut: "PUBLISHED" as const };
    }

    const offres = await prisma.offreAlternance.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(offres, { status: 200 });
  } catch (ex) {
    return NextResponse.json(ex, { status: 500 });
  }
}
