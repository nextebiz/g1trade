// ses email test... delete later

import { xsendEmail } from "@/utils/email";
import { NextResponse } from "next/server";
export async function GET(req: Request, res: Response) {
    return NextResponse.json({
        msg: "get from email"
    })
}

export async function POST(req: Request, res: Response) {

    const SES_CONFIG = {
        credentials: {
            accessKeyId: process.env.SES_ACCESS_KEY,
            secretAccessKey: process.env.SES_SECRET,
        },
        region: process.env.SES_REGION,
    };

    const result = await xsendEmail("isavepak@gmail.com", "bingo", SES_CONFIG);

    return NextResponse.json({
        msg: "hi",
        data: {
            region: process.env.SES_REGION
        }
    })
}