import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Parcours } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await context.params;
  const { parcours } = await request.json();

  const projet = await prisma.projetTuteure.update({
    where: { id },
    data: { parcours: parcours ? (parcours as Parcours) : null },
  });

  return NextResponse.json(projet);
}
