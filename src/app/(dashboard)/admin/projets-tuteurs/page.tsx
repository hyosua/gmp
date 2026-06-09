"use client";

import { useEffect, useState } from "react";

type Entreprise = {
  nom: string;
  prenom: string;
  email: string;
};

type Projet = {
  id: string;
  titre: string;
  description: string;
  prerequis: string | null;
  nbEtudiants: number;
  statut: string;
  createdAt: string;
  entreprise: Entreprise;
};

const LABELS: Record<string, string> = {
  PENDING: "En attente",
  PUBLISHED: "Publié",
  REJECTED: "Rejeté",
};

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  PUBLISHED: {
    backgroundColor: "var(--c-primary-15)",
    color: "var(--c-primary)",
  },
  REJECTED: {
    backgroundColor: "rgba(220,38,38,0.12)",
    color: "var(--c-error)",
  },
  PENDING: { backgroundColor: "var(--c-accent-30)", color: "var(--c-accent)" },
};

export default function AdminProjetsTuteurs() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [filtre, setFiltre] = useState<"PENDING" | "PUBLISHED" | "REJECTED">(
    "PENDING",
  );
  const [ouvert, setOuvert] = useState<string | null>(null);

  async function charger() {
    const res = await fetch("/api/admin/projets");
    const data = await res.json();
    setProjets(data);
  }

  useEffect(() => {
    fetch("/api/admin/projets")
      .then((r) => r.json())
      .then((data) => setProjets(data as Projet[]));
  }, []);

  async function changerStatut(id: string, statut: "PUBLISHED" | "REJECTED") {
    await fetch(`/api/projets/statut/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    charger();
    setOuvert(null);
  }

  const projetsAffiches = projets.filter((p) => p.statut === filtre);

  return (
    <div className="forge-container py-8">
      <h1 className="text-secondary font-mono text-xl mb-6">
        Modération — Projets tuteurés
      </h1>

      {/* Filtres */}
      <div className="flex gap-2 mb-6">
        {(["PENDING", "PUBLISHED", "REJECTED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFiltre(s)}
            className={
              filtre === s
                ? "forge-btn-primary text-xs"
                : "forge-btn-ghost text-xs"
            }
          >
            {LABELS[s]} ({projets.filter((p) => p.statut === s).length})
          </button>
        ))}
      </div>

      {projetsAffiches.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucun projet {LABELS[filtre].toLowerCase()}.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projetsAffiches.map((p) => (
            <div key={p.id} className="forge-card">
              <button
                className="w-full text-left flex items-center justify-between bg-transparent border-none cursor-pointer"
                onClick={() => setOuvert(ouvert === p.id ? null : p.id)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs px-2 py-1"
                    style={BADGE_STYLES[p.statut] ?? {}}
                  >
                    {LABELS[p.statut] ?? p.statut}
                  </span>
                  <span className="text-secondary font-semibold text-sm">
                    {p.titre}
                  </span>
                  <span className="text-muted text-xs">
                    {p.entreprise.nom} {p.entreprise.prenom}
                  </span>
                </div>
                <span className="text-muted text-xs font-mono">
                  {ouvert === p.id ? "▲" : "▼"}
                </span>
              </button>

              {ouvert === p.id && (
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-muted font-mono text-xs mb-1">
                      DESCRIPTION
                    </p>
                    <p className="text-secondary">{p.description}</p>
                  </div>

                  {p.prerequis && (
                    <div>
                      <p className="text-muted font-mono text-xs mb-1">
                        PRÉREQUIS
                      </p>
                      <p className="text-secondary">{p.prerequis}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-muted font-mono text-xs mb-1">
                      ENTREPRISE
                    </p>
                    <p className="text-secondary">
                      {p.entreprise.nom} {p.entreprise.prenom}
                    </p>
                    <a
                      href={`mailto:${p.entreprise.email}`}
                      className="text-primary text-xs"
                    >
                      {p.entreprise.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-muted font-mono text-xs mb-1">
                      ÉTUDIANTS SOUHAITÉS
                    </p>
                    <p className="text-secondary">{p.nbEtudiants}</p>
                  </div>

                  {p.statut !== "PUBLISHED" && (
                    <button
                      className="forge-btn-primary text-sm"
                      onClick={() => changerStatut(p.id, "PUBLISHED")}
                    >
                      Publier
                    </button>
                  )}
                  {p.statut !== "REJECTED" && (
                    <button
                      className="forge-btn-ghost text-sm"
                      style={{ color: "var(--c-error)" }}
                      onClick={() => changerStatut(p.id, "REJECTED")}
                    >
                      Rejeter
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
