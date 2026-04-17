"use client";

import React, { useState } from "react";
import CalendrierSemaine from "./CalendrierSemaine";
import CreneauModal from "./CreneauModal";

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
    // On ne permet la modification que si on est l'enseignant auteur
    if (creneau.enseignant.id !== enseignantId) {
      alert("Vous ne pouvez modifier que vos propres créneaux.");
      return;
    }
    setSelectedCreneau(creneau);
    setIsModalOpen(true);
  };

  return (
    <>
      <CalendrierSemaine
        creneaux={initialCreneaux}
        dateDebut={dateDebut}
        onCellClick={handleCellClick}
        onEventClick={handleEventClick}
      />
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
