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
  const groupes = [];
  for (let i = 1; i <= 5; i++) {
    const groupe = await prisma.groupe.create({
      data: {
        nom: `Groupe ${i}`,
        type:
          i % 3 === 0
            ? TypeGroupe.CM
            : i % 3 === 1
              ? TypeGroupe.TD
              : TypeGroupe.TP,
        anneeScolaire: "2025-2026",
        etudiants: {
          connect: etudiants.map((e) => ({ id: e.id })),
        },
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
  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  for (let i = 0; i < 5; i++) {
    await prisma.emploiDuTemps.create({
      data: {
        semaine: new Date(),
        jour: jours[i],
        heureDebut: "08:30",
        heureFin: "10:30",
        salle: `Salle ${100 + i}`,
        intitule: `Cours de ${matieres[i % matieres.length].nom}`,
        groupeId: groupes[i % groupes.length].id,
        enseignantId: enseignants[i % enseignants.length].id,
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
  for (let i = 1; i <= 5; i++) {
    await prisma.projetTuteure.create({
      data: {
        titre: `Projet Industriel ${i}`,
        description: `Description détaillée du projet ${i} pour les étudiants de GMP.`,
        prerequis: "Connaissances en CAO et mécanique.",
        nbEtudiants: (i % 4) + 2,
        statut: i % 2 === 0 ? Statut.PUBLISHED : Statut.PENDING,
        entrepriseId: entreprises[i % entreprises.length].id,
      },
    });
  }

  console.log("--- Création des Offres d'Alternance ---");
  for (let i = 1; i <= 5; i++) {
    await prisma.offreAlternance.create({
      data: {
        poste: `Apprenti Ingénieur Mécanique ${i}`,
        description: `Offre d'alternance chez Entreprise${i} pour un poste de conception.`,
        duree: "1 an",
        remuneration: "Selon profil",
        prerequis: "Bac+2 en génie mécanique.",
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
