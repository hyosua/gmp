"use client";

import { FormEvent, useState } from "react";
import { TypeGroupe } from "@prisma/client";
import { Save } from "lucide-react";

type FormProps = {
  readonly matieres: { id: string; nom: string; code: string }[];
  readonly groupes: {
    id: string;
    nom: string;
    type: TypeGroupe;
    etudiants: { id: string; nom: string; prenom: string }[];
  }[];
  readonly etudiants: { id: string; nom: string; prenom: string }[];
  readonly action: (formData: FormData) => Promise<void>;
  readonly noteAEditer?: {
    id: string;
    matiereId: string;
    etudiantId: string;
    valeur: number;
    semestre: number;
  } | null;
};

export default function NoteForm({
  matieres,
  groupes,
  etudiants,
  action,
  noteAEditer = null,
}: FormProps) {
  const [groupeId, setGroupeId] = useState("");
  const [matiereId, setMatiereId] = useState(noteAEditer?.matiereId ?? "");
  const [semestre, setSemestre] = useState(
    noteAEditer?.semestre ? String(noteAEditer.semestre) : "",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await action(formData);
    if (!noteAEditer) {
      (form.elements.namedItem("etudiantId") as HTMLSelectElement).value = "";
      (form.elements.namedItem("valeur") as HTMLInputElement).value = "";
    }
  }
  const etudiantsFiltres = noteAEditer
    ? etudiants
    : (groupes.find((g) => g.id === groupeId)?.etudiants ?? []);

  const annee =
    new Date().getMonth() >= 8
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;

  return (
    <form onSubmit={handleSubmit} className="forge-card p-6 space-y-4">
      {/* Champs cachés */}
      {noteAEditer && <input type="hidden" name="id" value={noteAEditer.id} />}
      <input type="hidden" name="annee" value={annee} />

      <div className="grid grid-cols-2 gap-4">
        {/* Matière */}
        <div className="col-span-2 space-y-1">
          <label
            htmlFor="matiere"
            className="text-[10px] font-mono text-muted uppercase"
          >
            Matière
          </label>
          <select
            required
            name="matiere"
            value={matiereId}
            onChange={(e) => setMatiereId(e.target.value)}
            className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
          >
            <option value="">Sélectionner une matière...</option>
            {matieres.map((m) => (
              <option key={m.id} value={m.id}>
                [{m.code}] {m.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Groupe - filtre local, pas soumis au serveur */}
        {!noteAEditer && (
          <div className="col-span-2 space-y-1">
            <label
              htmlFor="groupe"
              className="text-[10px] font-mono text-muted uppercase"
            >
              Groupe
            </label>
            <select
              value={groupeId}
              onChange={(e) => setGroupeId(e.target.value)}
              className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
            >
              <option value="">Sélectionner un groupe...</option>
              {groupes.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nom} ({g.type})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Étudiant */}
        <div className="col-span-2 space-y-1">
          <label
            htmlFor="etudiant"
            className="text-[10px] font-mono text-muted uppercase"
          >
            Étudiant
          </label>
          <select
            required
            name="etudiantId"
            defaultValue={noteAEditer?.etudiantId ?? ""}
            className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
          >
            <option value="">
              {!groupeId && !noteAEditer
                ? "Sélectionner un groupe d'abord..."
                : "Sélectionner un étudiant..."}
            </option>
            {etudiantsFiltres.map((e) => (
              <option key={e.id} value={e.id}>
                {e.prenom} {e.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div className="space-y-1">
          <label
            htmlFor="valeur"
            className="text-[10px] font-mono text-muted uppercase"
          >
            Note /20
          </label>
          <input
            required
            type="number"
            name="valeur"
            min={0}
            max={20}
            step={0.5}
            defaultValue={noteAEditer?.valeur ?? ""}
            placeholder="Ex: 14.5"
            className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none font-mono"
          />
        </div>

        {/* Semestre */}
        <div className="space-y-1">
          <label
            htmlFor="semestre"
            className="text-[10px] font-mono text-muted uppercase"
          >
            Semestre
          </label>
          <select
            required
            name="semestre"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
          >
            <option value="">Semestre...</option>
            <option value="1">Semestre 1</option>
            <option value="2">Semestre 2</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-bg-card text-xs font-black uppercase hover:bg-primary/90 transition-all"
      >
        <Save className="w-4 h-4" />
        {noteAEditer ? "Enregistrer les modifications" : "Saisir la note"}
      </button>
    </form>
  );
}
