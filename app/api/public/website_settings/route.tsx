import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const settings = await prisma.websiteSettings.findFirst({
    })
    return NextResponse.json({
        msg: "website settings",
        data: settings

    })
}