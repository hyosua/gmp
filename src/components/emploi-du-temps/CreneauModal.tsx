"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCreneau,
  updateCreneau,
  deleteCreneau,
} from "@/actions/emploiDuTemps";
import { X, Save, Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface Matiere {
  id: string;
  nom: string;
  code: string;
}
interface Groupe {
  id: string;
  nom: string;
  type: string;
}

interface CreneauModalProps {
  onClose: () => void;
  creneauInitial: {
    id?: string;
    jour?: string;
    heureDebut?: string;
    heureFin?: string;
    salle?: string;
    intitule?: string;
    matiereId?: string;
    groupeId?: string;
    recurrent?: boolean;
    recurrenceFin?: Date | string;
    matiere?: { id: string; nom: string; code: string } | null;
    groupe?: { id: string; nom: string; type: string } | null;
  };
  matieres: Matiere[];
  groupes: Groupe[];
  enseignantId: string;
  semaine: Date;
}

export default function CreneauModal({
  onClose,
  creneauInitial,
  matieres,
  groupes,
  enseignantId,
  semaine,
}: CreneauModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!creneauInitial.id;

  const [formData, setFormData] = useState({
    matiereId: creneauInitial.matiere?.id || creneauInitial.matiereId || "",
    groupeId: creneauInitial.groupe?.id || creneauInitial.groupeId || "",
    salle: creneauInitial.salle || "",
    jour: creneauInitial.jour || "lundi",
    heureDebut: creneauInitial.heureDebut || "08:00",
    heureFin: creneauInitial.heureFin || "10:00",
    intitule: creneauInitial.intitule || "",
    recurrent: creneauInitial.recurrent || false,
    recurrenceFin: creneauInitial.recurrenceFin
      ? new Date(creneauInitial.recurrenceFin).toISOString().split("T")[0]
      : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && creneauInitial.id) {
        const res = await updateCreneau(creneauInitial.id, enseignantId, {
          ...formData,
          // Conversion de la date si présente
          recurrenceFin: formData.recurrenceFin
            ? new Date(formData.recurrenceFin)
            : undefined,
        });
        if (res.success) {
          router.refresh();
          onClose();
        } else {
          setError(
            res.error === "UNAUTHORIZED"
              ? "Non autorisé"
              : "Erreur lors de la modification",
          );
        }
      } else if (!isEditing) {
        const res = await createCreneau({
          ...formData,
          semaine,
          enseignantId,
          recurrenceFin: formData.recurrenceFin
            ? new Date(formData.recurrenceFin)
            : undefined,
        });
        if (res.success) {
          router.refresh();
          onClose();
        } else {
          setError(
            res.error === "CONFLIT_SALLE"
              ? "CONFLIT : La salle est déjà occupée !"
              : "Erreur lors de la création",
          );
        }
      }
    } catch {
      setError("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm("Voulez-vous vraiment supprimer ce créneau ?") ||
      !creneauInitial.id
    )
      return;
    setLoading(true);
    try {
      const res = await deleteCreneau(creneauInitial.id, enseignantId);
      if (res.success) {
        router.refresh();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-deep/80 backdrop-blur-sm p-4">
      <div className="forge-card w-full max-w-lg bg-bg-card border border-border shadow-2xl relative overflow-hidden">
        {/* En-tête Modale */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-bg-deep/50">
          <h3 className="text-lg font-black uppercase tracking-tighter text-secondary">
            {isEditing ? "Modifier le Créneau" : "Nouveau Créneau"}
          </h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold uppercase mb-4">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Matière */}
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-mono text-muted uppercase">
                Matière
              </label>
              <select
                required
                value={formData.matiereId}
                onChange={(e) =>
                  setFormData({ ...formData, matiereId: e.target.value })
                }
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

            {/* Groupe */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-muted uppercase">
                Groupe
              </label>
              <select
                required
                value={formData.groupeId}
                onChange={(e) =>
                  setFormData({ ...formData, groupeId: e.target.value })
                }
                className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
              >
                <option value="">Groupe...</option>
                {groupes.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nom} ({g.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Salle */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-muted uppercase">
                Salle
              </label>
              <input
                required
                type="text"
                placeholder="Ex: A102"
                value={formData.salle}
                onChange={(e) =>
                  setFormData({ ...formData, salle: e.target.value })
                }
                className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
              />
            </div>

            {/* Horaires */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-muted uppercase">
                Début
              </label>
              <input
                required
                type="time"
                step="900"
                value={formData.heureDebut}
                onChange={(e) =>
                  setFormData({ ...formData, heureDebut: e.target.value })
                }
                className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-muted uppercase">
                Fin
              </label>
              <input
                required
                type="time"
                step="900"
                value={formData.heureFin}
                onChange={(e) =>
                  setFormData({ ...formData, heureFin: e.target.value })
                }
                className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none font-mono"
              />
            </div>
          </div>

          {/* Récurrence */}
          {!isEditing && (
            <div className="pt-4 border-t border-border/50 space-y-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.recurrent}
                  onChange={(e) =>
                    setFormData({ ...formData, recurrent: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-bg-deep"
                />
                <span className="text-xs font-bold uppercase text-muted group-hover:text-secondary transition-colors">
                  Répéter chaque semaine
                </span>
              </label>

              {formData.recurrent && (
                <div className="space-y-1 animate-in fade-in slide-in-from-top-1">
                  <label className="text-[10px] font-mono text-muted uppercase">
                    Jusqu&apos;au
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.recurrenceFin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recurrenceFin: e.target.value,
                      })
                    }
                    className="w-full bg-bg-deep border border-border p-2 text-sm text-secondary focus:border-primary outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-6">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-500 text-xs font-black uppercase hover:bg-red-500/10 transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-bg-card text-xs font-black uppercase hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--c-primary-rgb),0.3)] transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditing ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
