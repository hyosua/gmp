"use client";

import React from "react";
import { forgeGrid, scanLines } from "@/lib/forge";

import { addDays, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

interface Creneau {
  id: string;
  jour: string; // 'lundi', 'mardi', etc.
  heureDebut: string; // '08:00'
  heureFin: string; // '10:00'
  salle: string;
  intitule: string;
  enseignant: { id: string; nom: string; prenom: string };
  matiere?: { id: string; nom: string; code: string } | null;
  groupe: { id: string; nom: string; type: string };
}

interface CalendrierSemaineProps {
  creneaux: Creneau[];
  dateDebut: Date;
  currentUserId?: string;
  onCellClick?: (jour: string, heure: string) => void;
  onEventClick?: (creneau: Creneau) => void;
}

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
const HEURES = Array.from({ length: 13 }, (_, i) => i + 8); // 8h à 20h

export default function CalendrierSemaine({
  creneaux,
  dateDebut,
  currentUserId,
  onCellClick,
  onEventClick,
}: CalendrierSemaineProps) {
  // Calcul de la position dans la grille CSS (8h = ligne 2, 1h = 4 spans de 15min)
  const getGridRow = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const row = (h - 8) * 4 + 2 + Math.floor(m / 15);
    return Math.max(2, Math.min(row, 50)); // Sécurité pour rester dans la grille (8h-20h)
  };

  const getGridCol = (jour: string) => {
    const index = JOURS.indexOf(jour.toLowerCase());
    return index !== -1 ? index + 2 : -1;
  };

  const start = startOfWeek(dateDebut, { weekStartsOn: 1 });

  return (
    <div className="forge-card relative overflow-hidden rounded-lg border border-border bg-bg-card p-4 shadow-xl">
      {/* Effets Blueprint */}
      <div style={forgeGrid} className="opacity-20" />
      <div style={scanLines} className="opacity-5" />

      <div className="relative z-10 grid grid-cols-[80px_repeat(5,1fr)] grid-rows-[40px_repeat(48,15px)] gap-px bg-border/10">
        {/* En-têtes : Heures (colonne 1) */}
        {HEURES.map((h) => (
          <div
            key={h}
            className="flex items-start justify-center pr-4 text-[10px] font-mono text-muted uppercase tracking-tighter"
            style={{ gridRow: `${(h - 8) * 4 + 2} / span 4`, gridColumn: 1 }}
          >
            {h.toString().padStart(2, "0")}:00
          </div>
        ))}

        {/* En-têtes : Jours (ligne 1) */}
        {JOURS.map((j, idx) => {
          const dayDate = addDays(start, idx);
          return (
            <div
              key={j}
              className="flex flex-col items-center justify-center border-b border-border bg-bg-card/95 py-2 text-xs font-bold uppercase text-secondary tracking-widest leading-none"
              style={{ gridRow: 1, gridColumn: idx + 2 }}
            >
              <span className="mb-1">{j}</span>
              <span className="text-[10px] font-mono text-muted">
                {format(dayDate, "dd/MM", { locale: fr })}
              </span>
            </div>
          );
        })}

        {/* Cellules cliquables (uniquement si onCellClick est fourni) */}
        {onCellClick &&
          JOURS.map((j, colIdx) =>
            HEURES.map((h) =>
              [0, 15, 30, 45].map((m) => {
                const heure = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                return (
                  <button
                    key={`${j}-${heure}`}
                    onClick={() => onCellClick(j, heure)}
                    className="group relative hover:bg-primary/20 transition-all z-0 border border-transparent hover:border-primary/50 hover:shadow-[inset_0_0_20px_rgba(var(--c-primary-rgb),0.15)]"
                    style={{
                      gridRow: getGridRow(heure),
                      gridColumn: colIdx + 2,
                    }}
                    title={`Réserver le ${j} à ${heure}`}
                  >
                    {/* Feedback visuel au hover accentué */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
                      <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] border-2 border-dashed border-primary/40 scale-95 group-hover:scale-100 transition-all duration-200" />
                      <span className="text-[14px] font-black text-primary/40">
                        +
                      </span>
                    </div>
                  </button>
                );
              }),
            ),
          )}

        {/* Lignes de repère horizontales (toutes les heures) */}
        {HEURES.map((h) => (
          <div
            key={`line-${h}`}
            className="col-start-2 col-end-7 border-t border-border/20 pointer-events-none"
            style={{ gridRow: (h - 8) * 4 + 2 }}
          />
        ))}

        {/* Créneaux */}
        {creneaux.map((c) => {
          const rowStart = getGridRow(c.heureDebut);
          const rowEnd = getGridRow(c.heureFin);
          const col = getGridCol(c.jour);
          const isMine = currentUserId === c.enseignant.id;

          if (col === -1) return null;

          return (
            <div
              key={c.id}
              onClick={() => onEventClick?.(c)}
              className={`group relative flex flex-col overflow-hidden border transition-all ${
                isMine
                  ? "border-primary bg-primary/10 shadow-[0_0_25px_rgba(var(--c-primary-rgb),0.2)] z-30"
                  : "border-secondary/40 bg-secondary/5 z-20"
              } p-2 ${
                isMine
                  ? "hover:bg-primary/20 hover:shadow-[0_0_30px_rgba(var(--c-primary-rgb),0.3)]"
                  : "hover:bg-secondary/10 hover:shadow-[0_0_20px_var(--c-secondary-25)]"
              } ${onEventClick ? "cursor-pointer" : ""}`}
              style={{
                gridRow: `${rowStart} / ${rowEnd}`,
                gridColumn: col,
              }}
            >
              <div
                className={`absolute top-0 left-0 h-full w-1 ${
                  isMine
                    ? "bg-primary shadow-[0_0_12px_var(--c-primary)] w-1.5"
                    : "bg-secondary shadow-[0_0_8px_var(--c-secondary)]"
                }`}
              />

              <div className="flex justify-between items-start mb-1 relative z-10">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest truncate pr-1 ${
                    isMine ? "text-primary" : "text-secondary"
                  }`}
                >
                  {c.matiere?.code || c.intitule}
                </span>
                <span className="text-[9px] font-mono text-muted">
                  {c.heureDebut}
                </span>
              </div>

              <span
                className={`truncate text-[11px] font-bold text-secondary mb-1 relative z-10 ${
                  isMine
                    ? "underline decoration-primary/30 underline-offset-4"
                    : ""
                }`}
              >
                {c.matiere?.nom || c.intitule}
              </span>

              <div className="mt-auto flex flex-wrap gap-1 text-[9px] font-mono text-muted uppercase relative z-10">
                <span className="border border-border/50 px-1 bg-bg-card/50">
                  {c.salle}
                </span>
                <span className="border border-border/50 px-1 bg-bg-card/50">
                  {c.groupe.nom}
                </span>
              </div>

              <div className="mt-1 text-[9px] italic text-muted truncate border-t border-border/20 pt-1 relative z-10">
                {c.enseignant.prenom[0]}. {c.enseignant.nom}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
