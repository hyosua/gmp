import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(request: Request, context: any) {

    const { id } = await context.params;

    const formData = await request.formData();

    const poste = formData.get("poste") || '';
    const description = formData.get("description") || '';
    const remuneration = formData.get("remuneration") || '';
    const prerequis = formData.get("prerequis") || '';

    try {

        const offres = await prisma.offreAlternance.update({
            where: { id },
            data: {
                poste: poste.toString(),
                description: description.toString(),
                remuneration: remuneration.toString(),
                prerequis: prerequis.toString(),
            }
        });

        return NextResponse.json(offres);

    } catch (ex) {
        console.log(ex);
        return NextResponse.json(ex, { status: 500 });
    }
}