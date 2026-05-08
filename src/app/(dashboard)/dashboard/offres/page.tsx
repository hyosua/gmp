'use client'

import { useEffect, useState } from "react"

type Offre = {
    id?: string
    poste: string
    description: string
    remuneration: string
    prerequis: string
    entreprise: string
    duree: string
    statut?: string
    createdAt?: string
    updatedAt ?: string
}

export default function Offres() {

    const [offres, setOffres] = useState<Offre[]>([])
    const [choix , setChoix] = useState<String>()
        // 👉 mode UI : liste | create | edit
    const [mode, setMode] = useState<"list" | "create" | "edit">("list")

    const [nouveaux, setNouveaux] = useState<Offre>({
        poste: '',
        description: '',
        remuneration: '',
        prerequis: '',
        entreprise: 'cmo31p00q000bpovupja8ppm5',
        duree: ''
    })

    async function getOffres() {
        try {
            const data = await fetch("/api/offres")
            const json = await data.json()
            setOffres(json)
        } catch (err) {
            console.log(err)
        }
    }

    async function NewOffres() {

        const formData = new FormData();

        formData.append("poste", nouveaux.poste);
        formData.append("description", nouveaux.description);
        formData.append("remuneration", nouveaux.remuneration);
        formData.append("prerequis", nouveaux.prerequis);
        formData.append("entreprise", nouveaux.entreprise);
        formData.append("duree", nouveaux.duree);

        try {

            const isEdit = mode === "edit";

            const url = isEdit
                ? `/api/offres/modifier/${choix}`
                : "/api/offres/nouveaux";

            const method = isEdit ? "PATCH" : "POST";

            const envoie = await fetch(url, {
                method,
                body: formData
            });

            const json = await envoie.json();

            console.log(json);

            alert(
                isEdit
                    ? "Offre modifiée avec succès"
                    : "Offre ajoutée avec succès"
            );

            setMode("list");
            getOffres();

        } catch (ex) {
            console.log(ex);
            alert(ex);
        }
    }

    useEffect(() => {
       void getOffres()
    }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return (
        <div>

            <h1 style={{ textAlign: "center" }}>Vos offres</h1>

            {/* 🔵 TABLEAU */}
            {mode === "list" && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr>
                            <th>Poste</th>
                            <th>Description</th>
                            <th>Durée</th>
                            <th>Rémunération</th>
                            <th>Prérequis</th>
                            <th>Statut</th>
                            <th>Créé le</th>
                            <th>Modifiée le</th>
                            <th>Action</th>
                        </tr>

                        {offres.map((o, i) => (
                            <tr key={i} style={{ textAlign: "center" }}>
                                <td>{o.poste}</td>
                                <td>{o.description}</td>
                                <td>{o.duree}</td>
                                <td>{o.remuneration}</td>
                                <td>{o.prerequis}</td>
                                <td>{o.statut}</td>
                                <td>{o.createdAt}</td>
                                <td>{o.updatedAt}</td>

                                <td>
                                    <button
                                        onClick={() => {
                                            setNouveaux(o)
                                            setMode("edit")
                                            setChoix(o.id)
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

                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "2px solid #4a90e2"
                    }}>

                        <tbody>

                            <tr>
                                <td>Poste</td>
                                <td>
                                    <input
                                        value={nouveaux.poste}
                                        onChange={(e) =>
                                            setNouveaux({ ...nouveaux, poste: e.target.value })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea
                                        value={nouveaux.description}
                                        onChange={(e) =>
                                            setNouveaux({ ...nouveaux, description: e.target.value })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Durée</td>
                                <td>
                                    <input
                                        value={nouveaux.duree}
                                        onChange={(e) =>
                                            setNouveaux({ ...nouveaux, duree: e.target.value })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Rémunération</td>
                                <td>
                                    <input
                                        value={nouveaux.remuneration}
                                        onChange={(e) =>
                                            setNouveaux({ ...nouveaux, remuneration: e.target.value })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Prérequis</td>
                                <td>
                                    <textarea
                                        value={nouveaux.prerequis}
                                        onChange={(e) =>
                                            setNouveaux({ ...nouveaux, prerequis: e.target.value })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2} style={{ textAlign: "center" }}>

                                    <button onClick={NewOffres}>
                                        {mode === "edit" ? "Modifier" : "Ajouter"}
                                    </button>

                                    <button
                                        onClick={() => setMode("list")}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Annuler
                                    </button>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}

            {/* 🔵 BOUTON AJOUT */}
            {mode === "list" && (
                <button
                    onClick={() => {
                        setNouveaux({
                            poste: '',
                            description: '',
                            remuneration: '',
                            prerequis: '',
                            entreprise: '',
                            duree: ''
                        })
                        setMode("create")
                    }}
                    style={{ width: "100%", marginTop: "20px" }}
                >
                    Ajouter une offre
                </button>
            )}

        </div>
    )
}