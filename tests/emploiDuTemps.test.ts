import { describe, it, expect } from "vitest";
import { prismaTest } from "./prismaTest";
import {
  getCreneauxSemaine,
  createCreneau,
  updateCreneau,
  deleteCreneau,
} from "@/actions/emploiDuTemps";

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

    const lundi = new Date("2025-09-01"); // lundi semaine 1
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

    const autreLundi = new Date("2025-09-08"); // semaine suivante
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
          intitule: "RDM",
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
  it("crée un créneau ponctuel et le retourne", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const lundi = new Date("2025-09-01");

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.creneaux).toHaveLength(1);
    expect(result.creneaux[0].salle).toBe("A101");
  });

  it("retourne CONFLIT_SALLE si la salle est déjà occupée au même créneau", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const lundi = new Date("2025-09-01");

    const data = {
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    };

    await createCreneau(data);
    const result = await createCreneau(data);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_SALLE");
  });

  it("retourne CONFLIT_ENSEIGNANT si l'enseignant est déjà occupé ailleurs", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
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
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "09:00", // Chevauchement
      heureFin: "11:00",
      salle: "B202", // Autre salle
      intitule: "RDM",
      groupeId: autreGroupe.id, // Autre groupe
      enseignantId: enseignant.id, // Même enseignant
      matiereId: matiere.id,
      recurrent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_ENSEIGNANT");
  });

  it("retourne CONFLIT_GROUPE si le groupe a déjà un cours ailleurs", async () => {
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

    await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "09:00", // Chevauchement
      heureFin: "11:00",
      salle: "B202", // Autre salle
      intitule: "RDM",
      groupeId: groupe.id, // Même groupe
      enseignantId: autreEnseignant.id, // Autre prof
      matiereId: matiere.id,
      recurrent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_GROUPE");
  });

  it("génère N occurrences pour un créneau récurrent", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const lundi = new Date("2025-09-01");
    const fin = new Date("2025-09-22"); // 4 lundis : 1, 8, 15, 22 sept

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: true,
      recurrenceFin: fin,
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.creneaux).toHaveLength(4);
  });

  it("détecte un conflit sur une occurrence récurrente", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const lundi = new Date("2025-09-01");

    // créneau ponctuel sur la 3e semaine
    await createCreneau({
      semaine: new Date("2025-09-15"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "Autre cours",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    // créneau récurrent qui passe par la même salle/horaire
    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: true,
      recurrenceFin: new Date("2025-09-22"),
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("CONFLIT_SALLE");
  });

  it("ne détecte pas de conflit si les horaires ne se chevauchent pas", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const lundi = new Date("2025-09-01");

    await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    const result = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "10:00",
      heureFin: "12:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    expect(result.success).toBe(true);
  });
});

describe("updateCreneau", () => {
  it("met à jour la salle d'un créneau existant", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });
    if (!created.success) throw new Error("setup failed");

    const result = await updateCreneau(created.creneaux[0].id, enseignant.id, {
      salle: "B202",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.creneau.salle).toBe("B202");
  });

  it("empêche la mise à jour si elle crée un conflit de salle", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const lundi = new Date("2025-09-01");

    // Créneau 1
    const c1 = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "Cours 1",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    // Créneau 2 (autre salle)
    const c2 = await createCreneau({
      semaine: lundi,
      jour: "lundi",
      heureDebut: "10:00",
      heureFin: "12:00",
      salle: "B202",
      intitule: "Cours 2",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });

    if (!c1.success || !c2.success) throw new Error("setup failed");

    // Tenter de déplacer c2 sur l'horaire de c1 dans la même salle
    const result = await updateCreneau(c2.creneaux[0].id, enseignant.id, {
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

    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });
    if (!created.success) throw new Error("setup failed");

    const result = await updateCreneau(
      created.creneaux[0].id,
      autreEnseignant.id,
      { salle: "B202" },
    );

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("UNAUTHORIZED");
  });
});

describe("deleteCreneau", () => {
  it("supprime un créneau dont on est propriétaire", async () => {
    const { enseignant, groupe, matiere } = await createFixtures();
    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });
    if (!created.success) throw new Error("setup failed");

    const result = await deleteCreneau(created.creneaux[0].id, enseignant.id);

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

    const created = await createCreneau({
      semaine: new Date("2025-09-01"),
      jour: "lundi",
      heureDebut: "08:00",
      heureFin: "10:00",
      salle: "A101",
      intitule: "RDM",
      groupeId: groupe.id,
      enseignantId: enseignant.id,
      matiereId: matiere.id,
      recurrent: false,
    });
    if (!created.success) throw new Error("setup failed");

    const result = await deleteCreneau(created.creneaux[0].id, imposteur.id);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toBe("UNAUTHORIZED");
  });
});
