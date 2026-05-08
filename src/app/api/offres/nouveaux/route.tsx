import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Statut } from "@prisma/client";


export async function POST(request: Request) {

    const nouveaux = await request.formData();
    const poste = nouveaux.get("poste") || ''
    const Description = nouveaux.get("description") || ''
    const Remuneration = nouveaux.get("remuneration") || ''
    const prerequis = nouveaux.get("prerequis") || ''
    const Statuts = "PENDING"
    const entreprise = nouveaux.get("entreprise") || ''
    const duree = nouveaux.get("duree") || ''



    try {

        const offres = await prisma.offreAlternance.create({
            data: {
                poste: poste.toString(),
                description: Description.toString(),
                remuneration: Remuneration.toString(),
                prerequis: prerequis.toString(),
                statut: Statuts as Statut,
                entrepriseId: entreprise.toString(),
                duree : duree.toString()

            }
        })


        console.log(offres)
    return NextResponse.json(offres, { status: 200 });


    } catch (ex) {
        console.log(ex)

    return NextResponse.json(ex, { status: 500 });

    }
}