"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const PARCOURS_OPTIONS = [
  { value: "", label: "Tous parcours" },
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
  parcours?: string;
  statut?: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyOffre: Offre = {
  poste: "",
  description: "",
  remuneration: "",
  prerequis: "",
  entreprise: "",
  duree: "",
  parcours: "",
};

export default function Offres() {
  const { data: session, status } = useSession();
  const [offres, setOffres] = useState<Offre[]>([]);
  const [choix, setChoix] = useState<string>();
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [nouveaux, setNouveaux] = useState<Offre>(emptyOffre);

  async function getOffres() {
    try {
      const data = await fetch("/api/offres");
      const json = await data.json();
      setOffres(json);
    } catch (err) {
      console.log(err);
    }
  }

  async function NewOffres() {
    const formData = new FormData();

    formData.append("poste", nouveaux.poste);
    formData.append("description", nouveaux.description);
    formData.append("remuneration", nouveaux.remuneration);
    formData.append("prerequis", nouveaux.prerequis);
    formData.append("entreprise", session?.user?.id ?? "");
    formData.append("duree", nouveaux.duree);
    formData.append("parcours", nouveaux.parcours ?? "");

    try {
      const isEdit = mode === "edit";
      const url = isEdit
        ? `/api/offres/modifier/${choix}`
        : "/api/offres/nouveaux";
      const method = isEdit ? "PATCH" : "POST";

      await fetch(url, { method, body: formData });

      alert(
        isEdit ? "Offre modifiée avec succès" : "Offre ajoutée avec succès",
      );
      setMode("list");
      getOffres();
    } catch (ex) {
      console.log(ex);
      alert(ex);
    }
  }

  useEffect(() => {
    if (status === "loading") return;
    fetch("/api/offres")
      .then((r) => r.json())
      .then(setOffres)
      .catch(console.error);
  }, [status]);

  if (status === "loading") return null;

  return (
    <div className="p-6">
      <h1 style={{ textAlign: "center" }}>Vos offres</h1>

      {mode === "list" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead className="bg-primary text-bg-card">
            <tr>
              <th className="p-3 text-left">Poste</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Durée</th>
              <th className="p-3 text-left">Rémunération</th>
              <th className="p-3 text-left">Prérequis</th>
              <th className="p-3 text-left">Parcours</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Créé le</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {offres.map((o, i) => (
              <tr
                key={i}
                className="border-t border-border"
                style={{ textAlign: "center" }}
              >
                <td className="p-3">{o.poste}</td>
                <td className="p-3">{o.description}</td>
                <td className="p-3">{o.duree}</td>
                <td className="p-3">{o.remuneration}</td>
                <td className="p-3">{o.prerequis}</td>
                <td className="p-3">
                  {PARCOURS_OPTIONS.find((p) => p.value === o.parcours)
                    ?.label ?? "-"}
                </td>
                <td className="p-3">{o.statut}</td>
                <td className="p-3">{o.createdAt}</td>
                <td className="p-3">
                  <button
                    className="forge-btn-primary"
                    onClick={() => {
                      setNouveaux({ ...emptyOffre, ...o });
                      setMode("edit");
                      setChoix(o.id);
                    }}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {(mode === "create" || mode === "edit") && (
        <div className="forge-card max-w-xl mx-auto mt-6 flex flex-col gap-4">
          <h2 className="text-secondary font-semibold text-lg">
            {mode === "edit" ? "Modifier l'offre" : "Nouvelle offre"}
          </h2>

          {(
            [
              { label: "Poste", key: "poste", type: "input" },
              { label: "Description", key: "description", type: "textarea" },
              { label: "Durée", key: "duree", type: "input" },
              { label: "Rémunération", key: "remuneration", type: "input" },
              { label: "Prérequis", key: "prerequis", type: "textarea" },
            ] as { label: string; key: keyof Offre; type: string }[]
          ).map(({ label, key, type }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-muted text-sm">{label}</label>
              {type === "textarea" ? (
                <textarea
                  className="w-full p-2 border border-border bg-bg-card text-secondary"
                  rows={3}
                  value={nouveaux[key] as string}
                  onChange={(e) =>
                    setNouveaux({ ...nouveaux, [key]: e.target.value })
                  }
                />
              ) : (
                <input
                  className="w-full p-2 border border-border bg-bg-card text-secondary"
                  value={nouveaux[key] as string}
                  onChange={(e) =>
                    setNouveaux({ ...nouveaux, [key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-muted text-sm">Parcours ciblé</label>
            <select
              className="w-full p-2 border border-border bg-bg-card text-secondary"
              value={nouveaux.parcours ?? ""}
              onChange={(e) =>
                setNouveaux({ ...nouveaux, parcours: e.target.value })
              }
            >
              {PARCOURS_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 mt-2 justify-center">
            <button className="forge-btn-primary" onClick={NewOffres}>
              {mode === "edit" ? "Modifier" : "Ajouter"}
            </button>
            <button className="forge-btn-ghost" onClick={() => setMode("list")}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {mode === "list" && (
        <button
          className="forge-btn-primary"
          onClick={() => {
            setNouveaux(emptyOffre);
            setMode("create");
          }}
          style={{ width: "100%", marginTop: "20px" }}
        >
          Ajouter une offre
        </button>
      )}
    </div>
  );
}
