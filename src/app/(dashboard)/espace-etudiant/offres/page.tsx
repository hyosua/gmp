"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Offre = {
  id?: string;
  poste: string;
  description: string;
  remuneration: string;
  prerequis: string;
  entreprise: string;
  duree: string;
  statut?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Offres() {
  const { data: session, status } = useSession();
  const [offres, setOffres] = useState<Offre[]>([]);
  const routeur = useRouter();
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  const [nouveaux, setNouveaux] = useState<Offre>({
    poste: "",
    description: "",
    remuneration: "",
    prerequis: "",
    entreprise: "",
    duree: "",
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user?.role !== "ETUDIANT") {
      routeur.push("/");
      return;
    }

    fetch("/api/offres")
      .then((r) => r.json())
      .then(setOffres)
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  if (status === "loading") return null;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Vos offres</h1>

      {/* 🔵 TABLEAU */}
      {mode === "list" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead className="bg-primary text-bg-card">
            <tr>
              <th className="p-3 text-left">Poste</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Durée</th>
              <th className="p-3 text-left">Rémunération</th>
              <th className="p-3 text-left">Prérequis</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Créé le</th>
              <th className="p-3 text-left">Modifiée le</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {offres.map((o, i) => (
              <tr
                key={i}
                className="border-t border-border"
                style={{ textAlign: "center" }}
              >
                <td className="p-3">{o.poste}</td>
                <td className="p-3">{o.description}</td>
                <td className="p-3">{o.duree}</td>
                <td className="p-3">{o.remuneration}</td>
                <td className="p-3">{o.prerequis}</td>
                <td className="p-3">{o.statut}</td>
                <td className="p-3">{o.createdAt}</td>
                <td className="p-3">{o.updatedAt}</td>

                <td className="p-3">
                  <button
                    className="forge-btn-primary"
                    onClick={() => {
                      setNouveaux(o);
                      setMode("edit");
                    }}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🟢 FORM CREATE / EDIT */}
      {(mode === "create" || mode === "edit") && (
        <div style={{ width: "600px", margin: "20px auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid #4a90e2",
            }}
          >
            <tbody>
              <tr className="border-t border-border">
                <td>Poste</td>
                <td className="p-3">
                  <input
                    value={nouveaux.poste}
                    onChange={(e) =>
                      setNouveaux({ ...nouveaux, poste: e.target.value })
                    }
                  />
                </td>
              </tr>

              <tr className="border-t border-border">
                <td>Description</td>
                <td className="p-3">
                  <textarea
                    value={nouveaux.description}
                    onChange={(e) =>
                      setNouveaux({ ...nouveaux, description: e.target.value })
                    }
                  />
                </td>
              </tr>

              <tr className="border-t border-border">
                <td>Durée</td>
                <td className="p-3">
                  <input
                    value={nouveaux.duree}
                    onChange={(e) =>
                      setNouveaux({ ...nouveaux, duree: e.target.value })
                    }
                  />
                </td>
              </tr>

              <tr className="border-t border-border">
                <td>Rémunération</td>
                <td className="p-3">
                  <input
                    value={nouveaux.remuneration}
                    onChange={(e) =>
                      setNouveaux({ ...nouveaux, remuneration: e.target.value })
                    }
                  />
                </td>
              </tr>

              <tr className="border-t border-border">
                <td>Prérequis</td>
                <td className="p-3">
                  <textarea
                    value={nouveaux.prerequis}
                    onChange={(e) =>
                      setNouveaux({ ...nouveaux, prerequis: e.target.value })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 🔵 BOUTON AJOUT */}
      {mode === "list" && (
        <button
          className="forge-btn-primary"
          onClick={() => {
            setNouveaux({
              poste: "",
              description: "",
              remuneration: "",
              prerequis: "",
              entreprise: "",
              duree: "",
            });
            setMode("create");
          }}
          style={{ width: "100%", marginTop: "20px" }}
        >
          Ajouter une offre
        </button>
      )}
    </div>
  );
}
