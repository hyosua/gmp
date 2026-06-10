import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const where =
      session.user.role === "ENTREPRISE"
        ? { entrepriseId: session.user.id }
        : { statut: "PUBLISHED" as const };

    const offres = await prisma.offreAlternance.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(offres, { status: 200 });
  } catch (ex) {
    return NextResponse.json(ex, { status: 500 });
  }
}
