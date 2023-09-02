import { render } from "@react-email/render";
// import WelcomeTemplate from "@/emails/WelcomeTemplate";
import OrderSellerTemplate from "@/emails/OrderSellerTemplate";
import OrderBuyerTemplate from "@/emails/OrderBuyerTemplate";
import { sendEmail } from "@/libs/email";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

  const form_data = await req.formData();

  const seller_name = form_data.get("seller_name") as string
  const buyer_name = form_data.get("buyer_name") as string
  const buyer_phone = form_data.get("buyer_phone") as string
  const buyer_whatsapp = form_data.get("buyer_whatsapp") as string
  const seller_phone = form_data.get("seller_phone") as string
  const seller_whatsapp = form_data.get("seller_whatsapp") as string
  const seller_email = form_data.get("seller_email") as string
  const buyer_email = form_data.get("buyer_email") as string
  const price = form_data.get("price") as string
  const price_units = form_data.get("price_units") as string
  const order_quantity = form_data.get("order_quantity") as string
  const order_units = form_data.get("order_units") as string
  const message = form_data.get("message") as string
  const product_name = form_data.get("product_name") as string
  const product_id = form_data.get("product_id") as string

  const options = {
    seller_name: seller_name,
    buyer_name: buyer_name,
    buyer_phone: buyer_phone,
    buyer_whatsapp: buyer_whatsapp,
    seller_phone: seller_phone,
    seller_whatsapp: seller_whatsapp,
    seller_email: seller_email,
    buyer_email: buyer_email,
    product_name: product_name,
    product_id: product_id,
    price: price,
    price_units: price_units,
    order_quantity: order_quantity,
    order_units: order_units,
    message: message,
  }

  const trySendEmailToSeller = await sendEmail({
    to: seller_email,
    subject: `New order from ${buyer_name} - G1Trade.com`,
    html: render(OrderSellerTemplate({ params: { options: options } })),
  });

  const trySendEmailToBuyer = await sendEmail({
    to: buyer_email,
    subject: `New order sent to ${seller_name} - G1Trade.com`,
    html: render(OrderBuyerTemplate({ params: { options: options } })),
  });
  
  return NextResponse.json({
    msg: "sent"
  })
}