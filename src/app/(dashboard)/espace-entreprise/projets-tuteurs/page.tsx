"use client";

import { useEffect, useState } from "react";

const PARCOURS_OPTIONS = [
  { value: "", label: "Tous parcours" },
  { value: "SIMULATION_REALITE_VIRTUELLE", label: "SRV" },
  { value: "CONCEPTION_PRODUCTION_DURABLE", label: "CPD" },
  { value: "LP_MIE", label: "LP MIE" },
  { value: "LP_MIEF", label: "LP MIEF" },
  { value: "LP_MRI", label: "LP MRI" },
];

type Projet = {
  id: string;
  titre: string;
  description: string;
  prerequis: string | null;
  nbEtudiants: number;
  parcours: string | null;
  statut: string;
  createdAt: string;
  updatedAt: string;
};

const STATUTS: Record<string, string> = {
  PENDING: "En attente",
  PUBLISHED: "Publié",
  REJECTED: "Rejeté",
};

function StatutBadge({ statut }: { statut: string }) {
  const styles: Record<string, React.CSSProperties> = {
    PUBLISHED: {
      backgroundColor: "var(--c-primary-15)",
      color: "var(--c-primary)",
    },
    REJECTED: {
      backgroundColor: "rgba(220,38,38,0.12)",
      color: "var(--c-error)",
    },
    PENDING: {
      backgroundColor: "var(--c-accent-30)",
      color: "var(--c-accent)",
    },
  };
  return (
    <span className="font-mono text-xs px-2 py-1" style={styles[statut] ?? {}}>
      {STATUTS[statut] ?? statut}
    </span>
  );
}

const vide = (): Omit<Projet, "id" | "statut" | "createdAt" | "updatedAt"> => ({
  titre: "",
  description: "",
  prerequis: "",
  nbEtudiants: 1,
  parcours: "",
});

export default function ProjetsTuteursEntreprise() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [form, setForm] = useState(vide());
  const [editId, setEditId] = useState<string | null>(null);
  const [erreur, setErreur] = useState("");

  async function charger() {
    const res = await fetch("/api/projets");
    const data = await res.json();
    setProjets(data);
  }

  useEffect(() => {
    fetch("/api/projets")
      .then((r) => r.json())
      .then((data) => setProjets(data as Projet[]));
  }, []);

  function ouvrirCreation() {
    setForm(vide());
    setEditId(null);
    setErreur("");
    setMode("create");
  }

  function ouvrirEdition(p: Projet) {
    setForm({
      titre: p.titre,
      description: p.description,
      prerequis: p.prerequis ?? "",
      nbEtudiants: p.nbEtudiants,
      parcours: p.parcours ?? "",
    });
    setEditId(p.id);
    setErreur("");
    setMode("edit");
  }

  async function soumettre() {
    setErreur("");
    const body = new FormData();
    body.append("titre", form.titre);
    body.append("description", form.description);
    body.append("prerequis", form.prerequis ?? "");
    body.append("nbEtudiants", String(form.nbEtudiants));
    body.append("parcours", form.parcours ?? "");

    const url =
      mode === "edit"
        ? `/api/projets/modifier/${editId}`
        : "/api/projets/nouveaux";
    const method = mode === "edit" ? "PATCH" : "POST";

    const res = await fetch(url, { method, body });
    if (!res.ok) {
      const json = await res.json();
      setErreur(json.error ?? "Une erreur est survenue");
      return;
    }

    setMode("list");
    charger();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/projets/supprimer/${id}`, { method: "DELETE" });
    charger();
  }

  if (mode === "create" || mode === "edit") {
    return (
      <div className="forge-container py-8 max-w-xl">
        <h1 className="text-secondary font-mono text-xl mb-6">
          {mode === "edit" ? "Modifier le projet" : "Nouveau projet tuteuré"}
        </h1>

        {erreur && <p className="text-red-500 text-sm mb-4">{erreur}</p>}

        <div className="forge-card flex flex-col gap-4">
          <div>
            <label className="block text-secondary text-xs font-mono mb-1">
              TITRE *
            </label>
            <input
              className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-secondary text-xs font-mono mb-1">
              DESCRIPTION *
            </label>
            <textarea
              className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm min-h-[100px]"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-secondary text-xs font-mono mb-1">
              PRÉREQUIS
            </label>
            <textarea
              className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
              value={form.prerequis ?? ""}
              onChange={(e) => setForm({ ...form, prerequis: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-secondary text-xs font-mono mb-1">
              NB ÉTUDIANTS SOUHAITÉS
            </label>
            <input
              type="number"
              min={1}
              className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
              value={form.nbEtudiants}
              onChange={(e) =>
                setForm({ ...form, nbEtudiants: parseInt(e.target.value) || 1 })
              }
            />
          </div>

          <div>
            <label className="block text-secondary text-xs font-mono mb-1">
              PARCOURS CIBLÉ
            </label>
            <select
              className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
              value={form.parcours ?? ""}
              onChange={(e) => setForm({ ...form, parcours: e.target.value })}
            >
              {PARCOURS_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button className="forge-btn-primary flex-1" onClick={soumettre}>
              {mode === "edit" ? "Modifier" : "Créer"}
            </button>
            <button
              className="forge-btn-ghost flex-1"
              onClick={() => setMode("list")}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forge-container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-secondary font-mono text-xl">Projets tuteurés</h1>
        <button className="forge-btn-primary" onClick={ouvrirCreation}>
          + Nouveau projet
        </button>
      </div>

      {projets.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucun projet déposé pour le moment.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead className="bg-primary text-bg-card">
            <tr>
              <th className="p-3 text-left text-sm">Titre</th>
              <th className="p-3 text-left text-sm">Description</th>
              <th className="p-3 text-left text-sm">Nb étudiants</th>
              <th className="p-3 text-left text-sm">Parcours</th>
              <th className="p-3 text-left text-sm">Statut</th>
              <th className="p-3 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3 text-sm text-secondary">{p.titre}</td>
                <td className="p-3 text-sm text-muted max-w-xs truncate">
                  {p.description}
                </td>
                <td className="p-3 text-sm text-secondary text-center">
                  {p.nbEtudiants}
                </td>
                <td className="p-3 text-sm text-secondary">
                  {PARCOURS_OPTIONS.find((o) => o.value === p.parcours)
                    ?.label ?? "-"}
                </td>
                <td className="p-3 text-sm">
                  <StatutBadge statut={p.statut} />
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="forge-btn-ghost text-xs"
                    onClick={() => ouvrirEdition(p)}
                  >
                    Modifier
                  </button>
                  <button
                    className="forge-btn-ghost text-xs"
                    style={{ color: "var(--c-error)" }}
                    onClick={() => supprimer(p.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
