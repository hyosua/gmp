"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Groupe {
  id: string;
  nom: string;
  type: string;
  anneeScolaire: string;
}

export default function SelectGroupe({
  groupes,
  groupeIdActuel,
}: {
  groupes: Groupe[];
  groupeIdActuel: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("groupeId", e.target.value);
    } else {
      params.delete("groupeId");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={groupeIdActuel}
      onChange={handleChange}
      className="bg-bg-card border border-border text-secondary font-mono text-sm px-3 py-2 rounded-md focus:outline-none focus:border-primary"
    >
      <option value="">-- Choisir un groupe --</option>
      {groupes.map((g) => (
        <option key={g.id} value={g.id}>
          {g.nom} ({g.type}) - {g.anneeScolaire}
        </option>
      ))}
    </select>
  );
}
