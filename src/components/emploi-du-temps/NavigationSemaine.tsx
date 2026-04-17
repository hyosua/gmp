"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { format, addWeeks, subWeeks, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface NavigationSemaineProps {
  dateDebut: Date;
}

export default function NavigationSemaine({
  dateDebut,
}: NavigationSemaineProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeSemaine = (nouvelleDate: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("semaine", format(nouvelleDate, "yyyy-MM-dd"));
    router.push(`${pathname}?${params.toString()}`);
  };

  const allerPrecedent = () => changeSemaine(subWeeks(dateDebut, 1));
  const allerSuivant = () => changeSemaine(addWeeks(dateDebut, 1));
  const allerAujourdhui = () => {
    const lundi = startOfWeek(new Date(), { weekStartsOn: 1 });
    changeSemaine(lundi);
  };

  // On calcule le vendredi (lundi + 4 jours) pour l'affichage de la plage
  const dateVendredi = new Date(dateDebut);
  dateVendredi.setDate(dateVendredi.getDate() + 4);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-md border border-primary/20">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-mono text-muted uppercase tracking-tighter">
            Planning Hebdomadaire
          </h2>
          <p className="text-sm font-bold text-secondary capitalize">
            Du {format(dateDebut, "dd MMMM", { locale: fr })} au{" "}
            {format(dateVendredi, "dd MMMM yyyy", { locale: fr })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={allerAujourdhui}
          className="forge-btn-ghost px-3 py-1 text-xs font-mono uppercase border border-border hover:border-primary transition-colors"
        >
          Aujourd&apos;hui
        </button>

        <div className="flex items-center bg-bg-deep border border-border rounded-md overflow-hidden">
          <button
            onClick={allerPrecedent}
            className="p-2 hover:bg-primary/10 text-muted hover:text-primary transition-colors border-r border-border"
            title="Semaine précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={allerSuivant}
            className="p-2 hover:bg-primary/10 text-muted hover:text-primary transition-colors"
            title="Semaine suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
