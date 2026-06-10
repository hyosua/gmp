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
  createdAt: string;
  entreprise: Entreprise;
};

export default function ProjetsTuteursEnseignant() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [ouvert, setOuvert] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projets")
      .then((r) => r.json())
      .then(setProjets);
  }, []);

  return (
    <div className="forge-container py-8">
      <h1 className="text-secondary font-mono text-xl mb-6">
        Projets tuteurés disponibles
      </h1>

      {projets.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucun projet disponible pour le moment.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projets.map((p) => (
            <div key={p.id} className="forge-card">
              <button
                className="w-full text-left flex items-center justify-between bg-transparent border-none cursor-pointer"
                onClick={() => setOuvert(ouvert === p.id ? null : p.id)}
              >
                <div>
                  <span className="text-secondary font-semibold text-sm">
                    {p.titre}
                  </span>
                  <span className="ml-3 text-muted text-xs font-mono">
                    {p.entreprise.nom} {p.entreprise.prenom}
                  </span>
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
