"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Projet = {
  id: string;
  titre: string;
  description: string;
  prerequis: string | null;
  nbEtudiants: number;
  statut: string;
};

const PARCOURS_OPTIONS = [
  { value: "", label: "Tous parcours" },
  { value: "SIMULATION_REALITE_VIRTUELLE", label: "SRV" },
  { value: "CONCEPTION_PRODUCTION_DURABLE", label: "CPD" },
  { value: "LP_MIE", label: "LP MIE" },
  { value: "LP_MIEF", label: "LP MIEF" },
  { value: "LP_MRI", label: "LP MRI" },
];

type Offre = {
  id: string;
  poste: string;
  description: string;
  duree: string;
  remuneration: string;
  prerequis: string;
  parcours: string | null;
  statut: string;
};

const STATUTS: Record<string, string> = {
  PENDING: "En attente",
  PUBLISHED: "Publié",
  REJECTED: "Rejeté",
};

function StatutBadge({ statut }: { statut: string }) {
  const styles: Record<string, React.CSSProperties> = {
    PUBLISHED: {
      backgroundColor: "var(--c-primary-15)",
      color: "var(--c-primary)",
    },
    REJECTED: {
      backgroundColor: "rgba(220,38,38,0.12)",
      color: "var(--c-error)",
    },
    PENDING: {
      backgroundColor: "var(--c-accent-30)",
      color: "var(--c-accent)",
    },
  };
  return (
    <span className="font-mono text-xs px-2 py-1" style={styles[statut] ?? {}}>
      {STATUTS[statut] ?? statut}
    </span>
  );
}

type ProjetForm = Omit<Projet, "id" | "statut">;
type OffreForm = Omit<Offre, "id" | "statut">;

const projetVide = (): ProjetForm => ({
  titre: "",
  description: "",
  prerequis: "",
  nbEtudiants: 1,
});
const offreVide = (): OffreForm => ({
  poste: "",
  description: "",
  duree: "",
  remuneration: "",
  prerequis: "",
  parcours: "",
});

