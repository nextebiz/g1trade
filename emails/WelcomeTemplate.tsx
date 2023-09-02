import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

interface Props {
    params: {
        name: string
    }
}

export default function WelcomeTemplate({ params: { name } }: Props) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Text style={heading}>Hi {name}!</Text>
                    <Text style={paragraph}>Welcome to G1 Garlic Trading platform!</Text>
                    <Text style={paragraph}>Now you can buy, sell G1 Garlic in all major cities of Pakistan.</Text>
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

const paragraph = {
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
};
