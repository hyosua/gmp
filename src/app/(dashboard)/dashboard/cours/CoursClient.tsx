"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Matiere = { id: string; nom: string; code: string };

type SupportDeCours = {
  id: string;
  titre: string;
  cheminFichier: string;
  taille: number;
  dateDepot: string;
  matiere: Matiere | null;
};

function formatTaille(octets: number): string {
  if (octets < 1024) return `${octets} o`;
  if (octets < 1024 * 1024) return `${(octets / 1024).toFixed(1)} Ko`;
  return `${(octets / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CoursClient({
  peutDeposer,
  peutSupprimer = false,
}: {
  peutDeposer: boolean;
  peutSupprimer?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [cours, setCours] = useState<SupportDeCours[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [filtreMatiere, setFiltreMatiere] = useState<string>("");
  const [matiereDepot, setMatiereDepot] = useState<string>("");
  const [chargement, setChargement] = useState(true);
  const [suppression, setSuppression] = useState<string | null>(null);
  const routeur = useRouter();

  async function charger(matiereId?: string) {
    try {
      const url = matiereId
        ? `/api/support/cours?matiereId=${matiereId}`
        : "/api/support/cours";
      const res = await fetch(url);
      const json = await res.json();
      setCours(Array.isArray(json) ? json : []);
    } catch {
      setCours([]);
    } finally {
      setChargement(false);
    }
  }

  async function chargerMatieres() {
    try {
      const res = await fetch("/api/matieres");
      const json = await res.json();
      setMatieres(Array.isArray(json) ? json : []);
    } catch {
      setMatieres([]);
    }
  }

  useEffect(() => {
    charger();
    chargerMatieres();
  }, []);

  function changerFiltre(matiereId: string) {
    setFiltreMatiere(matiereId);
    setChargement(true);
    charger(matiereId || undefined);
  }

  async function supprimer(id: string) {
    setSuppression(id);
    await fetch(`/api/support/${id}`, { method: "DELETE" });
    await charger(filtreMatiere || undefined);
    setSuppression(null);
  }

  async function envoyer() {
    if (!file) return;
    setEnvoi(true);
    const formData = new FormData();
    formData.append("nom", file.name);
    formData.append("fichier", file);
    formData.append("chemin", `/${file.name}`);
    formData.append("taille", file.size.toString());
    if (matiereDepot) formData.append("matiereId", matiereDepot);

    const res = await fetch("/api/support", { method: "POST", body: formData });
    if (res.ok) {
      setFile(null);
      setMatiereDepot("");
      routeur.refresh();
      await charger(filtreMatiere || undefined);
    }
    setEnvoi(false);
  }

  return (
    <div className="forge-container py-8">
      <h1 className="text-secondary font-mono text-xl mb-2">
        Supports de cours
      </h1>
      <p className="text-muted text-sm mb-8">
        {peutDeposer
          ? "Déposez et consultez les supports pédagogiques."
          : "Consultez les supports mis à disposition par vos enseignants."}
      </p>

      {peutDeposer && (
        <div className="forge-card mb-8">
          <p className="text-muted font-mono text-xs mb-4">
            DÉPOSER UN FICHIER
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <select
              className="border border-border rounded px-3 py-2 text-sm text-secondary bg-transparent min-w-40"
              value={matiereDepot}
              onChange={(e) => setMatiereDepot(e.target.value)}
            >
              <option value="">Matière (optionnel)</option>
              {matieres.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} - {m.nom}
                </option>
              ))}
            </select>
            <label className="flex-1 min-w-48">
              <div
                className="border border-border rounded px-4 py-3 text-sm text-muted cursor-pointer hover:border-primary transition-colors"
                style={{ borderStyle: "dashed" }}
              >
                {file ? (
                  <span className="text-secondary">{file.name}</span>
                ) : (
                  <span>Choisir un fichier…</span>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {file && (
              <span className="text-muted text-xs font-mono">
                {formatTaille(file.size)}
              </span>
            )}
            <button
              className="forge-btn-primary text-sm"
              disabled={!file || envoi}
              onClick={envoyer}
            >
              {envoi ? "Envoi…" : "Déposer"}
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center gap-3">
        <span className="text-muted font-mono text-xs">
          FILTRER PAR MATIÈRE
        </span>
        <select
          className="border border-border rounded px-3 py-2 text-sm text-secondary bg-transparent"
          value={filtreMatiere}
          onChange={(e) => changerFiltre(e.target.value)}
        >
          <option value="">Toutes les matières</option>
          {matieres.map((m) => (
            <option key={m.id} value={m.id}>
              {m.code} - {m.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="forge-card rounded-lg overflow-hidden">
        {chargement ? (
          <div className="text-muted text-sm text-center py-10">
            Chargement…
          </div>
        ) : cours.length === 0 ? (
          <div className="text-muted text-sm text-center py-10">
            Aucun support disponible pour le moment.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary text-bg-card">
              <tr>
                <th className="p-3 text-left font-mono text-xs">FICHIER</th>
                <th className="p-3 text-left font-mono text-xs">MATIÈRE</th>
                <th className="p-3 text-left font-mono text-xs">TAILLE</th>
                <th className="p-3 text-left font-mono text-xs">DATE</th>
                <th className="p-3 text-left font-mono text-xs">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {cours.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="p-3 text-secondary">{item.titre}</td>
                  <td className="p-3 text-muted text-xs font-mono">
                    {item.matiere ? item.matiere.code : "-"}
                  </td>
                  <td className="p-3 text-muted font-mono text-xs">
                    {formatTaille(item.taille)}
                  </td>
                  <td className="p-3 text-muted text-xs">
                    {formatDate(item.dateDepot)}
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <a
                      href={`/${item.cheminFichier.replace(/^public\//, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="forge-btn-ghost text-xs px-2 py-1"
                    >
                      Télécharger
                    </a>
                    {peutSupprimer && (
                      <button
                        className="forge-btn-ghost text-xs px-2 py-1"
                        style={{ color: "var(--c-error)" }}
                        disabled={suppression === item.id}
                        onClick={() => supprimer(item.id)}
                      >
                        {suppression === item.id ? "…" : "Supprimer"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
