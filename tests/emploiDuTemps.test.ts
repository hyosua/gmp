import { describe, it, expect, vi } from "vitest";
import type { Session } from "next-auth";
import { prismaTest } from "./prismaTest";
import {
  getCreneauxSemaine,
  createCreneau,
  updateCreneau,
  deleteCreneau,
} from "@/actions/emploiDuTemps";

// Mock du module auth — les actions appellent auth() en interne
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/lib/auth";

// NextAuth type auth() avec des surcharges complexes — on caste via unknown
type SimpleMock = { mockResolvedValue(v: Session | null): void };
const mockedAuth = auth as unknown as SimpleMock;

// Helper : simule un enseignant connecté
function mockSession(userId: string) {
  mockedAuth.mockResolvedValue({
    user: {
      id: userId,
      role: "ENSEIGNANT",
      parcours: "NON_DEFINI",
      email: null,
      name: null,
    },
    expires: new Date(Date.now() + 3600000).toISOString(),
  });
}

async function createFixtures() {
  const ue = await prismaTest.uE.create({
    data: { nom: "Mécanique", code: "UE1", coefficient: 1 },
  });
  const matiere = await prismaTest.matiere.create({
    data: { nom: "Résistance des matériaux", code: "RDM", ueId: ue.id },
  });
  const enseignant = await prismaTest.user.create({
    data: {
      email: "prof@gmp.fr",
      password: "hash",
      nom: "Durand",
      prenom: "Jean",
      role: "ENSEIGNANT",
    },
  });
  const groupe = await prismaTest.groupe.create({
    data: { nom: "TD1", type: "TD", anneeScolaire: "2025-2026" },
  });
  return { matiere, enseignant, groupe };
}

describe("getCreneauxSemaine", () => {
  it("retourne les créneaux de la semaine demandée", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();

    const lundi = new Date("2025-09-01");
    await prismaTest.emploiDuTemps.create({
      data: {
        semaine: lundi,
        jour: "lundi",
        heureDebut: "08:00",
        heureFin: "10:00",
        salle: "A101",
        intitule: "RDM",
        groupeId: groupe.id,
        enseignantId: enseignant.id,
        matiereId: matiere.id,
      },
    });

    const autreLundi = new Date("2025-09-08");
    await prismaTest.emploiDuTemps.create({
      data: {
        semaine: autreLundi,
        jour: "lundi",
        heureDebut: "08:00",
        heureFin: "10:00",
        salle: "A101",
        intitule: "RDM",
        groupeId: groupe.id,
        enseignantId: enseignant.id,
        matiereId: matiere.id,
      },
    });

    const creneaux = await getCreneauxSemaine(lundi);

    expect(creneaux).toHaveLength(1);
    expect(creneaux[0].semaine.toISOString()).toBe(lundi.toISOString());
    expect(creneaux[0].enseignant.nom).toBe("Durand");
    expect(creneaux[0].groupe.nom).toBe("TD1");
    expect(creneaux[0].matiere?.nom).toBe("Résistance des matériaux");
  });

  it("retourne un tableau vide si aucun créneau cette semaine", async () => {
    const creneaux = await getCreneauxSemaine(new Date("2025-09-01"));
    expect(creneaux).toHaveLength(0);
  });

  it("filtre par groupeIds si fourni", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const autreGroupe = await prismaTest.groupe.create({
      data: { nom: "CM1", type: "CM", anneeScolaire: "2025-2026" },
    });

    const lundi = new Date("2025-09-01");
    await prismaTest.emploiDuTemps.createMany({
      data: [
        {
          semaine: lundi,
          jour: "lundi",
          heureDebut: "08:00",
          heureFin: "10:00",
          salle: "A101",
          intitule: "RDM",
          groupeId: groupe.id,
          enseignantId: enseignant.id,
          matiereId: matiere.id,
        },
        {
          semaine: lundi,
          jour: "mardi",
          heureDebut: "10:00",
          heureFin: "12:00",
          salle: "B202",
          intitule: "Math",
          groupeId: autreGroupe.id,
          enseignantId: enseignant.id,
          matiereId: matiere.id,
        },
      ],
    });

    const creneaux = await getCreneauxSemaine(lundi, [groupe.id]);

    expect(creneaux).toHaveLength(1);
    expect(creneaux[0].groupe.nom).toBe("TD1");
  });
});

