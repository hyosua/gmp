"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type SupportDeCours = {
  id: string;
  titre: string;
  cheminFichier: string;
  taille: number;
  dateDepot: string;
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

export default function PageCours() {
  const [file, setFile] = useState<File | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [cours, setCours] = useState<SupportDeCours[]>([]);
  const [chargement, setChargement] = useState(true);
  const routeur = useRouter();
  const { data: session } = useSession();
  const peutDeposer =
    session?.user?.role === "ENSEIGNANT" || session?.user?.role === "ADMIN";

  async function charger() {
    try {
      const res = await fetch("/api/support/cours");
      const json = await res.json();
      setCours(Array.isArray(json) ? json : []);
    } catch {
      setCours([]);
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    charger();
  }, []);

  async function envoyer() {
    if (!file) return;
    setEnvoi(true);
    const formData = new FormData();
    formData.append("nom", file.name);
    formData.append("fichier", file);
    formData.append("chemin", `/${file.name}`);
    formData.append("taille", file.size.toString());

    const res = await fetch("/api/support", { method: "POST", body: formData });
    if (res.ok) {
      setFile(null);
      routeur.refresh();
      await charger();
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
                <th className="p-3 text-left font-mono text-xs">TAILLE</th>
                <th className="p-3 text-left font-mono text-xs">DATE</th>
                <th className="p-3 text-left font-mono text-xs">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cours.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="p-3 text-secondary">{item.titre}</td>
                  <td className="p-3 text-muted font-mono text-xs">
                    {formatTaille(item.taille)}
                  </td>
                  <td className="p-3 text-muted text-xs">
                    {formatDate(item.dateDepot)}
                  </td>
                  <td className="p-3">
                    <a
                      href={`/${item.cheminFichier.replace(/^public\//, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="forge-btn-ghost text-xs px-2 py-1"
                    >
                      Télécharger
                    </a>
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
