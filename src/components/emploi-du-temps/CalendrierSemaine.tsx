"use client";

import React from "react";
import { forgeGrid, scanLines } from "@/lib/forge";

interface Creneau {
  id: string;
  jour: string; // 'lundi', 'mardi', etc.
  heureDebut: string; // '08:00'
  heureFin: string; // '10:00'
  salle: string;
  intitule: string;
  enseignant: { nom: string; prenom: string };
  matiere?: { nom: string; code: string } | null;
  groupe: { nom: string; type: string };
}

interface CalendrierSemaineProps {
  creneaux: Creneau[];
  dateDebut: Date;
  onCellClick?: (jour: string, heure: string) => void;
  onEventClick?: (creneau: Creneau) => void;
}

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
const HEURES = Array.from({ length: 13 }, (_, i) => i + 8); // 8h à 20h

export default function CalendrierSemaine({
  creneaux,
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
        {JOURS.map((j, idx) => (
          <div
            key={j}
            className="flex items-center justify-center border-b border-border bg-bg-card/95 py-2 text-xs font-bold uppercase text-secondary tracking-widest"
            style={{ gridRow: 1, gridColumn: idx + 2 }}
          >
            {j}
          </div>
        ))}

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
                    className="hover:bg-primary/5 transition-colors z-0"
                    style={{
                      gridRow: getGridRow(heure),
                      gridColumn: colIdx + 2,
                    }}
                    title={`Réserver le ${j} à ${heure}`}
                  />
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

          if (col === -1) return null;

          return (
            <div
              key={c.id}
              onClick={() => onEventClick?.(c)}
              className={`group relative flex flex-col overflow-hidden border border-primary/40 bg-primary/5 p-2 transition-all hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(var(--c-primary-rgb),0.2)] ${onEventClick ? "cursor-pointer" : ""}`}
              style={{
                gridRow: `${rowStart} / ${rowEnd}`,
                gridColumn: col,
                zIndex: 20,
              }}
            >
              <div className="absolute top-0 left-0 h-full w-1 bg-primary shadow-[0_0_8px_var(--c-primary)]" />

              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary truncate pr-1">
                  {c.matiere?.code || c.intitule}
                </span>
                <span className="text-[9px] font-mono text-muted">
                  {c.heureDebut}
                </span>
              </div>

              <span className="truncate text-[11px] font-bold text-secondary mb-1">
                {c.matiere?.nom || c.intitule}
              </span>

              <div className="mt-auto flex flex-wrap gap-1 text-[9px] font-mono text-muted uppercase">
                <span className="border border-border/50 px-1 bg-bg-card/50">
                  {c.salle}
                </span>
                <span className="border border-border/50 px-1 bg-bg-card/50">
                  {c.groupe.nom}
                </span>
              </div>

              <div className="mt-1 text-[9px] italic text-muted truncate border-t border-border/20 pt-1">
                {c.enseignant.prenom[0]}. {c.enseignant.nom}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
