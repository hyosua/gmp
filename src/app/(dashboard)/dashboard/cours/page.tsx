import { useState } from "react";


function PageCours() {

    const [file, setFile] = useState<File>();


    const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }
    async function Envoie() {
        const fich = {
            nom : file?.name,
            fichier : file

    }
     if (!file) return; 
    const formData = new FormData();
    formData.append("nom", fich.nom || '')
    formData.append("fichier", fich.fichier || '')
    formData.append("chemin", "/")
        const fichier2 = await fetch("",{
            body:{}
        })

    }
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Bienvenue sur la page cours</h1>
            <h2>Vous pouvez déposer vos cours sur la plateforme</h2>
            <table border={1}>
                <tr>
                    <th>
                        Nom du fichier :
                    </th>
                    <td>
                        <button style={{ borderColor: "white" }}><input type="file" onChange={handlefile} /></button>
                    </td>
                </tr>
            </table>
        </div>
    )
}
export default PageCours;