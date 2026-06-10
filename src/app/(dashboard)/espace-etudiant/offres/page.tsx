"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Offre = {
  id?: string;
  poste: string;
  description: string;
  remuneration: string;
  prerequis: string;
  entreprise: string;
  duree: string;
  statut?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Offres() {
  const { status } = useSession();
  const [offres, setOffres] = useState<Offre[]>([]);

  useEffect(() => {
    if (status === "loading") return;

    fetch("/api/offres")
      .then((r) => r.json())
      .then(setOffres)
      .catch(console.error);
  }, [status]);

  if (status === "loading") return null;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Offres de stage / alternance</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead className="bg-primary text-bg-card">
          <tr>
            <th className="p-3 text-left">Poste</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Durée</th>
            <th className="p-3 text-left">Rémunération</th>
            <th className="p-3 text-left">Prérequis</th>
            <th className="p-3 text-left">Créé le</th>
          </tr>
        </thead>
        <tbody>
          {offres.map((o) => (
            <tr
              key={o.id}
              className="border-t border-border"
              style={{ textAlign: "center" }}
            >
              <td className="p-3">{o.poste}</td>
              <td className="p-3">{o.description}</td>
              <td className="p-3">{o.duree}</td>
              <td className="p-3">{o.remuneration}</td>
              <td className="p-3">{o.prerequis}</td>
              <td className="p-3">{o.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
