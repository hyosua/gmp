import { auth } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Espace Enseignant | GMP" };

export const dynamic = "force-dynamic";

export default async function EspaceEnseignant() {
  const session = await auth();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-secondary">
        Espace Enseignant
      </h1>
      <div className="forge-card rounded-lg p-8 mb-8 shadow-sm">
        <p className="text-lg text-secondary">
          Bienvenue, <strong>{session?.user?.name}</strong>.
        </p>
        <p className="text-muted mt-2">
          Ceci est votre espace de gestion pédagogique.
        </p>
        <Link
          href="/espace-enseignant/notes"
          className="forge-btn-primary mt-4 inline-block"
        >
          Gérer les notes
        </Link>
      </div>
      <LogoutButton />
    </div>
  );
}
