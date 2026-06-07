"use client";

import React, { useState } from "react";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { forgeGrid } from "@/lib/forge";

interface Creneau {
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

interface CalendrierJourProps {
  creneaux: Creneau[];
  dateDebut: Date;
  currentUserId?: string;
  onCellClick?: (jour: string, heure: string) => void;
  onEventClick?: (creneau: Creneau) => void;
}

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];

function indexAujourdhui(dateDebut: Date): number {
  const start = startOfWeek(dateDebut, { weekStartsOn: 1 });
  for (let i = 0; i < 5; i++) {
    if (isSameDay(addDays(start, i), new Date())) return i;
  }
  return 0;
}

export default function CalendrierJour({
  creneaux,
  dateDebut,
  currentUserId,
  onCellClick,
  onEventClick,
}: CalendrierJourProps) {
  const [jourIndex, setJourIndex] = useState(() => indexAujourdhui(dateDebut));

  const jour = JOURS[jourIndex];
  const jourDate = addDays(
    startOfWeek(dateDebut, { weekStartsOn: 1 }),
    jourIndex,
  );

  const creneauxDuJour = creneaux
    .filter((c) => c.jour.toLowerCase() === jour)
    .sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));

  return (
    <div className="forge-card relative overflow-hidden rounded-lg border border-border bg-bg-card shadow-xl">
      <div
        style={forgeGrid}
        className="pointer-events-none absolute inset-0 opacity-20"
      />

      {/* Navigation */}
      <div className="relative z-10 flex items-center justify-between border-b border-border p-4">
        <button
          onClick={() => setJourIndex((i) => Math.max(0, i - 1))}
          disabled={jourIndex === 0}
          className="p-2 text-muted transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
            {jour}
          </p>
          <p className="text-lg font-black uppercase tracking-tighter text-secondary">
            {format(jourDate, "dd MMMM", { locale: fr })}
          </p>
        </div>

        <button
          onClick={() => setJourIndex((i) => Math.min(4, i + 1))}
          disabled={jourIndex === 4}
          className="p-2 text-muted transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Créneaux */}
      <div className="relative z-10 min-h-[200px] space-y-3 p-4">
        {creneauxDuJour.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <Clock className="mb-3 h-8 w-8 opacity-30" />
            <p className="text-xs font-mono uppercase tracking-widest">
              Aucun cours ce jour
            </p>
          </div>
        ) : (
          creneauxDuJour.map((c) => {
            const isMine = currentUserId === c.enseignant.id;
            return (
              <div
                key={c.id}
                onClick={() => onEventClick?.(c)}
                className={`relative flex gap-3 border p-3 transition-all ${
                  isMine
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--c-primary-rgb),0.15)]"
                    : "border-secondary/40 bg-secondary/5"
                } ${onEventClick ? "cursor-pointer hover:opacity-80" : ""}`}
              >
                <div
                  className={`w-1 shrink-0 self-stretch ${isMine ? "bg-primary" : "bg-secondary/50"}`}
                />

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <span
                      className={`truncate text-xs font-black uppercase tracking-widest ${isMine ? "text-primary" : "text-secondary"}`}
                    >
                      {c.matiere?.code || c.intitule}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-muted">
                      {c.heureDebut} – {c.heureFin}
                    </span>
                  </div>

                  <p className="mb-2 truncate text-sm font-bold text-secondary">
                    {c.matiere?.nom || c.intitule}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    <span className="border border-border/50 bg-bg-card/50 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                      {c.salle}
                    </span>
                    <span className="border border-border/50 bg-bg-card/50 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                      {c.groupe.nom}
                    </span>
                    <span className="border border-border/50 bg-bg-card/50 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                      {c.enseignant.prenom[0]}. {c.enseignant.nom}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {onCellClick && (
          <button
            onClick={() => onCellClick(jour, "08:00")}
            className="flex w-full items-center justify-center gap-2 border border-dashed border-primary/30 py-3 font-mono text-xs uppercase tracking-widest text-primary/60 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            <Plus className="h-4 w-4" />
            Nouveau créneau
          </button>
        )}
      </div>
    </div>
  );
}
