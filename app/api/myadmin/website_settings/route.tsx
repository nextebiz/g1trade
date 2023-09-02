import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    console.log("hi2")

    const form_data = await req.formData()

    const setting_id = form_data.get("setting_id") as string
    const google_login = form_data.get("google_login") as string
    const facebook_login = form_data.get("facebook_login") as string
    const twitter_login = form_data.get("twitter_login") as string
    const pinterest_login = form_data.get("pinterest_login") as string
    const how_to_sell_video = form_data.get("how_to_sell_video") as string
    const how_to_buy_video = form_data.get("how_to_buy_video") as string

    const save_settings = await prisma.websiteSettings.update({
        data: {
            google_login: google_login.toLowerCase() === "true",
            facebook_login: facebook_login.toLowerCase() === "true",
            twitter_login: twitter_login.toLowerCase() === "true",
            pinterest_login: pinterest_login.toLowerCase() === "true",
            how_to_buy_video: how_to_buy_video,
            how_to_sell_video: how_to_sell_video,
        },
        where: {
            id: setting_id
        }
    })


    return NextResponse.json({
        status: 200,
        msg: "settings saved"
    })
}