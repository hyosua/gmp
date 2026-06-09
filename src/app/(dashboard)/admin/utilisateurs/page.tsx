"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  actif: boolean;
  parcours: string;
  typeFormation: string;
  anneePromotion: number;
  createdAt: string;
};

const ROLES = ["ETUDIANT", "ENSEIGNANT", "ENTREPRISE"] as const;
type RoleFilter = (typeof ROLES)[number];

const ROLE_LABELS: Record<string, string> = {
  ETUDIANT: "Étudiants",
  ENSEIGNANT: "Enseignants",
  ENTREPRISE: "Entreprises",
};

const PARCOURS_LABELS: Record<string, string> = {
  SIMULATION_REALITE_VIRTUELLE: "Simulation & Réalité Virtuelle",
  CONCEPTION_PRODUCTION_DURABLE: "Conception & Production Durable",
  NON_DEFINI: "Non défini",
  LP_MIE: "LP MIE",
  LP_MIEF: "LP MIEF",
  LP_MRI: "LP MRI",
};

export default function AdminUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  const [onglet, setOnglet] = useState<RoleFilter>("ETUDIANT");
  const [selectionne, setSelectionne] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function charger() {
    const res = await fetch("/api/admin/utilisateurs");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    fetch("/api/admin/utilisateurs")
      .then((r) => r.json())
      .then((data) => setUsers(data as User[]));
  }, []);

  async function toggleActif(user: User) {
    setLoading(true);
    await fetch(`/api/admin/utilisateurs/${user.id}/statut`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !user.actif }),
    });
    await charger();
    setSelectionne((prev) =>
      prev?.id === user.id ? { ...prev, actif: !prev.actif } : prev,
    );
    setLoading(false);
  }

  const filtres = users.filter((u) => u.role === onglet);

  return (
    <div className="forge-container py-8">
      <h1 className="text-secondary font-mono text-xl mb-6">Utilisateurs</h1>

      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        {ROLES.map((role) => {
          const count = users.filter((u) => u.role === role).length;
          return (
            <button
              key={role}
              onClick={() => setOnglet(role)}
              className={
                onglet === role
                  ? "forge-btn-primary text-xs"
                  : "forge-btn-ghost text-xs"
              }
            >
              {ROLE_LABELS[role]} ({count})
            </button>
          );
        })}
      </div>

      {/* Liste */}
      {filtres.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucun {ROLE_LABELS[onglet].toLowerCase().slice(0, -1)}.
        </div>
      ) : (
        <div className="forge-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted font-mono text-xs uppercase tracking-widest">
                <th className="text-left py-2 pr-4 font-normal">Nom</th>
                <th className="text-left py-2 pr-4 font-normal">Email</th>
                <th className="text-left py-2 pr-4 font-normal">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtres.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0 cursor-pointer hover:bg-[var(--c-primary-10)] transition-colors"
                  onClick={() => setSelectionne(user)}
                >
                  <td className="py-2 pr-4 text-secondary font-semibold">
                    {user.prenom} {user.nom}
                  </td>
                  <td className="py-2 pr-4 text-muted">{user.email}</td>
                  <td className="py-2">
                    <span
                      className="font-mono text-xs px-2 py-0.5"
                      style={
                        user.actif
                          ? {
                              backgroundColor: "var(--c-primary-15)",
                              color: "var(--c-primary)",
                            }
                          : {
                              backgroundColor: "rgba(220,38,38,0.12)",
                              color: "var(--c-error)",
                            }
                      }
                    >
                      {user.actif ? "Actif" : "Inactif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectionne && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectionne(null)}
        >
          <div
            className="forge-card w-full max-w-md flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary font-semibold text-base">
                  {selectionne.prenom} {selectionne.nom}
                </p>
                <p className="text-muted text-xs font-mono">
                  {selectionne.email}
                </p>
              </div>
              <button
                onClick={() => setSelectionne(null)}
                className="bg-transparent border-none cursor-pointer text-muted hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted font-mono uppercase tracking-widest mb-1">
                  Rôle
                </p>
                <p className="text-secondary">
                  {ROLE_LABELS[selectionne.role] ?? selectionne.role}
                </p>
              </div>
              <div>
                <p className="text-muted font-mono uppercase tracking-widest mb-1">
                  Statut
                </p>
                <span
                  className="font-mono text-xs px-2 py-0.5"
                  style={
                    selectionne.actif
                      ? {
                          backgroundColor: "var(--c-primary-15)",
                          color: "var(--c-primary)",
                        }
                      : {
                          backgroundColor: "rgba(220,38,38,0.12)",
                          color: "var(--c-error)",
                        }
                  }
                >
                  {selectionne.actif ? "Actif" : "Inactif"}
                </span>
              </div>
              {selectionne.role === "ETUDIANT" && (
                <>
                  <div>
                    <p className="text-muted font-mono uppercase tracking-widest mb-1">
                      Parcours
                    </p>
                    <p className="text-secondary">
                      {PARCOURS_LABELS[selectionne.parcours] ??
                        selectionne.parcours}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted font-mono uppercase tracking-widest mb-1">
                      Formation
                    </p>
                    <p className="text-secondary">
                      {selectionne.typeFormation === "ALTERNANCE"
                        ? "Alternance"
                        : "Initiale"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted font-mono uppercase tracking-widest mb-1">
                      Promo
                    </p>
                    <p className="text-secondary">
                      {selectionne.anneePromotion}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-muted font-mono uppercase tracking-widest mb-1">
                  Inscrit le
                </p>
                <p className="text-secondary">
                  {new Date(selectionne.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>

            <button
              className={
                selectionne.actif
                  ? "forge-btn-ghost text-sm"
                  : "forge-btn-primary text-sm"
              }
              style={
                selectionne.actif ? { color: "var(--c-error)" } : undefined
              }
              disabled={loading}
              onClick={() => toggleActif(selectionne)}
            >
              {loading
                ? "..."
                : selectionne.actif
                  ? "Désactiver le compte"
                  : "Activer le compte"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
