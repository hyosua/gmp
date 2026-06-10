-- AlterTable
ALTER TABLE "SupportDeCours" ADD COLUMN     "matiereId" TEXT;

-- AddForeignKey
ALTER TABLE "SupportDeCours" ADD CONSTRAINT "SupportDeCours_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE SET NULL ON UPDATE CASCADE;
