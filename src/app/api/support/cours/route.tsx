import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    const role = session?.user?.role;

    const cours = await prisma.supportDeCours.findMany({
      where:
        role === "ENSEIGNANT"
          ? { enseignantId: session?.user.id.toString() || "" }
          : undefined,
    });

    return NextResponse.json(cours, { status: 200 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
