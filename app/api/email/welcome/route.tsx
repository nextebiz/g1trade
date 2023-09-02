import { render } from "@react-email/render";
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { sendEmail } from "@/libs/email";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(req: Request, res: Response) {

  const form_data = await req.formData();

  const user_id = form_data.get("user_id") as string
  const name = form_data.get("name") as string
  const email = form_data.get("email") as string

  const trySend = await sendEmail({
    // to: "isavepak@gmail.com",
    to: email,
    subject: `Welcome ${name} to G1 Trading Platform - G1Trade.com`,
    html: render(WelcomeTemplate({ params: { name: name } })),
  });

  const update = await prisma.user.update({
    data: {
      welcomeEmailSent: true
    },
    where: {
      id: user_id
    }
  })

  prisma.$disconnect();

  return NextResponse.json({
    msg: "sent"
  })
}