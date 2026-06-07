"use client";

import React, { useState, useEffect } from "react";
import CalendrierSemaine from "./CalendrierSemaine";
import CalendrierJour from "./CalendrierJour";
import CreneauModal from "./CreneauModal";
import { AlertTriangle } from "lucide-react";

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

interface BaseCreneau {
  id: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  intitule: string;
  enseignant: { id: string; nom: string; prenom: string };
  matiere?: { id: string; nom: string; code: string } | null;
  groupe: { id: string; nom: string; type: string };
}

interface CalendrierEnseignantClientProps {
  initialCreneaux: BaseCreneau[];
  dateDebut: Date;
  matieres: Matiere[];
  groupes: Groupe[];
  enseignantId: string;
}

export default function CalendrierEnseignantClient({
  initialCreneaux,
  dateDebut,
  matieres,
  groupes,
  enseignantId,
}: CalendrierEnseignantClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCreneau, setSelectedCreneau] =
    useState<Partial<BaseCreneau> | null>(null);
  const [ownershipError, setOwnershipError] = useState(false);

  useEffect(() => {
    if (!ownershipError) return;
    const t = setTimeout(() => setOwnershipError(false), 3000);
    return () => clearTimeout(t);
  }, [ownershipError]);

  const handleCellClick = (jour: string, heure: string) => {
    // Calculer l'heure de fin par défaut (heure + 2h)
    const [h, m] = heure.split(":").map(Number);
    const heureFin = `${(h + 2).toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

    setSelectedCreneau({
      jour,
      heureDebut: heure,
      heureFin,
      enseignant: { id: enseignantId, nom: "", prenom: "" },
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (creneau: BaseCreneau) => {
    if (creneau.enseignant.id !== enseignantId) {
      setOwnershipError(true);
      return;
    }
    setSelectedCreneau(creneau);
    setIsModalOpen(true);
  };

  return (
    <>
      {ownershipError && (
        <div className="fixed top-4 right-4 z-[200] flex items-center gap-2 px-4 py-3 bg-bg-card border border-error/50 text-error text-xs font-bold uppercase shadow-xl">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Vous ne pouvez modifier que vos propres créneaux.
        </div>
      )}
      <div className="hidden md:block">
        <CalendrierSemaine
          creneaux={initialCreneaux}
          dateDebut={dateDebut}
          currentUserId={enseignantId}
          onCellClick={handleCellClick}
          onEventClick={handleEventClick}
        />
      </div>
      <div className="md:hidden">
        <CalendrierJour
          creneaux={initialCreneaux}
          dateDebut={dateDebut}
          currentUserId={enseignantId}
          onCellClick={handleCellClick}
          onEventClick={handleEventClick}
        />
      </div>
      {isModalOpen && selectedCreneau && (
        <CreneauModal
          onClose={() => setIsModalOpen(false)}
          creneauInitial={selectedCreneau}
          matieres={matieres}
          groupes={groupes}
          enseignantId={enseignantId}
          semaine={dateDebut}
        />
      )}
    </>
  );
}
