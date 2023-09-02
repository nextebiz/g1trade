import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const create_record = await prisma.websiteSettings.create({
        data: {
            facebook_login: true,
            google_login: true,
            twitter_login: true
        }
    })
    return NextResponse.json({

        msg: "done",
        data: create_record
    })
}