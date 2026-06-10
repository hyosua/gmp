import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type LigneImport = {
  email: string;
  nom: string;
  prenom: string;
  role: string;
  parcours?: string;
  typeFormation?: string;
  anneePromotion?: string;
};

const ROLES_VALIDES = ["ETUDIANT", "ENSEIGNANT", "ENTREPRISE"];
const PARCOURS_VALIDES = [
  "SIMULATION_REALITE_VIRTUELLE",
  "CONCEPTION_PRODUCTION_DURABLE",
  "NON_DEFINI",
  "LP_MIE",
  "LP_MIEF",
  "LP_MRI",
];
const TYPE_FORMATION_VALIDES = ["INITIALE", "ALTERNANCE"];

function genererMotDePasse(longueur = 10): string {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let mdp = "";
  for (let i = 0; i < longueur; i++) {
    mdp += chars[Math.floor(Math.random() * chars.length)];
  }
  return mdp;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { lignes }: { lignes: LigneImport[] } = await req.json();

  if (!Array.isArray(lignes) || lignes.length === 0) {
    return NextResponse.json(
      { error: "Aucune ligne à importer" },
      { status: 400 },
    );
  }

  const resultats = [];

  for (const ligne of lignes) {
    const {
      email,
      nom,
      prenom,
      role,
      parcours,
      typeFormation,
      anneePromotion,
    } = ligne;

    if (!email || !nom || !prenom || !role) {
      resultats.push({
        email: email ?? "?",
        statut: "erreur",
        message: "Champs obligatoires manquants",
      });
      continue;
    }

    if (!ROLES_VALIDES.includes(role.toUpperCase())) {
      resultats.push({
        email,
        statut: "erreur",
        message: `Rôle inconnu : ${role}`,
      });
      continue;
    }

    const roleNorm = role.toUpperCase() as
      | "ETUDIANT"
      | "ENSEIGNANT"
      | "ENTREPRISE";

    const parcoursNorm =
      parcours && PARCOURS_VALIDES.includes(parcours.toUpperCase())
        ? (parcours.toUpperCase() as never)
        : "NON_DEFINI";

    const typeFormationNorm =
      typeFormation &&
      TYPE_FORMATION_VALIDES.includes(typeFormation.toUpperCase())
        ? (typeFormation.toUpperCase() as never)
        : "INITIALE";

    const annee = anneePromotion ? parseInt(anneePromotion, 10) : 1;

    const mdpTemp = genererMotDePasse();
    const mdpHash = await bcrypt.hash(mdpTemp, 10);

    try {
      await prisma.user.create({
        data: {
          email: email.trim().toLowerCase(),
          nom: nom.trim(),
          prenom: prenom.trim(),
          role: roleNorm,
          password: mdpHash,
          parcours: parcoursNorm,
          typeFormation: typeFormationNorm,
          anneePromotion: isNaN(annee) ? 1 : annee,
        },
      });
      resultats.push({ email, statut: "créé", motDePasse: mdpTemp });
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message.includes("Unique constraint")
          ? "Email déjà utilisé"
          : "Erreur création";
      resultats.push({ email, statut: "erreur", message });
    }
  }

  return NextResponse.json({ resultats });
}
