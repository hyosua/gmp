import { auth } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Espace Étudiant | GMP" };

export const dynamic = "force-dynamic";

export default async function EspaceEtudiant() {
  const session = await auth();

  const etudiant = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { groupes: true },
      })
    : null;
  console.log("Groupes", etudiant?.groupes);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-secondary">
        Espace Étudiant
      </h1>
      <div className="forge-card rounded-lg p-8 mb-8 shadow-sm">
        <p className="text-lg text-secondary">
          Bienvenue, <strong>{session?.user?.name}</strong>.
        </p>
        <p className="text-muted mt-2">Ceci est votre espace personnel.</p>
        {etudiant?.groupes && etudiant.groupes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {etudiant.groupes.map((groupe) => (
              <span
                key={groupe.id}
                className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary text-white"
              >
                {groupe.nom}
              </span>
            ))}
          </div>
        )}
      </div>
      <LogoutButton />
    </div>
  );
}
