import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

interface Props {
    params: {
        options: {
            seller_name: string,
            buyer_name: string,
            buyer_phone: string,
            buyer_whatsapp: string,
            seller_phone: string,
            seller_whatsapp: string,
            seller_email: string,
            buyer_email: string,
            product_name: string,
            product_id: string,
            price: string,
            price_units: string,
            order_quantity: string,
            order_units: string,
            message: string,
        }
    }
}

export default function OrderSellerTemplate({ params: { options } }: Props) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Text style={heading}>Hello {options.seller_name}</Text>
                    <Text style={bigtext}>You have received new order from {options.buyer_name}</Text>
                    <Text style={paragraph}>Product Name: <a target="_blank" href={`https://g1trade.com/product/${options.product_id}`}>{options.product_name}</a></Text>
                    <Text style={paragraph}>Price: Rs-{options.price} / {options.price_units}</Text>
                    <Text style={paragraph}>Order quantity: {options.order_quantity} {options.order_units}</Text>
                    <Text style={paragraph}>Message from buyer: {options.message}</Text>
                    <Text style={paragraph}>----------------------------------------</Text>
                    <Text style={paragraph}>Please contact the buyer by Phone or WhatsApp. You can contact the buyer on the following numbers:</Text>
                    <Text style={paragraph}>Phone: {options.buyer_phone}</Text>
                    <Text style={paragraph}>WhatsApp: {options.buyer_whatsapp}</Text>
                    <Text style={paragraph}>----------------------------------------</Text>
                    <Text style={paragraph}>Buy, sell G1 Garlic in all major cities of Pakistan.</Text>
                    <Text style={paragraph}>Search for the best sellers, place order, rate the seller, contact via Phone, WhatsApp and more..</Text>
                    <Text style={paragraph}>Go here: <a target="_blank" href="https://g1trade.com">https://g1trade.com</a></Text>
                </Container>
            </Section>
        </Html>
    );
}

// Styles for the email template
const main = {
    backgroundColor: "#ffffff",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
};

const heading = {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
};

const bigtext = {
    fontSize: "22px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
};

const paragraph = {
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
};
