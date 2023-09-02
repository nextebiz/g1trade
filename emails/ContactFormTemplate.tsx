import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

interface Props {
    params: {
        options: {
            user_id: string,
            department: string,
            user_name: string,
            user_phone: string,
            user_whatsapp: string,
            user_email: string,
            message: string,
        }
    }
}

export default function ContactFormTemplate({ params: { options } }: Props) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Text style={heading}>You have a new message from website</Text>
                    <Text style={paragraph}>User: {options.user_name}</Text>
                    <Text style={paragraph}>ID: {options.user_id}</Text>
                    <Text style={paragraph}>Phone: {options.user_phone}</Text>
                    <Text style={paragraph}>WhatsApp: {options.user_whatsapp}</Text>
                    <Text style={paragraph}>user_email: {options.user_email}</Text>
                    <Text style={paragraph}>Message sent to seller: {options.message}</Text>
                    <Text style={paragraph}>----------------------------------------</Text>
                    <Text style={paragraph}>Please contact the user by Phone or WhatsApp.</Text>
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
