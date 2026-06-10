"use client";

import { useEffect, useState } from "react";

const PARCOURS_OPTIONS = [
  { value: "", label: "Tous les parcours" },
  { value: "SIMULATION_REALITE_VIRTUELLE", label: "SRV" },
  { value: "CONCEPTION_PRODUCTION_DURABLE", label: "CPD" },
  { value: "LP_MIE", label: "LP MIE" },
  { value: "LP_MIEF", label: "LP MIEF" },
  { value: "LP_MRI", label: "LP MRI" },
];

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
  parcours: string | null;
  createdAt: string;
  entreprise: Entreprise;
};

export default function ProjetsTuteursEnseignant() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [filtreParcours, setFiltreParcours] = useState("");

  useEffect(() => {
    fetch("/api/projets")
      .then((r) => r.json())
      .then(setProjets);
  }, []);

  const projetsVisibles = filtreParcours
    ? projets.filter((p) => p.parcours === filtreParcours)
    : projets;

  return (
    <div className="forge-container py-8">
      <h1 className="text-secondary font-mono text-xl mb-6">
        Projets tuteurés disponibles
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <label className="text-muted text-sm font-semibold">Parcours :</label>
        <select
          className="p-2 border border-border bg-bg-card text-secondary rounded"
          value={filtreParcours}
          onChange={(e) => setFiltreParcours(e.target.value)}
        >
          {PARCOURS_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {filtreParcours && (
          <button
            className="forge-btn-ghost text-sm"
            onClick={() => setFiltreParcours("")}
          >
            Réinitialiser
          </button>
        )}
      </div>

      {projetsVisibles.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucun projet disponible pour ce parcours.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projetsVisibles.map((p) => (
            <div key={p.id} className="forge-card">
              <button
                className="w-full text-left flex items-center justify-between bg-transparent border-none cursor-pointer"
                onClick={() => setOuvert(ouvert === p.id ? null : p.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-secondary font-semibold text-sm">
                    {p.titre}
                  </span>
                  <span className="text-muted text-xs font-mono">
                    {p.entreprise.nom} {p.entreprise.prenom}
                  </span>
                  {p.parcours && (
                    <span
                      className="font-mono text-xs px-2 py-0.5"
                      style={{
                        backgroundColor: "var(--c-primary-15)",
                        color: "var(--c-primary)",
                      }}
                    >
                      {
                        PARCOURS_OPTIONS.find((o) => o.value === p.parcours)
                          ?.label
                      }
                    </span>
                  )}
                </div>
                <span className="text-muted text-xs font-mono">
                  {p.nbEtudiants} étudiant{p.nbEtudiants > 1 ? "s" : ""}{" "}
                  souhaité{p.nbEtudiants > 1 ? "s" : ""} —{" "}
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
                      CONTACT ENTREPRISE
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
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
