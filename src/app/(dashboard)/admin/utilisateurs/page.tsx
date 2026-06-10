"use client";

import { useEffect, useRef, useState } from "react";
import { X, Upload, Download } from "lucide-react";
import * as XLSX from "xlsx";

type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  actif: boolean;
  parcours: string;
  typeFormation: string;
  anneePromotion: number;
  createdAt: string;
};

type LigneCSV = {
  email: string;
  nom: string;
  prenom: string;
  role: string;
  parcours?: string;
  typeFormation?: string;
  anneePromotion?: string;
};

type ResultatImport = {
  email: string;
  statut: "créé" | "erreur";
  motDePasse?: string;
  message?: string;
};

const ROLES = ["ETUDIANT", "ENSEIGNANT", "ENTREPRISE", "ADMIN"] as const;
type RoleFilter = (typeof ROLES)[number];

const TOUS_LES_ROLES = [
  "ETUDIANT",
  "ENSEIGNANT",
  "ENTREPRISE",
  "ADMIN",
] as const;

const ROLE_LABELS: Record<string, string> = {
  ETUDIANT: "Étudiants",
  ENSEIGNANT: "Enseignants",
  ENTREPRISE: "Entreprises",
  ADMIN: "Admin",
};

const ROLE_LABELS_SINGULIER: Record<string, string> = {
  ETUDIANT: "Étudiant",
  ENSEIGNANT: "Enseignant",
  ENTREPRISE: "Entreprise",
  ADMIN: "Admin",
};

const PARCOURS_LABELS: Record<string, string> = {
  SIMULATION_REALITE_VIRTUELLE: "Simulation & Réalité Virtuelle",
  CONCEPTION_PRODUCTION_DURABLE: "Conception & Production Durable",
  NON_DEFINI: "Non défini",
  LP_MIE: "LP MIE",
  LP_MIEF: "LP MIEF",
  LP_MRI: "LP MRI",
};

function rowsToLignes(rows: Record<string, string>[]): LigneCSV[] {
  return rows
    .map((obj) => {
      const k = (key: string) => obj[key] ?? "";
      return {
        email: k("email"),
        nom: k("nom"),
        prenom: k("prenom"),
        role: k("role"),
        parcours: obj["parcours"],
        typeFormation: obj["typeformation"] ?? obj["type_formation"],
        anneePromotion: obj["anneepromotion"] ?? obj["annee_promotion"],
      };
    })
    .filter((l) => l.email || l.nom || l.prenom);
}

function parseCSV(texte: string): LigneCSV[] {
  const lignes = texte.trim().split(/\r?\n/);
  if (lignes.length < 2) return [];
  const entetes = lignes[0].split(",").map((h) => h.trim().toLowerCase());
  const rows = lignes.slice(1).map((ligne) => {
    const cols = ligne.split(",").map((c) => c.trim());
    const obj: Record<string, string> = {};
    entetes.forEach((h, i) => {
      obj[h] = cols[i] ?? "";
    });
    return obj;
  });
  return rowsToLignes(rows);
}

function parseExcel(buffer: ArrayBuffer): LigneCSV[] {
  const wb = XLSX.read(buffer, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
    defval: "",
  });
  const normalized = rows.map((row) => {
    const obj: Record<string, string> = {};
    for (const [k, v] of Object.entries(row)) {
      obj[k.trim().toLowerCase().replace(/\s+/g, "")] = String(v);
    }
    return obj;
  });
  return rowsToLignes(normalized);
}

