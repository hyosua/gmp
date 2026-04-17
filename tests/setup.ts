import * as dotenv from "dotenv";
import { beforeEach } from "vitest";
import { prismaTest } from "./prismaTest";

dotenv.config({ path: ".env.test" });

beforeEach(async () => {
  await prismaTest.emploiDuTemps.deleteMany();
  await prismaTest.matiereEnseignant.deleteMany();
  await prismaTest.note.deleteMany();
  await prismaTest.matiere.deleteMany();
  await prismaTest.groupe.deleteMany();
  await prismaTest.uE.deleteMany();
  await prismaTest.resetToken.deleteMany();
  await prismaTest.supportDeCours.deleteMany();
  await prismaTest.projetTuteure.deleteMany();
  await prismaTest.offreAlternance.deleteMany();
  await prismaTest.user.deleteMany();
});
