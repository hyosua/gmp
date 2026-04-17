"use client";
import { useEffect, useState } from "react";

function PageCours() {
  const [file, setFile] = useState<File>();
  const [button, setButton] = useState<boolean>(false);

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

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenue sur la page cours</h1>
      <h2>Vous pouvez déposer vos cours sur la plateforme</h2>
      <table border={1}>
        <tr>
          <th>fichier :</th>
          <td>
            <button style={{ borderColor: "white" }}>
              <input type="file" onChange={handlefile} />
            </button>
          </td>
          <td colSpan={2}>
            <button type="submit" onClick={() => setButton(true)}>
              Envoyer
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
export default PageCours;
