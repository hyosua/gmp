import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const formData = await request.formData();

  const poste = formData.get("poste") || "";
  const description = formData.get("description") || "";

  const offre = await prisma.offreAlternance.update({
    where: { id: id.toString() },
    data: {
      poste: poste.toString(),
      description: description.toString(),
    },
  });

  return NextResponse.json(offre);
}
