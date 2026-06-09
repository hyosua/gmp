"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PageCours() {
  const [file, setFile] = useState<File>();
  const [button, setButton] = useState<boolean>(false);
  const [cours, setCours] = useState<any[]>([]); // Initialise comme tableau
  const routeur = useRouter()

  const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  async function Envoie() {
    const fich = {
      nom: file?.name,
      fichier: file,
    };
    if (!file) return;
    const formData = new FormData();
    formData.append("nom", fich.nom || "");
    formData.append("fichier", fich.fichier || "");
    formData.append("chemin", `/${fich.nom}`);
    formData.append("taille", file.size.toString() || "");

    const fichier2 = await fetch("/api/support", {
      method: "POST",
      body: formData,
    });

    if (fichier2.ok) {
      alert("Ajout éffectuer avec succès")
      routeur.refresh()

      return await fichier2.text();
    } else {
      console.log("erreur", fichier2.text());
    }
  }

  useEffect(() => {
    if (!button) return;

    const run = async () => {
      await Envoie();
      setButton(false);
    };

    run();
  }, [button, Envoie]);


  async function GetCours() {
    try {
      const fichier2 = await fetch("/api/support/cours", {
        method: "GET"
      });
      const json = await fichier2.json();
      setCours(json); // Suppose que json est un tableau
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    GetCours();
  }, []);

  // Ajoute un useEffect pour loguer cours après mise à jour
  useEffect(() => {
    console.log(cours);
  }, [cours]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenue sur la page cours</h1>
      <h2>Vous pouvez déposer vos cours sur la plateforme</h2>
      <table border={1} style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "2px solid #4a90e2"
                    }}>
        <thead className="bg-primary text-bg-card">
          <tr>
            <th className="p-3 text-left">fichier :</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border" style={{ textAlign: "center" }}>
            <td className="p-3">
              <input   type="file" onChange={handlefile} />
            </td>
            <td className="p-3">
              <button className="forge-btn-primary" type="submit" onClick={() => setButton(true)}>
                Envoyer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table border={1} style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "2px solid #4a90e2",
                        top: "200px"
                    }}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date de dépot</th>
          </tr>
        </thead>
        <tbody>
          {cours.map((item, index) => (
            <tr key={index}>
              <td className="p-3"><a href={`/support/${item.titre}`}>{item.titre}</a></td>
              <td className="p-3">{item.dateDepot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PageCours;
