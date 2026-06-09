import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readdir } from "fs/promises";
import { auth } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const body = await req.formData();

  let nom = body.get("nom") as string;
  const fichier = body.get("fichier") as File;
  const chemin = body.get("chemin") as string;
  const tailles = Number(body.get("taille"));
  const session = await auth();
  

  if (!fichier) {
    return NextResponse.json({ error: "Pas de fichier" }, { status: 400 });
  }

  const dossier = path.join(
    process.cwd(),
    "public/support",
  );

  const fichiers = await readdir(dossier);
  let compteur = 1;

  while (fichiers.includes(nom)) {
    const ext = fichier.name.split(".").pop();
    const base = fichier.name.replace(`.${ext}`, "");

    nom = `${base}(${compteur}).${ext}`;
    compteur++;
  }

  try {
    const cours = await prisma.supportDeCours.create({
      data: {
        titre: nom,
        cheminFichier: `public/support${chemin}`,
        taille: tailles,
        enseignantId: session?.user.id.toString() || '',
      },
    });

    const bytes = await fichier.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(
      process.cwd(),
      "public/support",
      nom,
    );

    await writeFile(filePath, buffer);

    console.log(cours);
    return NextResponse.json(cours, { status: 200 });
  } catch (ex) {
    console.log(ex);
    return NextResponse.json("Une érreur est survenu: " + ex, { status: 500 });
  }
}
