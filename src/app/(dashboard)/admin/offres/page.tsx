"use client";

import { useEffect, useState } from "react";

type Entreprise = {
  nom: string;
  prenom: string;
  email: string;
};

type Offre = {
  id: string;
  poste: string;
  description: string;
  duree: string;
  remuneration: string | null;
  prerequis: string | null;
  statut: string;
  createdAt: string;
  entreprise: Entreprise;
};

const LABELS: Record<string, string> = {
  PENDING: "En attente",
  PUBLISHED: "Publiée",
  REJECTED: "Rejetée",
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

export default function AdminOffres() {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [filtre, setFiltre] = useState<"PENDING" | "PUBLISHED" | "REJECTED">(
    "PENDING",
  );
  const [ouvert, setOuvert] = useState<string | null>(null);

  async function charger() {
    const res = await fetch("/api/admin/offres");
    const data = await res.json();
    setOffres(data);
  }

  useEffect(() => {
    fetch("/api/admin/offres")
      .then((r) => r.json())
      .then((data) => setOffres(data as Offre[]));
  }, []);

  async function changerStatut(id: string, statut: "PUBLISHED" | "REJECTED") {
    await fetch(`/api/admin/offres/statut/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    charger();
    setOuvert(null);
  }

  const offresAffichees = offres.filter((o) => o.statut === filtre);

  return (
    <div className="forge-container py-8">
      <h1 className="text-secondary font-mono text-xl mb-6">
        Modération — Offres alternance
      </h1>

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
            {LABELS[s]} ({offres.filter((o) => o.statut === s).length})
          </button>
        ))}
      </div>

      {offresAffichees.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucune offre {LABELS[filtre].toLowerCase()}.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {offresAffichees.map((o) => (
            <div key={o.id} className="forge-card">
              <button
                className="w-full text-left flex items-center justify-between bg-transparent border-none cursor-pointer"
                onClick={() => setOuvert(ouvert === o.id ? null : o.id)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs px-2 py-1"
                    style={BADGE_STYLES[o.statut] ?? {}}
                  >
                    {LABELS[o.statut] ?? o.statut}
                  </span>
                  <span className="text-secondary font-semibold text-sm">
                    {o.poste}
                  </span>
                  <span className="text-muted text-xs">
                    {o.entreprise.nom} {o.entreprise.prenom}
                  </span>
                </div>
                <span className="text-muted text-xs font-mono">
                  {ouvert === o.id ? "▲" : "▼"}
                </span>
              </button>

              {ouvert === o.id && (
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-muted font-mono text-xs mb-1">
                      DESCRIPTION
                    </p>
                    <p className="text-secondary">{o.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-muted font-mono text-xs mb-1">DURÉE</p>
                      <p className="text-secondary">{o.duree}</p>
                    </div>
                    {o.remuneration && (
                      <div>
                        <p className="text-muted font-mono text-xs mb-1">
                          RÉMUNÉRATION
                        </p>
                        <p className="text-secondary">{o.remuneration}</p>
                      </div>
                    )}
                  </div>

                  {o.prerequis && (
                    <div>
                      <p className="text-muted font-mono text-xs mb-1">
                        PRÉREQUIS
                      </p>
                      <p className="text-secondary">{o.prerequis}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-muted font-mono text-xs mb-1">
                      ENTREPRISE
                    </p>
                    <p className="text-secondary">
                      {o.entreprise.nom} {o.entreprise.prenom}
                    </p>
                    <a
                      href={`mailto:${o.entreprise.email}`}
                      className="text-primary text-xs"
                    >
                      {o.entreprise.email}
                    </a>
                  </div>

                  {o.statut !== "PUBLISHED" && (
                    <button
                      className="forge-btn-primary text-sm"
                      onClick={() => changerStatut(o.id, "PUBLISHED")}
                    >
                      Publier
                    </button>
                  )}
                  {o.statut !== "REJECTED" && (
                    <button
                      className="forge-btn-ghost text-sm"
                      style={{ color: "var(--c-error)" }}
                      onClick={() => changerStatut(o.id, "REJECTED")}
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