describe("createCreneau", () => {
  it("crée un créneau et le retourne", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const lundi = new Date("2025-09-01");
    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.creneau.salle).toBe("A101");
  });

  it("retourne UNAUTHORIZED si pas connecté", async () => {
    mockedAuth.mockResolvedValue(null);
    const { groupe, matiere } = await createFixtures();

    const result = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("UNAUTHORIZED");
  });

  it("retourne CONFLIT_SALLE si la salle est déjà occupée", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const lundi = new Date("2025-09-01");
    const data = {
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    };

    await createCreneau(data);
    const result = await createCreneau(data);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_SALLE");
  });

  it("retourne CONFLIT_ENSEIGNANT si l'enseignant est déjà occupé ailleurs", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const autreGroupe = await prismaTest.groupe.create({
      data: { nom: "TD2", type: "TD", anneeScolaire: "2025-2026" },
    });
    const lundi = new Date("2025-09-01");

    await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "09:00",
      heureFin: "11:00",
      salle: "B202",
      intitule: "RDM",
      groupeId: autreGroupe.id,
      matiereId: matiere.id,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_ENSEIGNANT");
  });

  it("retourne CONFLIT_GROUPE si le groupe a déjà un cours", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const autreEnseignant = await prismaTest.user.create({
      data: {
        email: "autre@prof.fr",
        password: "hash",
        nom: "Martin",
        prenom: "Paul",
        role: "ENSEIGNANT",
      },
    });
    const lundi = new Date("2025-09-01");

    mockSession(enseignant.id);
    await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    mockSession(autreEnseignant.id);
    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "09:00",
      heureFin: "11:00",
      salle: "B202",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_GROUPE");
  });

  it("ne détecte pas de conflit si les horaires ne se chevauchent pas", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const lundi = new Date("2025-09-01");

    await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "10:00",
      heureFin: "12:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    expect(result.success).toBe(true);
  });
});

describe("updateCreneau", () => {
  it("met à jour la salle d'un créneau existant", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });
    if (!created.success) throw new Error("setup failed");

    const result = await updateCreneau(created.creneau.id, { salle: "B202" });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.creneau.salle).toBe("B202");
  });

  it("empêche la mise à jour si elle crée un conflit de salle", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const lundi = new Date("2025-09-01");

    const c1 = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "Cours 1",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });

    const autreGroupe = await prismaTest.groupe.create({
      data: { nom: "TD2", type: "TD", anneeScolaire: "2025-2026" },
    });

    const c2 = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "10:00",
      heureFin: "12:00",
      salle: "B202",
      intitule: "Cours 2",
      groupeId: autreGroupe.id,
      matiereId: matiere.id,
    });

    if (!c1.success || !c2.success) throw new Error("setup failed");

    const result = await updateCreneau(c2.creneau.id, {
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_SALLE");
  });

  it("refuse la mise à jour si l'enseignant n'est pas le propriétaire", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const autreEnseignant = await prismaTest.user.create({
      data: {
        email: "autre@gmp.fr",
        password: "hash",
        nom: "Martin",
        prenom: "Paul",
        role: "ENSEIGNANT",
      },
    });

    mockSession(enseignant.id);
    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });
    if (!created.success) throw new Error("setup failed");

    // Changer de session : autre enseignant tente la modif
    mockSession(autreEnseignant.id);
    const result = await updateCreneau(created.creneau.id, { salle: "B202" });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("UNAUTHORIZED");
  });
});

describe("deleteCreneau", () => {
  it("supprime un créneau dont on est propriétaire", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    mockSession(enseignant.id);

    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });
    if (!created.success) throw new Error("setup failed");

    const result = await deleteCreneau(created.creneau.id);

    expect(result.success).toBe(true);
    const remaining = await prismaTest.emploiDuTemps.findMany();
    expect(remaining).toHaveLength(0);
  });

  it("refuse la suppression si l'enseignant n'est pas le propriétaire", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const imposteur = await prismaTest.user.create({
      data: {
        email: "imposteur@gmp.fr",
        password: "hash",
        nom: "Fake",
        prenom: "Guy",
        role: "ENSEIGNANT",
      },
    });

    mockSession(enseignant.id);
    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      matiereId: matiere.id,
    });
    if (!created.success) throw new Error("setup failed");

    // L'imposteur tente de supprimer
    mockSession(imposteur.id);
    const result = await deleteCreneau(created.creneau.id);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("UNAUTHORIZED");
  });
});
