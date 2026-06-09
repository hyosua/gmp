import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notes - Espace Étudiant",
};
export const dynamic = "force-dynamic";

export default async function NotesEtudiantPage() {
  const session = await auth();

  if (!session?.user?.id || session?.user?.role !== "ETUDIANT") {
    redirect("/connexion");
  }

  const notes = await prisma.note.findMany({
    where: { etudiantId: session.user.id },
    include: { matiere: true },
    orderBy: [{ annee: "desc" }, { semestre: "asc" }],
  });

  const parSemestre: Record<string, typeof notes> = {};
  for (const note of notes) {
    const cle = `${note.annee} - S${note.semestre}`;
    if (!parSemestre[cle]) parSemestre[cle] = [];
    parSemestre[cle].push(note);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Mes Notes</h1>

      {notes.length === 0 ? (
        <div className="forge-card rounded-lg p-8 text-center text-muted">
          Aucune note enregistrée pour le moment.
        </div>
      ) : (
        Object.entries(parSemestre).map(([semestre, notesGroupe]) => {
          const moyenne =
            notesGroupe.reduce((sum, n) => sum + n.valeur, 0) /
            notesGroupe.length;
          return (
            <div
              key={semestre}
              className="forge-card rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-primary text-bg-card">
                <span className="font-semibold">{semestre}</span>
                <span className="text-sm">
                  Moyenne : {moyenne.toFixed(2)} / 20
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="p-3 text-left font-medium">Matière</th>
                    <th className="p-3 text-right font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {notesGroupe.map((note) => (
                    <tr key={note.id} className="border-t border-border">
                      <td className="p-3">{note.matiere.nom}</td>
                      <td className="p-3 text-right font-semibold">
                        <span
                          className={
                            note.valeur < 10 ? "text-red-500" : "text-secondary"
                          }
                        >
                          {note.valeur} / 20
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
}
