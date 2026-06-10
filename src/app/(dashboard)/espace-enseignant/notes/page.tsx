import NoteForm from "@/components/notes/NoteForm";
import { createNote, deleteNote, updateNote } from "@/actions/notes";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NotesPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ edit?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id || session?.user?.role !== "ENSEIGNANT") {
    redirect("/connexion");
  }

  const { edit } = await searchParams;
  const enseignantId = session?.user.id;

  const matieres = await prisma.matiere.findMany({
    where: {
      enseignants: {
        some: { enseignantId: enseignantId },
      },
    },
  });

  const groupes = await prisma.groupe.findMany({
    include: { etudiants: true },
  });

  const etudiants = await prisma.user.findMany({
    where: {
      role: "ETUDIANT",
    },
  });

  const notesSaisies = await prisma.note.findMany({
    where: { enseignantId },
    include: {
      etudiant: true,
      matiere: true,
    },
  });

  const noteAEditer = edit
    ? (notesSaisies.find((n) => n.id === edit) ?? null)
    : null;

  return (
    <div className="forge-container">
      <h1 className="text-2xl font-bold mb-4">Gestion des Notes</h1>
      {/* Formulaire création/édition note */}
      <NoteForm
        key={noteAEditer?.id ?? "new"}
        matieres={matieres}
        groupes={groupes}
        etudiants={etudiants}
        action={noteAEditer ? updateNote : createNote}
        noteAEditer={noteAEditer}
      />
      {/* Tableau de notes */}
      <div className="forge-card mt-8 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-primary text-bg-card">
            <tr>
              <th className="p-3 text-left">Étudiant</th>
              <th className="p-3 text-left">Matière</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notesSaisies.map((note) => (
              <tr key={note.id} className="border-t border-border">
                <td className="p-3">
                  <span className="uppercase">{note.etudiant.nom}</span>{" "}
                  {note.etudiant.prenom}
                </td>
                <td className="p-3">{note.matiere.nom}</td>
                <td className="p-3">{note.valeur}</td>
                <td className="p-3">
                  <a
                    href={`?edit=${note.id}`}
                    className="forge-btn-ghost text-xs px-2 py-1"
                  >
                    Modifier
                  </a>
                  <form action={deleteNote.bind(null, note.id)}>
                    <button
                      type="submit"
                      className="forge-btn-ghost text-xs px-2 py-1 text-red-600"
                    >
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
