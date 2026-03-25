/*
  Warnings:

  - Added the required column `semaine` to the `EmploiDuTemps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anneeScolaire` to the `Groupe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ueId` to the `Matiere` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annee` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Parcours" ADD VALUE 'LP_MIE';
ALTER TYPE "Parcours" ADD VALUE 'LP_MIEF';
ALTER TYPE "Parcours" ADD VALUE 'LP_MRI';

-- AlterTable
ALTER TABLE "EmploiDuTemps" ADD COLUMN     "semaine" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Groupe" ADD COLUMN     "anneeScolaire" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Matiere" ADD COLUMN     "ueId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "annee" INTEGER NOT NULL,
ADD COLUMN     "semestre" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OffreAlternance" ADD COLUMN     "statut" "Statut" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "ProjetTuteure" ADD COLUMN     "statut" "Statut" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "anneePromotion" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "promesseEmbauche" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UE" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_token_key" ON "ResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UE_code_key" ON "UE"("code");

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matiere" ADD CONSTRAINT "Matiere_ueId_fkey" FOREIGN KEY ("ueId") REFERENCES "UE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
