import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import ContactFormTemplate from "@/emails/ContactFormTemplate";
import { sendEmail } from "@/libs/email";


export async function POST(req: Request, res: Response) {


    const form_data = await req.formData();
    const user_id = form_data.get("user_id") as string;
    const department = form_data.get("department") as string;
    const user_name = form_data.get("user_name") as string;
    const user_phone = form_data.get("user_phone") as string;
    const user_whatsapp = form_data.get("user_whatsapp") as string;
    const user_email = form_data.get("user_email") as string;
    const message = form_data.get("message") as string;

    const save_message = await prisma.adminMessages.create({
        data: {
            department: department,
            message: message,
            userId: user_id,
            action: "PENDING"
        }
    })

    const options = {
        user_id: user_id,
        department: department,
        user_name: user_name,
        user_phone: user_phone,
        user_whatsapp: user_whatsapp,
        user_email: user_email,
        message: message,
    }

    const trySendEmailToSeller = await sendEmail({
        to: "g1garlic.pk@gmail.com",
        subject: `New message from ${user_name} - G1Trade.com`,
        html: render(ContactFormTemplate({ params: { options: options } })),
    });

    await prisma.$disconnect();


    return NextResponse.json({
        status: 200,
        msg: "sent"
    })
}