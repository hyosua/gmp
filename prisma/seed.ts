import "dotenv/config";
import {
  PrismaClient,
  Role,
  Parcours,
  TypeFormation,
  TypeGroupe,
  Statut,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("gmp", 10);

  console.log("--- Nettoyage de la base de données ---");
  // Suppression dans l'ordre inverse des dépendances
  // Utilisation de try/catch pour éviter les blocages sur des tables potentiellement manquantes ou vides
  const models = [
    "resetToken",
    "note",
    "emploiDuTemps",
    "supportDeCours",
    "projetTuteure",
    "offreAlternance",
    "matiereEnseignant",
    "matiere",
    "uE",
    "user",
    "groupe",
  ];

  for (const model of models) {
    try {
      // @ts-expect-error - Dynamically accessing prisma models
      if (prisma[model]) {
        // @ts-expect-error - Dynamically accessing prisma models
        await prisma[model].deleteMany();
        console.log(`Table ${model} nettoyée.`);
      } else {
        console.warn(`Modèle ${model} non trouvé sur l'objet prisma.`);
      }
    } catch (e) {
      console.error(`Erreur lors du nettoyage de ${model}:`, e);
    }
  }

  console.log("--- Création des Utilisateurs ---");

  // 5 Etudiants
  const etudiants = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `etudiant${i}@test.com`,
        password,
        role: Role.ETUDIANT,
        nom: `Dupont${i}`,
        prenom: `Jean${i}`,
        parcours:
          i % 2 === 0
            ? Parcours.SIMULATION_REALITE_VIRTUELLE
            : Parcours.CONCEPTION_PRODUCTION_DURABLE,
        typeFormation:
          i % 2 === 0 ? TypeFormation.ALTERNANCE : TypeFormation.INITIALE,
        anneePromotion: (i % 3) + 1,
      },
    });
    etudiants.push(user);
  }

  // 5 Enseignants
  const enseignants = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `enseignant${i}@test.com`,
        password,
        role: Role.ENSEIGNANT,
        nom: `Professeur${i}`,
        prenom: `Luc${i}`,
      },
    });
    enseignants.push(user);
  }

  // 5 Entreprises
  const entreprises = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `entreprise${i}@test.com`,
        password,
        role: Role.ENTREPRISE,
        nom: `Entreprise${i}`,
        prenom: `Représentant${i}`,
      },
    });
    entreprises.push(user);
  }

  // 1 Admin
  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password,
      role: Role.ADMIN,
      nom: "Admin",
      prenom: "Boss",
    },
  });

  console.log("--- Création des Groupes ---");
  // 1 CM (tous les étudiants), 2 TD, 2 TP — chaque étudiant dans 1 groupe par type
  const groupesData = [
    { nom: "CM1", type: TypeGroupe.CM, etudiants: etudiants },
    { nom: "TD1", type: TypeGroupe.TD, etudiants: etudiants.slice(0, 3) },
    { nom: "TD2", type: TypeGroupe.TD, etudiants: etudiants.slice(3) },
    { nom: "TP1", type: TypeGroupe.TP, etudiants: etudiants.slice(0, 2) },
    { nom: "TP2", type: TypeGroupe.TP, etudiants: etudiants.slice(2) },
  ];
  const groupes = [];
  for (const { nom, type, etudiants: membres } of groupesData) {
    const groupe = await prisma.groupe.create({
      data: {
        nom,
        type,
        anneeScolaire: "2025-2026",
        etudiants: { connect: membres.map((e) => ({ id: e.id })) },
      },
    });
    groupes.push(groupe);
  }

  console.log("--- Création des UEs et Matières ---");
  const ues = [];
  for (let i = 1; i <= 5; i++) {
    const ue = await prisma.uE.create({
      data: {
        nom: `Unité d'Enseignement ${i}`,
        code: `UE${i}`,
        coefficient: 1.0 + i * 0.5,
      },
    });
    ues.push(ue);

    // Création de 2 matières par UE pour avoir au moins 10 matières
    for (let j = 1; j <= 2; j++) {
      await prisma.matiere.create({
        data: {
          nom: `Matière ${i}.${j}`,
          code: `MAT${i}${j}`,
          ueId: ue.id,
        },
      });
    }
  }
  const matieres = await prisma.matiere.findMany();

  console.log("--- Affectation des Matières aux Enseignants ---");
  for (let i = 0; i < enseignants.length; i++) {
    // Chaque enseignant aura 2 matières
    await prisma.matiereEnseignant.create({
      data: {
        enseignantId: enseignants[i].id,
        matiereId: matieres[(i * 2) % matieres.length].id,
      },
    });
    await prisma.matiereEnseignant.create({
      data: {
        enseignantId: enseignants[i].id,
        matiereId: matieres[(i * 2 + 1) % matieres.length].id,
      },
    });
  }

  console.log("--- Création des Notes ---");
  for (let i = 0; i < 5; i++) {
    await prisma.note.create({
      data: {
        valeur: 10 + Math.random() * 10,
        semestre: (i % 6) + 1,
        annee: 2025,
        etudiantId: etudiants[i % etudiants.length].id,
        enseignantId: enseignants[i % enseignants.length].id,
        matiereId: matieres[i % matieres.length].id,
      },
    });
  }

  console.log("--- Création des Emplois du Temps ---");
  const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
  const startOfThisWeek = new Date();
  const day = startOfThisWeek.getUTCDay() || 7; // Lundi=1, Dimanche=7
  startOfThisWeek.setUTCDate(startOfThisWeek.getUTCDate() - day + 1);
  startOfThisWeek.setUTCHours(0, 0, 0, 0);

  for (let i = 0; i < 5; i++) {
    await prisma.emploiDuTemps.create({
      data: {
        semaine: startOfThisWeek,
        jour: jours[i],
        heureDebut: "08:30",
        heureFin: "10:30",
        salle: `${100 + i}`,
        intitule: `Cours de ${matieres[i % matieres.length].nom}`,
        groupeId: groupes[i % groupes.length].id,
        enseignantId: enseignants[i % enseignants.length].id,
        matiereId: matieres[i % matieres.length].id,
      },
    });
  }

  console.log("--- Création des Supports de Cours ---");
  for (let i = 1; i <= 5; i++) {
    await prisma.supportDeCours.create({
      data: {
        titre: `Support ${i} - ${matieres[i % matieres.length].nom}`,
        cheminFichier: `/uploads/support${i}.pdf`,
        taille: 1024 * i,
        enseignantId: enseignants[i % enseignants.length].id,
      },
    });
  }

  console.log("--- Création des Projets Tuteurés ---");
  const projetsData = [
    {
      titre: "De la maquette numérique au prototype physique",
      description:
        "SAE de 1ère année : concevoir une maquette numérique sous logiciel CAO puis la concrétiser en prototype physique via des procédés de fabrication adaptés (impression 3D, usinage). L'étudiant suit l'intégralité du cycle de conception-fabrication.",
      prerequis:
        "Bases en CAO (SolidWorks ou équivalent), notions de dessin technique.",
      nbEtudiants: 1,
      statut: Statut.PUBLISHED,
      entrepriseId: entreprises[0].id,
    },
    {
      titre:
        "Répondre, dans un cadre collaboratif, à un besoin de nature industrielle sur l'ensemble du cycle de vie",
      description:
        "SAE de 2e année : en équipe, analyser un besoin industriel réel, proposer une solution technique intégrant les contraintes de conception, de fabrication et de maintenance sur l'ensemble du cycle de vie du produit.",
      prerequis:
        "Maîtrise des outils CAO/FAO, connaissances en analyse fonctionnelle et gestion de projet.",
      nbEtudiants: 1,
      statut: Statut.PUBLISHED,
      entrepriseId: entreprises[1].id,
    },
    {
      titre:
        "Fournir, en autonomie, une solution fonctionnelle et optimisée répondant à une demande industrielle sur l'ensemble du cycle de vie",
      description:
        "SAE de 3e année : en totale autonomie, répondre à une commande industrielle complexe en livrant une solution complète, documentée et optimisée (coût, performance, durabilité) couvrant l'ensemble du cycle de vie du produit.",
      prerequis:
        "Maîtrise avancée de la CAO/FAO, expérience en gestion de projet industriel, connaissances en optimisation et analyse de cycle de vie.",
      nbEtudiants: 1,
      statut: Statut.PENDING,
      entrepriseId: entreprises[2].id,
    },
  ];

  for (const data of projetsData) {
    await prisma.projetTuteure.create({ data });
  }

  console.log("--- Création des Offres d'Alternance ---");
  const offresData = [
    {
      parcours: Parcours.CONCEPTION_PRODUCTION_DURABLE,
      poste: "Apprenti Technicien CAO/FAO",
      description:
        "Conception de pièces mécaniques sous SolidWorks et programmation CN.",
      remuneration: "900€/mois",
    },
    {
      parcours: Parcours.SIMULATION_REALITE_VIRTUELLE,
      poste: "Apprenti Ingénieur Simulation",
      description:
        "Développement de modèles de simulation pour des systèmes mécaniques complexes.",
      remuneration: "1000€/mois",
    },
    {
      parcours: Parcours.LP_MIE,
      poste: "Apprenti Contrôle Qualité",
      description:
        "Suivi de la qualité en production, métrologie et rédaction de rapports d'audit.",
      remuneration: "1050€/mois",
    },
    {
      parcours: Parcours.LP_MIEF,
      poste: "Apprenti Méthodes Industrielles",
      description:
        "Optimisation des process de fabrication et rédaction de gammes opératoires.",
      remuneration: "1100€/mois",
    },
    {
      parcours: Parcours.LP_MRI,
      poste: "Apprenti Maintenance Robotique",
      description:
        "Maintenance préventive et corrective de robots industriels en cellule flexible.",
      remuneration: "1050€/mois",
    },
  ];

  for (let i = 0; i < offresData.length; i++) {
    const { parcours, poste, description, remuneration } = offresData[i];
    await prisma.offreAlternance.create({
      data: {
        poste,
        description,
        duree: "1 an",
        remuneration,
        prerequis: "Bac+2 en génie mécanique.",
        parcours,
        statut: Statut.PUBLISHED,
        entrepriseId: entreprises[i % entreprises.length].id,
      },
    });
  }

  console.log("--- Création des Reset Tokens ---");
  for (let i = 0; i < 5; i++) {
    await prisma.resetToken.create({
      data: {
        token: `token-secret-${i}`,
        expiresAt: new Date(Date.now() + 3600000), // 1h
        userId: etudiants[i].id,
      },
    });
  }

  console.log("--- Seed terminé avec succès ---");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
