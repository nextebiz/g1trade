import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const cats = await prisma.category.findMany({
        
    })
    
    console.log(cats)

    return NextResponse.json({
        msg: "cats",
        data: cats
    })
}