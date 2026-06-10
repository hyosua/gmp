/*
  Warnings:

  - Made the column `matiereId` on table `EmploiDuTemps` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EmploiDuTemps" DROP CONSTRAINT "EmploiDuTemps_matiereId_fkey";

-- AlterTable
ALTER TABLE "EmploiDuTemps" ALTER COLUMN "matiereId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OffreAlternance" ADD COLUMN     "parcours" "Parcours";

-- AddForeignKey
ALTER TABLE "EmploiDuTemps" ADD CONSTRAINT "EmploiDuTemps_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