export default function DashboardEntreprise() {
  const { data: session } = useSession();
  const [projets, setProjets] = useState<Projet[]>([]);
  const [offres, setOffres] = useState<Offre[]>([]);

  const [projetModal, setProjetModal] = useState<{
    mode: "create" | "edit";
    form: ProjetForm;
    id?: string;
  } | null>(null);
  const [offreModal, setOffreModal] = useState<{
    mode: "create" | "edit";
    form: OffreForm;
    id?: string;
  } | null>(null);
  const [erreurProjet, setErreurProjet] = useState("");
  const [erreurOffre, setErreurOffre] = useState("");

  async function chargerProjets() {
    const res = await fetch("/api/projets");
    const data = await res.json();
    setProjets(Array.isArray(data) ? data : []);
  }

  async function chargerOffres() {
    const res = await fetch("/api/offres");
    const data = await res.json();
    setOffres(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    fetch("/api/projets")
      .then((r) => r.json())
      .then((d) => setProjets(Array.isArray(d) ? d : []));
    fetch("/api/offres")
      .then((r) => r.json())
      .then((d) => setOffres(Array.isArray(d) ? d : []));
  }, []);

  async function soumettreProjet() {
    if (!projetModal) return;
    setErreurProjet("");
    const { mode, form, id } = projetModal;
    const body = new FormData();
    body.append("titre", form.titre);
    body.append("description", form.description);
    body.append("prerequis", form.prerequis ?? "");
    body.append("nbEtudiants", String(form.nbEtudiants));
    const res = await fetch(
      mode === "edit" ? `/api/projets/modifier/${id}` : "/api/projets/nouveaux",
      { method: mode === "edit" ? "PATCH" : "POST", body },
    );
    if (!res.ok) {
      const json = await res.json();
      setErreurProjet(json.error ?? "Erreur");
      return;
    }
    setProjetModal(null);
    chargerProjets();
  }

  async function supprimerProjet(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/projets/supprimer/${id}`, { method: "DELETE" });
    chargerProjets();
  }

  async function soumettreOffre() {
    if (!offreModal) return;
    setErreurOffre("");
    const { mode, form, id } = offreModal;
    const body = new FormData();
    body.append("poste", form.poste);
    body.append("description", form.description);
    body.append("duree", form.duree);
    body.append("remuneration", form.remuneration);
    body.append("prerequis", form.prerequis);
    body.append("parcours", form.parcours ?? "");
    body.append("entreprise", session?.user?.id ?? "");
    const res = await fetch(
      mode === "edit" ? `/api/offres/modifier/${id}` : "/api/offres/nouveaux",
      { method: mode === "edit" ? "PATCH" : "POST", body },
    );
    if (!res.ok) {
      setErreurOffre("Erreur lors de l'enregistrement");
      return;
    }
    setOffreModal(null);
    chargerOffres();
  }

  return (
    <div className="forge-container py-8 flex flex-col gap-10">
      <div>
        <h1 className="text-secondary font-mono text-xl">Espace Entreprise</h1>
        <p className="text-muted text-sm mt-1">
          Bienvenue, <strong>{session?.user?.name}</strong>
        </p>
      </div>

      {/* Projets tuteurés */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-secondary font-mono text-sm uppercase tracking-widest">
            Projets tuteurés
          </h2>
          <button
            className="forge-btn-primary text-xs"
            onClick={() => {
              setErreurProjet("");
              setProjetModal({ mode: "create", form: projetVide() });
            }}
          >
            + Nouveau projet
          </button>
        </div>

        {projets.length === 0 ? (
          <div className="forge-card text-muted text-sm text-center py-6">
            Aucun projet déposé.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {projets.map((p) => (
              <div
                key={p.id}
                className="forge-card flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-secondary text-sm font-semibold truncate">
                    {p.titre}
                  </p>
                  <p className="text-muted text-xs truncate mt-0.5">
                    {p.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatutBadge statut={p.statut} />
                  <button
                    className="forge-btn-ghost text-xs"
                    onClick={() => {
                      setErreurProjet("");
                      setProjetModal({
                        mode: "edit",
                        id: p.id,
                        form: {
                          titre: p.titre,
                          description: p.description,
                          prerequis: p.prerequis ?? "",
                          nbEtudiants: p.nbEtudiants,
                        },
                      });
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="forge-btn-ghost text-xs"
                    style={{ color: "var(--c-error)" }}
                    onClick={() => supprimerProjet(p.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Offres d'alternance */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-secondary font-mono text-sm uppercase tracking-widest">
            Offres d&apos;alternance
          </h2>
          <button
            className="forge-btn-primary text-xs"
            onClick={() => {
              setErreurOffre("");
              setOffreModal({ mode: "create", form: offreVide() });
            }}
          >
            + Nouvelle offre
          </button>
        </div>

        {offres.length === 0 ? (
          <div className="forge-card text-muted text-sm text-center py-6">
            Aucune offre déposée.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {offres.map((o) => (
              <div
                key={o.id}
                className="forge-card flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-secondary text-sm font-semibold truncate">
                    {o.poste}
                  </p>
                  <p className="text-muted text-xs mt-0.5">
                    {o.duree} — {o.remuneration}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatutBadge statut={o.statut} />
                  <button
                    className="forge-btn-ghost text-xs"
                    onClick={() => {
                      setErreurOffre("");
                      setOffreModal({
                        mode: "edit",
                        id: o.id,
                        form: {
                          poste: o.poste,
                          description: o.description,
                          duree: o.duree,
                          remuneration: o.remuneration,
                          prerequis: o.prerequis,
                          parcours: o.parcours,
                        },
                      });
                    }}
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal projet */}
      {projetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="forge-card w-full max-w-lg flex flex-col gap-4">
            <h3 className="text-secondary font-mono text-sm uppercase tracking-widest">
              {projetModal.mode === "edit"
                ? "Modifier le projet"
                : "Nouveau projet tuteuré"}
            </h3>
            {erreurProjet && (
              <p className="text-xs" style={{ color: "var(--c-error)" }}>
                {erreurProjet}
              </p>
            )}
            {(["titre", "description", "prerequis"] as const).map((key) => (
              <div key={key}>
                <label className="block text-muted font-mono text-xs mb-1 uppercase">
                  {key}
                </label>
                {key === "description" || key === "prerequis" ? (
                  <textarea
                    className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm min-h-[80px]"
                    value={projetModal.form[key] ?? ""}
                    onChange={(e) =>
                      setProjetModal({
                        ...projetModal,
                        form: { ...projetModal.form, [key]: e.target.value },
                      })
                    }
                  />
                ) : (
                  <input
                    className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
                    value={projetModal.form[key] ?? ""}
                    onChange={(e) =>
                      setProjetModal({
                        ...projetModal,
                        form: { ...projetModal.form, [key]: e.target.value },
                      })
                    }
                  />
                )}
              </div>
            ))}
            <div>
              <label className="block text-muted font-mono text-xs mb-1 uppercase">
                Nb étudiants
              </label>
              <input
                type="number"
                min={1}
                className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
                value={projetModal.form.nbEtudiants}
                onChange={(e) =>
                  setProjetModal({
                    ...projetModal,
                    form: {
                      ...projetModal.form,
                      nbEtudiants: parseInt(e.target.value) || 1,
                    },
                  })
                }
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                className="forge-btn-primary flex-1"
                onClick={soumettreProjet}
              >
                {projetModal.mode === "edit" ? "Modifier" : "Créer"}
              </button>
              <button
                className="forge-btn-ghost flex-1"
                onClick={() => setProjetModal(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal offre */}
      {offreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="forge-card w-full max-w-lg flex flex-col gap-4">
            <h3 className="text-secondary font-mono text-sm uppercase tracking-widest">
              {offreModal.mode === "edit"
                ? "Modifier l'offre"
                : "Nouvelle offre d'alternance"}
            </h3>
            {erreurOffre && (
              <p className="text-xs" style={{ color: "var(--c-error)" }}>
                {erreurOffre}
              </p>
            )}
            {(
              [
                "poste",
                "description",
                "duree",
                "remuneration",
                "prerequis",
              ] as const
            ).map((key) => (
              <div key={key}>
                <label className="block text-muted font-mono text-xs mb-1 uppercase">
                  {key}
                </label>
                {key === "description" || key === "prerequis" ? (
                  <textarea
                    className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm min-h-[80px]"
                    value={offreModal.form[key]}
                    onChange={(e) =>
                      setOffreModal({
                        ...offreModal,
                        form: { ...offreModal.form, [key]: e.target.value },
                      })
                    }
                  />
                ) : (
                  <input
                    className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
                    value={offreModal.form[key]}
                    onChange={(e) =>
                      setOffreModal({
                        ...offreModal,
                        form: { ...offreModal.form, [key]: e.target.value },
                      })
                    }
                  />
                )}
              </div>
            ))}
            <div>
              <label className="block text-muted font-mono text-xs mb-1 uppercase">
                Parcours ciblé
              </label>
              <select
                className="w-full bg-bg-card border border-primary text-secondary p-2 text-sm"
                value={offreModal.form.parcours ?? ""}
                onChange={(e) =>
                  setOffreModal({
                    ...offreModal,
                    form: { ...offreModal.form, parcours: e.target.value },
                  })
                }
              >
                {PARCOURS_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                className="forge-btn-primary flex-1"
                onClick={soumettreOffre}
              >
                {offreModal.mode === "edit" ? "Modifier" : "Créer"}
              </button>
              <button
                className="forge-btn-ghost flex-1"
                onClick={() => setOffreModal(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
