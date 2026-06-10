import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Parcours } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const formData = await request.formData();

  const poste = formData.get("poste") || "";
  const description = formData.get("description") || "";
  const duree = formData.get("duree") || "";
  const remuneration = formData.get("remuneration") || "";
  const prerequis = formData.get("prerequis") || "";
  const parcours = formData.get("parcours") || null;

  const offre = await prisma.offreAlternance.update({
    where: { id: id.toString() },
    data: {
      poste: poste.toString(),
      description: description.toString(),
      duree: duree.toString(),
      remuneration: remuneration.toString(),
      prerequis: prerequis.toString(),
      parcours: parcours ? (parcours.toString() as Parcours) : null,
    },
  });

  return NextResponse.json(offre);
}
