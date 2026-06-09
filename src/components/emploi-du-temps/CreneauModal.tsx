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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && creneauInitial.id) {
        const res = await updateCreneau(creneauInitial.id, {
          semaine,
          jour: formData.jour,
          heureDebut: formData.heureDebut,
          heureFin: formData.heureFin,
          salle: formData.salle,
          intitule: formData.intitule,
          groupeId: formData.groupeId,
          matiereId: formData.matiereId,
        });
        if (res.success) {
          router.refresh();
          onClose();
        } else {
          const errorMsg =
            {
              CONFLIT_SALLE: "La salle est déjà occupée !",
              CONFLIT_ENSEIGNANT: "Vous avez déjà un cours sur ce créneau !",
              CONFLIT_GROUPE: "Ce groupe a déjà un cours sur ce créneau !",
              HORAIRES_INVALIDES:
                "L'heure de fin doit être après l'heure de début.",
              UNAUTHORIZED: "Non autorisé",
            }[res.error] || "Erreur lors de la modification";
          setError(errorMsg);
        }
      } else if (!isEditing) {
        const res = await createCreneau({
          semaine,
          jour: formData.jour,
          heureDebut: formData.heureDebut,
          heureFin: formData.heureFin,
          salle: formData.salle,
          intitule: formData.intitule,
          groupeId: formData.groupeId,
          matiereId: formData.matiereId,
        });
        if (res.success) {
          router.refresh();
          onClose();
        } else {
          const errorMsg =
            {
              CONFLIT_SALLE: "La salle est déjà occupée !",
              CONFLIT_ENSEIGNANT: "Vous avez déjà un cours sur ce créneau !",
              CONFLIT_GROUPE: "Ce groupe a déjà un cours sur ce créneau !",
              HORAIRES_INVALIDES:
                "L'heure de fin doit être après l'heure de début.",
              UNAUTHORIZED: "Non autorisé",
            }[res.error] || "Erreur lors de la création";
          setError(errorMsg);
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
      const res = await deleteCreneau(creneauInitial.id);
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
            <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/50 text-error text-xs font-bold uppercase mb-4">
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

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-6">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border border-error/50 text-error text-xs font-black uppercase hover:bg-error/10 transition-all disabled:opacity-50"
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
