import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const settings = await prisma.websiteSettings.findFirst({
    })
    if (settings) {
        return NextResponse.json({
            status: 200,
            msg: "website settings",
            data: settings

        })
    }
    return NextResponse.json({
        status:404,
        msg: "failed to load website settings",
    })

}