import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{

        const offres = await  prisma.offreAlternance.findMany({
            where: {entrepriseId: "cmo31p00q000bpovupja8ppm5"}
        })
        console.log(offres)
        return NextResponse.json(offres, {status: 200});
    }catch(ex){

        console.log(ex)

        return NextResponse.json(ex, {status: 500});


    }

}