export default function AdminUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  const [onglet, setOnglet] = useState<RoleFilter>("ETUDIANT");
  const [selectionne, setSelectionne] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [modalImport, setModalImport] = useState(false);
  const [lignesCSV, setLignesCSV] = useState<LigneCSV[]>([]);
  const [resultats, setResultats] = useState<ResultatImport[]>([]);
  const [importEnCours, setImportEnCours] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function charger() {
    const res = await fetch("/api/admin/utilisateurs");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    fetch("/api/admin/utilisateurs")
      .then((r) => r.json())
      .then((data) => setUsers(data as User[]));
  }, []);

  function ouvrirFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;
    const estExcel = /\.(xlsx|xls|ods)$/i.test(fichier.name);
    const reader = new FileReader();
    if (estExcel) {
      reader.onload = (ev) => {
        const buffer = ev.target?.result as ArrayBuffer;
        setLignesCSV(parseExcel(buffer));
        setResultats([]);
      };
      reader.readAsArrayBuffer(fichier);
    } else {
      reader.onload = (ev) => {
        const texte = ev.target?.result as string;
        setLignesCSV(parseCSV(texte));
        setResultats([]);
      };
      reader.readAsText(fichier, "UTF-8");
    }
  }

  async function lancerImport() {
    setImportEnCours(true);
    const res = await fetch("/api/admin/utilisateurs/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lignes: lignesCSV }),
    });
    const data = await res.json();
    setResultats(data.resultats ?? []);
    setImportEnCours(false);
    await charger();
  }

  function exporterResultats() {
    const entete = "email,statut,motDePasse,message";
    const corps = resultats.map(
      (r) => `${r.email},${r.statut},${r.motDePasse ?? ""},${r.message ?? ""}`,
    );
    const blob = new Blob([[entete, ...corps].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "import-resultats.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function fermerImport() {
    setModalImport(false);
    setLignesCSV([]);
    setResultats([]);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function changeRole(user: User, role: string) {
    setLoading(true);
    await fetch(`/api/admin/utilisateurs/${user.id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    await charger();
    setSelectionne((prev) => (prev?.id === user.id ? { ...prev, role } : prev));
    setLoading(false);
  }

  async function toggleActif(user: User) {
    setLoading(true);
    await fetch(`/api/admin/utilisateurs/${user.id}/statut`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !user.actif }),
    });
    await charger();
    setSelectionne((prev) =>
      prev?.id === user.id ? { ...prev, actif: !prev.actif } : prev,
    );
    setLoading(false);
  }

  const filtres = users.filter((u) => u.role === onglet);

  return (
    <div className="forge-container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-secondary font-mono text-xl">Utilisateurs</h1>
        <button
          className="forge-btn-primary text-xs flex items-center gap-1.5"
          onClick={() => setModalImport(true)}
        >
          <Upload size={13} />
          Importer
        </button>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        {ROLES.map((role) => {
          const count = users.filter((u) => u.role === role).length;
          return (
            <button
              key={role}
              onClick={() => setOnglet(role)}
              className={
                onglet === role
                  ? "forge-btn-primary text-xs"
                  : "forge-btn-ghost text-xs"
              }
            >
              {ROLE_LABELS[role]} ({count})
            </button>
          );
        })}
      </div>

      {/* Liste */}
      {filtres.length === 0 ? (
        <div className="forge-card text-muted text-sm text-center py-8">
          Aucun {ROLE_LABELS[onglet].toLowerCase().slice(0, -1)}.
        </div>
      ) : (
        <div className="forge-card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted font-mono text-xs uppercase tracking-widest">
                <th className="text-left py-3 px-4 font-normal">Nom</th>
                <th className="text-left py-3 px-4 font-normal">Email</th>
                <th className="text-left py-3 px-4 font-normal">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtres.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0 cursor-pointer hover:bg-[var(--c-primary-10)] transition-colors"
                  onClick={() => setSelectionne(user)}
                >
                  <td className="py-3 px-4 text-secondary font-semibold">
                    {user.prenom} {user.nom}
                  </td>
                  <td className="py-3 px-4 text-muted">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className="font-mono text-xs px-2.5 py-1"
                      style={
                        user.actif
                          ? {
                              backgroundColor: "var(--c-primary-15)",
                              color: "var(--c-primary)",
                            }
                          : {
                              backgroundColor: "rgba(220,38,38,0.12)",
                              color: "var(--c-error)",
                            }
                      }
                    >
                      {user.actif ? "Actif" : "Inactif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal import CSV */}
      {modalImport && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={fermerImport}
        >
          <div
            className="forge-card w-full max-w-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-secondary font-mono text-sm">Import CSV</p>
              <button
                onClick={fermerImport}
                className="bg-transparent border-none cursor-pointer text-muted hover:text-primary"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-muted text-xs">
              Formats acceptés :{" "}
              <span className="font-mono text-secondary">
                .csv, .xlsx, .xls, .ods
              </span>
              <br />
              Colonnes attendues :{" "}
              <span className="font-mono text-secondary">
                email, nom, prenom, role
              </span>{" "}
              (optionnel :{" "}
              <span className="font-mono text-secondary">
                parcours, typeFormation, anneePromotion
              </span>
              )
              <br />
              Rôles valides :{" "}
              <span className="font-mono">
                ETUDIANT, ENSEIGNANT, ENTREPRISE
              </span>
            </p>

            {resultats.length === 0 ? (
              <>
                <label
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded p-8 cursor-pointer hover:border-primary hover:bg-[var(--c-primary-10)] transition-colors"
                  style={{ borderColor: "var(--c-border)" }}
                >
                  <Upload size={24} className="text-muted" />
                  <span className="text-secondary text-sm font-mono">
                    Choisir un fichier
                  </span>
                  <span className="text-muted text-xs">
                    .csv · .xlsx · .xls · .ods
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls,.ods,text/csv"
                    onChange={ouvrirFichier}
                    className="hidden"
                  />
                </label>

                {lignesCSV.length > 0 && (
                  <>
                    <p className="text-muted text-xs font-mono">
                      {lignesCSV.length} ligne(s) détectée(s)
                    </p>
                    <div className="overflow-x-auto max-h-48 border border-border p-0">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border text-muted font-mono uppercase tracking-widest">
                            <th className="text-left py-2 px-3 font-normal">
                              Email
                            </th>
                            <th className="text-left py-2 px-3 font-normal">
                              Nom
                            </th>
                            <th className="text-left py-2 px-3 font-normal">
                              Prénom
                            </th>
                            <th className="text-left py-2 px-3 font-normal">
                              Rôle
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {lignesCSV.map((l, i) => (
                            <tr
                              key={i}
                              className="border-b border-border last:border-0"
                            >
                              <td className="py-2.5 px-3 text-secondary">
                                {l.email}
                              </td>
                              <td className="py-2.5 px-3 text-muted">
                                {l.nom}
                              </td>
                              <td className="py-2.5 px-3 text-muted">
                                {l.prenom}
                              </td>
                              <td className="py-2.5 px-3 font-mono">
                                {l.role}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      className="forge-btn-primary text-sm"
                      disabled={importEnCours}
                      onClick={lancerImport}
                    >
                      {importEnCours
                        ? "Import en cours..."
                        : `Importer ${lignesCSV.length} compte(s)`}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-muted text-xs font-mono">
                    {resultats.filter((r) => r.statut === "créé").length}{" "}
                    créé(s) /{" "}
                    {resultats.filter((r) => r.statut === "erreur").length}{" "}
                    erreur(s)
                  </p>
                  <button
                    className="forge-btn-ghost text-xs flex items-center gap-1"
                    onClick={exporterResultats}
                  >
                    <Download size={12} />
                    Exporter CSV
                  </button>
                </div>
                <div className="overflow-x-auto max-h-64 border border-border p-0">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border text-muted font-mono uppercase tracking-widest">
                        <th className="text-left py-2 px-3 font-normal">
                          Email
                        </th>
                        <th className="text-left py-2 px-3 font-normal">
                          Statut
                        </th>
                        <th className="text-left py-2 px-3 font-normal">
                          Mot de passe
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultats.map((r, i) => (
                        <tr
                          key={i}
                          className="border-b border-border last:border-0"
                        >
                          <td className="py-2.5 px-3 text-secondary">
                            {r.email}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className="font-mono px-2 py-1"
                              style={
                                r.statut === "créé"
                                  ? {
                                      backgroundColor: "var(--c-primary-15)",
                                      color: "var(--c-primary)",
                                    }
                                  : {
                                      backgroundColor: "rgba(220,38,38,0.12)",
                                      color: "var(--c-error)",
                                    }
                              }
                            >
                              {r.statut}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-secondary">
                            {r.motDePasse ?? (
                              <span className="text-muted italic">
                                {r.message}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted text-xs">
                  Exportez le CSV pour conserver les mots de passe temporaires.
                </p>
                <button
                  className="forge-btn-ghost text-sm"
                  onClick={fermerImport}
                >
                  Fermer
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectionne && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectionne(null)}
        >
          <div
            className="forge-card w-full max-w-md flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary font-semibold text-base">
                  {selectionne.prenom} {selectionne.nom}
                </p>
                <p className="text-muted text-xs font-mono">
                  {selectionne.email}
                </p>
              </div>
              <button
                onClick={() => setSelectionne(null)}
                className="bg-transparent border-none cursor-pointer text-muted hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted font-mono uppercase tracking-widest mb-1.5">
                  Rôle
                </p>
                <select
                  value={selectionne.role}
                  disabled={loading}
                  onChange={(e) => changeRole(selectionne, e.target.value)}
                  className="bg-bg-card text-secondary border border-border font-mono text-xs px-2 py-1 cursor-pointer"
                >
                  {TOUS_LES_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABELS_SINGULIER[r]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-muted font-mono uppercase tracking-widest mb-1.5">
                  Statut
                </p>
                <span
                  className="font-mono text-xs px-2.5 py-1"
                  style={
                    selectionne.actif
                      ? {
                          backgroundColor: "var(--c-primary-15)",
                          color: "var(--c-primary)",
                        }
                      : {
                          backgroundColor: "rgba(220,38,38,0.12)",
                          color: "var(--c-error)",
                        }
                  }
                >
                  {selectionne.actif ? "Actif" : "Inactif"}
                </span>
              </div>
              {selectionne.role === "ETUDIANT" && (
                <>
                  <div>
                    <p className="text-muted font-mono uppercase tracking-widest mb-1.5">
                      Parcours
                    </p>
                    <p className="text-secondary">
                      {PARCOURS_LABELS[selectionne.parcours] ??
                        selectionne.parcours}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted font-mono uppercase tracking-widest mb-1.5">
                      Formation
                    </p>
                    <p className="text-secondary">
                      {selectionne.typeFormation === "ALTERNANCE"
                        ? "Alternance"
                        : "Initiale"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted font-mono uppercase tracking-widest mb-1.5">
                      Promo
                    </p>
                    <p className="text-secondary">
                      {selectionne.anneePromotion}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-muted font-mono uppercase tracking-widest mb-1.5">
                  Inscrit le
                </p>
                <p className="text-secondary">
                  {new Date(selectionne.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>

            <button
              className={
                selectionne.actif
                  ? "forge-btn-ghost text-sm"
                  : "forge-btn-primary text-sm"
              }
              style={
                selectionne.actif ? { color: "var(--c-error)" } : undefined
              }
              disabled={loading}
              onClick={() => toggleActif(selectionne)}
            >
              {loading
                ? "..."
                : selectionne.actif
                  ? "Désactiver le compte"
                  : "Activer le compte"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
