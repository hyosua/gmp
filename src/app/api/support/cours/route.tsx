import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";




export async function GET(){

    const cours = await prisma.supportDeCours.findMany()

    console.log(cours)

    return NextResponse.json(cours, {status: 200});

}