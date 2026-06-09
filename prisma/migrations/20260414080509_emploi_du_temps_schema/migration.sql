-- AlterTable
ALTER TABLE "EmploiDuTemps" ADD COLUMN     "matiereId" TEXT,
ADD COLUMN     "recurrenceFin" TIMESTAMP(3),
ADD COLUMN     "recurrent" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MatiereEnseignant" (
    "enseignantId" TEXT NOT NULL,
    "matiereId" TEXT NOT NULL,

    CONSTRAINT "MatiereEnseignant_pkey" PRIMARY KEY ("enseignantId","matiereId")
);

-- AddForeignKey
ALTER TABLE "MatiereEnseignant" ADD CONSTRAINT "MatiereEnseignant_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatiereEnseignant" ADD CONSTRAINT "MatiereEnseignant_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploiDuTemps" ADD CONSTRAINT "EmploiDuTemps_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE SET NULL ON UPDATE CASCADE;
