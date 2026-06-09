import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const [
    users,
    projetsPending,
    offrespending,
    projetsPublished,
    offresPublished,
  ] = await Promise.all([
    prisma.user.groupBy({ by: ["role"], _count: true }),
    prisma.projetTuteure.count({ where: { statut: "PENDING" } }),
    prisma.offreAlternance.count({ where: { statut: "PENDING" } }),
    prisma.projetTuteure.count({ where: { statut: "PUBLISHED" } }),
    prisma.offreAlternance.count({ where: { statut: "PUBLISHED" } }),
  ]);

  const usersByRole = Object.fromEntries(users.map((u) => [u.role, u._count]));

  return NextResponse.json({
    users: usersByRole,
    pending: { projets: projetsPending, offres: offrespending },
    published: { projets: projetsPublished, offres: offresPublished },
  });
}
