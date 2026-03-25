-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ETUDIANT', 'ENSEIGNANT', 'ENTREPRISE', 'ADMIN');

-- CreateEnum
CREATE TYPE "Parcours" AS ENUM ('SIMULATION_REALITE_VIRTUELLE', 'CONCEPTION_PRODUCTION_DURABLE', 'NON_DEFINI');

-- CreateEnum
CREATE TYPE "TypeFormation" AS ENUM ('INITIALE', 'ALTERNANCE');

-- CreateEnum
CREATE TYPE "TypeGroupe" AS ENUM ('CM', 'TD', 'TP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "parcours" "Parcours" NOT NULL DEFAULT 'NON_DEFINI',
    "typeFormation" "TypeFormation" NOT NULL DEFAULT 'INITIALE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groupe" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" "TypeGroupe" NOT NULL,

    CONSTRAINT "Groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matiere" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Matiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "valeur" DOUBLE PRECISION NOT NULL,
    "dateDepot" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etudiantId" TEXT NOT NULL,
    "enseignantId" TEXT NOT NULL,
    "matiereId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploiDuTemps" (
    "id" TEXT NOT NULL,
    "jour" TEXT NOT NULL,
    "heureDebut" TEXT NOT NULL,
    "heureFin" TEXT NOT NULL,
    "salle" TEXT NOT NULL,
    "intitule" TEXT NOT NULL,
    "groupeId" TEXT NOT NULL,
    "enseignantId" TEXT NOT NULL,

    CONSTRAINT "EmploiDuTemps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportDeCours" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "cheminFichier" TEXT NOT NULL,
    "taille" INTEGER NOT NULL,
    "dateDepot" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enseignantId" TEXT NOT NULL,

    CONSTRAINT "SupportDeCours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjetTuteure" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prerequis" TEXT,
    "nbEtudiants" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entrepriseId" TEXT NOT NULL,

    CONSTRAINT "ProjetTuteure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffreAlternance" (
    "id" TEXT NOT NULL,
    "poste" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duree" TEXT NOT NULL,
    "remuneration" TEXT,
    "prerequis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entrepriseId" TEXT NOT NULL,

    CONSTRAINT "OffreAlternance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupeEtudiants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupeEtudiants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Matiere_code_key" ON "Matiere"("code");

-- CreateIndex
CREATE INDEX "_GroupeEtudiants_B_index" ON "_GroupeEtudiants"("B");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploiDuTemps" ADD CONSTRAINT "EmploiDuTemps_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploiDuTemps" ADD CONSTRAINT "EmploiDuTemps_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportDeCours" ADD CONSTRAINT "SupportDeCours_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetTuteure" ADD CONSTRAINT "ProjetTuteure_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffreAlternance" ADD CONSTRAINT "OffreAlternance_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupeEtudiants" ADD CONSTRAINT "_GroupeEtudiants_A_fkey" FOREIGN KEY ("A") REFERENCES "Groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupeEtudiants" ADD CONSTRAINT "_GroupeEtudiants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
