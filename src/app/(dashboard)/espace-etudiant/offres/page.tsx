"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const PARCOURS_OPTIONS = [
  { value: "", label: "Tous les parcours" },
  { value: "SIMULATION_REALITE_VIRTUELLE", label: "SRV" },
  { value: "CONCEPTION_PRODUCTION_DURABLE", label: "CPD" },
  { value: "LP_MIE", label: "LP MIE" },
  { value: "LP_MIEF", label: "LP MIEF" },
  { value: "LP_MRI", label: "LP MRI" },
];

type Offre = {
  id?: string;
  poste: string;
  description: string;
  remuneration: string;
  prerequis: string;
  entreprise: string;
  duree: string;
  parcours?: string | null;
  statut?: string;
  createdAt?: string;
};

export default function Offres() {
  const { status } = useSession();
  const [offres, setOffres] = useState<Offre[]>([]);
  const [filtreParcours, setFiltreParcours] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    fetch("/api/offres")
      .then((r) => r.json())
      .then(setOffres)
      .catch(console.error);
  }, [status]);

  if (status === "loading") return null;

  const offresVisibles = filtreParcours
    ? offres.filter((o) => o.parcours === filtreParcours)
    : offres;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Offres de stage / alternance</h1>

      <div className="flex items-center gap-3 my-4 px-2">
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

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead className="bg-primary text-bg-card">
          <tr>
            <th className="p-3 text-left">Poste</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Durée</th>
            <th className="p-3 text-left">Rémunération</th>
            <th className="p-3 text-left">Prérequis</th>
            <th className="p-3 text-left">Parcours</th>
            <th className="p-3 text-left">Créé le</th>
          </tr>
        </thead>
        <tbody>
          {offresVisibles.map((o) => (
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
              <td className="p-3">
                {PARCOURS_OPTIONS.find((p) => p.value === o.parcours)?.label ??
                  "-"}
              </td>
              <td className="p-3">{o.createdAt}</td>
            </tr>
          ))}
          {offresVisibles.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-muted">
                Aucune offre pour ce parcours.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
