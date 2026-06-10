import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const { id } = await params;

  const support = await prisma.supportDeCours.findUnique({ where: { id } });
  if (!support) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  await prisma.supportDeCours.delete({ where: { id } });

  try {
    const filePath = path.join(process.cwd(), support.cheminFichier);
    await unlink(filePath);
  } catch {
    // fichier déjà absent, on ignore
  }

  return NextResponse.json({ ok: true });
}
