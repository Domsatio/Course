import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Email } from "@/types/email.type";

export const EmailAdmin = ( payload : Email) => {
    const { name, email, message } = payload;
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Hi Domsat</Text>
          <Text style={text}>My name is {name}</Text>
          <Text style={text}>Email: {email}</Text>
          <Text style={text}>Message: {message}</Text>
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
  width: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const text = {
  fontSize: "11px",
  lineHeight: "0.5",
  color: "#484848",
};
