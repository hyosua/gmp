import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, FolderOpen, Briefcase } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Administration | GMP" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();

  const [
    usersByRole,
    projetsPending,
    offresPending,
    projetsPublished,
    offresPublished,
  ] = await Promise.all([
    prisma.user.groupBy({ by: ["role"], _count: true }),
    prisma.projetTuteure.count({ where: { statut: "PENDING" } }),
    prisma.offreAlternance.count({ where: { statut: "PENDING" } }),
    prisma.projetTuteure.count({ where: { statut: "PUBLISHED" } }),
    prisma.offreAlternance.count({ where: { statut: "PUBLISHED" } }),
  ]);

  const userCounts = Object.fromEntries(
    usersByRole.map((u) => [u.role, u._count]),
  );
  const totalUsers = usersByRole.reduce((acc, u) => acc + u._count, 0);

  return (
    <div className="forge-container py-8">
      <div className="mb-8">
        <h1 className="text-secondary font-mono text-xl">Administration</h1>
        <p className="text-muted text-sm mt-1">
          Bienvenue, <strong>{session?.user?.name}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Utilisateurs */}
        <div className="forge-card flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted font-mono text-xs uppercase tracking-widest">
            <Users size={14} />
            Utilisateurs
          </div>
          <div className="text-3xl font-mono font-bold text-secondary">
            {totalUsers}
          </div>
          <div className="flex flex-col gap-1 text-xs font-mono text-muted">
            <span>{userCounts["ETUDIANT"] ?? 0} étudiants</span>
            <span>{userCounts["ENSEIGNANT"] ?? 0} enseignants</span>
            <span>{userCounts["ENTREPRISE"] ?? 0} entreprises</span>
          </div>
          <Link
            href="/admin/utilisateurs"
            className="forge-btn-ghost text-xs text-center mt-auto"
          >
            Gérer les utilisateurs →
          </Link>
        </div>

        {/* Projets tuteurés */}
        <div className="forge-card flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted font-mono text-xs uppercase tracking-widest">
            <FolderOpen size={14} />
            Projets tuteurés
          </div>
          <div className="text-3xl font-mono font-bold text-secondary">
            {projetsPublished}
            <span className="text-base font-normal text-muted"> publiés</span>
          </div>
          {projetsPending > 0 && (
            <div
              className="font-mono text-xs px-2 py-1 self-start"
              style={{
                backgroundColor: "var(--c-accent-30)",
                color: "var(--c-accent)",
              }}
            >
              {projetsPending} en attente
            </div>
          )}
          <Link
            href="/admin/projets-tuteurs"
            className="forge-btn-ghost text-xs text-center mt-auto"
          >
            Modérer les projets →
          </Link>
        </div>

        {/* Offres alternance */}
        <div className="forge-card flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted font-mono text-xs uppercase tracking-widest">
            <Briefcase size={14} />
            Offres alternance
          </div>
          <div className="text-3xl font-mono font-bold text-secondary">
            {offresPublished}
            <span className="text-base font-normal text-muted"> publiées</span>
          </div>
          {offresPending > 0 && (
            <div
              className="font-mono text-xs px-2 py-1 self-start"
              style={{
                backgroundColor: "var(--c-accent-30)",
                color: "var(--c-accent)",
              }}
            >
              {offresPending} en attente
            </div>
          )}
          <Link
            href="/admin/offres"
            className="forge-btn-ghost text-xs text-center mt-auto"
          >
            Modérer les offres →
          </Link>
        </div>
      </div>
    </div>
  );
}
